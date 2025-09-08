-- Create quiz_responses table (now expanded as CRM contacts table)
CREATE TABLE IF NOT EXISTS quiz_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  archetype VARCHAR(50),
  main_answers JSONB,
  optional_answers JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET,
  
  -- Original tracking fields
  calendly_booked BOOLEAN DEFAULT FALSE,
  follow_up_sent BOOLEAN DEFAULT FALSE,
  mailerlite_added BOOLEAN DEFAULT FALSE,
  email_sent BOOLEAN DEFAULT FALSE,
  
  -- New CRM fields
  signup_source VARCHAR(50) DEFAULT 'Quiz',
  status VARCHAR(50) DEFAULT 'Lead',
  focus_area TEXT,
  last_session_focus TEXT,
  next_session_goal TEXT,
  
  -- Additional coaching notes
  notes TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_quiz_responses_email ON quiz_responses(email);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_archetype ON quiz_responses(archetype);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_created_at ON quiz_responses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_updated_at ON quiz_responses(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_calendly_booked ON quiz_responses(calendly_booked);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_signup_source ON quiz_responses(signup_source);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_status ON quiz_responses(status);

-- Enable Row Level Security (optional, but good practice)
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (you can make this more restrictive later)
CREATE POLICY "Allow all operations on quiz_responses" ON quiz_responses
  FOR ALL USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_quiz_responses_updated_at 
    BEFORE UPDATE ON quiz_responses 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create a view for easy analytics
CREATE OR REPLACE VIEW quiz_analytics AS
SELECT 
  archetype,
  signup_source,
  status,
  COUNT(*) as total_contacts,
  COUNT(*) FILTER (WHERE status = 'Lead') as leads,
  COUNT(*) FILTER (WHERE status = 'Call Booked') as calls_booked,
  COUNT(*) FILTER (WHERE status = 'Client') as clients,
  COUNT(*) FILTER (WHERE status = 'Lapsed Client') as lapsed_clients,
  COUNT(*) FILTER (WHERE calendly_booked = true) as booked_calls,
  COUNT(*) FILTER (WHERE optional_answers IS NOT NULL AND optional_answers != '{}') as completed_optional,
  ROUND(
    (COUNT(*) FILTER (WHERE status = 'Client')::DECIMAL / COUNT(*)) * 100, 
    2
  ) as client_conversion_rate,
  DATE_TRUNC('day', created_at) as date
FROM quiz_responses
GROUP BY archetype, signup_source, status, DATE_TRUNC('day', created_at)
ORDER BY date DESC, total_contacts DESC;

-- Create CRM summary view
CREATE OR REPLACE VIEW crm_summary AS
SELECT 
  signup_source,
  COUNT(*) as total_contacts,
  COUNT(*) FILTER (WHERE status = 'Lead') as leads,
  COUNT(*) FILTER (WHERE status = 'Call Booked') as calls_booked,
  COUNT(*) FILTER (WHERE status = 'Client') as clients,
  COUNT(*) FILTER (WHERE status = 'Lapsed Client') as lapsed_clients,
  ROUND(
    (COUNT(*) FILTER (WHERE status = 'Client')::DECIMAL / NULLIF(COUNT(*), 0)) * 100, 
    2
  ) as client_conversion_rate
FROM quiz_responses
GROUP BY signup_source
ORDER BY total_contacts DESC;

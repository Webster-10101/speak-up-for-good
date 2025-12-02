# Speaker Quiz Setup Instructions

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Required: OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Optional: Email Service Configuration (MailerLite)
MAILERLITE_API_KEY=your_mailerlite_api_key_here
```

## API Keys Setup

### OpenAI API Key (Required)
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Create a new API key
5. Add it to your `.env.local` file

### MailerLite API Key (Optional but recommended)
1. Go to [MailerLite](https://www.mailerlite.com/)
2. Create an account or sign in
3. Go to Integrations > API
4. Generate a new API token
5. Add it to your `.env.local` file

## Quiz Features

- **8 comprehensive questions** covering different speaking scenarios
- **7 speaker archetypes**: Rambler, Overthinker, Self-Doubter, People Pleaser, Performer, Intense Speaker, Rationalist
- **AI-generated personalized growth plans** using OpenAI GPT-4
- **Automatic email capture and segmentation** with archetype tags
- **Beautiful, responsive UI** with progress tracking
- **Immediate results** with actionable tips

## Quiz Flow

1. **Landing page** with value proposition and features
2. **Progressive quiz** with 8 questions and real-time progress
3. **Results page** showing archetype, strengths, and growth areas
4. **Email capture** for personalized growth plan
5. **AI-generated plan** sent via email with archetype-specific advice

## Accessing the Quiz

Once set up, the quiz will be available at: `/speaker-quiz`

## Email Integration

The quiz automatically:
- Tags users with their speaker archetype in MailerLite
- Adds a general "speaker-quiz-lead" tag
- Stores archetype and lead source as custom fields
- Sends personalized growth plan via email

## Customization

You can easily customize:
- Questions and answer options in the quiz component
- Archetype descriptions and tips
- AI prompt for generating growth plans
- Email templates and content
- Styling and branding























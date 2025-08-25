# Speak Up For Good - Landing Page

A production-ready, responsive landing page for "Speak Up For Good" speaking coaching services, built with Next.js, React, and Tailwind CSS.

## Features

- **Modern, Responsive Design**: Mobile-first approach with beautiful typography and minimal styling
- **Smooth Scrolling Navigation**: Sticky header with seamless section navigation
- **Optimized Performance**: Built with Next.js 14 and optimized images
- **Accessible Components**: Semantic HTML and keyboard navigation support
- **Brand-Aligned Styling**: Custom color palette derived from the logo
- **Integration Ready**: Calendly and Substack embed placeholders

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Typography**: Inter font family
- **Icons**: Lucide React
- **Language**: TypeScript

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Add Your Logo**
   - Replace `/public/logo.jpg` with your actual logo
   - Update dimensions in components if needed

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the site.

## Customization Guide

### 1. Calendly Integration

In `components/Booking.tsx`:
1. Replace `YOUR-USERNAME` with your Calendly username
2. Update the event type name if different from "speak-up-for-good"
3. Remove the placeholder instructions once configured

### 2. Substack Newsletter

In `components/Newsletter.tsx`:
1. Get your Substack embed code from your newsletter settings
2. Replace the placeholder iframe with your actual embed code
3. Customize styling to match your brand

### 3. Contact Information

Update email addresses in:
- `components/Alliances.tsx` (Say Hello link)
- `components/Footer.tsx` (Contact email)

### 4. Brand Colors

The color palette is defined in `tailwind.config.js`:
```javascript
colors: {
  primary: '#0C6173',    // Deep teal
  accent: '#2A8CA3',     // Lighter teal
}
```

### 5. Content Updates

All copy is directly embedded in components. Key files to update:
- `components/Hero.tsx` - Main headline and CTAs
- `components/About.tsx` - Personal story and credentials
- `components/Offers.tsx` - Service pricing and descriptions
- `components/FAQ.tsx` - Questions and answers

### 6. Toggle Campaign Section

To hide the "Pay What You Can" campaign section:
- Comment out `<Campaign />` in `app/page.tsx`
- Remove the "Campaign" navigation link in `components/Navigation.tsx`

## Section Overview

1. **Hero** - Logo, headline, subheadline, and primary CTAs
2. **Social Proof** - Testimonial placeholders
3. **About** - Personal story and credentials
4. **Offers** - Three pricing tiers with detailed features
5. **Alliances** - Community connections and referral partnerships
6. **Campaign** - Limited-time "Pay What You Can" offer
7. **Booking** - Calendly integration for session booking
8. **Newsletter** - Substack integration for email signup
9. **FAQ** - Expandable questions and answers
10. **Footer** - Contact info and quick links

## Deployment

### Vercel (Recommended)
1. Push code to GitHub/GitLab
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
```bash
npm run build
npm start
```

## SEO & Performance

- Optimized metadata in `app/layout.tsx`
- Next.js Image optimization for logos
- Semantic HTML structure
- Mobile-first responsive design
- Clean, minimal CSS for fast loading

## Browser Support

- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile Safari, Chrome Mobile
- IE11+ (with polyfills)

## Contributing

This is a custom landing page. For updates:
1. Test changes locally
2. Update relevant documentation
3. Deploy to staging before production

## License

Private project - All rights reserved. 
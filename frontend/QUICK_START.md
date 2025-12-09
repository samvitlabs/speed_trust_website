# Quick Start Guide - SPEED Trust Website

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_CONTACT_EMAIL=contact@speedtrust.org.in
NEXT_PUBLIC_CONTACT_PHONE=9xxxxxxxxx
```

### 3. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 4. Build for Production
```bash
npm run build
npm start
```

## 📁 Project Structure

```
frontend/
├── pages/              # Next.js pages (routing)
│   ├── _app.js        # App wrapper with layout & fonts
│   ├── index.js       # Homepage
│   ├── about.js       # About page
│   ├── our-work.js    # Our Work page
│   ├── services.js    # Services page
│   ├── get-involved.js # Get Involved page
│   ├── contact.js     # Contact page
│   └── api/           # API routes
│       └── contact.js # Contact form API
├── components/        # Reusable components
│   ├── Header.js      # Navigation header
│   ├── Footer.js      # Site footer
│   ├── SEO.js         # SEO meta tags
│   └── ErrorBoundary.js # Error handling
├── hooks/             # Custom React hooks
│   └── useReveal.js   # Scroll reveal animations
├── styles/            # Global styles
│   └── globals.css    # CSS variables & animations
├── public/            # Static assets
│   └── images/        # Image files
├── next.config.js     # Next.js configuration
├── tailwind.config.js # Tailwind CSS config
└── .gitignore         # Git ignore rules
```

## 🎨 Adding New Pages

### 1. Create Page File
```javascript
// pages/new-page.js
import SEO from '../components/SEO';
import useReveal from '../hooks/useReveal';

export default function NewPage() {
  useReveal();

  return (
    <>
      <SEO
        title="Page Title - SPEED Trust"
        description="Page description for SEO"
        canonical="/new-page"
      />
      <main className="bg-[var(--color-brand-cream)] text-[var(--color-brand-slate)]">
        {/* Your content here */}
      </main>
    </>
  );
}
```

### 2. Add to Navigation
Edit `components/Header.js`:
```javascript
const navLinks = [
  // ... existing links
  { label: 'New Page', href: '/new-page' },
];
```

## 🖼️ Adding Images

### Best Practices
1. **Use Next.js Image Component**
```javascript
import Image from 'next/image';

<Image
  src="/images/your-image.png"
  alt="Descriptive alt text"
  width={800}
  height={600}
  quality={85}
/>
```

2. **For Background Images with Fill**
```javascript
<div className="relative h-64 w-full">
  <Image
    src="/images/hero.png"
    alt="Hero image"
    fill
    style={{ objectFit: 'cover' }}
    sizes="100vw"
    priority={true} // Only for above-fold images
  />
</div>
```

3. **Optimize Before Adding**
- Convert to WebP/AVIF format
- Keep file size under 200KB
- Use appropriate dimensions

## 🎨 Color System

Use CSS variables for consistency:

```javascript
// Primary colors
--color-brand-green: #1c4a2b
--color-brand-coral: #b9683c
--color-brand-cream: #f5f1e5

// Or use Tailwind classes
className="bg-brand-green text-brand-cream"
```

## ✨ Animations

### Scroll Reveal Animation
Add `data-reveal` attribute to any element:

```javascript
<div data-reveal>
  This will fade in when scrolled into view
</div>
```

## 📝 Forms

Use loading states for better UX:

```javascript
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  try {
    // Your API call
  } finally {
    setIsSubmitting(false);
  }
};

<button disabled={isSubmitting}>
  {isSubmitting ? 'Sending...' : 'Submit'}
</button>
```

## 🔍 SEO Customization

For each page, customize SEO:

```javascript
<SEO
  title="Unique Page Title | SPEED Trust"
  description="Unique description (150-160 characters)"
  keywords="keyword1, keyword2, keyword3"
  canonical="/page-url"
  ogImage="/images/page-specific-og-image.jpg" // Optional
/>
```

## 🐛 Debugging

### Check Build Errors
```bash
npm run build
```

### Analyze Bundle Size
```bash
npm run build
# Check .next/analyze/ folder
```

### View Production Build Locally
```bash
npm run build
npm start
```

## 📊 Performance Testing

### Lighthouse Audit
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit for "Performance", "Accessibility", "SEO"
4. Aim for scores > 90

### Web Vitals
Check browser console for Web Vitals logs (production only)

## 🔒 Security

### Never Commit
- `.env.local` file
- API keys
- Sensitive credentials

### Use Environment Variables
```javascript
// ✅ Good
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

// ❌ Bad
const email = "actual-email@domain.com";
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms
1. Build: `npm run build`
2. Start: `npm start`
3. Ensure Node.js 18+ is available

## 📱 Testing

### Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Mobile Testing
- iOS Safari
- Android Chrome
- Use Chrome DevTools device emulation

## 🆘 Common Issues

### Images Not Loading
- Check file path: `/images/filename.png`
- Verify file exists in `public/images/`
- Clear `.next` cache: `rm -rf .next`

### Styles Not Updating
```bash
# Clear cache and rebuild
rm -rf .next
npm run dev
```

### Build Fails
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📚 Useful Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start            # Start production server

# Linting
npm run lint         # Run ESLint

# Clean
rm -rf .next         # Remove build cache
```

## 🔗 Important Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [Web Vitals](https://web.dev/vitals/)

## 💡 Tips

1. **Always use `next/image`** for images
2. **Add SEO to every page**
3. **Use `data-reveal` for animations**
4. **Keep components small and focused**
5. **Test on mobile devices regularly**
6. **Run Lighthouse before deployment**
7. **Commit often with clear messages**

---

**Need Help?** Check [OPTIMIZATIONS.md](OPTIMIZATIONS.md) for detailed documentation.

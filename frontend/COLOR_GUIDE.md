# Color System Guide - SPEED Trust Website

## 🎨 Current State: ✅ FULLY MODULARIZED!

Your color scheme is now **100% modularized** using CSS Custom Properties (CSS Variables).

**Change colors in ONE place** - [styles/globals.css](styles/globals.css) - and they automatically update everywhere!

---

## ✅ **SINGLE SOURCE OF TRUTH (Recommended)**

### **Primary Color Definition Location**

**File:** [styles/globals.css](styles/globals.css) (Lines 5-25)

This is your **MAIN** color control center. Change colors here:

```css
:root {
  /* Base Colors - EDIT THESE */
  --color-brand-forest: #0d2517;    /* Darkest green */
  --color-brand-canopy: #1c4a2b;    /* Primary green */
  --color-brand-moss: #3a7a4c;      /* Medium green */
  --color-brand-earth: #b0713c;     /* Brown */
  --color-brand-clay: #b9683c;      /* Coral/Orange */
  --color-brand-river: #598f7c;     /* Teal */
  --color-brand-sand: #f5f1e5;      /* Cream/Beige */
  --color-brand-mist: #e1eadf;      /* Light green */
  --color-brand-gold: #c7a253;      /* Gold */
  --color-brand-slate: #0c1c14;     /* Dark text */
  --color-brand-muted: #425248;     /* Muted text */

  /* Aliases - These reference base colors above */
  --color-brand-green: var(--color-brand-canopy);
  --color-brand-coral: var(--color-brand-clay);
  --color-brand-teal: var(--color-brand-river);
  --color-brand-cream: var(--color-brand-sand);

  /* Surface Colors */
  --color-surface: #ffffff;
  --color-shadow-soft: rgba(8, 23, 14, 0.18);
  --color-surface-warm: #fbfaf6;
  --color-surface-border: #dcd4c6;
}
```

---

## ✅ **AUTO-SYNCED LOCATION (No Manual Updates Needed)**

**File:** [tailwind.config.js](tailwind.config.js) (Lines 10-27)

**Purpose:** For Tailwind utility classes like `bg-brand-green`, `text-brand-coral`

```javascript
colors: {
  // All colors reference CSS variables - they auto-sync!
  'brand-forest': 'var(--color-brand-forest)',
  'brand-canopy': 'var(--color-brand-canopy)',
  'brand-moss': 'var(--color-brand-moss)',
  'brand-earth': 'var(--color-brand-earth)',
  'brand-clay': 'var(--color-brand-clay)',
  'brand-river': 'var(--color-brand-river)',
  'brand-sand': 'var(--color-brand-sand)',
  'brand-mist': 'var(--color-brand-mist)',
  'brand-green': 'var(--color-brand-green)',
  'brand-gold': 'var(--color-brand-gold)',
  'brand-coral': 'var(--color-brand-coral)',
  'brand-teal': 'var(--color-brand-teal)',
  'brand-cream': 'var(--color-brand-cream)',
  'brand-slate': 'var(--color-brand-slate)',
  'brand-muted': 'var(--color-brand-muted)',
}
```

**✅ Benefit:** These automatically sync with `globals.css` - no manual updates needed!

---

## 🔄 **HOW TO CHANGE COLORS (1-Step Process!)**

### **Example: Change Primary Green Color**

#### **✅ ONLY Step: Update globals.css**
```css
/* File: styles/globals.css */
:root {
  --color-brand-canopy: #2d7a3e;  /* Changed from #1c4a2b */
}
```

**That's it!** Tailwind automatically uses the CSS variable. No need to update `tailwind.config.js` anymore! 🎉

---

## 📊 **COLOR USAGE BREAKDOWN**

### **Where Colors Are Used:**

| Location | Usage Method | Examples |
|----------|-------------|----------|
| **Pages (7 files)** | CSS Variables | `var(--color-brand-green)` |
| **Components (4 files)** | CSS Variables | `var(--color-brand-coral)` |
| **globals.css** | Direct | Color definitions |
| **Tailwind Classes** | Utility classes | `bg-brand-green` |

**Total References:** ~55 color usages across the codebase

---

## 🎨 **COMPLETE COLOR PALETTE** (NEW: Warm & Compassionate Theme)

### **Primary Brand Colors**

| Variable | Hex | Usage | Where |
|----------|-----|-------|-------|
| `--color-brand-green` | `#8B2635` 🔴 | Primary maroon/burgundy | Header, buttons, links |
| `--color-brand-coral` | `#FF6B35` 🟠 | Warm orange accent | Call-to-action buttons |
| `--color-brand-cream` | `#FFF8F0` 🟡 | Soft cream background | Page backgrounds |
| `--color-brand-slate` | `#2d1215` 🔴 | Dark maroon text | Body text, headings |
| `--color-brand-gold` | `#d4a373` 🟡 | Warm gold | Active nav items |

### **Extended Palette**

| Variable | Hex | Purpose |
|----------|-----|---------|
| `--color-brand-forest` | `#6b1e2a` 🔴 | Dark maroon variant |
| `--color-brand-moss` | `#a83d4d` 🔴 | Medium maroon |
| `--color-brand-earth` | `#e67e50` 🟠 | Soft orange |
| `--color-brand-river` | `#ff8f6b` 🟠 | Light coral |
| `--color-brand-mist` | `#FAF7F2` 🟡 | Warm beige |
| `--color-brand-muted` | `#6b4c4f` 🔴 | Muted maroon text |

### **Surface Colors**

| Variable | Hex | Purpose |
|----------|-----|---------|
| `--color-surface` | `#ffffff` | White surface |
| `--color-surface-warm` | `#fffbf7` 🟡 | Very soft cream |
| `--color-surface-border` | `#f0e5dd` 🟡 | Warm borders |
| `--color-shadow-soft` | `rgba(139,38,53,0.15)` 🔴 | Warm maroon shadows |

---

## 🚀 **QUICK COLOR CHANGE EXAMPLES**

### **Change Primary Brand Color (Green → Blue)**

```css
/* globals.css */
:root {
  --color-brand-canopy: #1e3a8a;  /* Blue */
  --color-brand-green: var(--color-brand-canopy);
}
```

```javascript
// tailwind.config.js
colors: {
  'brand-canopy': '#1e3a8a',
  'brand-green': '#1e3a8a',
}
```

### **Change Background Color (Cream → White)**

```css
/* globals.css */
:root {
  --color-brand-sand: #ffffff;  /* White */
  --color-brand-cream: var(--color-brand-sand);
}
```

```javascript
// tailwind.config.js
colors: {
  'brand-sand': '#ffffff',
  'brand-cream': '#ffffff',
}
```

### **Change Accent Color (Coral → Purple)**

```css
/* globals.css */
:root {
  --color-brand-clay: #7c3aed;  /* Purple */
  --color-brand-coral: var(--color-brand-clay);
}
```

```javascript
// tailwind.config.js
colors: {
  'brand-clay': '#7c3aed',
  'brand-coral': '#7c3aed',
}
```

---

## ✅ **ALREADY IMPLEMENTED: Single Source of Truth**

Your Tailwind config now references CSS variables directly!

```javascript
// tailwind.config.js - ALREADY CONFIGURED ✅
module.exports = {
  theme: {
    extend: {
      colors: {
        'brand-green': 'var(--color-brand-green)',
        'brand-coral': 'var(--color-brand-coral)',
        'brand-cream': 'var(--color-brand-cream)',
        // ... all colors reference CSS variables
      },
    },
  },
};
```

**✅ Active Benefit:** Change colors ONLY in `globals.css` - Tailwind automatically uses them!

---

## 📝 **TESTING COLOR CHANGES**

After changing colors:

1. **Clear cache:**
   ```bash
   rm -rf .next
   ```

2. **Restart dev server:**
   ```bash
   npm run dev
   ```

3. **Test all pages:**
   - Homepage (/)
   - About (/about)
   - Our Work (/our-work)
   - Services (/services)
   - Get Involved (/get-involved)
   - Contact (/contact)

4. **Check consistency:**
   - Header navigation
   - Buttons and CTAs
   - Text colors
   - Backgrounds
   - Hover states

---

## 🎨 **COLOR ACCESSIBILITY**

When changing colors, ensure:

- **Contrast ratio ≥ 4.5:1** for text (WCAG AA)
- **Contrast ratio ≥ 3:1** for large text
- Test with [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## 🔍 **WHERE COLORS ARE USED**

### **Files Using CSS Variables (55+ references):**

1. [pages/index.js](pages/index.js) - 13 references
2. [pages/about.js](pages/about.js) - 14 references
3. [pages/our-work.js](pages/our-work.js) - 10 references
4. [pages/services.js](pages/services.js) - 4 references
5. [pages/get-involved.js](pages/get-involved.js) - 5 references
6. [pages/contact.js](pages/contact.js) - 7 references
7. [pages/_app.js](pages/_app.js) - 2 references

### **Files Using Direct Colors:**
- [styles/globals.css](styles/globals.css) - Color definitions
- [tailwind.config.js](tailwind.config.js) - Tailwind utilities

---

## ✅ **SUMMARY**

| Question | Answer |
|----------|--------|
| **Is color scheme modularized?** | ✅ Yes, using CSS Variables |
| **Single source of truth?** | ✅ Yes - ONLY globals.css |
| **Easy to change?** | ✅ Yes - change ONE file only! |
| **Consistent across site?** | ✅ Yes, all pages auto-sync |
| **Can I change in one place?** | ✅ YES - edit globals.css only! |

### **Status:**
✅ **FULLY IMPLEMENTED!** Tailwind now references CSS variables directly. You have a **true single source of truth** in `globals.css` only!

---

**Last Updated:** December 9, 2025
**Color System:** CSS Variables + Tailwind
**Total Colors:** 13 brand colors + 4 surface colors
**Theme:** Warm & Compassionate (Maroon + Orange)
**Inspiration:** vamatrust.org

---

## 📄 **Related Documentation**

- **[COLOR_TRANSFORMATION.md](COLOR_TRANSFORMATION.md)** - Complete transformation details
- **[OPTIMIZATIONS.md](OPTIMIZATIONS.md)** - Performance & optimization guide
- **[QUICK_START.md](QUICK_START.md)** - Developer quick reference

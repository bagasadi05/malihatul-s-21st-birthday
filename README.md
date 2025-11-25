# 🎉 Happy 21st Birthday Malihatul Quswa!

A beautiful, interactive birthday website celebrating Malihatul Quswa's 21st birthday with stunning animations, photo gallery, and special features.

![Birthday Preview](https://img.shields.io/badge/Birthday-21st%20Special-ff69b4?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite)

## ✨ Features

### 🎂 Interactive Birthday Cake
- Blow out the candles by clicking them
- Beautiful fireworks and confetti celebration
- Animated cake with realistic design

### 📸 Enhanced Photo Gallery
- **Swipe Navigation** - Swipe left/right on mobile
- **Keyboard Controls** - ESC to close, Arrow keys to navigate
- **Download Photos** - Save memories with one click
- **Share Functionality** - Share via Web Share API
- **Lazy Loading** - Optimized image loading
- **Accessibility** - Full keyboard navigation and ARIA labels

### 🎨 Beautiful Animations
- Framer Motion powered smooth animations
- Floating hearts background
- Confetti burst effects
- Fireworks display
- Smooth page transitions

### 🎵 Background Music
- Optional background music player
- Elegant music controls
- Auto-play with user consent

### 📝 Special Features
- **Timeline** - Journey through memorable moments
- **Poetic Messages** - Heartfelt birthday wishes
- **Wish Generator** - AI-powered birthday wishes (Gemini API)
- **Easter Egg** - Hidden surprise (click sparkle 7 times!)
- **Loading Screen** - Beautiful intro animation
- **PWA Support** - Installable as mobile app

### 🔍 SEO & Social Media
- Open Graph meta tags for beautiful social sharing
- Custom favicon
- Twitter card support
- Mobile-optimized

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/malihatul-21st-birthday.git
   cd malihatul-21st-birthday
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add your Gemini API key:
     ```
     GEMINI_API_KEY=your_api_key_here
     ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Keyboard Shortcuts

- **ESC** - Close photo viewer or modals
- **←** - Previous photo (in lightbox)
- **→** - Next photo (in lightbox)
- **Enter** - Open photo (when focused)

## 📱 Mobile Features

- Touch-optimized interactions
- Swipe gestures for photo navigation
- Responsive design for all screen sizes
- PWA installable to home screen

## 🛠️ Tech Stack

- **React 19.2.0** - UI framework
- **TypeScript 5.8.2** - Type safety
- **Vite 6.2.0** - Build tool & dev server
- **Framer Motion 12.23.24** - Animations
- **Tailwind CSS 4.1.17** - Styling
- **Lucide React** - Beautiful icons
- **Google Gemini AI** - AI-powered wishes

## 📦 Project Structure

```
├── components/
│   ├── BackgroundMusic.tsx    # Music player
│   ├── BirthdayCake.tsx       # Interactive cake
│   ├── Confetti.tsx           # Confetti effect
│   ├── EasterEgg.tsx          # Hidden surprise
│   ├── Fireworks.tsx          # Fireworks display
│   ├── FloatingHearts.tsx     # Floating hearts
│   ├── LoadingScreen.tsx      # Initial loading
│   ├── PhotoGallery.tsx       # Enhanced gallery
│   ├── PoeticMessage.tsx      # Birthday message
│   ├── Timeline.tsx           # Memory timeline
│   └── WishGenerator.tsx      # AI wish generator
├── public/
│   ├── favicon.png            # Site icon
│   ├── manifest.json          # PWA manifest
│   ├── uswaa-photo-*.png      # Gallery photos
│   └── background-music.mp3   # Background music
├── App.tsx                    # Main app component
├── index.html                 # HTML entry
└── index.css                  # Global styles
```

## 🎨 Customization

### Change Colors
Edit `index.html` Tailwind config:
```javascript
colors: {
  'rose-pink': '#FFB7B2',
  'deep-rose': '#FF9E9E',
  'cream': '#FFF0F0',
  'gold': '#FFD700',
}
```

### Add Photos
Replace files in `public/` folder:
- `uswaa-photo-1.png`
- `uswaa-photo-2.png`
- etc.

Update `components/PhotoGallery.tsx`:
```typescript
const MEMORIES: Photo[] = [
  { id: 1, src: '/your-photo.png', caption: 'Your Caption', rotate: 'rotate-2' },
  // add more...
];
```

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
vercel deploy
```

### Deploy to Netlify
```bash
netlify deploy --prod
```

## 🎁 Easter Egg

Click the sparkle (✨) icon at the top center **7 times** to discover a hidden message!

## 📄 License

This project is created for personal celebration purposes.

## 💝 Credits

Created with ❤️ for Malihatul Quswa's 21st Birthday

---

**Happy Birthday, Uswaa! 🎂✨**

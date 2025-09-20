# 🌙 Bedtime Storyteller ✨

A magical React webapp that creates personalized bedtime stories for children with interactive features, narration, and beautiful illustrations.

## Features

### ✨ Core Features
- **Personalization**: Input child's name, age, and favorites (animal, color, place)
- **Theme Selection**: Choose from Fairy Tale, Adventure, Animals, Space, or Pirates
- **Story Length**: Adjustable from 5-30 minutes
- **Tone Control**: Calm or Normal narration speed
- **Multiple Modes**: Standard, Continuity, Family, Dream
- **Multi-language Support**: English, Hindi, Spanish, French, German narration

### 🎛️ Advanced Controls
- **Illustrations**: Toggle AI-generated illustrations (Stable Horde API)
- **Sound Effects**: Enable/disable ambient sounds
- **Parental Preview**: Edit story text before narration
- **Interactive Storytelling**: Add choice points for engaging stories

### 🎵 Narration & Audio
- **Web Speech API**: Free browser-based text-to-speech
- **Voice Controls**: Play, Pause, Stop, Replay
- **Progress Tracking**: Visual progress bar
- **Dream Stars**: Reward system (1 star per completed story)

### 🌙 Night Sky Experience
- **Dark Theme**: Kid-friendly dark UI with stars
- **Animated Background**: Twinkling stars with CSS animations
- **Calming Effects**: Smooth transitions and glowing highlights
- **Goodnight Ritual**: End-of-story calming activities

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bedtime-storyteller
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to Vercel, Netlify, or any static hosting service.

## Usage

1. **Personalize**: Enter your child's name, age, and favorites
2. **Configure**: Choose theme, length, tone, and other settings
3. **Generate**: Click "Generate New Story" to create a personalized tale
4. **Interact**: Add choice points to make the story interactive
5. **Listen**: Use narration controls to play the story with voice
6. **Complete**: Earn Dream Stars and enjoy the goodnight ritual

## Technical Details

### Technologies Used
- **React 18** with functional components and hooks
- **Vite** for fast development and building
- **TailwindCSS** for styling with custom animations
- **Web Speech API** for text-to-speech narration
- **Stable Horde API** for AI-generated illustrations
- **localStorage** for data persistence

### API Integration

#### Stable Horde API (Illustrations)
The app includes placeholder integration for Stable Horde API:

```javascript
// Example API call
const response = await fetch('https://stablehorde.net/api/v2/generate/async', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': 'your-api-key-here'
  },
  body: JSON.stringify({
    prompt: "A soft, kid-friendly cartoon illustration...",
    params: {
      width: 512,
      height: 512,
      steps: 20,
      cfg_scale: 7
    }
  })
})
```

To enable illustrations:
1. Get a free API key from [Stable Horde](https://stablehorde.net/)
2. Replace `'your-api-key-here'` in `src/components/StoryGenerator.js`
3. Enable illustrations in the app settings

### Customization

#### Adding New Themes
Edit `src/components/StoryGenerator.js` to add new story themes:

```javascript
const themes = {
  'your-theme': {
    setting: 'your setting',
    characters: ['character1', 'character2'],
    elements: ['element1', 'element2'],
    beginnings: ['Beginning 1', 'Beginning 2'],
    endings: ['Ending 1', 'Ending 2']
  }
}
```

#### Styling
The app uses TailwindCSS with custom components defined in `src/index.css`. Key classes:
- `.star` - Animated twinkling stars
- `.card-glow` - Glowing card containers
- `.button-primary` - Primary action buttons
- `.button-secondary` - Secondary buttons
- `.input-field` - Form input styling

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure redirects for SPA routing

### Other Platforms
The app builds to static files and can be deployed to any static hosting service.

## Browser Support

- **Chrome/Edge**: Full support including Web Speech API
- **Firefox**: Full support including Web Speech API
- **Safari**: Full support including Web Speech API
- **Mobile**: Responsive design works on all devices

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
1. Check the browser console for errors
2. Ensure all dependencies are installed
3. Verify Web Speech API is supported in your browser
4. Create an issue in the repository

---

**Made with ❤️ for bedtime stories and sweet dreams** 🌙✨
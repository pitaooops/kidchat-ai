# KidChat AI - Interactive Child-Friendly Chat Application

A playful, child-friendly AI chat application designed for kids aged 6-12 with parent controls.

## 🌟 Features

- **Child-Friendly Chat**: Interactive AI conversations with playful design
- **Voice Controls**: Speech-to-text input and text-to-speech output
- **Creative Studio**: Story and painting creation tools
- **Learning Quests**: Educational adventure games
- **Mini Games**: Fun learning activities
- **Parent Dashboard**: Controls and monitoring

## 🚀 Live Demo

[View Live Demo](https://your-netlify-url.netlify.app) *(Update after deployment)*

## 🛠 Tech Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS with custom kid-friendly theme
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Baloo 2, Fredoka, Nunito)
- **Voice**: Web Speech API

## 📱 Design Features

- **Child-Friendly UI**: Bright colors, playful fonts, rounded corners
- **Touch-Optimized**: Large buttons for tablet use
- **Responsive**: Works on tablets and desktops
- **Accessibility**: Voice controls and clear visual hierarchy

## 🔧 Local Development

### Prerequisites
- Node.js 18+
- npm 9+

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd kid-chat-app/frontend

# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - One-way operation to customize build tools

## 🚀 Deployment

### Deploy to Netlify (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Build settings are automatically detected from `netlify.toml`
   - Deploy!

### Deploy to Vercel (Alternative)

1. **Push to GitHub** (same as above)
2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Deploy automatically

### Manual Build

```bash
npm run build
```

The `build` folder contains the production-ready files.

## 🎨 Customization

### Colors
The app uses a custom kid-friendly color palette defined in `tailwind.config.js`:
- `kid-blue`, `kid-pink`, `kid-green`, `kid-yellow`, etc.

### Fonts
- **Primary**: Baloo 2 (playful, rounded)
- **Secondary**: Fredoka (fun, geometric)
- **Accent**: Nunito (clean, friendly)

### Components
- `EnhancedChat` - Main chat interface with voice controls
- `Creatives` - Story and painting creation
- `Quests` - Educational adventure games
- `Games` - Mini learning games
- `MainApp` - Main application shell

## 🐛 Known Issues

- Voice recognition requires HTTPS in production
- Some features are demo/mock implementations
- Optimized for tablet landscape orientation

## 📝 License

This project is for demonstration purposes.

## 🤝 Contributing

This is a demo project. For questions or suggestions, please create an issue.

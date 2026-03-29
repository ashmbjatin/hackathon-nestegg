# NestEgg: The Gamified Financial Sanctuary

**NestEgg** is a modern, gamified retirement planning and money-saving platform meant to make wealth-building approachable for Gen Z. Inspired by habit-forming UI patterns like Duolingo, the app focuses on turning personal finance from a chore into a rewarding daily interaction.

## Key Features
- **NestScore System**: Gamified points are awarded for every rupee saved, boosting you up the ranks!
- **Quick Save Actions**: Tap-and-save features (₹50, ₹100, ₹500) integrated with instant, satisfying feedback (like full-screen confetti).
- **Competitve Leaderboards**: Track your rank on the Gold, Silver, and Bronze tiers against friends or globally.
- **Educational Investing**: Clean, jargon-free explanations of Mutual Funds, Fixed Deposits, and Daily SIPs to educate young investors.
- **Interactive Avatar System**: A smooth settings modal with an interactive Dicebear avatar generator—just tap your face to shuffle!

## Try it Locally
The app was engineered as a lightweight front-end prototype structure and doesn't require complex bundlers to run. 

1. **Clone the repository**
   ```bash
   git clone https://github.com/ashmbjatin/hackathon-nestegg.git
   cd hackathon-nestegg
   ```
2. **Launch locally**
   Use any simple static server, or simply open `index.html` in your browser.
   ```bash
   python -m http.server 8080
   ```
3. **Open the App**
   Navigate to `http://localhost:8080/`

## Design & UX Architecture
- **Vanilla CSS System**: Built from the ground up using a strict set of CSS variables to simulate "chunky", highly-clickable 3D components without using bloated UI frameworks.
- **Overlay Engine**: Clean overlay architectures manage the Loading Splash, the unified Login/Signup gateway, and the Profile Settings view.  

## Built With
- **HTML5** & **Vanilla CSS3**
- **Vanilla JavaScript** (State manipulation) 
- **[DiceBear API](https://www.dicebear.com/)** (Dynamic Avatars)
- **Google Fonts** (Nunito)

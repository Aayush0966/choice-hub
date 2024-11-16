# Choice Hub 🎯
[![Next.js](https://img.shields.io/badge/Next.js-15.0.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0--rc-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Latest-orange?style=flat-square&logo=firebase)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

Real-time polling made simple. Choice Hub is a modern, lightning-fast polling application that lets you create, share, and participate in polls instantly - no sign-up required. Built with Next.js 15 and Firebase, it delivers real-time results with a sleek, responsive interface.

![Choice Hub Demo](demo-placeholder.gif)

## ⚡️ Live Demo
Experience it live: [Choice Hub Demo](https://choice-hub.vercel.app)

## 🎯 Key Features

### Instant Polling 📊
- Create custom polls in seconds
- Add unlimited options
- Set flexible durations (1 hour to 1 week)
- Real-time vote updates

### Seamless Sharing 🔗
- One-click URL copying
- Native web share integration
- Instant access for participants

### Live Analytics 📈
- Real-time vote counting
- Dynamic progress visualization
- Leading option highlights
- Total participation tracking

### Privacy First 🛡️
- No account required
- Anonymous voting
- Local storage and firebase tracking
- Duplicate vote prevention

## 🛠️ Tech Stack

### Frontend Powerhouse
- **[Next.js 15.0.3](https://nextjs.org/)** - React framework with App Router
- **[React 19.0.0-rc](https://reactjs.org/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling
- **[shadcn/ui](https://ui.shadcn.com/)** - UI components
- **[Lucide React](https://lucide.dev/)** - Icons

### Backend & Database
- **[Firebase](https://firebase.google.com/)**
  - Firestore for real-time data
  - Admin SDK for server operations
- **Next.js API Routes** - Server endpoints

### State & Performance
- React Context
- Local Storage
- Real-time Firestore listeners

## 🚀 Quick Start

### Prerequisites
```bash
node >= 18.0.0
npm >= 8.0.0
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/Aayush0966/choice-hub.git
cd choice-hub
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
# Add your Firebase configuration
```

4. Start development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
choice-hub/
├── app/                   # Next.js app directory
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── [...routes]/      # Dynamic routes
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   └── features/        # Feature-specific components
├── lib/                 # Utilities and helpers
├── styles/              # Global styles
└── types/               # TypeScript definitions
```

## 🔧 Configuration

Key configuration files:
- `.env.local` - Environment variables
- `tailwind.config.js` - Tailwind CSS configuration
- `firebase.config.ts` - Firebase setup
- `tsconfig.json` - TypeScript configuration

## 🤝 Contributing

We love contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch:
```bash
git checkout -b feature/AmazingFeature
```
3. Commit your changes:
```bash
git commit -m 'Add some AmazingFeature'
```
4. Push to the branch:
```bash
git push origin feature/AmazingFeature
```
5. Open a Pull Request


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙌 Acknowledgements

- [Next.js](https://nextjs.org/) for the amazing framework
- [Firebase](https://firebase.google.com/) for real-time capabilities
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Vercel](https://vercel.com/) for hosting

## 🔗 Connect With Me

<div align="center">

[![Portfolio](https://img.shields.io/badge/Portfolio-255E63?style=for-the-badge&logo=About.me&logoColor=white)](https://aayushbudhathoki.com.np)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Aayush0966)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/aayush-budhathoki-102954332/)

</div>

---

<div align="center">
  <p>If you find Choice Hub helpful, please consider giving it a star! ⭐️</p>
 
</div>

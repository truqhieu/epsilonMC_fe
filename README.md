# Epsilon Medical Center - Frontend

A modern React-based frontend application for Epsilon Medical Center, built with Vite for fast development and optimized builds.

## 🚀 Tech Stack

- **React** - UI library for building user interfaces
- **Vite** - Build tool and development server
- **Redux** - State management
- **ESLint** - Code linting and formatting

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── BookingButton/   # Appointment booking functionality
│   ├── BookingPage/     # Booking form and interface
│   ├── Community/       # Community features
│   ├── Header/          # Site header component
│   ├── Navbar/          # Navigation component
│   ├── Footer/          # Site footer
│   └── ...
├── pages/              # Page components
├── layout/             # Layout components
├── services/           # API services and data fetching
├── reduxs/             # Redux store, actions, and reducers
├── routers/            # Application routing
├── utils/              # Utility functions
├── styles/             # Global styles and themes
├── libs/               # Third-party library configurations
└── assets/             # Static assets (images, icons)
```

## 🏥 Features

- **Patient Booking System** - Schedule appointments with doctors
- **Doctor Consultation** - Connect with medical professionals
- **Community Platform** - Patient community features
- **Responsive Design** - Mobile-friendly interface
- **User Authentication** - Secure login system

## 🛠️ Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd epsilonMC_fe
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

## 🚀 Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🧹 Code Quality

Run ESLint:
```bash
npm run lint
```

Fix ESLint issues automatically:
```bash
npm run lint:fix
```

## 📱 Key Components

- **BookingButton** - Quick appointment booking
- **BookingPage** - Comprehensive booking interface
- **Community** - Patient interaction platform
- **LoginModel** - User authentication modal
- **CustomModal** - Reusable modal component
- **MessWithDoctorButton** - Doctor communication feature

## 🔧 Configuration

- **Vite Config**: [vite.config.js](vite.config.js)
- **ESLint Config**: [eslint.config.js](eslint.config.js)
- **Environment Variables**: [.env](.env)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.

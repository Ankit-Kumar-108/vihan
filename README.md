# Vihaan - RGI Fest 🌟

Welcome to the official web application for **Vihaan**, the flagship technical and cultural fest held at Swami Vivekanand Sabhagar, RGI.

This project is built using the **Next.js App Router** and provides a comprehensive platform for event registration, gallery viewing, admin management, and automated communications.

## 🚀 Key Features

* **Dynamic Event Registration**: Participants can easily browse and register for main events and specific sub-events.
* **Automated Email Confirmations**: Integrated with Nodemailer to send customized, branded HTML email confirmations (featuring the Vihaan and RGI logos) upon successful registration.
* **Admin Dashboard**: Secured via NextAuth, allowing administrators to seamlessly manage fest operations, view registrations, and handle data.
* **Gallery & Media Uploads**: Integrated with Cloudinary for robust image hosting, allowing admins to upload winner announcements and showcase fest galleries.
* **Real-time Database**: Powered by Firebase Admin and Firestore to store registrations and event data reliably.
* **Google Integrations**: Uses Google APIs (such as Google Sheets) for auxiliary registration tracking.
* **Modern & Responsive UI**: Designed with Tailwind CSS to provide a visually stunning and responsive experience across all devices, complete with dynamic video backgrounds.

## 🛠️ Tech Stack

* **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Authentication**: [NextAuth.js](https://next-auth.js.org/)
* **Database**: [Firebase](https://firebase.google.com/) (Firestore & Admin SDK)
* **Media Management**: [Cloudinary](https://cloudinary.com/) (`next-cloudinary`)
* **Emailing**: [Nodemailer](https://nodemailer.com/)
* **External APIs**: Google APIs

## 📦 Getting Started

### Prerequisites
Make sure you have Node.js and `npm` installed.

### 1. Clone the repository
```bash
git clone <repository-url>
cd vihan
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` or `.env` file in the root directory and configure the necessary credentials for:
- NextAuth configurations (`NEXTAUTH_URL`, `NEXTAUTH_SECRET`)
- Firebase Admin SDK credentials
- Cloudinary credentials (`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, etc.)
- Nodemailer SMTP credentials
- Google API Service Account keys (for Sheets/Drive if applicable)

### 4. Run the Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📁 Project Structure

* `src/app/`: Contains the Next.js App Router pages (e.g., `events`, `gallery`, `register`, `admin`, `upload`).
* `src/components/`: Reusable React components used throughout the application.
* `src/lib/`: Utility functions, database configurations, and shared logic.
* `src/api/`: Backend API routes for form submissions and integrations.
* `public/`: Static assets such as images, videos, and logos.

## 💡 Contributing

Contributions are welcome! Please ensure you follow the existing code style and test your changes thoroughly.

## 👨‍💻 Developer

Built with passion by **Ankit Kumar**.

* **GitHub**: [@Ankit-Kumar-108](https://github.com/Ankit-Kumar-108)
* **LinkedIn**: [Ankit Kumar](https://www.linkedin.com/in/ankit-kumar-98102b24a/)

---
*Built for Vihaan @ RGI*

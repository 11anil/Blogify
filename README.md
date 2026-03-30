# Blogify - A Modern AI-Powered Blogging Platform

Blogify is a full-stack, state-of-the-art blogging platform designed for creators. It features a seamless writing experience, AI-powered content generation, and a beautiful, theme-aware user interface.

## 🚀 Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS 4 (Vanilla CSS variables for themes)
- **Authentication**: Clerk (clerk-react)
- **Editor**: Quill.js (Rich Text Editor)
- **State Management**: React Context API
- **Routing**: React Router 7

### Backend
- **Server**: Node.js & Express
- **Database**: PostgreSQL (Hosted on Neon)
- **ORM**: Prisma 7
- **Authentication Middleware**: Clerk Express Middleware
- **Image Storage**: Cloudinary
- **AI Integration**: Google Generative AI (Gemini SDK)

### AI Features
- **Model**: `gemini-1.5-flash`
- **Functionality**: Automatically generates rich blog descriptions based on your title and subtitle to boost productivity and SEO.

---

## ✨ Features

- **🌓 Dynamic Dark Mode**: Premium glassmorphism-inspired dark and light themes that persist across sessions.
- **🤖 AI Blog Assistant**: Generate professional descriptions with a single click using Google Gemini.
- **📊 Author Dashboard**: Comprehensive overview of your blogs, drafts, and community comments.
- **🛡️ Community Management**: Built-in system for reviewing and approving comments before they go public.
- **📱 Responsive Design**: Fully optimized for mobile, tablet, and desktop views.
- **🔗 Social Sharing**: Deep integration with Facebook, Twitter (X), and LinkedIn for canonical sharing.

---

## 🛠️ Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd Blogify-FullStack
```

### 2. Environment Configuration
Create a `.env` file in the **server** directory:
```env
DATABASE_URL="your_postgresql_url"
CLERK_SECRET_KEY="your_clerk_secret_key"
CLOUDINARY_URL="your_cloudinary_url"
GEMINI_API_KEY="your_google_gemini_key"
```

Create a `.env` file in the **client** directory:
```env
VITE_BASE_URL="http://localhost:4000"
VITE_CLERK_PUBLISHABLE_KEY="your_clerk_pub_key"
VITE_SITE_URL="http://localhost:5173"
```

### 3. Install Dependencies
```bash
# In client directory
npm install

# In server directory
npm install
```

### 4. Database Setup
```bash
cd server
npx prisma generate
npx prisma db push
```

### 5. Start the Application
```bash
# Terminal 1 (Server)
cd server
npm run server

# Terminal 2 (Client)
cd client
npm run dev
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:
1. **Fork** the repository.
2. Create a new **branch** (`git checkout -b feature/AmazingFeature`).
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`).
4. **Push** to the branch (`git push origin feature/AmazingFeature`).
5. Open a **Pull Request**.

---

## 🔒 Security & Deployment

### .gitignore Recommendations
Make sure to add the following to your `.gitignore` to protect sensitive data:
- `node_modules/`
- `.env`
- `dist/` or `build/`
- `.DS_Store`
- `package-lock.json` (if preferred)

---

## 📄 License
This project is licensed under the ISC License.

Developed with ❤️ by the Blogify Team.

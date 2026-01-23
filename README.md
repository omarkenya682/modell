# Model Land Investment Website

A modern, feature-rich real estate investment platform built with React, TypeScript, and Tailwind CSS. This application includes a public-facing website for showcasing properties and a comprehensive Admin Dashboard for managing content.

## 🚀 Features

### Public Website
*   **Property Portfolio**: Browse plots with details on pricing, location, and payment plans.
*   **AI Chatbot ("Model AI")**: Integrated with Google Gemini API to answer client questions in real-time about plots and services.
*   **Blog**: Read real estate insights and investment tips.
*   **Testimonials**: View success stories and video testimonials from clients.
*   **Contact Form**: Functional inquiry form that saves messages to the database.
*   **Responsive Design**: Fully optimized for mobile, tablet, and desktop.

### Admin Dashboard (CMS)
*   **Property Management**: Add, edit, or delete property listings.
*   **Message Inbox**: View, reply to, and manage contact form inquiries.
*   **Blog Management**: Write and publish blog posts.
*   **Testimonial Management**: Add client reviews and photos.
*   **Site Configuration**: Update logos, hero images, social media links, and contact details instantly.
*   **Data Backup**: Export/Import the entire database (JSON) to save changes permanently.

## 🛠️ Tech Stack
*   **Frontend**: React 19, TypeScript
*   **Styling**: Tailwind CSS
*   **Icons**: Lucide React
*   **AI Integration**: Google GenAI SDK (Gemini 1.5 Flash)
*   **Storage**: Browser LocalStorage (Simulated Backend)

## 📦 Setup & Installation

1.  **Clone or Download**: Download the project files.
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Set API Key**:
    *   Create a `.env` file in the root directory.
    *   Add your Google Gemini API key:
        ```env
        API_KEY=your_google_gemini_api_key_here
        ```
4.  **Run the App**:
    ```bash
    npm start
    ```
    The app will open at `http://localhost:8080`.

## 🔐 Admin Access

To access the Admin Panel:
1.  Scroll to the footer of the website.
2.  Click **Admin Login**.
3.  **Password**: `admin`

## 💾 Data Persistence

This application uses **LocalStorage** to simulate a database. 
*   **Important**: If you clear your browser cache, data will reset to defaults.
*   **Recommendation**: Use the "Export Data" button in the Admin Panel regularly to save a backup JSON file of your content. You can restore it later using "Import".

## 📝 License

This project is proprietary property of Model Land Investment.

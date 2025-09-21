# Manasbridge AI: Your Personal Mental Wellness Companion

An AI-powered, confidential, and empathetic mental wellness solution designed to support and guide youth in overcoming stigma and accessing help.

## 🚀 The Problem

In India, mental health remains a significant societal taboo, creating a formidable barrier for young adults and students seeking support. Amidst intense academic and social pressures, these individuals often lack a confidential, accessible, and non-judgmental outlet to address their mental health concerns. The existing landscape of professional mental healthcare is often out of reach due to high costs, limited availability, and the pervasive social stigma associated with seeking help.

## ✨ Our Solution: Manasbridge AI

Manasbridge AI is a generative AI-powered companion designed to provide a safe, anonymous, and supportive digital environment. We leverage the power of Google's Gemini API to create a culturally sensitive and empathetic chatbot that serves as a first point of contact for youth. Our platform aims to promote emotional well-being, provide accessible information, and help destigmatize mental health discussions.

[**➡️ View the Live Demo Here**](https://mindease-ai-mental-w-4evc.bolt.host/) *(Replace with your actual demo link)*

## 的核心功能 (Core Features)

* **🧠 AI-Powered Chatbot:** Engage in natural, empathetic, and confidential conversations to understand and support user needs.

* **🤝 Peer Community Forum:** A moderated, safe space for users to connect and share experiences anonymously.

* **📚 Curated Resource Hub:** A library of expert-vetted articles, tools, and wellness exercises tailored for youth.

* **🌱 Personalized Wellness Plans:** AI-generated, goal-oriented plans to guide users on their wellness journey.

* **🌐 Multi-lingual Support:** Breaking language barriers to make wellness support universally accessible.

## 🛠️ Technology Stack

| Area          | Technology                                         |
| ------------- | -------------------------------------------------- |
| **Frontend** | `React`, `TypeScript`                              |
| **Backend** | `Node.js`, `Express.js`                            |
| **AI Model** | `Google Gemini API`                                |
| **Deployment**| `Google Cloud Run` / Vercel / Netlify              |

## 🏗️ System Architecture

Manasbridge AI operates on a secure and scalable three-tier architecture:

1.  **Frontend (Client):** A responsive React (TypeScript) application that provides a seamless user experience.

2.  **Backend (Server):** A Node.js proxy server that manages business logic and securely handles API requests to protect sensitive keys.

3.  **Generative AI (Service):** We leverage the power of Google's Gemini API for state-of-the-art natural language processing and empathetic response generation.

## ⚙️ Getting Started (Local Setup)

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v18 or later)

* npm or yarn

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/manasbridge-ai.git](https://github.com/your-username/manasbridge-ai.git)
    cd manasbridge-ai
    ```

2.  **Install Frontend Dependencies:**
    ```sh
    cd client 
    npm install
    ```

3.  **Install Backend Dependencies:**
    ```sh
    cd ../server
    npm install
    ```

4.  **Set up Environment Variables:**
    * Create a `.env` file in the `server` directory.
    * Add your Google Gemini API key:
        ```
        GEMINI_API_KEY='YOUR_API_KEY_HERE'
        ```

### Running the Application

1.  **Start the Backend Server:**
    ```sh
    cd server
    npm start
    ```

2.  **Start the Frontend Development Server:**
    * Open a new terminal.
    ```sh
    cd client
    npm start
    ```

The application should now be running on `http://localhost:3000`.

## 📈 Future Scope

* **Mood Analytics:** Integration of mood tracking and progress dashboards.

* **Institutional Partnerships:** Collaborations with educational institutions and corporate wellness programs.

* **Therapist Connect Portal:** An optional, opt-in feature to connect users with certified mental health professionals.

## 👥 Our Team

This project was built with ❤️ by **Team CyberPulse** for the Gen AI Exchange Hackathon.

## 📄 License

This project is distributed under the MIT License. See `LICENSE` for more information.

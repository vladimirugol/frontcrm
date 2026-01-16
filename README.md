# 🚀 Mini CRM System (Frontend)

The client-side application for a simplified CRM system. This app allows users to register, log in, and manage business deals (view the list and add new ones).

Built with **TypeScript** using a modern scalable stack.

## 🛠 Tech Stack

*   **Core:** [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) 
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Routing:** [React Router DOM](https://reactrouter.com/)

##  Features

The application consists of three main modules:

1.  **Landing Page**
    *   Welcome page describing the service.
    *   Navigation to Login/Register.

2.  **Authentication Module**
    *   **Registration:** Form to create a new user account.
    *   **Login:** User authentication (JWT handling).
    *   Form validation.

3.  **CRM Dashboard (Protected Area)**
    *   **Deals List:** Displaying current deals (Grid or List view).
    *   **Add Deal:** Interface to create a new deal (Title, Budget, Status).
    *   **Route Protection:** Access to the dashboard is restricted to authenticated users only.

Follow these instructions to set up the project locally.

### Prerequisites
*   Node.js (v18 or higher)
*   Running Backend API

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vladimirugol/frontcrm.git
   cd frontcrm
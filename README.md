# Employee Management Dashboard

## Project Overview

A modern, responsive employee management system built with React and TypeScript. This application provides a comprehensive dashboard for managing employee information with full CRUD (Create, Read, Update, Delete) operations. The system includes authentication, employee data management, advanced filtering, search functionality, and print capabilities.

### Key Features

- **Authentication System**: Mock authentication with session persistence using localStorage
- **Employee Management**: Complete CRUD operations for employee records
- **Advanced Filtering**: Search by name, filter by gender and employment status
- **Statistics Dashboard**: Real-time statistics showing total, active, and inactive employees
- **Print Functionality**: Print employee lists with formatted layouts
- **Responsive Design**: Fully responsive UI that works seamlessly on desktop and mobile devices
- **Data Persistence**: Employee data stored in browser localStorage

## Tech Stack

### Core Technologies
- **React 18.3.1** - Modern UI library for building user interfaces
- **TypeScript 5.8.3** - Type-safe JavaScript for better development experience
- **Vite 5.4.19** - Fast build tool and development server with HMR (Hot Module Replacement)

### UI & Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS framework for rapid UI development
- **shadcn/ui** - High-quality React component library built on Radix UI
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** - Beautiful icon library
- **tailwindcss-animate** - Animation utilities for Tailwind

### Routing & State Management
- **React Router DOM 6.30.1** - Client-side routing
- **React Context API** - Global state management for authentication
- **TanStack React Query 5.83.0** - Server state management (configured for future API integration)

### Forms & Validation
- **React Hook Form 7.61.1** - Performant form library with minimal re-renders
- **Zod 3.25.76** - TypeScript-first schema validation
- **@hookform/resolvers** - Validation resolver for React Hook Form

### Additional Libraries
- **date-fns 3.6.0** - Date utility library
- **recharts 2.15.4** - Composable charting library (available for future use)
- **sonner 1.7.4** - Toast notification library

### Development Tools
- **@vitejs/plugin-react-swc** - Fast React refresh using SWC
- **ESLint** - Code linting and quality checks
- **TypeScript ESLint** - TypeScript-specific linting rules
- **PostCSS** - CSS processing
- **Autoprefixer** - Automatic vendor prefixing

## Steps to Run the Project Locally

### Prerequisites

- **Node.js** (v18.0.0 or higher recommended)
- **yarn** (v1.22.0 or higher)
- A modern web browser (Chrome, Firefox, Safari, or Edge)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd employee-management
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Start the development server**
   ```bash
   yarn dev
   ```

4. **Access the application**
   - Open your browser and navigate to `http://localhost:8080`
   - The application will automatically open in your default browser

### Login Credentials

The application uses mock authentication. You can log in with:
- **Email**: Any valid email address (e.g., `admin@company.com`)
- **Password**: Any password with at least 4 characters (e.g., `1234`)

### Building for Production

To create a production build:

```bash
yarn build
```

The optimized build will be created in the `dist` directory.

To preview the production build:

```bash
yarn preview
```

## Assumptions & Design Decisions

### Authentication
- **Mock Authentication**: The application uses a simplified authentication system that accepts any email and password (minimum 4 characters) for demonstration purposes. In a production environment, this would be replaced with proper backend authentication (JWT tokens, OAuth, etc.).
- **Session Persistence**: Authentication state is persisted in `localStorage` to maintain user sessions across browser refreshes. This is a common pattern for SPAs but should be secured with proper token management in production.

### Data Management
- **LocalStorage Persistence**: Employee data is stored in the browser's `localStorage` to persist across sessions. This decision was made for simplicity and to avoid requiring a backend server. In production, this would be replaced with a proper database and API.
- **Initial Mock Data**: The application comes with 5 pre-populated employee records for demonstration purposes. These can be modified or deleted through the UI.

### UI/UX Design
- **Component Library**: shadcn/ui was chosen for its accessibility, customization capabilities, and modern design. All components are built on Radix UI primitives ensuring WCAG compliance.
- **Responsive Design**: The application is fully responsive using Tailwind CSS's mobile-first approach. The layout adapts seamlessly from mobile to desktop screens.
- **Toast Notifications**: User actions are confirmed with toast notifications to provide immediate feedback for all CRUD operations.

### State Management
- **Context API for Auth**: React Context is used for authentication state as it's simple and sufficient for this use case. For larger applications, consider Redux or Zustand.
- **Custom Hooks**: Employee data management is abstracted into a custom `useEmployees` hook, promoting code reusability and separation of concerns.

### Form Validation
- **Zod Schema Validation**: All form inputs are validated using Zod schemas, providing type-safe validation that aligns with TypeScript types.
- **React Hook Form**: Chosen for its performance benefits (minimal re-renders) and excellent developer experience.

### Routing
- **Protected Routes**: The dashboard route is protected and redirects unauthenticated users to the login page.
- **Default Route**: The root path (`/`) automatically redirects to `/login`.

### Performance
- **Code Splitting**: Vite automatically handles code splitting for optimal bundle sizes.
- **SWC Compiler**: Using SWC instead of Babel for faster compilation and hot module replacement.

### Browser Compatibility
- **Modern Browsers**: The application targets modern browsers that support ES6+ features. No polyfills are included by default.

### Future Considerations
- The application is structured to easily integrate with a backend API (React Query is already configured)
- The employee data model can be extended to include additional fields as needed
- Print functionality can be enhanced with more formatting options
- Image upload functionality is prepared but uses placeholder images from Unsplash

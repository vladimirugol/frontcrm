import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Start from './Start';
import RegistrationForm from './components/RegistrationForm'
import './App.css';
import LoginForm from './components/LoginForm';
import Panel from './components/Panel';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Start />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegistrationForm/>
  },
  {
    path: "/app",
    element: <Panel/>
  }
]);

function App() {
  
  return <RouterProvider router={router} />;
  
}

export default App;
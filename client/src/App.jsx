import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/login/login";
import NavBar from "./components/navbar";
import { Home } from "./pages/home/home";
import LeftBar from "./components/leftbar";
import RightBar from "./components/rightbar";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import Profile from "./pages/profile/profile";
import Register from "./pages/register/register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const {currentUser} = useContext(AuthContext);
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div>
        <NavBar />
        <div className="flex max-w-[110rem] justify-center mx-auto">
          <LeftBar />
          <div className="flex-[6]">
            <Outlet />
          </div>
          <RightBar />
        </div>
        </div>
        </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

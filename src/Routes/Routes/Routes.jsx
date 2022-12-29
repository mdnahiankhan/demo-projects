import { createBrowserRouter } from "react-router-dom";
import Home from "../../Home/Home/Home";
import Main from "../../Layout/Main";
import AddTask from "../../Pages/AddTask";
import CompletedTask from "../../Pages/CompletedTask";
import Login from "../../Pages/Login";
import MyTask from "../../Pages/MyTask";
import SignUp from "../../Pages/SignUp";
import UpdateTask from "../../Pages/UpdateTask";
import PrivateRoutes from "../PrivateRoutes";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <PrivateRoutes><AddTask></AddTask></PrivateRoutes>
            },
            {
                path: '/mytask',
                element: <PrivateRoutes><MyTask></MyTask></PrivateRoutes>
            },
            {
                path: '/completedTask',
                element: <PrivateRoutes><CompletedTask></CompletedTask></PrivateRoutes>
            },
            {
                path: '/updateTask/:id',
                element: <UpdateTask></UpdateTask>,
                loader: ({ params }) => fetch(`https://demo-projects-server.vercel.app/task/${params.id}`)
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            }
        ]
    }
])
import { createBrowserRouter } from "react-router-dom";
import Home from "../../Home/Home/Home";
import Main from "../../Layout/Main";
import AddTask from "../../Pages/AddTask";
import CompletedTask from "../../Pages/CompletedTask";
import Login from "../../Pages/Login";
import MyTask from "../../Pages/MyTask";
import SignUp from "../../Pages/SignUp";
import UpdateTask from "../../Pages/UpdateTask";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/addtask',
                element: <AddTask></AddTask>
            },
            {
                path: '/mytask',
                element: <MyTask></MyTask>
            },
            {
                path: '/completedTask',
                element: <CompletedTask></CompletedTask>
            },
            {
                path: '/updateTask/:id',
                element: <UpdateTask></UpdateTask>,
                loader: ({ params }) => fetch(`http://localhost:5000/task/${params.id}`)
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
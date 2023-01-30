import {
    createBrowserRouter,
} from "react-router-dom";
import Chat from "../Pages/Chat";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import SetAvatar from "../Pages/SetAvatar"

const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/",
                element: <Chat />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/setavatar",
                element: <SetAvatar />,
            },
        ],
    },

]);

export default router;
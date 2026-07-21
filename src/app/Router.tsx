import { createBrowserRouter } from "react-router-dom";
import { Typography } from '@mui/material';
const Home = () => {
    return (
        <Typography variant="h4" component="h1" gutterBottom> 
            Home Page
        </Typography>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    }
]);

export default router;
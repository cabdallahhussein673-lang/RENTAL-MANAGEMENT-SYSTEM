import { Navigate } from "react-router-dom";

function Protect({ children }) {

    const user = localStorage.getItem("user");

    if (!user) {

        return <Navigate to="/" />;

    }

    return children;

}

export default Protect;
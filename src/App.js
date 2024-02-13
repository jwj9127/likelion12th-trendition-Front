import "./App.css";
import { Route, Routes } from "react-router-dom";

import Main from "./pages/Main.jsx";
import Navigation from "./component/Navigation.jsx";
import Splash from "./pages/Splash.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignUpNext from "./pages/SignUpNext.jsx";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Splash />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signup/next" element={<SignUpNext />} />
                <Route path="/main" element={<Main />} />
            </Routes>
        </div>
    );
}

export default App;

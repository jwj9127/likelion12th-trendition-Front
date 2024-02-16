import "./App.css";
import { Route, Routes } from "react-router-dom";

import Main from "./pages/Main.jsx";
import Navigation from "./component/Navigation.jsx";
import Splash from "./pages/Splash.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignUpNext from "./pages/SignUpNext.jsx";
import Search from "./pages/Search.jsx";
import Mypage from "./pages/Mypage.jsx";
import Follow from "./pages/Follow.jsx";
import Follower from "./pages/Follower.jsx";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Splash />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signup/next" element={<SignUpNext />} />
                <Route path="/main" element={<Main />} />
                <Route path="/search" element={<Search />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/follow" element={<Follow />} />
                <Route path="/follower" element={<Follower />} />
            </Routes>
        </div>
    );
}

export default App;

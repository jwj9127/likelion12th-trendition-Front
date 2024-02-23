import "./App.css";
import { Route, Routes } from "react-router-dom";

import Main from "./pages/Main.jsx";
import Profile from "./pages/Profile.jsx";
import Splash from "./pages/Splash.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignUpNext from "./pages/SignUpNext.jsx";
import Search from "./pages/Search.jsx";
import Mypage from "./pages/Mypage.jsx";
import Followers from "./pages/Followers.jsx";
import Following from "./pages/Following.jsx";  
import Setting from "./pages/Setting.jsx";
import Notification from "./pages/setting/Notification.jsx";
import Push_Alarm from "./pages/setting/Push_Alarm.jsx";
import Privacy from "./pages/setting/Privacy.jsx";
import Block from "./pages/setting/Block.jsx";
import Change_profile from "./pages/setting/Change_profile.jsx";
import Test from "./pages/test.jsx";
import ProfileFollowing from "./pages/ProfileFollowing.jsx";
import ProfileFollowers from "./pages/ProfileFollowers.jsx";

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
                <Route path="/profile" element={<Profile />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/followers" element={<Followers />} />
                <Route path="/following" element={<Following />} />
                <Route path="/profilefollowing" element={<ProfileFollowing />} />
                <Route path="/profilefollowers" element={<ProfileFollowers />} />
                <Route path="/setting" element={<Setting />} />
                <Route
                    path="/setting/notification"
                    element={<Notification />}
                />
                <Route path="/setting/push" element={<Push_Alarm />} />
                <Route path="/setting/privacy" element={<Privacy />} />
                <Route path="/setting/change" element={<Change_profile />} />
                <Route path="/setting/block" element={<Block />} />
                <Route path="/test" element={<Test />} />

            </Routes>
        </div>
    );
}

export default App;

import { React } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../css/Login.css";
import pwdErrorImage from "../imgs/pwd_error.png";
import axios from "axios";
import "../component/Token";

function Title() {
    return <div className="title-login">로그인</div>;
}

function InputBox({
    username,
    setUsername,
    password,
    setPassword,
    passwordError,
}) {
    return (
        <div className="inputBox-login">
            <label htmlFor="text" className="label-text">
                <div>아이디</div>
                <input
                    type="text"
                    className="input-text"
                    placeholder="아이디를 입력해주세요."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <label htmlFor="password" className="label-pwd">
                <div>비밀번호</div>
                <input
                    type="password"
                    className="input-pwd"
                    placeholder="비밀번호를 입력해주세요."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && (
                    <div className="pwd-message">
                        <img src={pwdErrorImage} alt="error icon" />
                        <span>비밀번호를 다시 확인해주세요.</span>
                    </div>
                )}
            </label>
        </div>
    );
}

function LoginBtn({ username, password, setPasswordError }) {
    const handleLogin = () => {
        axios
            .post("http://127.0.0.1:8000/join/login/", {
                username: username,
                password: password,
            })
            .then((response) => {
                window.location.href = "/main";
            })
            .catch((error) => {
                console.error("로그인 실패:", error);
                setPasswordError(true);
            });
    };
    return (
        <Link className="loginBtn" onClick={handleLogin}>
            로그인
        </Link>
    );
}

function ToSignUp() {
    return (
        <Link to="/signup" className="toSignUp">
            회원가입하기
        </Link>
    );
}

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    return (
        <div className="LoginBox">
            <Title></Title>
            <InputBox
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                passwordError={passwordError}
            ></InputBox>
            <LoginBtn
                username={username}
                password={password}
                setPasswordError={setPasswordError}
            ></LoginBtn>
            <ToSignUp></ToSignUp>
        </div>
    );
}

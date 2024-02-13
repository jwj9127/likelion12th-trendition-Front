import { React } from "react";
import { Link } from "react-router-dom";
import "../css/Login.css";
import pwdErrorImage from "../imgs/pwd_error.png";

function Title() {
    return <div className="title-login">로그인</div>;
}

function InputBox() {
    return (
        <div className="inputBox-login">
            <label htmlFor="text" className="label-text">
                <div>아이디</div>
                <input
                    type="text"
                    className="input-text"
                    placeholder="아이디를 입력해주세요."
                />
            </label>
            <label htmlFor="password" className="label-pwd">
                <div>비밀번호</div>
                <input
                    type="password"
                    className="input-pwd"
                    placeholder="비밀번호를 입력해주세요."
                />
                <div className="pwd-message">
                    <img src={pwdErrorImage} alt="error icon" />
                    <span>비밀번호를 다시 확인해주세요.</span>
                </div>
            </label>
        </div>
    );
}

function LoginBtn() {
    return (
        <Link to="/main" className="loginBtn">
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
    return (
        <div className="LoginBox">
            <Title></Title>
            <InputBox></InputBox>
            <LoginBtn></LoginBtn>
            <ToSignUp></ToSignUp>
        </div>
    );
}

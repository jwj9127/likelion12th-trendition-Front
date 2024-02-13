import { React } from "react";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import "../css/SignUp.css";
import pwdErrorImage from "../imgs/pwd_error.png";
import backImage from "../imgs/back.png";
import profileImage from "../imgs/profile.png";

function Back() {
    return (
        <Link to="/login" className="back">
            <img className="back-img" src={backImage} alt="back" />
        </Link>
    );
}

function Title() {
    return <div className="title-signup">회원가입</div>;
}

function InputBox() {
    return (
        <div className="inputBox">
            <label htmlFor="email" className="label-email">
                <div>이메일</div>
                <input
                    type="email"
                    className="input-email"
                    placeholder="이메일을 입력해주세요."
                />
            </label>
            <label htmlFor="phone" className="label-tel">
                <div>전화번호</div>
                <input
                    type="tel"
                    className="input-tel"
                    placeholder="전화번호 입력해주세요."
                />
            </label>
        </div>
    );
}

function Privacy() {
    return (
        <div className="Privacy">
            By continuing, you agree to our Terms of Service and Privacy Policy.
        </div>
    );
}

function ToNextSignUp() {
    return (
        <Link to="/signup/next" className="ToNextSignUp">
            다음
        </Link>
    );
}

export default function Login() {
    return (
        <div className="LoginBox">
            <Back></Back>
            <Title></Title>
            <InputBox></InputBox>
            <Privacy></Privacy>
            <ToNextSignUp></ToNextSignUp>
        </div>
    );
}

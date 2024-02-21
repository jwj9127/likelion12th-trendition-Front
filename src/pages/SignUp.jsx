import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/SignUp.css";
import backImage from "../imgs/back.png";

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

function InputBox({ email, setEmail, phoneNumber, setPhoneNumber }) {
    return (
        <div className="inputBox">
            <label htmlFor="email" className="label-email">
                <div>이메일</div>
                <input
                    type="email"
                    className="input-email"
                    placeholder="이메일을 입력해주세요."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label htmlFor="phone" className="label-tel">
                <div>전화번호</div>
                <input
                    type="tel"
                    className="input-tel"
                    placeholder="전화번호 입력해주세요."
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
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

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function ToNextSignUp({ email, phoneNumber, handleNext }) {
    const handleClick = (event) => {
        event.preventDefault();
        if (!email || !phoneNumber) {
            alert("이메일과 전화번호를 입력해주세요.");
            window.location.href = "/signup";
        } else if (!validateEmail(email)) {
            alert("올바른 이메일 형식이 아닙니다.");
        } else {
            console.log("Next button clicked");
            handleNext();
        }
    };

    return (
        <Link className="ToNextSignUp" onClick={handleClick}>
            다음
        </Link>
    );
}

export default function Register() {
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const navigate = useNavigate();

    const handleNext = () => {
        console.log("Next button clicked - handleNext");
        navigate("/signup/next", { state: { email, phoneNumber } });
    };

    return (
        <div className="LoginBox">
            <Back></Back>
            <Title></Title>
            <InputBox
                email={email}
                setEmail={setEmail}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
            ></InputBox>
            <Privacy></Privacy>
            <ToNextSignUp
                email={email}
                phoneNumber={phoneNumber}
                handleNext={handleNext}
            ></ToNextSignUp>
        </div>
    );
}

import { React } from "react";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import "../css/SignUp.css";
import pwdErrorImage from "../imgs/pwd_error.png";
import backImage from "../imgs/back.png";
import profileImage from "../imgs/profile.png";

function Back() {
    return (
        <Link to="/signup" className="back">
            <img className="back-img" src={backImage} alt="back" />
        </Link>
    );
}

function Title() {
    return <div className="title-signup">회원가입</div>;
}

function Profile() {
    // 기본 이미지 설정
    const [selectedImage, setSelectedImage] = useState(profileImage);
    const fileInputRef = useRef(null);
    // 입력할 이미지 선택
    const handleImageClick = () => {
        fileInputRef.current.click();
    };
    // 선택 파일 가져오기
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="profileBox">
            <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
            />
            <div
                style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    backgroundColor: "#ccc",
                    backgroundImage: `url(${selectedImage})`,
                    backgroundSize: "cover",
                    cursor: "pointer",
                }}
                onClick={handleImageClick}
            />
            <div style={{ marginTop: "20px" }}>프로필</div>
        </div>
    );
}

function InputBox() {
    return (
        <div className="inputBox">
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
                <div className="pwd-condition">8글자 이상, 특수기호 포함</div>
            </label>
            <label htmlFor="password" className="label-pwd2">
                <div>비밀번호 확인</div>
                <input
                    type="password"
                    className="input-pwd2"
                    placeholder="위와 동일한 비밀번호를 입력해주세요."
                />
                <div className="pwd-message">
                    <img src={pwdErrorImage} alt="error icon" />
                    <span>비밀번호를 다시 확인해주세요.</span>
                </div>
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

function SignUpBtn() {
    return (
        <Link to="/login" className="SignUpBtn">
            계정 만들기
        </Link>
    );
}

export default function SignUpBox() {
    return (
        <div className="SignUpBox">
            <Back></Back>
            <Title></Title>
            <Profile></Profile>
            <InputBox></InputBox>
            <Privacy></Privacy>
            <SignUpBtn></SignUpBtn>
        </div>
    );
}

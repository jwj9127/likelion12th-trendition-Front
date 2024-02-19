import { React } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "../css/SignUp.css";
import pwdErrorImage from "../imgs/pwd_error.png";
import backImage from "../imgs/back.png";
import DefaultImage from "../imgs/profile.png";
import axios from "axios";

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

function Profile({ profileImage, handleImageChange }) {
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
                handleImageChange(reader.result);
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
                    backgroundImage: `url(${profileImage})`,
                    backgroundSize: "cover",
                    cursor: "pointer",
                }}
                onClick={handleImageClick}
            />
            <div style={{ marginTop: "20px" }}>프로필</div>
        </div>
    );
}

function InputBox({
    username,
    setUsername,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
}) {
    return (
        <div className="inputBox">
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
                <div className="pwd-condition">8글자 이상, 특수기호 포함</div>
            </label>
            <label htmlFor="password" className="label-pwd2">
                <div>비밀번호 확인</div>
                <input
                    type="password"
                    className="input-pwd2"
                    placeholder="위와 동일한 비밀번호를 입력해주세요."
                    value={passwordConfirm}
                    onChange={(e) => {
                        setPasswordConfirm(e.target.value);
                    }}
                />
                {passwordConfirm !== password && (
                    <div className="pwd-message">
                        <img src={pwdErrorImage} alt="error icon" />
                        <span>비밀번호를 다시 확인해주세요.</span>
                    </div>
                )}
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

function SignUpBtn({ password, passwordConfirm, handleSignUp }) {
    const handleClick = (event) => {
        event.preventDefault();
        if (password === passwordConfirm) {
            handleSignUp();
        } else {
            alert("비밀번호를 다시 확인해주세요.");
            window.location.href = "/signup";
        }
    };

    return (
        <Link to="" className="SignUpBtn" onClick={handleClick}>
            계정 만들기
        </Link>
    );
}

export default function SignUpBox() {
    const { state } = useLocation();
    const { email, phoneNumber } = state || { email: "", phoneNumber: "" };
    console.log(email, phoneNumber);

    const [profileImage, setSelectedImage] = useState(DefaultImage);
    const handleImageChange = (image) => {
        setSelectedImage(image);
    };

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handleSignUp = () => {
        axios
            .post("http://127.0.0.1:8000/join/register/", {
                email: email,
                phonenumber: phoneNumber,
                username: username,
                password: password,
                profileImage: profileImage,
            })
            .then(function (response) {
                window.location.href = "/login";
            })
            .catch(function (error) {
                console.log(
                    email,
                    phoneNumber,
                    username,
                    password,
                    profileImage
                );
                alert("양식에 맞춰 정확히 입력해주세요.");
                window.location.href = "/signup";
            });
    };

    return (
        <div className="SignUpBox">
            <Back></Back>
            <Title></Title>
            <Profile
                profileImage={profileImage}
                handleImageChange={handleImageChange}
            ></Profile>
            <InputBox
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                passwordConfirm={passwordConfirm}
                setPasswordConfirm={setPasswordConfirm}
            ></InputBox>
            <Privacy></Privacy>
            <SignUpBtn
                password={password}
                passwordConfirm={passwordConfirm}
                handleSignUp={handleSignUp}
            ></SignUpBtn>
        </div>
    );
}

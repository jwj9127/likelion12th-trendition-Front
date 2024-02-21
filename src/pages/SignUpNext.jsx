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
    const [profileImageURL, setProfileImageURL] = useState(DefaultImage);

    // 입력할 이미지 선택
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleImage = () => {
        fileInputRef.current.click();
    };

    // 선택 파일 가져오기 및 파일 전달
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // 파일 자체를 전달
            handleImageChange(file);

            // 미리보기 설정
            const reader = new FileReader();
            reader.onload = () => {
                const imageDataUrl = reader.result;
                setProfileImageURL(imageDataUrl);
            };
            reader.readAsDataURL(file); // 파일을 읽어와서 미리보기 설정
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
                    backgroundImage: `url(${profileImageURL})`,
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
        const passwordRegex =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (password === passwordConfirm) {
            if (passwordRegex.test(password)) {
                handleSignUp();
            } else {
                alert(
                    "비밀번호는 8글자 이상이어야 하며, 특수문자를 포함해야 합니다."
                );
            }
        } else {
            alert("비밀번호와 확인란이 일치해야 합니다.");
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

    const awsIP = process.env.REACT_APP_BACKEND_URL;

    const handleSignUp = async () => {
        try {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("phonenumber", phoneNumber);
            formData.append("username", username);
            formData.append("password", password);
            if (profileImage) {
                formData.append("profileImage", profileImage);
            } else {
                // 프로필 이미지가 없으면 기본 이미지 파일 추가
                formData.append("profileImage", DefaultImage);
            }

            fetch(awsIP+"/join/register/", {
                method: "POST",
                body: formData,
            }).then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            });
            
            window.location.href = "/login";
        } catch (error) {
            console.error(email, phoneNumber, username, password, profileImage);
            alert("양식에 맞춰 정확히 입력해주세요.");
            window.location.href = "/signup";
        }
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

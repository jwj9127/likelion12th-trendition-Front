import { React } from "react";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
// import "../css/SignUp.css";
import "../../css/Setting.css";
import pwdErrorImage from "../../imgs/pwd_error.png";
import backIcon from "../../imgs/backIcon.png";
import profileImage from "../../imgs/profile.png";

function Back() {
    return (
        <div className="top-nav">
            <Link to="/setting" className="font-gray">
                <img src={backIcon} alt="뒤로가기" />
            </Link>
            <h2 className="title">계정 정보</h2>
            <div></div>
        </div>
    );
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
        <div className="profileBox" style={{marginTop: "20px"}}>
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
                <div>이름</div>
                <input
                    type="text"
                    className="input-text"
                    placeholder="아이디를 입력해주세요."
                />
            </label>
            <label htmlFor="password" className="label-pwd">
                <div>아이디</div>
                <input
                    type="text"
                    className="input-pwd"
                    placeholder="비밀번호를 입력해주세요."
                />
            </label>
            <label htmlFor="password" className="label-pwd2">
                <div>&nbsp;</div>
                <div>비밀번호</div>
                <input
                    type="text"
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

export default function Change_Profile() {
    return (
        <div className="SignUpBox">
            <Back></Back>
            <Profile></Profile>
            <InputBox></InputBox>
        </div>
    );
}

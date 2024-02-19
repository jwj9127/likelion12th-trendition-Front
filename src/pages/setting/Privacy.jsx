import React from "react";
import "../../css/Setting.css";
import backIcon from "../../imgs/backIcon.png";
import rightIcon from "../../imgs/Right_Arrow_Icon.png"
import { Link } from "react-router-dom";


const Privacy = () => {

    return (
        <div className="main">
            <div className="top-nav">
                <Link to="/setting" className="font-gray">
                    <img src={backIcon} alt="뒤로가기" />
                </Link>
                <h2 className="title">푸시 알림</h2>
                <div></div>
            </div>
            <ul className="list">
                <li className="push__li">
                    <div>푸시 알림</div>
                    <div className="push__Btn">
                        <label className = "switch-button">
                            <input type = "checkbox"/>
                            <span className = "onoff-switch"></span>
                        </label>
                    </div>
                </li>
                <li className="push__li">
                    <div>계정 비공개</div>
                    <div className="push__Btn">
                        <label className = "switch-button">
                            <input type = "checkbox"/>
                            <span className = "onoff-switch"></span>
                        </label>
                    </div>
                </li>
                <li className="push__li">
                    <div>다른 사람이 이메일 주소로 나를 찾을 수 있게 하기</div>
                    <div className="push__Btn">
                        <label className = "switch-button">
                            <input type = "checkbox"/>
                            <span className = "onoff-switch"></span>
                        </label>
                    </div>
                </li>
                <li className="push__li">
                    <div>다른 사람이 이메일 주소로 나를 찾을 수 있게 하기</div>
                    <div className="push__Btn">
                        <label className = "switch-button">
                            <input type = "checkbox"/>
                            <span className = "onoff-switch"></span>
                        </label>
                    </div>
                </li>
            </ul>
            <Link className="Link" to="/setting/block">
                    <div className="push__li">
                        <li>차단 계정</li>
                        <img src={rightIcon} alt="오른쪽 화살표"/>
                    </div>
            </Link>
        </div>
    );
};

export default Privacy;

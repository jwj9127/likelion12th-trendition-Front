import React from "react";
import "../css/Setting.css";
import rightIcon from "../imgs/Right_Arrow_Icon.png";
import backIcon from "../imgs/backIcon.png";
import { Link } from "react-router-dom";

const Setting = () => {
    return (
        <div className="main">
            <div className="top-nav">
                <Link to="/mypage" className="font-gray">
                    <img src={backIcon} alt="뒤로가기" />
                </Link>
                <h2 className="title">옵션</h2>
                <div></div>
            </div>
            <ul className="list">
                <Link className="Link" to="/setting/notification">
                    <div className="li-block">
                        <li className="list-item">알림 설정</li>
                        <img src={rightIcon} alt="오른쪽 화살표" />
                    </div>
                </Link>
                <Link className="Link" to="/setting/Change">
                    <div className="li-block">
                        <li className="list-item">계정 설정</li>
                        <img src={rightIcon} alt="오른쪽 화살표" />
                    </div>
                </Link>
                <Link className="Link" to="/setting/privacy">
                    <div className="li-block">
                        <li className="list-item">개인정보 보호</li>
                        <img src={rightIcon} alt="오른쪽 화살표" />
                    </div>
                </Link>
                <Link className="Link">
                    <div className="li-block">
                        <li className="list-item">프리미엄</li>
                        <img src={rightIcon} alt="오른쪽 화살표" />
                    </div>
                </Link>
                <Link className="Link">
                    <div className="li-block">
                        <li className="list-item">문의하기</li>
                        <img src={rightIcon} alt="오른쪽 화살표" />
                    </div>
                </Link>
                <Link className="Link" to="/">
                    <div className="li-block">
                        <li className="list-item">로그아웃</li>
                        <img src={rightIcon} alt="오른쪽 화살표" />
                    </div>
                </Link>
            </ul>
        </div>
    );
};

export default Setting;

import React from "react";
import "../../css/Setting.css";
import rightIcon from "../../imgs/Right_Arrow_Icon.png"
import backIcon from "../../imgs/backIcon.png";
import { Link } from "react-router-dom";


const Setting = () => {

    return (
        <div className="main">
            <div className="top-nav">
                <Link to="/setting" className="font-gray">
                    <img src={backIcon} alt="뒤로가기" />
                </Link>
                <h2 className="title">알림 설정</h2>
                <div></div>
            </div>
            <ul className="list">
                <Link className="Link" to="/setting/push">
                    <div className="li-block">
                        <li className="list-item">푸시 알림</li>
                        <img src={rightIcon} alt="오른쪽 화살표"/>
                    </div>
                </Link>
                <Link className="Link">
                    <div className="li-block">
                        <li className="list-item">SMS 알림</li>
                        <img src={rightIcon} alt="오른쪽 화살표"/>
                    </div>
                </Link>
                <Link className="Link">
                    <div className="li-block">
                        <li className="list-item">이메일 알림</li>
                        <img src={rightIcon} alt="오른쪽 화살표"/>
                    </div>
                </Link>
      
            </ul>
        </div>
    );
};

export default Setting;

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
                <h2 className="title">푸시 알림</h2>
                <div></div>
            </div>
            <ul className="list">
                <li className="li-block">
                    <div className="list-item">푸시 알림</div>
                    <img src={rightIcon} alt="오른쪽 화살표"/>
                </li>
      
            </ul>
        </div>
    );
};

export default Setting;

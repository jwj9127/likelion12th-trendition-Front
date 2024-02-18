import React from "react";
import "../../css/Setting.css";
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
                <li className="push__li">
                    <div>푸시 알림</div>
                    <div className="push__Btn">
                        <label className = "switch-button">
                            <input type = "checkbox"/>
                            <span className = "onoff-switch"></span>
                        </label>
                    </div>
                    
                </li>
            </ul>
            <ul className="list">
                <li className="push__li">
                    <div>팔로우 요청</div>
                    <input className="subGoal-check" type="checkbox"></input>
                </li>
                <li className="push__li">
                    <div>나를 태그한 게시물</div>
                    <input className="subGoal-check" type="checkbox"></input>
                </li>
                <li className="push__li">
                    <div>답글</div>
                    <input className="subGoal-check" type="checkbox"></input>
                </li>
                <li className="push__li">
                    <div>하트</div>
                    <input className="subGoal-check" type="checkbox"></input>
                </li>
                <li className="push__li">
                    <div>쪽지</div>
                    <input className="subGoal-check" type="checkbox"></input>
                </li>
                <li className="push__li">
                    <div>추천</div>
                    <input className="subGoal-check" type="checkbox"></input>
                </li>
            </ul>
        </div>
    );
};

export default Setting;

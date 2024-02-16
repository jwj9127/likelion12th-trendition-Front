import React from "react";
import { useState, useEffect } from "react";
import "../css/Follow.css";
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
        <li className="list-item">알림 설정</li>
        <li className="list-item">계정 정보</li>
        <li className="list-item">개인정보 보호</li>
      </ul>
    </div>
  );
};

export default Setting;

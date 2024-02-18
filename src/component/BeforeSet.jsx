import { React, useState } from "react";
import "../css/BeforeSet.css";
import emptyImg from "../imgs/main_center.png";

export default function BeforeSet(props) {
    return (
        <div className="beforeBox" onClick={props.onClick}>
            <div className="emptyText1">이것 저것 다 잘 해내고 싶은 마음,</div>
            <div className="emptyText2">'식스펙'에 담아보아요.</div>
            <img className="emptyImg" src={emptyImg}></img>
            <div className="emptyImg-text">
                상단 이미지를 클릭해 스펙을 입력해주세요
            </div>
        </div>
    );
}

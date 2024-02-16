import { React, useState } from "react";
import "../css/Main.css";
import Navigation from "../component/Navigation";
import HexagonGraph from "../component/HexagonGraph";
import logo2 from "../imgs/logo2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

function TopBar() {
    return (
        <div className="TopBar">
            <div className="sublogo">
                <img className="logo2" src={logo2}></img>
                <div className="logo2-name">식스펙</div>
            </div>
            <div className="state">
                <div className="state-category">OOO님의 마라톤 목표</div>
                <div className="state-achiev">달성도는 52%입니다</div>
            </div>
        </div>
    );
}

function HexagonGraphBox() {
    return <div className="HexagonGraphBox"></div>;
}

function GoalCheck() {
    return (
        <div className="subGoal">
            <input className="subGoal-check" type="checkbox"></input>
            <div className="subGoal-text">A - 1 : OOO하기</div>
        </div>
    );
}

function Goals() {
    const setModalOpen = useState(false);
    const openModal = () => setModalOpen(true);
    return (
        <div className="Goals">
            <div className="mainGoal">
                <div className="mainGoal-text">GOAL A : OOO을 OOO하기</div>
                <button className="mainGoal-set" onClick={openModal}></button>
            </div>
            <GoalCheck></GoalCheck>
            <GoalCheck></GoalCheck>
            <GoalCheck></GoalCheck>
            <GoalCheck></GoalCheck>
            <GoalCheck></GoalCheck>
        </div>
    );
}

function TargetTag() {
    Swal.fire({
        html: `
        <div class="spec-modal">
            <div class="spec-header">
                <div class="title" style="color: #694df9; font-size: 24px;">스펙 입력 (6개)</div>
            </div>
            <div class="spec-content">
                <h2>스펙 1</h2>
                <input id="stack" class="swal2-input" placeholder="쌓고 싶은 스펙을 입력해주세요.">

                <h2>스펙 2</h2>
                <input id="time" class="swal2-input" placeholder="쌓고 싶은 스펙을 입력해주세요.">

                <h2>스펙 3</h2>
                <input id="comment" class="swal2-input" placeholder="쌓고 싶은 스펙을 입력해주세요.">

                <h2>스펙 4</h2>
                <input id="comment" class="swal2-input" placeholder="쌓고 싶은 스펙을 입력해주세요.">
                
                <h2>스펙 5</h2>
                <input id="comment" class="swal2-input" placeholder="쌓고 싶은 스펙을 입력해주세요.">
                
                <h2>스펙 6</h2>
                <input id="comment" class="swal2-input" placeholder="쌓고 싶은 스펙을 입력해주세요.">
            </div>
        </div>
    `,
        showCancelButton: true,
        confirmButtonText: "저장",
        cancelButtonText: "취소",
        allowOutsideClick: false
    });
}

export default function Main() {
    return (
        <div>
            <TopBar></TopBar>
            <HexagonGraphBox></HexagonGraphBox>
            <FontAwesomeIcon icon={faGear} size="2x" onClick={TargetTag}/>
            <Goals></Goals>
            <Navigation></Navigation>
        </div>
    );
}

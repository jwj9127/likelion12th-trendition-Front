import { React, useState } from "react";
import "../css/Main.css";
import Navigation from "../component/Navigation";
import HexagonGraph from "../component/HexagonGraph";
import BeforeSet from "../component/BeforeSet";
import logo2 from "../imgs/logo2.png";
import Swal from "sweetalert2";

function TopBar({ goalCount }) {
    const achievementRate = goalCount * 20;
    return (
        <div className="TopBar">
            <div className="sublogo">
                <img className="logo2" src={logo2}></img>
                <div className="logo2-name">식스펙</div>
            </div>
            <div className="state">
                <div className="state-category">OOO님의 마라톤 목표</div>
                <div className="state-achiev">
                    달성도는 {achievementRate}%입니다
                </div>
            </div>
        </div>
    );
}

function GoalCheck() {
    return (
        <div className="subGoal">
            <input className="subGoal-check" type="checkbox"></input>
            <div className="subGoal-text">Lv - 1 : 목표설정</div>
        </div>
    );
}

function Goals() {
    const setModalOpen = useState(false);
    const openModal = () => setModalOpen(true);
    return (
        <div className="Goals">
            <div className="mainGoal">
                <div className="mainGoal-text">스펙 1 : 마라톤</div>
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
                <div class="title" style="color: #5E47D2; font-size: 24px; font-weight: bolder; margin-top:30px">스펙 입력 (6개)</div>
            </div>
            <div class="spec-content">
                <h3>스펙 1</h3>
                <input id="stack" class="swal2-input" style="outline: none;" placeholder="쌓고 싶은 스펙을 입력해주세요.">

                <h3>스펙 2</h3>
                <input id="time" class="swal2-input" placeholder="쌓고 싶은 스펙을 입력해주세요.">

                <h3>스펙 3</h3>
                <input id="comment" class="swal2-input" placeholder="쌓고 싶은 스펙을 입력해주세요.">

                <h3>스펙 4</h3>
                <input id="comment" class="swal2-input" placeholder="쌓고 싶은 스펙을 입력해주세요.">
                
                <h3>스펙 5</h3>
                <input id="comment" class="swal2-input" placeholder="쌓고 싶은 스펙을 입력해주세요.">
                
                <h3>스펙 6</h3>
                <input id="comment" class="swal2-input" placeholder="쌓고 싶은 스펙을 입력해주세요.">
            </div>
        </div>
    `,
        showCancelButton: true,
        confirmButtonText: "저장",
        cancelButtonText: "취소",
        allowOutsideClick: false,
    });
}

function HexagonGraphBox() {
    return (
        <div className="HexagonGraphBox">
            {/*설정 전 헥사곤 그래프 대체 이미지*/}
            <BeforeSet onClick={TargetTag} />
            {/*설정 후 헥사곤 그래프*/}
            {/*<HexagonGraph></HexagonGraph>*/}
        </div>
    );
}

export default function Main() {
    return (
        <div>
            <TopBar goalCount={4}></TopBar>
            <HexagonGraphBox></HexagonGraphBox>
            <Goals></Goals>
            <Navigation></Navigation>
        </div>
    );
}

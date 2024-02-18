import { React, useState } from "react";
import "../css/Main.css";
import Navigation from "../component/Navigation";
import HexagonGraph from "../component/HexagonGraph";
import BeforeSet from "../component/BeforeSet";
import logo2 from "../imgs/logo2.png";
import pencil from "../imgs/pencil.png";
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

function GoalCheck({level}) {
    return (
        <div className="subGoal">
            <input className="subGoal-check" type="checkbox"></input>
            <div className="subGoal-text">{`Lv - ${level} : 목표설정`}
            <img className="subGoal-pencil" src={pencil} onClick={TargetGoals}/>
            </div>
        </div>
    );
}

function TargetGoals() {
    Swal.fire({
        html: `
        <div class="spec-modal">
        <div class="spec-content">
            <input id="stack1" class="swal2-input" style="outline: none;" placeholder="목표를 설정해주세요">
        </div>
    </div>
        `,
        showCancelButton: true,
        confirmButtonText: '목표 설정',
        cancelButtonText: '취소',
    })
}

function Goals() {
    return (
        <div className="Goals">
                <select className="mainGoal-text">
                    <option>스펙 1 : 마라톤</option>
                    <option>스펙 2 : 필라테스</option>
                    <option>스펙 3 : 블로그 운영</option>
                    <option>스펙 4 : 영어 회화</option>
                    <option>스펙 5 : 요리</option>
                    <option>스펙 6 : 수영</option>
                </select>
            {[1, 2, 3, 4, 5].map((level) => (
                <GoalCheck key={level} level={level}></GoalCheck>
            ))}
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
                <input id="stack1" class="swal-input" style="outline: none;" placeholder="쌓고 싶은 스펙을 입력해주세요.">

                <h3>스펙 2</h3>
                <input id="stack2" class="swal-input" placeholder="쌓고 싶은 스펙을 입력해주세요.">

                <h3>스펙 3</h3>
                <input id="stack3" class="swal-input" placeholder="쌓고 싶은 스펙을 입력해주세요.">

                <h3>스펙 4</h3>
                <input id="stack4" class="swal-input" placeholder="쌓고 싶은 스펙을 입력해주세요.">
                
                <h3>스펙 5</h3>
                <input id="stack5" class="swal-input" placeholder="쌓고 싶은 스펙을 입력해주세요.">
                
                <h3>스펙 6</h3>
                <input id="stack6" class="swal-input" placeholder="쌓고 싶은 스펙을 입력해주세요.">
            </div>
        </div>
    `,
        showCancelButton: true,
        confirmButtonText: "저장",
        cancelButtonText: "취소",
        allowOutsideClick: false,
    }).then(() => {
        document.querySelector(".HexagonGraphBox").innerHTML = "<HexagonGraph></HexagonGraph>";
    });
}

function HexagonGraphBox() {
    return (
        <div className="HexagonGraphBox">
            {/*설정 전 헥사곤 그래프 대체 이미지*/}
            <BeforeSet onClick={TargetTag} />
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

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
        title: '목표 가치 태그 (6개 설정)',
        showCancelButton: true,
        confirmButtonText: '저장',
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        html: `
            <div id="custom-container">
                <div style="display: flex; flex-direction: row-reverse; align-items: center;">
                    <button id="plus-button" class="swal2-styled swal2-confirm swal2-styled"><span>+</span></button>
                    <div id="custom-input-container" style="display: flex; flex-wrap: wrap;"></div>
                </div>
            </div>`,
        customClass: {
            confirmButton: 'swal2-button-custom' // 버튼에 적용할 사용자 지정 클래스
        },
        didOpen: () => {
            let inputCount = 0; // 현재 추가된 텍스트 필드의 개수

            // + 버튼이 클릭되었을 때 실행되는 함수
            document.getElementById('plus-button').addEventListener('click', function () {
                if (inputCount < 6) { // 텍스트 필드가 최대 6개까지만 추가될 수 있도록 제한
                    const inputContainer = document.getElementById('custom-input-container');
                    const newInput = document.createElement('input');
                    newInput.type = 'text';
                    newInput.style.width = '50px';
                    newInput.style.height = '20px'; // 높이 설정
                    newInput.style.marginRight = '5px'; // 각 텍스트 필드 사이에 마진 추가
                    inputContainer.appendChild(newInput);
                    inputCount++;

                    // 텍스트 필드가 4개가 되면 가로로 2줄로 배치
                    if (inputCount === 4) {
                        inputContainer.style.flexWrap = 'no-wrap';
                        inputContainer.style.width = 'auto';
                    }
                }
            });
        }
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

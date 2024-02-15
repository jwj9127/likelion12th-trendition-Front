import { React, useState } from "react";
import "../css/Main.css";
import Navigation from "../component/Navigation";
import HexagonGraph from "../component/HexagonGraph";
import logo2 from "../imgs/logo2.png";

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

export default function Main() {
    return (
        <div>
            <TopBar></TopBar>
            <HexagonGraphBox></HexagonGraphBox>
            <Goals></Goals>
            <Navigation></Navigation>
        </div>
    );
}

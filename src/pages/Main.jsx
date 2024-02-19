import { React, useState } from "react";
import "../css/Main.css";
import Navigation from "../component/Navigation";
import HexagonGraph from "../component/HexagonGraph";
import BeforeSet from "../component/BeforeSet";
import logo2 from "../imgs/logo2.png";
import pencil from "../imgs/pencil.png";
import garbage from "../imgs/garbage.png";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function TopBar({ goalCount }) {
    const achievementRate = goalCount * 20;
    return (
        <div className="TopBar">
            <div className="TopBar-top">
                <div className="sublogo">
                    <img className="logo2" src={logo2}></img>
                    <div className="logo2-name">식스펙</div>
                </div>
                <FontAwesomeIcon
                    icon={faGear}
                    style={{ fontSize: "25px", margin: "3vh 4vw 0.5vh 0vw" }}
                    onClick={TargetTag}
                />
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

function GoalCheck({ level }) {
    const [isChecked, setIsChecked] = useState(false);
    const subgoals = window.localStorage.getItem('subgoals');

    const checkBox = () =>{
        const completed = document.getElementById('subGoal-check-completed').value;

        Swal.fire({
            title: '목표 완료',
            showCancelButton: true,
            confirmButtonText: "잠굼",
            cancelButtonText: "취소",
        }).then((result) => {
            if (result.isConfirmed) {
                try{
                    axios({
                        method: 'post',
                        url: '/home/goal/create',
                        headers: {
                            Authorization: `Bearer 45756420a4182dcc60ceaaabf2934d6ee79ea1ee`
                        },
                        data: { completed: true }
                    }).then(() => {
                        setIsChecked(true);
                    })
                }catch (err) {
                    console.error(err);
                }
            }
            if (!(result.isConfirmed)){
                setIsChecked(false);
            }
        })
    }

    // try{
    //     axios({
    //         method: 'get',
    //         url: '/home'
    //     }).then((result) => {
    //         window.localStorage.setItem('subgoals', result.data.subgoals);
    //     })
    // }catch(err){
    //     console.error(err);
    // }
    return (
        <div className="subGoal">
            <input id="subGoal-check-completed" className={isChecked ? "subGoal-check-checked" : "subGoal-check"} type="checkbox" onClick={checkBox} disabled={isChecked}></input>
            <div className="subGoal-text">
                {`Lv - ${level} : ${subgoals ? subgoals.detail : "목표 설정"}`}
                <img
                    className="subGoal-pencil"
                    src={pencil}
                    onClick={TargetGoals}
                    style={{ marginLeft: subgoals===null ? "60%" : "50%" }}
                />
                {subgoals && (
                    <img
                        className="subGoal-garbage"
                        src={garbage}
                        onClick={DeleteGoals}
                    />
                )}
            </div>
        </div>
    );
}

function DeleteGoals() {
    const subgoals = window.localStorage.getItem('subgoals');
    Swal.fire({
        title: '삭제 하시겠습니까?',
        showCancelButton: true,
        confirmButtonText: "삭제",
        cancelButtonText: "취소",
    }).then((result) => {
        if (result.isConfirmed) {
            try{
                axios({
                    method: 'post',
                    url: '/home/subgoal/delete',
                    data: subgoals.subgoal_id
                })
            }catch (err) {
                console.error(err);
            }
        }
    })
}

function TargetGoals() {
    const subgoals = window.localStorage.getItem('subgoals');

    if(subgoals){
        Swal.fire({
            html: `
            <div class="spec-modal">
            <div class="spec-content">
                <input id="stack" class="swal2-input" style="outline: none;" placeholder="목표를 수정해주세요">
            </div>
        </div>
            `,
            showCancelButton: true,
            confirmButtonText: "목표 수정",
            cancelButtonText: "취소",
        }).then((result) => {
            if (result.isConfirmed) {
                const stack = document.getElementById('stack').value;
                try{
                    axios({
                        method: 'put',
                        url: '/home/subgoal/update/',
                        data: stack
                    })
                }catch (err) {
                    console.error(err);
                }
            }
        });
    }

    if(!subgoals){
        Swal.fire({
            html: `
            <div class="spec-modal">
            <div class="spec-content">
                <input id="stack" class="swal2-input" style="outline: none;" placeholder="목표를 설정해주세요">
            </div>
        </div>
            `,
            showCancelButton: true,
            confirmButtonText: "목표 설정",
            cancelButtonText: "취소",
        }).then((result) => {
            if (result.isConfirmed) {
                const stack = document.getElementById('stack').value;
    
                try{
                    axios({
                        method: 'post',
                        url: '/home/subgoal/create/',
                        data: stack
                    })
                }catch (err) {
                    console.error(err);
                }
            }
        });
    }
}

function Goals() {
    const id = window.localStorage.getItem('id');
    const title = window.localStorage.getItem('title');
    // try{
    //     axios({
    //         method: 'get',
    //         url: '/home'
    //     }).then((result) => {
    //         window.localStorage.setItem('id', result.data.id);
    //         window.localStorage.setItem('title', result.data.title);
    //     })
    // }catch(err){
    //     console.error(err);
    // }
    return (
        <div className="Goals">
            <select className="mainGoal-text">
                <option>스펙 : 마라톤</option>
                <option>스펙 : 필라테스</option>
                <option>스펙 : 블로그 운영</option>
                <option>스펙 : 영어 회화</option>
                <option>스펙 : 요리</option>
                <option>스펙 : 수영</option>
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
    });
}

function HexagonGraphBox() {
    const id = window.localStorage.getItem('id');
    const [isSet, setIsSet] = useState(false);
    // try{
    //     axios({
    //         method: 'get',
    //         url: '/home'
    //     }).then((result) => {
    //         window.localStorage.setItem('id', result.data.id);
    //         setIsSet(true);
    //     })
    // }catch(err){
    //     console.error(err);
    // }
    return (
        <div className="HexagonGraphBox">
            {/*설정 여부에 따른 조건부 렌더링*/}
            {isSet ? <HexagonGraph /> : <BeforeSet onClick={TargetTag} />}
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

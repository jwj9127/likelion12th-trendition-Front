import { React, useEffect, useState } from "react";
import Navigation from "../component/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import logo2 from "../imgs/logo2.png";
import "../css/Mypage.css";
import { Link } from "react-router-dom";
import pencil from "../imgs/pencil.png";
import garbage from "../imgs/garbage.png";
import Swal from "sweetalert2";
import axios from "axios";

function GoalCheck({ level }) {
    const [isChecked, setIsChecked] = useState(false);
    const subgoals = window.localStorage.getItem("subgoals");

    const checkBox = () => {
        const completed = document.getElementById(
            "subGoal-check-completed"
        ).value;

        Swal.fire({
            title: "목표 완료",
            showCancelButton: true,
            confirmButtonText: "잠굼",
            cancelButtonText: "취소",
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios({
                        method: "post",
                        url: "/home/goal/create",
                        data: { completed: true },
                    }).then(() => {
                        setIsChecked(true);
                    });
                } catch (err) {
                    console.error(err);
                }
            }
            if (!result.isConfirmed) {
                setIsChecked(false);
            }
        });
    };

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
            <input
                id="subGoal-check-completed"
                className={
                    isChecked ? "subGoal-check-checked" : "subGoal-check"
                }
                type="checkbox"
                onClick={checkBox}
                disabled={isChecked}
            ></input>
            <div className="subGoal-text">
                {`Lv - ${level} : ${subgoals ? subgoals.detail : "목표 설정"}`}
                <img
                    className="subGoal-pencil"
                    src={pencil}
                    onClick={TargetGoals}
                    style={{ marginLeft: subgoals === null ? "60%" : "50%" }}
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
    const subgoals = window.localStorage.getItem("subgoals");
    Swal.fire({
        title: "삭제 하시겠습니까?",
        showCancelButton: true,
        confirmButtonText: "삭제",
        cancelButtonText: "취소",
    }).then((result) => {
        if (result.isConfirmed) {
            try {
                axios({
                    method: "post",
                    url: "/home/subgoal/delete",
                    data: subgoals.subgoal_id,
                });
            } catch (err) {
                console.error(err);
            }
        }
    });
}

function TargetGoals() {
    const subgoals = window.localStorage.getItem("subgoals");

    if (subgoals) {
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
                const stack = document.getElementById("stack").value;
                try {
                    axios({
                        method: "put",
                        url: "/home/subgoal/update/",
                        data: stack,
                    });
                } catch (err) {
                    console.error(err);
                }
            }
        });
    }

    if (!subgoals) {
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
                const stack = document.getElementById("stack").value;

                try {
                    axios({
                        method: "post",
                        url: "/home/subgoal/create/",
                        data: stack,
                    });
                } catch (err) {
                    console.error(err);
                }
            }
        });
    }
}

function Goals() {
    const id = window.localStorage.getItem("id");
    const title = window.localStorage.getItem("title");
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

export default function Mypage() {
    const [data, setData] = useState([]);
    const awsIP = process.env.REACT_APP_BACKEND_URL;
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch(awsIP + "/join/mypage/", {
            headers: {
                Authorization: `Bearer  ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setData(data);
                console.log(data.profileImage);
            })
            .catch((error) => {
                console.error(
                    "There was a problem with the fetch operation:",
                    error
                );
            });
    }, []);

    return (
        <div>
            <div className="mypage_top_setting">
                <div className="TopBar">
                    <div className="TopBar-top">
                        <div className="sublogo">
                            <img className="logo2" src={logo2}></img>
                            <div className="logo2-name">식스펙</div>
                        </div>
                        <p
                            style={{
                                display: "flex",
                                alignItems: "center",
                                textAlign: "center",
                                fontSize: "13px",
                                marginTop: "4vh",
                            }}
                        >
                            @{data.username}
                        </p>
                        <Link to={"/Setting"}>
                            <FontAwesomeIcon
                                icon={faGear}
                                style={{
                                    fontSize: "25px",
                                    color: "#ffffff",
                                    margin: "3vh 20px 0.5vh 50px",
                                }}
                            />
                        </Link>
                    </div>
                </div>
                <div className="mypage_main_profile">
                    <img
                        className="mypage_main_img"
                        src={data.profileImage}
                    ></img>
                </div>
            </div>
            <div className="mypage_followBox">
                <p>
                    {data.followers}
                    <Link to="/followers" className="font-gray">
                        Followers
                    </Link>
                </p>
                <p>
                    {data.followings}
                    <Link to="/following" className="font-gray">
                        Following
                    </Link>
                </p>
            </div>
            <div>
                <button className="mypage_doneBtn">15 done</button>
            </div>
            <Goals />
            <Navigation></Navigation>
        </div>
    );
}

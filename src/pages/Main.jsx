import { React, useEffect, useState } from "react";
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

function Goals({ selectedGoalId, setSelectedGoalId }) {
    const [goals, setGoals] = useState([]);
    const [selectedGoal, setSelectedGoal] = useState([]);
    const [subgoals, setSubgoals] = useState([]);
    const [subgoal, setSubgoal] = useState([]);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                // 토큰 가져오기
                const awsIP = process.env.REACT_APP_BACKEND_URL;
                const token = localStorage.getItem("token");
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Token ${token}`;

                const response = await axios.get(awsIP+"/home/");
                setGoals(response.data);
                console.log("Goals", response.data);
            } catch (error) {
                console.error(
                    "Goals에서 데이터를 가져오는 중 에러 발생:",
                    error
                );
            }
        };

        fetchGoals();
    }, []);

    const GetSubgoals = async () => {
        try {
            const token = localStorage.getItem("token");
            const awsIP = process.env.REACT_APP_BACKEND_URL;
            axios.defaults.headers.common["Authorization"] = `Token ${token}`;
            const response = await axios.get(awsIP+"/home/");
            const selectedGoal = response.data[selectedGoalId - 1];
            setSelectedGoal(selectedGoal);
            setSubgoals(selectedGoal ? selectedGoal.subgoals : []);
            console.log(subgoals);
        } catch (error) {
            console.error("Goals에서 subgoals를 가져오는 중 에러 발생:", error);
        }
    };

    const handleGoalChange = async (e) => {
        e.preventDefault();
        setSelectedGoalId(e.target.value);
        console.log("selected Spec id :", e.target.value);
    };

    useEffect(() => {
        if (selectedGoalId !== null) {
            GetSubgoals();
        }
    }, [selectedGoalId]);

    return (
        <div className="Goals">
            <select className="mainGoal-text" onChange={handleGoalChange}>
                {goals.map((goal, index) => (
                    <option key={index} value={index + 1}>
                        {`SPEC ${index + 1} : ${goal.title}`}
                    </option>
                ))}
            </select>
            <GoalCheck key={1} level={1} subgoals={subgoals}></GoalCheck>
            <GoalCheck key={2} level={2} subgoals={subgoals}></GoalCheck>
            <GoalCheck key={3} level={3} subgoals={subgoals}></GoalCheck>
            <GoalCheck key={4} level={4} subgoals={subgoals}></GoalCheck>
            <GoalCheck key={5} level={5} subgoals={subgoals}></GoalCheck>
        </div>
    );
}

function TopBar({ selectedGoalId }) {
    const [goalTitle, setGoalTitle] = useState("");
    const [achievement, setAchievement] = useState("");
    const username = localStorage.getItem("username");
    const awsIP = process.env.REACT_APP_BACKEND_URL;
    useEffect(() => {
        const GetGoalData = () => {
            axios
                .get(awsIP+"/home/", {})
                .then(function (response) {
                    const selectedGoal = response.data[selectedGoalId - 1];
                    setGoalTitle(selectedGoal.title);
                    setAchievement(selectedGoal.completion_rate);
                })
                .catch(function (error) {
                    console.error(
                        "상단바에서 목표 데이터를 가져오는 중 에러 발생:",
                        error
                    );
                });
        };

        GetGoalData();
    }, [selectedGoalId]);

    return (
        <div className="TopBar">
            <div className="TopBar-top">
                <div className="sublogo">
                    <img className="logo2" src={logo2}></img>
                    <div className="logo2-name">식스펙</div>
                </div>
            </div>
            <div className="state">
                <div className="state-category">
                    {username}님의 {goalTitle} 목표
                </div>
                <div className="state-achiev">
                    달성도는 {achievement}%입니다
                </div>
            </div>
        </div>
    );
}

function GoalCheck({ key, level, subgoals }) {
    const [isChecked, setIsChecked] = useState(false);
    const subgoal = subgoals[level - 1]; // subgoal 가져오기

    const token = localStorage.getItem("token");
    const awsIP = process.env.REACT_APP_BACKEND_URL;
    const checkBox = () => {
        Swal.fire({
            title: "목표 완료",
            showCancelButton: true,
            confirmButtonText: "잠굼",
            cancelButtonText: "취소",
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios({
                        method: "put",
                        url: awsIP+"/home/goal/create",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        data: { is_completed: true },
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

    if (!subgoal) {
        return (
            <div className="subGoal">
                <input
                    className={
                        isChecked ? "subGoal-check-checked" : "subGoal-check"
                    }
                    type="checkbox"
                    onClick={checkBox}
                    disabled={isChecked}
                ></input>
                <div className="subGoal-text">
                    <div key={key}>
                        {`Lv - ${level} : 세부 목표를 설정해주세요`}
                        <img
                            className="subGoal-pencil"
                            src={pencil}
                            onClick={() => TargetGoals(subgoal.id)}
                            style={{
                                marginLeft: "25%",
                                marginRight: "5%",
                                width: "25px",
                                height: "25px",
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="subGoal">
            <input
                className={
                    isChecked ? "subGoal-check-checked" : "subGoal-check"
                }
                type="checkbox"
                onClick={checkBox}
                disabled={isChecked}
            ></input>
            <div className="subGoal-text">
                <div key={key}>
                    {`Lv - ${level} : ${subgoal.title}`}
                    <div
                        className="subgoal_imgBtn"
                        style={{
                            width: "70px",
                            height: "43px",
                            marginRight: "3%",
                        }}
                    >
                        <img
                            className="subGoal-pencil"
                            src={pencil}
                            onClick={() => TargetGoals(subgoal)}
                            style={{
                                marginLeft:
                                    subgoal === undefined ? "60%" : "10%",
                                width: "25px",
                                height: "25px",
                            }}
                        />
                        {subgoal && (
                            <img
                                className="subGoal-garbage"
                                src={garbage}
                                onClick={() => DeleteGoals(subgoal.id)}
                                style={{
                                    width: "25px",
                                    height: "25px",
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function DeleteGoals(id) {
    Swal.fire({
        title: "삭제 하시겠습니까?",
        showCancelButton: true,
        confirmButtonText: "삭제",
        cancelButtonText: "취소",
    }).then((result) => {
        if (result.isConfirmed) {
            const token = localStorage.getItem("token");
            const awsIP = process.env.REACT_APP_BACKEND_URL;
            try {
                axios({
                    method: "delete",
                    url: awsIP+`/home/subgoal/delete/${id}`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: id,
                }).then((result) => {
                    console.log(result);
                });
            } catch (err) {
                console.error(err);
            }
        }
    });
}

function TargetGoals(subgoal) {
    if (subgoal) {
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
                const token = localStorage.getItem("token");
                const stack = document.getElementById("stack").value;
                const awsIP = process.env.REACT_APP_BACKEND_URL;
                try {
                    axios({
                        method: "put",
                        url: awsIP+`/home/subgoal/update/`,
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        data: stack,
                    });
                } catch (err) {
                    console.error(err);
                }
            }
        });
    }

    if (!subgoal) {
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
                const token = localStorage.getItem("token");
                const stack = document.getElementById("stack").value;
                const awsIP = process.env.REACT_APP_BACKEND_URL;
                try {
                    axios({
                        method: "post",
                        url: awsIP+`/home/subgoal/create/`, //${goal_id}
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        data: stack,
                    });
                } catch (err) {
                    console.error(err);
                }
            }
        });
    }
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
    }).then((result) => {
        if (result.isConfirmed) {
            const title1 = document.getElementById("stack1").value;
            const title2 = document.getElementById("stack2").value;
            const title3 = document.getElementById("stack3").value;
            const title4 = document.getElementById("stack4").value;
            const title5 = document.getElementById("stack5").value;
            const title6 = document.getElementById("stack6").value;
            const title = { title1, title2, title3, title4, title5, title6 };

            try {
                const token = localStorage.getItem("token");
                const awsIP = process.env.REACT_APP_BACKEND_URL;
                console.log(token);
                axios({
                    method: "post",
                    url: awsIP+"/home/goal/createall/",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: title,
                }).then((result) => {
                    window.location.reload();
                });
            } catch (err) {
                console.error(err);
            }
        }
    });
}

function HexagonGraphBox() {
    const [isSet, setIsSet] = useState(false);
    const [specs, setSpecs] = useState([]);

    useEffect(() => {
        const fetchSpecs = async () => {
            try {
                const token = localStorage.getItem("token");
                const awsIP = process.env.REACT_APP_BACKEND_URL;
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Token ${token}`;

                const response = await axios.get(awsIP+"/home/");
                setSpecs(response.data);
                setIsSet(response.data.length > 0);
            } catch (error) {
                console.error("스펙 작성 여부 불러오기 에러:", error);
            }
        };

        fetchSpecs();
    }, []);

    return (
        <div className="HexagonGraphBox">
            {/*설정 여부에 따른 조건부 렌더링*/}
            {isSet ? <HexagonGraph /> : <BeforeSet onClick={TargetTag} />}
        </div>
    );
}

export default function Main() {
    const [selectedGoalId, setSelectedGoalId] = useState([]);

    return (
        <div>
            <TopBar selectedGoalId={selectedGoalId}></TopBar>
            <HexagonGraphBox></HexagonGraphBox>
            <Goals
                selectedGoalId={selectedGoalId}
                setSelectedGoalId={setSelectedGoalId}
            ></Goals>
            <Navigation></Navigation>
        </div>
    );
}

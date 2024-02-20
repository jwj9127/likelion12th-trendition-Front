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

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                // 토큰 가져오기
                const token = localStorage.getItem("token");
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Token ${token}`;

                const response = await axios.get("http://127.0.0.1:8000/home/");
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
            axios.defaults.headers.common["Authorization"] = `Token ${token}`;
            const response = await axios.get("http://127.0.0.1:8000/home/");
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
                {goals.map((goal) => (
                    <option key={goal.id} value={goal.id}>
                        {`스펙 ${goal.id}: ${goal.title}`}
                    </option>
                ))}
            </select>
            {subgoals
                ? subgoals.map((subgoal) => (
                      <GoalCheck subgoal={subgoal}></GoalCheck>
                  ))
                : null}
        </div>
    );
}

function TopBar({ selectedGoalId }) {
    const [goalTitle, setGoalTitle] = useState("");
    const [achievement, setAchievement] = useState("");
    useEffect(() => {
        const GetGoalData = () => {
            axios
                .get("http://127.0.0.1:8000/home/", {})
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
                <FontAwesomeIcon
                    icon={faGear}
                    style={{ fontSize: "25px", margin: "3vh 4vw 0.5vh 0vw" }}
                    onClick={TargetTag}
                />
            </div>
            <div className="state">
                <div className="state-category">OOO님의 {goalTitle} 목표</div>
                <div className="state-achiev">
                    달성도는 {achievement}%입니다
                </div>
            </div>
        </div>
    );
}

function GoalCheck({ subgoal }) {
    const [isChecked, setIsChecked] = useState(false);

    const token = localStorage.getItem("token");

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
                        url: "http://127.0.0.1:8000/home/goal/create",
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
                <div key={subgoal.id}>
                    {`Lv - ${parseInt(subgoal.id / 5)} : ${subgoal.title}`}
                    <img
                        className="subGoal-pencil"
                        src={pencil}
                        onClick={() => TargetGoals(subgoal)}
                        style={{
                            marginLeft: subgoal === undefined ? "60%" : "50%",
                        }}
                    />
                    {subgoal && (
                        <img
                            className="subGoal-garbage"
                            src={garbage}
                            onClick={() => DeleteGoals(subgoal.id)}
                        />
                    )}
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
            try {
                axios({
                    method: "delete",
                    url: "http://127.0.0.1:8000/home/subgoal/delete/${id}",
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
                const stack = document.getElementById("stack").value;
                try {
                    axios({
                        method: "put",
                        url: "http://127.0.0.1:8000/home/subgoal/update/",
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
                const stack = document.getElementById("stack").value;
                try {
                    axios({
                        method: "post",
                        url: "http://localhost:8000/home/subgoal/create/",
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
            const GoalForm = {};

            GoalForm[title1] = title1;
            GoalForm[title2] = title2;
            GoalForm[title3] = title3;
            GoalForm[title4] = title4;
            GoalForm[title5] = title5;
            GoalForm[title6] = title6;

            try {
                axios({
                    method: "post",
                    url: "http://127.0.0.1:8000/home/goal/create",
                    data: { GoalForm: GoalForm },
                }).then((result) => {
                    console.log(result);
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
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Token ${token}`;

                const response = await axios.get("http://127.0.0.1:8000/home/");
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

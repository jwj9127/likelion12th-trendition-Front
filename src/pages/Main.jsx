import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import "../css/Main.css";
import Navigation from "../component/Navigation";
import HexagonGraph from "../component/HexagonGraph";
import BeforeSet from "../component/BeforeSet";
import logo2 from "../imgs/logo2.png";
import pencil from "../imgs/pencil.png";
import garbage from "../imgs/garbage.png";
import Swal from "sweetalert2";
import axios from "axios";

function Goals({ goals, selectedGoalId, setSelectedGoalId }) {
    const [selectedGoalTitle, setSelectedGoalTitle] = useState("");
    const [selectedGoal, setSelectedGoal] = useState("");
    const [subgoals, setSubGoals] = useState([]);

    const handleGoalChange = async (e) => {
        e.preventDefault();
        setSelectedGoalId(e.target.value - 1);
        console.log("selected Spec id :", e.target.value);
    };

    useEffect(() => {
        const awsIP = process.env.REACT_APP_BACKEND_URL;
        const token = localStorage.getItem("token");

        axios({
            method: "get",
            url: awsIP + "/home/",
            headers: {
                Authorization: `Token ${token}`,
            },
        }).then((result) => {
            if(result.data.length > 0){
                const result_selectedGoal = result.data[0].title;
                const result_selectedGoalId = result.data[0].id;
                const result_subGoal = result.data[0].subgoals;
    
                if (!selectedGoalTitle.length) {
                    setSelectedGoalTitle(result_selectedGoal);
                    setSelectedGoal(result_selectedGoalId);
                    setSubGoals(result_subGoal);
                }
                if (selectedGoalId || selectedGoalId === 0) {
                    setSelectedGoalTitle(goals[selectedGoalId].title);
                    setSelectedGoal(goals[selectedGoalId].id);
                    setSubGoals(goals[selectedGoalId].subgoals);
                    console.log("Goals - setSelectedGoalTitle", selectedGoalTitle);
                    console.log("Goals - subgoals", subgoals);
                }
            }
        });

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
            <GoalCheck
                level={1}
                subgoals={subgoals}
                goalTitle={selectedGoalTitle}
                selectGoal={selectedGoal}
                ></GoalCheck>
            <GoalCheck
                level={2}
                subgoals={subgoals}
                goalTitle={selectedGoalTitle}
                selectGoal={selectedGoal}
                ></GoalCheck>
            <GoalCheck
                level={3}
                subgoals={subgoals}
                goalTitle={selectedGoalTitle}
                selectGoal={selectedGoal}
                ></GoalCheck>
            <GoalCheck
                level={4}
                subgoals={subgoals}
                goalTitle={selectedGoalTitle}
                selectGoal={selectedGoal}
                ></GoalCheck>
            <GoalCheck
                level={5}
                subgoals={subgoals}
                goalTitle={selectedGoalTitle}
                selectGoal={selectedGoal}
            ></GoalCheck>
        </div>
    );
}

function TopBar({ goals, selectedGoalId, username }) {
    const [selectedGoalTitle, setSelectedGoalTitle] = useState("");
    const [achievement, setAchievement] = useState("");
    useEffect(() => {
        const awsIP = process.env.REACT_APP_BACKEND_URL;
        const token = localStorage.getItem("token");

        axios({
            method: "get",
            url: awsIP + "/home/",
            headers: {
                Authorization: `Token ${token}`,
            },
        }).then((result) => {
            if(result.data.length > 0){
                const result_selectedGoal = result.data[0].title;
                const result_achievement = result.data[0].completion_rate;
    
                if (!selectedGoalTitle.length) {
                    setSelectedGoalTitle(result_selectedGoal);
                    setAchievement(result_achievement);
                }
                if (selectedGoalId || selectedGoalId === 0) {
                    setSelectedGoalTitle(goals[selectedGoalId].title);
                    setAchievement(goals[selectedGoalId].completion_rate);
                    console.log("TopBar - achievement changed:", achievement);
                }
            }
        });

    }, [selectedGoalId]);
    return (
        <div className="TopBar">
            <div className="TopBar-top">
                <div className="sublogo">
                    <img className="logo2" src={logo2}></img>
                    <div className="logo2-name">식스펙</div>
                </div>
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
            {selectedGoalTitle ? (
                <div className="state">
                    <div className="state-category">
                        {username}님의 {selectedGoalTitle}
                    </div>
                    <div className="state-achiev">
                        달성도는 {achievement}%입니다
                    </div>
                </div>
            ) : (
                <div className="state">
                    <div className="state-category">
                        환영해요, {username}님!
                    </div>
                    <div className="state-achiev">스펙을 설정해주세요</div>
                </div>
            )}
        </div>
    );
}

function GoalCheck({ level, subgoals, goalTitle, selectGoal }) {
    const subgoal = subgoals ? subgoals[level - 1] : undefined; // subgoal 가져오기
    
    const token = localStorage.getItem("token");
    const awsIP = process.env.REACT_APP_BACKEND_URL;
    useEffect(() =>{
        if(selectGoal){
            axios({
                method: "get",
                url: awsIP + `/home/subgoal/bygaol/${selectGoal}`,
                headers: {
                    Authorization: `Token ${token}`,
                },
            }).then((result) => {
                console.log(result.data);
                const completedSubgoals = result.data.filter((subgoal) => subgoal.is_completed === true);
                console.log("Completed subgoals:", completedSubgoals);
            })
        }
    }, [selectGoal])

    const checkBox = (level, subgoalId) => {
        axios({
            method: "put",
            url: awsIP + `/home/subgoal/update/${subgoalId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: { is_completed: true },
        }).then(() => {
            window.location.reload(); // 페이지 새로고침
        }).catch((error) => {
            console.error("Error updating subgoal:", error);
        });
    };

    if(!selectGoal){
        return(
            <div className="subGoal">
                <div className="subGoal-text">
                    <div key={level}>
                        {`Lv - ${level} : 스펙을 설정해주세요`}
                        {goalTitle.length > 0 && (
                            <img
                                className="subGoal-pencil"
                                src={pencil}
                                onClick={() => TargetGoals(subgoal, goalTitle)}
                                style={{
                                    marginLeft: "25%",
                                    marginRight: "5%",
                                    width: "25px",
                                    height: "25px",
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    }

    if (!subgoal) {
        return (
            <div className="subGoal">
                <div className="subGoal-text">
                    <div key={level}>
                        {`Lv - ${level} : 세부 목표를 설정해주세요`}
                        {goalTitle.length > 0 && (
                            <img
                                className="subGoal-pencil"
                                src={pencil}
                                onClick={() => TargetGoals(subgoal, goalTitle)}
                                style={{
                                    marginLeft: "25%",
                                    marginRight: "5%",
                                    width: "25px",
                                    height: "25px",
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="subGoal">
            <input
                className={
                    subgoal.is_completed ? "subGoal-check-checked" : "subGoal-check"
                }
                type="checkbox"
                onClick={() => checkBox(level, subgoal.id)}
                disabled={subgoal.is_completed}
            ></input>
            <div className="subGoal-text">
                <div key={level}>
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
                            onClick={() => TargetGoals(subgoal, goalTitle)}
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
                    url: awsIP + `/home/subgoal/delete/${id}`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: id,
                }).then(() => {
                    window.location.reload();
                });
            } catch (err) {
                console.error(err);
            }
        }
    });
}

function TargetGoals(subgoal, goalTitle) {
    let goalId = undefined;
    const TitleID = JSON.parse(localStorage.getItem("titleIdMap"));

    for (let key in TitleID) {
        console.log(key === goalTitle, TitleID[key], key, goalTitle);
        if (key === goalTitle) {
            goalId = TitleID[key];
        }
    }

    if (subgoal) {
        let subGoalId = undefined;
        const sub_titleId = JSON.parse(localStorage.getItem("sub_titleIdMap"));
        for (let key in sub_titleId) {
            console.log(
                key === subgoal.title,
                sub_titleId[key],
                key,
                subgoal.title
            );
            if (key === subgoal.title) {
                subGoalId = sub_titleId[key];
            }
        }
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
                const title = document.getElementById("stack").value;
                const awsIP = process.env.REACT_APP_BACKEND_URL;
                try {
                    axios({
                        method: "put",
                        url: awsIP + `/home/subgoal/update/${subGoalId}`,
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        data: { title },
                    }).then(() => {
                        window.location.reload();
                    });
                } catch (err) {
                    console.error(err);
                }
            }
        });
    }

    if (!subgoal) {
        let sub_title;
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
            preConfirm: () => {
                sub_title = document.getElementById("stack").value;
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem("token");
                const title = document.getElementById("stack").value;
                const awsIP = process.env.REACT_APP_BACKEND_URL;
                try {
                    axios({
                        method: "post",
                        url: awsIP + `/home/subgoal/create/${goalId}`,
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        data: { title },
                    }).then((result) => {
                        const sub_titleIdMap =
                            JSON.parse(
                                localStorage.getItem("sub_titleIdMap")
                            ) || {}; // 기존 데이터 가져오기
                        sub_titleIdMap[sub_title] = result.data.subgoal_id; // 새로운 데이터 추가
                        localStorage.setItem(
                            // 업데이트된 데이터 저장
                            "sub_titleIdMap",
                            JSON.stringify(sub_titleIdMap)
                        );
                        console.log(sub_titleIdMap);
                        window.location.reload();
                    });
                } catch (err) {
                    console.error(err);
                }
            }
        });
    }
}

const TargetTag = () => {
    let title1, title2, title3, title4, title5, title6;

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
        preConfirm: () => {
            title1 = document.getElementById("stack1").value;
            title2 = document.getElementById("stack2").value;
            title3 = document.getElementById("stack3").value;
            title4 = document.getElementById("stack4").value;
            title5 = document.getElementById("stack5").value;
            title6 = document.getElementById("stack6").value;
        },
    }).then((result) => {
        if (result.isConfirmed) {
            const title = { title1, title2, title3, title4, title5, title6 };

            try {
                const token = localStorage.getItem("token");
                const awsIP = process.env.REACT_APP_BACKEND_URL;
                console.log(token);

                axios({
                    method: "post",
                    url: awsIP + "/home/goal/createall/",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    data: title,
                }).then((result) => {
                    const titleIdMap = {};

                    titleIdMap[title1] = result.data.id[0];
                    titleIdMap[title2] = result.data.id[1];
                    titleIdMap[title3] = result.data.id[2];
                    titleIdMap[title4] = result.data.id[3];
                    titleIdMap[title5] = result.data.id[4];
                    titleIdMap[title6] = result.data.id[5];

                    // localstorage에 저장

                    localStorage.setItem(
                        "titleIdMap",
                        JSON.stringify(titleIdMap)
                    );

                    window.location.reload();
                });
            } catch (err) {
                console.error(err);
            }
        }
    });
};

function HexagonGraphBox() {
    const [isSet, setIsSet] = useState(false);

    useEffect(() => {
        const fetchSpecs = async () => {
            try {
                const token = localStorage.getItem("token");
                const awsIP = process.env.REACT_APP_BACKEND_URL;
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Token ${token}`;

                const response = await axios.get(awsIP + "/home/");
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
    // 골 전체
    const [goals, setGoals] = useState([]);
    // 선택된 골, 아이디
    const [selectedGoal, setSelectedGoal] = useState([]);
    const [selectedGoalId, setSelectedGoalId] = useState("");
    // 유저 네임
    const username = localStorage.getItem("username");

    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
            const awsIP = process.env.REACT_APP_BACKEND_URL;
            axios({
                method: "get",
                url: awsIP + "/home/",
                headers: {
                    Authorization: `Token ${token}`,
                },
            }).then((result) => {
                if (result.data && result.data.length > 0) {
                    setGoals(result.data);
                    console.log("goals", goals);
                    if (selectedGoalId) {
                        setSelectedGoal(goals[selectedGoalId]);
                    }
                }
            });
        } catch (error) {
            console.error(error);
        }
    }, [selectedGoalId]);

    console.log("main-selectedGoalId", selectedGoalId);
    console.log("main-selectedGoal", selectedGoal);

    return (
        <div>
            <TopBar
                goals={goals}
                selectedGoalId={selectedGoalId}
                username={username}
            ></TopBar>
            <HexagonGraphBox></HexagonGraphBox>
            <Goals
                goals={goals}
                selectedGoalId={selectedGoalId}
                setSelectedGoalId={setSelectedGoalId}
            ></Goals>
            <Navigation></Navigation>
        </div>
    );
}

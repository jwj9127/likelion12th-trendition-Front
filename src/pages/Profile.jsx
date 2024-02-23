import { React, useEffect, useState } from "react";
import Navigation from "../component/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import logo2 from "../imgs/logo2.png";
import "../css/Profile.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function Goals({ goals, selectedGoalId, setSelectedGoalId }) {
    const [selectedGoalTitle, setSelectedGoalTitle] = useState("");
    const [subgoals, setSubGoals] = useState([]);
    const username = window.localStorage.getItem('usernameProfile');

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
            url: awsIP + `/home/goal/${username}`,
            headers: {
                Authorization: `Token ${token}`,
            },
        }).then((result) => {
            if(result.data.length > 0){
                const result_selectedGoal = result.data[0].title;
                const result_subGoal = result.data[0].subgoals;
    
                if (!selectedGoalTitle.length) {
                    setSelectedGoalTitle(result_selectedGoal);
                    setSubGoals(result_subGoal);
                }
                if (selectedGoalId || selectedGoalId === 0) {
                    setSelectedGoalTitle(goals[selectedGoalId].title);
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
            ></GoalCheck>
            <GoalCheck
                level={2}
                subgoals={subgoals}
                goalTitle={selectedGoalTitle}
            ></GoalCheck>
            <GoalCheck
                level={3}
                subgoals={subgoals}
                goalTitle={selectedGoalTitle}
            ></GoalCheck>
            <GoalCheck
                level={4}
                subgoals={subgoals}
                goalTitle={selectedGoalTitle}
            ></GoalCheck>
            <GoalCheck
                level={5}
                subgoals={subgoals}
                goalTitle={selectedGoalTitle}
            ></GoalCheck>
        </div>
    );
}

function GoalCheck({ level, subgoals, goalTitle }) {
    const [isChecked, setIsChecked] = useState(false);
    const subgoal = subgoals ? subgoals[level - 1] : undefined; // subgoal 가져오기

    const token = localStorage.getItem("token");
    const awsIP = process.env.REACT_APP_BACKEND_URL;

    if (!subgoal) {
        return (
            <div className="subGoal">
                <div className="subGoal-text">
                    <div key={level}>
                        {`Lv - ${level} : 세부 목표가 설정되지 않았습니다`}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="subGoal">
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
                    </div>
                </div>
            </div>
        </div>
    );
}


export default function Profile() {
    const location = useLocation();
    window.localStorage.setItem('usernameProfile', location.state.username);
    const username = window.localStorage.getItem('usernameProfile');
    const [data, setData] = useState([]);
    const [follow, setFollow] = useState();
    const [goals, setGoals] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [selectedGoal, setSelectedGoal] = useState([]);
    const [selectedGoalId, setSelectedGoalId] = useState("");
    const awsIP = process.env.REACT_APP_BACKEND_URL;
    const token = window.localStorage.getItem('token');
    
    useEffect(() => {
        try{
            axios({
                method: "get",
                url: awsIP + `/home/goal/${username}`,
                headers: {
                    Authorization: `Token ${token}`,
                },
            }).then((result) => {
                console.log(result.data)
                if (result.data && result.data.length > 0) {
                    setGoals(result.data);
                    if (selectedGoalId) {
                        setSelectedGoal(goals[selectedGoalId]);
                    }
                }
            });
            axios({
                method: 'get',
                url: awsIP+`/join/search_user/?keyword=${username}`,
                headers: {
                    Authorization: `Bearer ${token}`
              }
            }).then((result) => {
                console.log(result.data);
                setData(result.data[0]);
            })
            axios({
                method: 'get',
                url: awsIP+`/join/follow/${username}/`,
                headers: {
                    Authorization: `Bearer ${token}`
                  }
            }).then((result) => {
                console.log(result.data)
                if(result.data === '팔로우 상태입니다.'){
                    setFollow(true);
                }
                if(result.data === '언팔로우 상태입니다.'){
                    setFollow(false);
                }
            })
        }catch(err){
            console.error(err);
        }
    },[])
    
    const handleFollow = (username) => {
        const awsIP = process.env.REACT_APP_BACKEND_URL;
        try{
            axios({
                method: 'post',
                url: awsIP+`/join/follow/${username}/`,
                headers: {
                    Authorization: `Bearer ${token}`
                  }
            }).then((result) => {
                console.log(result.data);
                if(result.data === '팔로우 했습니다.'){
                    setFollow(true);
                }
                if(result.data === '언팔로우 했습니다.'){
                    setFollow(false);
                }
            })
            }catch(err){
            console.error(err);
            }
    };

    return (
        <div>
            <div className="mypage_top_setting">
                <div className="profile_top_setting_flex">
                    <div>
                        <img className="logo2" src={logo2} alt="logo"></img>
                        <p className="logo2-name">식스펙</p>
                    </div>
                    <p style={{ fontSize: "15px" }}>@{data.username}</p>
                </div>
                <div className="mypage_main_profile">
                    <div className="mypage_main_img"></div>
                    <p>{data.username}</p>
                </div>
                <div className="profile_middle_box">
                    <FontAwesomeIcon className="profile_message_img" icon={faPaperPlane} />
                    <button className={follow ? "profile_button" : "profile_button_follow"} onClick={() => handleFollow(data.username)}>
                        {follow ? '팔로워' : '팔로잉'}
                    </button>
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
                <button className="mypage_doneBtn">{completed} done</button>
            </div>
            <Goals
                goals={goals}
                selectedGoalId={selectedGoalId}
                setSelectedGoalId={setSelectedGoalId}
            ></Goals>
            <Navigation></Navigation>
        </div>
    );
}

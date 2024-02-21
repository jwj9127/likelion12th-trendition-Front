import { React, useEffect, useState } from "react";
import Navigation from "../component/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import logo2 from "../imgs/logo2.png";
import "../css/Profile.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function GoalCheck({ level }) {
    const [isChecked, setIsChecked] = useState(false);
    const subgoals = window.localStorage.getItem('subgoals');

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

    // if(subgoals.is_completed){
    //     setIsChecked(true);
    // }
    return (
        <div className="subGoal">
            <input id="subGoal-check-completed" className={isChecked ? "subGoal-check-checked" : "subGoal-check"} type="checkbox" disabled={isChecked}></input>
            <div className="subGoal-text">
                {/* {`Lv - ${level} : ${subgoals.detail}`} */}
            </div>
        </div>
    );
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


export default function Profile() {
    const location = useLocation();
    window.localStorage.setItem('username', location.state.username);
    const username = window.localStorage.getItem('username');
    const [data, setData] = useState([]);
    const [follow, setFollow] = useState();
    const awsIP = process.env.REACT_APP_BACKEND_URL;
    useEffect(() => {
        try{
            axios({
                method: 'get',
                url: awsIP+`/join/search_user/?keyword=${username}`,
                headers: {
                    Authorization: `Bearer 45756420a4182dcc60ceaaabf2934d6ee79ea1ee`
              }
            }).then((result) => {
                console.log(result.data);
                setData(result.data[0]);
            })
            axios({
                method: 'get',
                url: awsIP+`/join/follow/${username}/`,
                headers: {
                    Authorization: `Bearer 45756420a4182dcc60ceaaabf2934d6ee79ea1ee`
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
                    Authorization: `Bearer 45756420a4182dcc60ceaaabf2934d6ee79ea1ee`
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
            <Navigation></Navigation>
            <div className="mypage_top_setting">
                <div className="profile_top_setting_flex">
                    <div>
                        <img className="logo2" src={logo2} alt="logo"></img>
                        <p className="logo2-name">식스펙</p>
                    </div>
                    <p style={{ fontSize: "15px" }}>{data.username}</p>
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
                <button className="mypage_doneBtn">15 done</button>
            </div>
            <Goals />
        </div>
    );
}

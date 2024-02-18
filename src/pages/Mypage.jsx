import { React, useEffect } from "react";
import Navigation from "../component/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import logo2 from "../imgs/logo2.png";
import '../css/Mypage.css';
import { Link } from "react-router-dom";
import axios from "axios";

export default function Mypage() {
    // const img = window.localStorage.getItem('img')
    // const username = window.localStorage.getItem('username')
    // const name = window.localStorage.getItem('name')
    // const follow = window.localStorage.getItem('follow')
    // const follower = window.localStorage.getItem('follower')
    // const goals = window.localStorage.getItem('goals')

    // useEffect(() => {
        // try{
        //         axios({
        //             method: 'get',
        //             url: '/join/mypage/'
        //         }).then((result) => {
        //             window.localStorage.setItem('img', result.data.img)
        //             window.localStorage.setItem('username', result.data.username)
        //             window.localStorage.setItem('name', result.data.name)
        //             window.localStorage.setItem('follow', result.data.follow)
        //             window.localStorage.setItem('follower', result.data.follower)
        //             window.localStorage.setItem('goals', result.data.goals)
        //         })
        // }catch(err){
        //     console.error(err);
        // }
    // }, [])

    return (
        <div>
            <Navigation></Navigation>
            <div className="mypage_top_setting">
                <div className="mypage_top_setting_flex">
                    <div>
                        <img className="logo2" src={logo2} alt="logo"></img>
                        <p className="logo2-name">식스펙</p>
                    </div>
                    <p>@brunopham</p>
                    <Link to={'/Setting'}><FontAwesomeIcon icon={faGear} size="2x" /></Link>
                </div>
                <div className="mypage_main_profile">
                    <div className="mypage_main_img"></div>
                    <p>Bruno Pham</p>
                </div>
            </div>
            <div className="mypage_followBox">
                <p>220<Link to="/follow" className="font-gray">
                    Follow
                </Link></p>
                <p>150<Link to="/follower" className="font-gray">
                    Followers
                </Link></p>
            </div>
            <div>
                <button className="mypage_doneBtn">15 done</button>
            </div>
        </div>
    );
}

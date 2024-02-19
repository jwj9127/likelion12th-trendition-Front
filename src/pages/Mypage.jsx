import { React, useEffect, useState } from "react";
import Navigation from "../component/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import logo2 from "../imgs/logo2.png";
import "../css/Mypage.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Mypage() {
    const [data, setData] = useState([]);
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

    useEffect(() => {
        fetch('http://127.0.0.1:8000/join/mypage/', {
          headers: {
            Authorization: `Bearer 45756420a4182dcc60ceaaabf2934d6ee79ea1ee`
          }
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log(data);
            setData(data);
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });
      }, []);

    return (
        <div>
            <Navigation></Navigation>
            <div className="mypage_top_setting">
                <div className="mypage_top_setting_flex">
                    <div>
                        <img className="logo2" src={logo2} alt="logo"></img>
                        <p className="logo2-name">식스펙</p>
                    </div>
                    <p style={{ fontSize: "15px" }}>@brunopham</p>
                    <Link to={"/Setting"}>
                        <FontAwesomeIcon
                            icon={faGear}
                            style={{ fontSize: "25px" }}
                        />
                    </Link>
                </div>
                <div className="mypage_main_profile">
                    <div className="mypage_main_img"></div>
                    <p>{data.username}</p>
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
        </div>
    );
}

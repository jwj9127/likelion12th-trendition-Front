import { React } from "react";
import "../css/Search.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faList,
    faMagnifyingGlass,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import logo2 from "../imgs/logo2.png";
import send from "../imgs/Send.png";
import Navigation from "../component/Navigation";
import axios from "axios";

export default function Search() {
    // const follow = window.localStorage.getItem('follow')
    // const follower = window.localStorage.getItem('follower')
    // const username = window.localStorage.getItem('username')
    const search_username = document.getElementById("search_username");
    function Search() {
        try{
            axios({
                method: 'post',
                url: '/search/?keyword=',
                data: search_username
            }).then((result) => {
                window.localStorage.setItem('username', result.data.username)
                window.localStorage.setItem('follow', result.data.follow)
                window.localStorage.setItem('follower', result.data.follower)
            })
        }catch(err){
            console.error(err);
        }
    }

    return (
        <div className="search_bigBox">
            <div className="search_topBox">
                <div className="search_logoBox">
                    <img className="logoBox_logo" src={logo2} alt="logo"/>
                    <div className="logoBox_name">식스펙</div>
                </div>
                <div className="search_SMBox">
                    <form className="search_searchBox" onSubmit={Search}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} color="#5e47d2"/>
                        <input id="search_username" type="text" placeholder="검색"/>
                    </form>
                    <div className="search_messageBox">
                        <img className="search_message_img" src={send} alt="send"/>
                    </div>
                </div>
            </div>
            <div className="search_navBox">
                <div className="search_account">계정</div>
                <div className="search_post">게시물</div>
                <div className="search_data">자료</div>
            </div>
            <div className="search_account_titles">
                <div className="search_account_titles_main">
                    <div className="search_account_titles_main_img"></div>
                    <div className="search_account_titles_main_name">
                        <div>Joshua Rain</div>
                        <p>@joshua_I</p>
                    </div>
                </div>
            </div>
            <Navigation></Navigation>
        </div>
    );
}

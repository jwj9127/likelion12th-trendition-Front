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

export default function Search() {
    return (
        <div className="search_bigBox">
            <div className="search_topBox">
                <div className="search_logoBox">
                    <img className="logoBox_logo" src={logo2} alt="logo"/>
                    <div className="logoBox_name">식스펙</div>
                </div>
                <div className="search_SMBox">
                    <div className="search_searchBox">
                        <FontAwesomeIcon icon={faMagnifyingGlass} color="#5e47d2"/>
                        <input type="text" placeholder="검색"/>
                    </div>
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

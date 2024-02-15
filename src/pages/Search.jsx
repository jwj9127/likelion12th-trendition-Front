import { React } from "react";
import "../css/Search.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faList,
    faMagnifyingGlass,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../imgs/logo.png";

export default function Search() {
    return (
        <div className="search_bigBox">
            <div className="search_logoBox">
                <img className="logoBox_logo" src={logo} alt="logo"></img>
                <div className="logoBox_content">
                    <div className="logoBox_name">식스펙</div>
                    <div className="logoBox_slogun">SIXPEC</div>
                </div>
            </div>
            <div className="search_searchBox">
                <FontAwesomeIcon icon={faMagnifyingGlass} color="#5e47d2"/>
                <input type="text" placeholder="검색"/>
            </div>
            <div className="search_account">계정</div>
            <div className="search_account_titles">
                <div className="search_account_titles_main">
                    <div className="search_account_titles_main_img"></div>
                    <div>
                        <div>Joshua Rain</div>
                        <p>@joshua_I</p>
                    </div>
                </div>
            </div>
            <div className="app_navigation">
                <Link to="/">
                    <FontAwesomeIcon icon={faList} size="2x" />
                </Link>
                <Link to="/search">
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" />
                </Link>
                <Link to="/mypage">
                    <FontAwesomeIcon icon={faUser} size="2x" />
                </Link>
            </div>
        </div>
    );
}

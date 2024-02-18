import React, { useEffect, useState } from "react";
import "../css/Navigation.css";
import { Link, useLocation } from "react-router-dom";
import searchGray from "../imgs/search_g.png";
import searchPurple from "../imgs/search_p.png";
import homeGray from "../imgs/home_g.png";
import homePurple from "../imgs/home_p.png";
import myGray from "../imgs/my_g.png";
import myPurple from "../imgs/my_p.png";

const Navigation = () => {
    const location = useLocation();
    const searchIconSrc = location.pathname === '/search' ? searchPurple : searchGray;
    const homeIconSrc = location.pathname === '/main' ? homePurple : homeGray;
    const myIconSrc = location.pathname === '/mypage' ? myPurple : myGray;

    return (
        <div className="Nav">
            <hr className="navLine"></hr>
            <div className="icons">
                <Link to="/search">
                    <img className="search-icon" src={searchIconSrc}></img>
                </Link>
                <Link to="/main">
                    <img className="home-icon" src={homeIconSrc}></img>
                </Link>
                <Link to="/mypage">
                    <img className="my-icon" src={myIconSrc}></img>
                </Link>
            </div>
        </div>
    );
};

export default Navigation;

import { React } from "react";
import Navigation from "../component/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import logo2 from "../imgs/logo2.png";
import '../css/Mypage.css';
import { Link } from "react-router-dom";

export default function Mypage() {
    return (
        <div>
            <Navigation></Navigation>
            <div className="mypage_top_setting">
                <div className="mypage_top_setting_flex">
                    <div>
                        <img className="mypage_logoBox_logo" src={logo2} alt="logo"></img>
                        <p>마라톤</p>
                    </div>
                    <p>@brunopham</p>
                    <Link to={'/follow'}><FontAwesomeIcon icon={faGear} size="2x"/></Link>
                    </div>
                <div className="mypage_main_profile">
                    <div className="mypage_main_img"></div>
                    <p>Bruno Pham</p>
                </div>
            </div>
            <div className="mypage_followBox">
                <p>220<i>Followers</i></p>
                <p>150<i>Following</i></p>
            </div>
        </div>
    );
}

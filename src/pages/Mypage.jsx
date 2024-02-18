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

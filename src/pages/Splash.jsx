import { React } from "react";
import { Link } from "react-router-dom";
import "../css/Splash.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import topImg from "../imgs/splash_t.png";
import bottomImg from "../imgs/splash_b.png";
import logo from "../imgs/logo.png";

function Top() {
    return <img className="top" src={topImg}></img>;
}
function Logo() {
    return (
        <div className="logoBox">
            <img className="logo" src={logo} alt="logo"></img>
            <div className="name">식스펙</div>
            <div className="slogun">SIXPEC</div>
            <div className="slogun2">나다움을 찾기 위한</div>
            <div className="slogun3">건강한 스펙 쌓기</div>
        </div>
    );
}
function Bottom() {
    return <img className="bottom" src={bottomImg}></img>;
}

export default function Splash() {
    const navigate = useNavigate();
    // 5초 후 다음 페이지로 이동
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/login");
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);
    return (
        <div className="SplashBox">
            <Top></Top>
            <Logo></Logo>
            <Bottom></Bottom>
        </div>
    );
}

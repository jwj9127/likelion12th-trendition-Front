import React from "react";
import { useState, useEffect } from "react";
import "../../css/Follow.css";
import backIcon from "../../imgs/backIcon.png";
import { Link } from "react-router-dom";
import ProfileImg from "../../imgs/profile.png";
import slashIcon from "../../imgs/slash-circle.png"

const Block = () => {
  const [data, setData] = useState([{username: "이름", avatar_url: ProfileImg, block: false, name: "아이디", login: "사람 이름"},{username: "이름1", avatar_url: ProfileImg, block: true, name: "아이디1", login: "사람 이름 1"}]);

  // useEffect(() => {
  //   fetch('https://api.github.com/users/이름/following')
  //     .then((response) => response.json())
  //     .then((json) => setData(json));
  // }, []);

  return (
    <div className="main">
      <div className="top-nav">
        <Link to="/setting/privacy" className="font-gray">
          <img src={backIcon} alt="뒤로가기" />
        </Link>
        <h2 className="title">팔로우</h2>
        <div></div>
      </div>
      <ul className="list">
        {data.map((item) => (
          <li key={item.username} className="list-item">
            <img className="profile-image" src={item.avatar_url} alt="" />
            <div className="info">
              <h3>{item.login}</h3>
              <p className="username">{item.name}</p>
            </div>
            <img className="block_slash" src={slashIcon} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Block;

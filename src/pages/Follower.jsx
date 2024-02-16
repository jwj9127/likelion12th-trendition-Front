import React from "react";
import { useState, useEffect } from "react";
// import "../css/Follower.css";
import "../css/Follow.css";
import backIcon from "../imgs/backIcon.png";

const Follower = () => {
  const [data, setData] = useState([{username: "이름", avatar_url: "이미지", following: false, name: "아이디", login: "사람 이름"},{username: "이름1", avatar_url: "이미지", following: true, name: "아이디1", login: "사람 이름 1"}]);

  // useEffect(() => {
  //   fetch('https://api.github.com/users/이름/following')
  //     .then((response) => response.json())
  //     .then((json) => setData(json));
  // }, []);

  const handleFollow = (username) => {
    setData(data.map((i) => {
      if (i.username === username) {
        if (i.following === false){
          i.following = true;
        }else{
          i.following = false;
        }
      }
      return i;
    }));
  };

  return (
    <div className="main">
      <div className="top-nav">
        <img src={backIcon} alt="뒤로가기" />
        <h2 className="title">팔로우</h2>
        <div></div>
      </div>
      <ul className="list">
        {data.map((item) => (
          <li key={item.username} className="list-item">
            <img className="profile-image" src={item.avatar_url} alt="" />
            <div className="info">
              <h3 className="name">{item.login}</h3>
              <p className="username">{item.name}</p>
            </div>
            <button className="button" onClick={() => handleFollow(item.username)}>
              {item.following ? '팔로잉' : '팔로워'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Follower;

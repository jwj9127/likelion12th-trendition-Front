import React from "react";
import { useState, useEffect } from "react";
import "../css/Follow.css";
import backIcon from "../imgs/backIcon.png";
import { Link } from "react-router-dom";
import ProfileImg from "../imgs/profile.png";

const awsIP = process.env.REACT_APP_BACKEND_URL;

const Following = () => {
  const [data, setData] = useState([]);
  const [login_token, setLoginToken] = useState(localStorage.getItem('token') || '');
  const username = window.localStorage.getItem("usernameProfile");

  useEffect(() => {
    fetch(awsIP+`/join/following/${username}`, {
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



  const onFollow = (username) => {
    fetch(awsIP+`/join/follow/${username}/`, {
      method: 'POST', // 요청을 POST 메소드로 변경
      headers: {
        'Authorization': `Bearer ${login_token}`,
        'Content-Type': 'application/json' // 요청 본문의 타입을 JSON으로 지정 (만약 JSON이 아니라면 적절한 타입으로 변경)
      },
      body: JSON.stringify({}) // POST 요청의 경우 필요한 경우에 요청 본문을 지정
    }).then(response => { console.log(response.text); })
  }


  const handleFollow = (username) => {
    setData(data.map((i) => {
      if (i.username === username) {
        if (i.following === false) {
          i.following = true;
          onFollow(username)
        } else {
          i.following = false;
          onFollow(username)
        }
      }
      return i;
    }));
  };

  const BackProfile = () => {
    window.history.back();
  }

  return (
    <div className="main">
      <div className="top-nav">
        <div className="font-gray" onClick={() => BackProfile()}>
          <img src={backIcon} alt="뒤로가기" />
        </div>
        <h2 className="title">팔로우</h2>
        <div></div>
      </div>
      <ul className="list">
        {data.map((item) => (
          <li key={item.username} className="list-item">
            <img className="profile-image" src={ProfileImg} alt="" />
            <div className="info">
              <h3>{item.username}</h3>
              <p className="username">{item.username}</p>
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

export default Following;

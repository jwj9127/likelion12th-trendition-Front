import React, { useState, useEffect } from "react";
import "../css/Follow.css";
import backIcon from "../imgs/backIcon.png";
import { Link } from "react-router-dom";
import ProfileImg from "../imgs/profile.png";
import axios from "axios";

const awsIP = process.env.REACT_APP_BACKEND_URL;

const Following = () => {
  const [data, setData] = useState([]);
  const [login_token, setLoginToken] = useState(localStorage.getItem('token') || '');
  const username = window.localStorage.getItem("usernameProfile");

  useEffect(() => {
    fetch(awsIP + `/join/following/${username}`, {
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

  const handleFollow = (username) => {
    const awsIP = process.env.REACT_APP_BACKEND_URL;
    try {
      axios({
        method: "post",
        url: awsIP + `/join/follow/${username}/`,
        headers: {
          Authorization: `Bearer ${login_token}`,
        },
      }).then((result) => {
        const newData = data.map(item => {
          if (item.username === username) {
            return {
              ...item,
              follow: !item.follow
            };
          }
          return item;
        });
        setData(newData);
      });
    } catch (err) {
      console.error(err);
    }
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
            <button
              className={
                "button"
              }
              
            >
              {"팔로워"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Following;

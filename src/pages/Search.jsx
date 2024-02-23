import { React, useEffect, useState } from "react";
import "../css/Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import logo2 from "../imgs/logo2.png";
import Navigation from "../component/Navigation";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Search() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);
    const login_token = window.localStorage.getItem("token");

    function Search(e) {
        e.preventDefault();
        const username = document.getElementById("search_username").value;
        const awsIP = process.env.REACT_APP_BACKEND_URL;
        try {
            axios({
                method: "get",
                url: awsIP + `/join/search_user/?keyword=${username}`,
                headers: {
                    Authorization: `Bearer ${login_token}`,
                },
            }).then((result) => {
                if (Array.isArray(result.data)) {
                    const username = localStorage.getItem("username");
                    const filteredUsers = result.data.filter((user) => user.username !== username);
                    setUser(filteredUsers);
                    if (
                        result.data.error === "검색어가 없습니다." ||
                        result.data.error == "해당 유저는 존재하지 않습니다." ||
                        filteredUsers.length === 0
                    ) {
                        Swal.fire({
                            title: "해당 회원은 존재하지 않습니다.",
                        }).then(()=>{
                            window.location.reload();
                        });
                    }
                } else {
                    Swal.fire({
                        title: "해당 회원은 존재하지 않습니다.",
                    }).then(()=>{
                        window.location.reload();
                    });
                }
                 
            });
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const awsIP = process.env.REACT_APP_BACKEND_URL;
        try {
            const username = localStorage.getItem("username");
            axios({
                method: "get",
                url: awsIP + "/join/search/",
                headers: {
                    Authorization: `Bearer ${login_token}`,
                },
            }).then((result) => {
                console.log(result.data);
                const filteredUsers = result.data.filter((user) => user.username !== username);
                setUsers(filteredUsers);
                console.log(result.data[0].profileImage);
            });
        } catch (err) {
            console.error(err);
        }
    }, []);

    return (
        <div className="search_bigBox">
            <div className="search_topBox">
                <div className="search_logoBox">
                    <img className="logoBox_logo" src={logo2} alt="logo" />
                    <div className="logoBox_name">식스펙</div>
                </div>
                <div className="search_SMBox">
                    <form className="search_searchBox" onSubmit={Search}>
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            color="#5e47d2"
                            onSubmit={Search}
                        />
                        <input
                            id="search_username"
                            type="text"
                            placeholder="검색"
                        />
                    </form>
                    <div className="search_messageBox" onClick={Search}>
                        <FontAwesomeIcon
                            className="search_message_img"
                            icon={faPaperPlane}
                        />
                    </div>
                </div>
            </div>
            <div className="search_navBox">
                <div className="search_account">계정</div>
                <div className="search_post">게시물</div>
                <div className="search_data">자료</div>
            </div>
            <div className="search_account_titles">
                {user.length > 0
                    ? user.map((user, index) => (
                          <div
                              className="search_account_titles_main"
                              key={index}
                          >
                              <img
                                  className="search_account_titles_main_img"
                                  src={user.profileImage}
                              ></img>
                              <div className="search_account_titles_main_name">
                                  <Link
                                      to={"/profile"}
                                      state={{ username: user.username }}
                                  >
                                      <div>{user.username}</div>
                                  </Link>
                                  <p>@{user.username}</p>
                              </div>
                          </div>
                      ))
                    : users.map((user, index) => (
                          <div
                              className="search_account_titles_main"
                              key={index}
                          >
                              <img
                                  className="search_account_titles_main_img"
                                  src={user.profileImage}
                              ></img>
                              <div className="search_account_titles_main_name">
                                  <Link
                                      to={"/profile"}
                                      state={{ username: user.username }}
                                  >
                                      <div>{user.username}</div>
                                  </Link>
                                  <p>@{user.username}</p>
                              </div>
                          </div>
                      ))}
            </div>
            <Navigation />
        </div>
    );
}

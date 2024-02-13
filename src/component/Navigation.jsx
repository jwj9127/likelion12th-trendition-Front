import React, { useEffect, useState } from "react";
import "../css/Navigation.css";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faList,
    faMagnifyingGlass,
    faUser,
} from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
    return (
        <div className="app_main_img">
            <div className="app_navigation_margin"></div>
            <div className="app_navigation">
                <Link to="/">
                    <FontAwesomeIcon icon={faList} size="2x" />
                </Link>
                <Link to="/">
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" />
                </Link>
                <Link to="/">
                    <FontAwesomeIcon icon={faUser} size="2x" />
                </Link>
            </div>
        </div>
    );
};

export default Navigation;

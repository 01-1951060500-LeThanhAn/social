import React from "react";
import { Link } from "react-router-dom";

const MeunItem = ({ menu }) => {
  return (
    <>
      <Link to={menu.to}>
        <div className="flex items-center cursor-pointer">
          <div className="menu__icon">{menu.icon}</div>
          <div className="ml-3">{menu.title}</div>
        </div>
      </Link>
    </>
  );
};

export default MeunItem;

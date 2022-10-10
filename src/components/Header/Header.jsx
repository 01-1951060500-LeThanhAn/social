import React, { useState } from "react";
import "./Header.css";
import { FaInstagramSquare } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io"
import { Link } from "react-router-dom";
import { useUserAuth } from "../../AuthContext/userAuthContext";

import Menu from "../Menu/Menu";

const Header = ({ handleClickAddNewPost }) => {
  const { user } = useUserAuth();

  const [addNew, setAddNew] = useState(false);
  const transferMessageAddNewPost = (addNew) => {
    setAddNew(true);
    handleClickAddNewPost(addNew);
  };

  return (
    <div className="fixed top-0 left-0 right-0 w-full h-[75px] bg-white z-50">
      <div className="header">
        <Link to="/home">
          <div className="flex items-center">
            <div className="text-4xl text-orange-600">
              <FaInstagramSquare />
            </div>
            <p className="ml-2 font-semibold text-black ">FakeIg App</p>
          </div>

        </Link> 
        <div className="header__search">
          <input type="text" placeholder="Tìm kiếm" />
          <i className="bx bx-search-alt-2"></i>
        </div>
        <div className="header__login">
          {user ? (
            <div className="right">
              <button
                className="btn btn-upload text-2xl"
                onClick={transferMessageAddNewPost}
              >
               <IoMdAdd />
              </button>

              <Menu>
                <img
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  src={user.photoURL}
                  alt=""
                />
              </Menu>
            </div>
          ) : (
            <div>
              <Link to="/signup">
                <button className="btn btn-sign-up">Sign up</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

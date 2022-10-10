import React, { useState } from "react";
import Tippy from "@tippyjs/react/headless";
import { BiUser } from "react-icons/bi";

import { HiOutlineLogout } from "react-icons/hi";

import { useUserAuth } from "../../AuthContext/userAuthContext";
import { auth } from "../../firebase/firebase";

import MeunItem from "./MeunItem";

const Menu = ({ children }) => {
 
  const { logOut, user } = useUserAuth();
  const [menus, setMenus] = useState([
    {
      id: 1,
      icon: <BiUser />,
      title: "Trang cá nhân",
      to: `/profile/${user.uid}`
    },
   
    {
      id: 4,
      icon: <HiOutlineLogout />,
      title: "Đăng xuất",
      onClick: () => logOut(auth),
      to: "/",
    },
  ]);

  return (
    <Tippy
      interactive
      hideOnClick={false}
      delay={[0, 700]}
      offset={[12, 8]}
      placement="bottom-end"
      render={(attrs) => (
        <div className="bg-white p-3" tabIndex="-1" {...attrs}>
          {menus.map((menu) => {
            return <MeunItem key={menu.id} menu={menu} />;

          })}
        </div>
      )}
    >
      {children}
    </Tippy>
  );
};

export default Menu;

import "./styles.css";
import { FaTwitter } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { HiHashtag } from "react-icons/hi";
import { FiMail } from "react-icons/fi";
import { BsPerson } from "react-icons/bs";
import { FiBell } from "react-icons/fi";
import { FiBookmark } from "react-icons/fi";

import { SidebarCustom } from "../sidebarCustom";
import { Logout } from "../logout";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <FaTwitter style={{ margin: 20 }} size={30} color="#50b7f5" />
      <SidebarCustom Icon={MdHome} text="Home" navigateTo="/" />
      <SidebarCustom Icon={HiHashtag} text="Explore" />
      <SidebarCustom Icon={FiBell} text="Notifications" />
      <SidebarCustom Icon={FiMail} text="Messages" />
      <SidebarCustom Icon={FiBookmark} text="Bookmarks" />
      <SidebarCustom Icon={BsPerson} text="Profile" navigateTo="/profile" />
      <div className="button-container">
        <Logout />
      </div>
    </div>
  );
};

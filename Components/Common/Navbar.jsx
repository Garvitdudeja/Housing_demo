import * as images from "@/utilities/images";
import Image from "next/image";
import { useRouter } from "next/router";
import CustomModal from "./CustomModal";
import Profile from "./Profile";
import { useState } from "react";

const Navbar = ({ heading }) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  return (
    <div className="navbar">
      <h1 className="heading30">{heading}</h1>
      <div className="navLeftSide">
        <ul className="navList">
          <li>
            <div
              className="navChat"
              onClick={() => {
                router.push("/chat");
              }}
            >
              <Image src={images.chatIcon} alt="chatImg" />
            </div>
          </li>
          <li>
            <div
              className="navNotification"
              onClick={() => {
                router.push("/notification");
              }}
            >
              <Image src={images.notificationIcon} alt="notificationImg" />
            </div>
          </li>
          {/* <li>
          <button className='assignShiftBtn'>
            Assign Shift/Task
          </button>
        </li> */}
          <li>
            <button
              className="profileBtn"
              onClick={() => {
                setShow(true);
              }}
              type="button"
            >
              <Image
                src={images.paitentIcon}
                className="me-2"
                alt="paitentImg"
              />
              <span>Profile</span>
            </button>
            {/* <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><button className="dropdown-item" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket me-2"></i> Logout</button></li>
          </ul> */}
          </li>
        </ul>
      </div>
      <Profile show={show} setShow={setShow} />
    </div>
  );
};

export default Navbar;

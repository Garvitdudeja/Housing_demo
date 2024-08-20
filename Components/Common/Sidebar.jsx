import { usePathname } from "next/navigation";
import React from "react";
import * as images from "@/utilities/images";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/auth";
import { useRouter } from "next/router";

const Sidebar = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = () => {
    dispatch(
      logout({
        cb(res) {
          if (res.status == 200) {
            router.push("/login");
          }
        },
      })
    );
  };
  const pathname = usePathname();
  const sidebarList = [
    {
      name: "Home",
      activeImage: images.homeActive,
      inactiveImage: images.homeIcon,
      path: "/",
    },
    // {name:"Shift Requests", activeImage: images.shiftActive, inactiveImage: images.shiftRequestIcon, path:"/shift-request"},
    // {name:"Shift", activeImage: images.shiftActive, inactiveImage: images.shiftRequestIcon, path:"/shift"},
    {
      name: "Projects",
      activeImage: images.shiftActive,
      inactiveImage: images.shiftRequestIcon,
      path: "/job",
    },
    {
      name: "Customers",
      activeImage: images.customersActive,
      inactiveImage: images.customersIcon,
      path: "/customers",
    },
    // {name:"Employees", activeImage: images.employessActive, inactiveImage: images.employessActive, path:"/employees"},
    {
      name: "Staff",
      activeImage: images.employessActive,
      inactiveImage: images.employessIcon,
      path: "/staff",
    },
    {
      name: "Applicants",
      activeImage: images.supervisorsActive,
      inactiveImage: images.supervisorsIcon,
      path: "/supervisors",
    },
    {
      name: "Territory",
      activeImage: images.territoryActive,
      inactiveImage: images.territoryIcon,
      path: "/territory",
    },
    {
      name: "Sites",
      activeImage: images.sitesActive,
      inactiveImage: images.sitesIcon,
      path: "/sites",
    },
    {
      name: "Roles",
      activeImage: images.rolesActive,
      inactiveImage: images.rolesIcon,
      path: "/roles",
    },
    {
      name: "Billing",
      activeImage: images.billingActive,
      inactiveImage: images.billingIcon,
      path: "/billing",
    },
    {
      name: "CMS",
      activeImage: images.cmsActive,
      inactiveImage: images.cmsIcon,
      path: "/cms",
    },
    {
      name: "Admin",
      activeImage: images.userIconImg,
      inactiveImage: images.paitentIcon,
      path: "/admin",
    },
    {
      name: "Calendar",
      activeImage: images.calendarActive,
      inactiveImage: images.calendar,
      path: "/calendar",
    },
  ];
  return (
    <div className="sidebarOuter">
      <div
        className="sidebarArrow"
        onClick={() => {
          props?.setSidebarOpen((prev) => !prev);
        }}
      >
        <Image src={images.leftArrow} className="leftArrow" alt="img" />
      </div>
      <div className="sidebarLogo">
        <Image src={images.logoWhite} className="logo" alt="logo" />
      </div>
      <div className="sidebarInner">
        <ul className="sidebarList">
          {sidebarList.map((item, index) => (
            <React.Fragment key={item?.name}>
              <li>
                <Link
                  href={item.path}
                  className={
                    item?.path === "/" + pathname?.split("/")[1]
                      ? "sidebarItem active"
                      : "sidebarItem"
                  }
                >
                  <div className="sidebarIcon">
                    <Image
                      src={
                        item?.path === "/" + pathname?.split("/")[1]
                          ? item.activeImage
                          : item.inactiveImage
                      }
                      className="navActive"
                      alt="img"
                    />
                  </div>
                  <span className="sidebarTxt">{item.name}</span>
                </Link>
              </li>
            </React.Fragment>
          ))}
        </ul>
        <div className="logOutBtn" onClick={handleLogout}>
          <Image src={images.logoutIcon} className="" alt="img" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

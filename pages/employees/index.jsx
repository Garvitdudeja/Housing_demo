import React, { useState } from "react";
import * as images from "@/utilities/images.js";
import Image from "next/image";
import withAuth from "@/authentication/withauth";

const index = () => {
  const [activeTab, setActiveTab] = useState("");

  return (
    <>
      <div lang="row">
        <div className="employeesHeader">
          <div className="employeesBtn">
            <button
              onClick={() => {
                setActiveTab("all");
              }}
              className={`${
                activeTab === "all" ? "active" : ""
              }  employeeAllBtn`}
            >
              All
            </button>
            <button
              onClick={() => {
                setActiveTab("requests");
              }}
              className={`${
                activeTab === "requests" ? "active" : ""
              }  employeeAllBtn`}
            >
              Requests
            </button>
            <button
              onClick={() => {
                setActiveTab("appproved");
              }}
              className={`${
                activeTab === "appproved" ? "active" : ""
              }  employeeAllBtn`}
            >
              Approved
            </button>
          </div>
          <form>
            <div className="customerSearch">
              <Image
                src={images.searchIcon}
                alt="icon"
                className="customerSearchIcon"
              />
              <input
                type="search"
                placeholder="Search here.."
                className="customerSearchInput"
                // onChange={(e) => {
                //   setFilter((prev) => ({
                //     ...prev,
                //     search: e.target.value,
                //   }));
                // }}
                // value={filter?.search}
              />
              <Image
                src={images.crossIcon}
                alt="icon"
                // onClick={() => setSearch("")}
                className="customerCrossIcon"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-12">
          <h3 className="headingGreen20 mb-0">All Employees </h3>
          <p className="text14 mb-0">28 Customers</p>
        </div>
      </div>

      <div className="employTable">
        <div className="row">
          <div className="col-md-12">
            <table className="commonTable">
              <thead>
                <tr>
                  <th className="tableHeading">Name</th>
                  <th className="tableHeading">Availability</th>
                  <th className="tableHeading">Role</th>
                  <th className="tableHeading">Send Notification</th>
                  <th className="tableHeading">Give Permissions</th>
                  <th className="tableHeading">Action</th>
                  <th className="tableHeading text-center">View Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="tableHeading">
                    <div className="customerNameImg">
                      <Image
                        src={images.customerImg}
                        width={50}
                        height={50}
                        className="customerImg"
                        alt="customerImg"
                      />
                      <p className="heading16 mb-0">Torp Brady</p>
                    </div>
                  </td>
                  <td className="tableHeading">Shift Assigned</td>
                  <td className="tableHeading">
                    <button className="requestForBtn employRoleBtn">
                      Nurse - Pre-Op, Circulating
                    </button>
                  </td>
                  <td className="tableHeading">
                    <button className="assignToSelectBtn employSendBtn">
                      Send
                    </button>
                  </td>
                  <td className="tableHeading">
                    <Image
                      src={images.permissionImg}
                      className="permissionImg"
                      alt="permissionImg"
                    />
                    <span className="permissionText">3 Permissions</span>
                  </td>
                  <td className="tableHeading">
                    <Image
                      src={images.deleteIcon}
                      className="me-2 cursor"
                      alt="deleteIcon"
                    />
                    <Image
                      src={images.penIcon}
                      className="ms-2 cursor"
                      alt="penIcon"
                    />
                    <Image
                      src={images.blockImg}
                      className="ms-3 cursor blockImg"
                      alt="blockIcon"
                    />
                  </td>
                  <td className="tableHeading text-center">
                    <Image
                      src={images.rightArrow}
                      className="cursor"
                      alt="rightArrowImg"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(index);

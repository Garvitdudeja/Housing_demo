import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import * as images from "@/utilities/images.js";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { assignJob, employeeListJob } from "@/redux/slices/web";
import { nullString } from "@/function/commonFunctions";
import swal from "sweetalert";
import moment from "moment";
import { useWebSelector } from "@/redux/selector/web";
import BlueSpinner from "@/Components/Common/BlueSpinner";
import Navbar from "@/Components/Common/Navbar";

const AssignJob = (props) => {
  const pageHeading = "Jobs"
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const [employeeList, setEmployeeList] = useState([]);
  const [search, setSearch] = useState("");
  const [isClient, setIsClient] = useState(false);
  const webSelector = useWebSelector();
  console.log(id);
  const employeeListJobAction = () => {
    const params = {
      search,
      id,
    };
    dispatch(
      employeeListJob({
        ...params,
        cb(res) {
          for (let x of res) {
            if (x.status == 1) {
              setEmployeeList(x?.data);
            }
          }
        },
      })
    );
  };
  console.log(props, "prop");
  useEffect(() => {
    if (id) employeeListJobAction();
    setIsClient(true);
  }, [id, search]);

  const handleAssignJob = (data) => {
    //   console.log(data)
    const params = {
      assigned_to: data?.id,
      id: id,
      shift_id: data?.user_shifts[0]?.id,
    };
    dispatch(
      assignJob({
        ...params,
        cb(res) {
          swal(
            "Job Assigned ",
            `Hey! You successfully assigned Job to ${
              nullString(data?.user_profiles?.first_name) +
              " " +
              nullString(data?.user_profiles?.last_name)
            } will start at ${moment(data?.user_shifts[0]?.time_start).format(
              "MMM DD YYYY HH:MM"
            )}`
          ).then(() => {
            router.push("/job");
          });
        },
      })
    );
  };
  return (
    <>
     <Navbar heading={pageHeading}/>
      <div className="assignJobContent">
        <div className="commonHeader mb-3">
          <div className="hospitalDetail">
            <div className="backArrowBtn" onClick={() => router.back()}>
              <Image src={images.leftArrowLong} alt="leftArrowImg" />
            </div>
            <div className="hospitalDetailOuter">
              <div className="hospitalDetailText">
                <h4 className="heading16">Assign To</h4>
                <p className="text14">Select the Customer to assign Site</p>
              </div>
            </div>
          </div>
          <div className="shiftRequestRight">
            <form>
              <div className="customerSearch">
                <Image
                  src={images.searchIcon}
                  alt="icon"
                  className="customerSearchIcon"
                />
                <input
                  type="search"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  placeholder="Search here.."
                  className="customerSearchInput"
                />
                <Image
                  src={images.crossIcon}
                  alt="icon"
                  className="customerCrossIcon"
                />
              </div>
            </form>
          </div>
        </div>
        {props?.isClient && (
          <>
            {" "}
            {webSelector.loading ? (
              <BlueSpinner />
            ) : (
              <div className="assignJobTable mt-3">
                <table className="commonTable">
                  <thead>
                    <tr>
                      {/* <th className="tableHeading">Location</th> */}
                      <th className="tableHeading">Staff Name</th>
                      <th className="tableHeading">Role</th>
                      <th className="tableHeading jobRequestTo">Distance</th>
                      <th className="tableHeading">Time</th>
                      <th className="tableHeading">Duration</th>
                      <th className="tableHeading">Assign</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeList.length > 0 ? (
                      employeeList?.map((item) => (
                        <tr key={item?.id}>
                          <td className="tableHeading jobRequestToData">
                            <Image
                              src={
                                item?.user_profiles?.profile_photo ??
                                images.customerImg
                              }
                              width={50}
                              height={50}
                              className="customerImg"
                              alt="customerImg"
                            />
                            <span className="jobCustomerName">
                              {nullString(item?.user_profiles?.first_name) +
                                " " +
                                nullString(item?.user_profiles?.first_name)}
                            </span>
                          </td>
                          <td className="tableHeading">
                            {item?.user_designation.length > 0
                              ? item?.user_designation?.map((x) => (
                                  <button className="requestForBtn me-2">
                                    {x?.designation?.name}
                                  </button>
                                ))
                              : "--"}
                          </td>
                          <td className="tableHeading jobRequestToData">
                            <Image
                              src={images.locationIcon}
                              width={50}
                              height={50}
                              className="locationImg"
                              alt="customerImg"
                            />
                            <span className="jobCustomerName">
                              {typeof item.distance == "number" ? (
                                <>{Number(item?.distance).toFixed(2)} Miles</>
                              ) : (
                                item?.distance
                              )}
                            </span>
                          </td>
                          <td className="tableHeading">
                            <p className="mb-0">{item?.duration}</p>
                          </td>

                          <td className="tableHeading">
                            <Image src={images.clockIcon} alt="image" />
                            <span className="ps-2">Available</span>
                          </td>
                          <td className="tableHeading">
                            <button
                              onClick={() => {
                                handleAssignJob(item);
                              }}
                              className="assignToSelectBtn"
                            >
                              Assign Job
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                   
                        <tr>
                          <td colspan="9" className="text-center p-4">
                            <h4>No Staff found.</h4>
                          </td>
                        </tr>
                     
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AssignJob;

import withAuth from "@/authentication/withauth";
import BlueSpinner from "@/Components/Common/BlueSpinner";
import Navbar from "@/Components/Common/Navbar";
import { getTime } from "@/function/commonFunctions";
import { useWebSelector } from "@/redux/selector/web";
import { cancelJob, getJobList } from "@/redux/slices/web";
import * as images from "@/utilities/images.js";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import swal from "sweetalert";


const index = (props) => {
  const pageHeading = "Jobs";
  const webSelector = useWebSelector()
  const [jobListData, setJobListData] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();
  const [filter, setFilter] = useState({ page: 1, limit: 10, status: 1 });

  const getJobListAction = (filter) => {
    const params = {
      ...filter,
    };
    dispatch(
      getJobList({
        ...params,
        cb(res) {
          setJobListData(res);
        },
      })
    );
  };
  useEffect(() => {
    getJobListAction(filter);
  }, [filter]);
  useEffect(() => {
    getJobListAction(filter);
  }, []);
  const handlePageClick = (event) => {
    setFilter((prev) => ({ ...prev, page: event.selected + 1 }));
  };
  const handleDeleteJob = (data) => {
    const params = { id: data?.id, status: 2 };
    swal({
      title: "Cancel Job",
      text: "Are you sure? You want to Cancel this job",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(
          cancelJob({
            ...params,
            cb(res) {
              swal("Job Cancel", `Hey! You successfully Cancel  Job`).then(
                getJobListAction(filter)
              );
            },
          })
        );
      }
    });
  };
  return (
    <>
      <Navbar heading="Projects" />
      <div lang="row">
        <div className="employeesHeader">
          <div className="employeesBtn">
            <button
              onClick={() => {
                setFilter((item) => ({ ...item, status: 1 }));
              }}
              className={`${
                filter?.status == "1" ? "active" : ""
              }  employeeAllBtn`}
            >
              Requested
            </button>
            <button
              onClick={() => {
                setFilter((item) => ({ ...item, status: 4 }));
              }}
              className={`${
                filter?.status == "4" ? "active" : ""
              }  employeeAllBtn`}
            >
              On Going
            </button>
            <button
              onClick={() => {
                setFilter((item) => ({ ...item, status: 6 }));
              }}
              className={`${
                filter?.status == "6" ? "active" : ""
              }  employeeAllBtn`}
            >
              Completed
            </button>
            <button
              onClick={() => {
                setFilter((item) => ({ ...item, status: 7 }));
              }}
              className={`${
                filter?.status == "7" ? "active" : ""
              }  employeeAllBtn`}
            >
              Cancelled
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
                onChange={(e) => {
                  setFilter((prev) => ({
                    ...prev,
                    search: e.target.value,
                  }));
                }}
                value={filter?.search}
              />
              <Image
                src={images.crossIcon}
                alt="icon"
                onClick={() => setFilter((item) => ({ ...item, search: "" }))}
                className="customerCrossIcon"
              />
            </div>
          </form>
        </div>
        <div className="shiftRequestFilter mt-3">
          <div>
            <h3 className="headingGreen20 mb-0">All Jobs </h3>
            <p className="text14 mb-0"> {jobListData?.total} Jobs</p>
          </div>
          <div className="shiftRequestRight">
            <div
              className="profileBtn"
              onClick={() => {
                router.push("/job/manageJob");
              }}
            >
              <i className="fa-solid fa-plus"></i>
              <span className="ps-2">Create Job</span>
            </div>
          </div>
        </div>
      </div>
      <div className="jobContent">
        <div className="jobTable mt-3">
          <table className="commonTable">
            <thead>
              <tr>
                <th className="tableHeading">Location</th>
                <th className="tableHeading">Date</th>
                <th className="tableHeading">
                  {filter?.status == 1 ? "Request For" : "Role"}
                </th>
                <th className="tableHeading jobRequestTo">Job Request By</th>
                {!(filter?.status === 7) && (
                  <th className="tableHeading">
                    {filter?.status === 1
                      ? "Request Created on"
                      : "Assigned To"}
                  </th>
                )}

                <th className="tableHeading">
                  {filter?.status == 1 ? "Assign To" : "Hrs Logged"}{" "}
                </th>
                {filter?.status == 1 && (
                  <th className="tableHeading">Action</th>
                )}
                <th className="tableHeading text-center">View Details</th>
              </tr>
            </thead>
            <tbody>
              {props?.isClient && webSelector.loading  ? <BlueSpinner/> :  props?.isClient &&
              jobListData?.data?.length > 0 ? (
                jobListData?.data?.map((item) => (
                  <tr key={item?.id}>
                    <td className="tableHeading">
                      <Image
                        src={images.locationIcon}
                        className="locationImg"
                        alt="locationIcon"
                      />
                      <span className="mb-0">
                        {item?.sites?.name ?? "No Address"}{" "}
                      </span>
                      <br />
                      <span className="text12">
                        {" "}
                        {item?.sites?.address ?? "No Address"}{" "}
                      </span>
                    </td>
                    <td className="tableHeading">
                      <Image
                        src={images.calanderDark}
                        alt="calenderIcon"
                        className="calenderImg"
                      />
                      <span className="ps-1">
                        {moment(item?.start_date).format("DD MMM, yyyy")} -{" "}
                        {moment(item?.end_date).format("DD MMM, yyyy")}
                      </span>
                      <br />
                      <Image src={images.clockIcon} alt="clockIcon" />{" "}
                      <span className="ps-1 me-2">
                        {moment(item?.time_start).format("HH:mm")} -{" "}
                        {moment(item?.time_end).format("HH:mm")}
                      </span>
                    </td>
                    <td className="tableHeading">
                      <button className="requestForBtn">
                        {item?.designation.name}
                      </button>
                    </td>
                    <td className="tableHeading jobRequestToData">
                      <Image
                        src={
                          item?.posted_by_data?.user_profiles?.profile_photo ??
                          images.customerImg
                        }
                        width={50}
                        height={50}
                        className="customerImg"
                        alt="customerImg"
                      />
                      <span className="jobCustomerName">
                        {item?.posted_by_data.user_profiles.first_name}{" "}
                        {item?.posted_by_data.user_profiles.last_name}
                      </span>
                    </td>
                    {/* {filter?.status == 1 ? (
                      <td className="tableHeading">
                        {moment(item?.created_at).format("DD MMM, yyyy")}
                      </td>
                    ) : (
                      <td className="tableHeading jobRequestToData">
                        <Image
                          src={
                            item?.assigned_to_data?.user_profiles
                              ?.profile_photo ?? images.customerImg
                          }
                          width={50}
                          height={50}
                          className="customerImg"
                          alt="customerImg"
                        />
                        <span className="jobCustomerName">
                          {item?.assigned_to_data?.user_profiles.first_name}{" "}
                          {item?.assigned_to_data?.user_profiles.last_name}
                        </span>
                      </td>
                    )}
                    {filter?.status == 1 ? (
                      <td className="tableHeading">
                        <button
                          className="assignToSelectBtn"
                          onClick={() =>
                            router.push("/job/assignJob?id=" + item?.id)
                          }
                        >
                          Assign To
                        </button>
                      </td>
                    ) : (
                      <td className="tableHeading">
                        {" "}
                        {getTime(item?.job_hours[0]?.total)?.time}
                      </td>
                    )} */}
                    {filter?.status !== 7 && (
                      <>
                        {filter?.status === 1 ? (
                          <>
                            <td className="tableHeading">
                              {moment(item?.created_at).format("DD MMM, yyyy")}
                            </td>
                            <td className="tableHeading">
                              <button
                                className="assignToSelectBtn"
                                onClick={() =>
                                  router.push("/job/assignJob?id=" + item?.id)
                                }
                              >
                                Assign To
                              </button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="tableHeading jobRequestToData">
                              <Image
                                src={
                                  item?.assigned_to_data?.user_profiles
                                    ?.profile_photo ?? images.customerImg
                                }
                                width={50}
                                height={50}
                                className="customerImg"
                                alt="customerImg"
                              />
                              <span className="jobCustomerName">
                                {
                                  item?.assigned_to_data?.user_profiles
                                    ?.first_name
                                }{" "}
                                {
                                  item?.assigned_to_data?.user_profiles
                                    ?.last_name
                                }
                              </span>
                            </td>
                          </>
                        )}
                      </>
                    )}
                    {filter?.status !== 1 && (
                      <td className="tableHeading">
                        {getTime(item?.job_hours[0]?.total)?.time}
                      </td>
                    )}
                    {filter?.status == 1 && (
                      <td className="tableHeading">
                        <Image
                          onClick={() => {
                            handleDeleteJob(item);
                          }}
                          src={images.deleteIcon}
                          className="me-2 cursor"
                          alt="delete icon"
                        />
                        <Image
                          onClick={() => {
                            router.push("/job/manageJob?id=" + item?.id);
                          }}
                          src={images.penIcon}
                          className="ms-2 cursor"
                          alt="edit icon"
                        />
                      </td>
                    )}
                    <td className="tableHeading text-center">
                      <Image
                        src={images.rightArrow}
                        className="cursor"
                        alt="img"
                        onClick={() => {
                          router.push(`/job/job-view/${item?.id}`);
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center p-4">
                    <h4>No Job found.</h4>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {jobListData?.total_pages > 1 && (
            <ReactPaginate
              className="pagination"
              breakLabel="..."
              nextLabel="Next"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={jobListData?.total_pages}
              previousLabel="Previous"
              renderOnZeroPageCount={null}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default withAuth(index);

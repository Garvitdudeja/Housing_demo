import React, { useEffect } from "react";
import * as images from "@/utilities/images.js";
import Image from "next/image";
import { useRouter } from "next/router";
import { UseDispatch, useDispatch } from "react-redux";
import { getJobByJobId, startJobTime, stopJobTime } from "@/redux/slices/web";
import { useWebSelector } from "@/redux/selector/web";
import moment from "moment";
import withAuth from "@/authentication/withauth";
import Navbar from "@/Components/Common/Navbar";

const jobView = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const webselector = useWebSelector();
  const jobsById = webselector?.jobsById;
  const startTimeIn = () => {
    let params = {
      job_id: id,
      employee_id: jobsById?.assigned_to,
      start_date_time: moment().utc().toISOString(),
    };
    dispatch(startJobTime({ ...params, cb(res) {} }));
  };
  const getJobs = () => {
    let params = {
      id: id,
    };
    dispatch(
      getJobByJobId({
        ...params,
        cb(res) {},
      })
    );
  };
  useEffect(() => {
    if (id) getJobs();
  }, [id]);

  const endTime = () => {
    const params = {
      id,
      end_date_time: moment().utc().toISOString(),
      total: moment().diff(
        moment(jobsById?.job_hours[0]?.start_date_time),
        "seconds"
      ),
    };
    dispatch(stopJobTime({ ...params, cb(res) {} }));
  };

  return (
    <>
      {props?.isClient && (
        <>
          <Navbar heading={"Jobs"} />
          <div className="commonHeader mb-3">
            <div className="hospitalDetail">
              <div className="backArrowBtn">
                <Image
                  src={images.leftArrowLong}
                  alt="leftArrowImg"
                  onClick={() => router.back()}
                />
              </div>
              <div className="hospitalDetailOuter">
                <div className="hospitalDetailText">
              {jobsById?.status == 1 &&(
                  <h4 className="heading16">Job Detail</h4> 
              )}
              {jobsById?.status == 4 &&(
                  <h4 className="heading16">Job On Going</h4> 
              )}
              {jobsById?.status == 6 &&(
                  <h4 className="heading16">Job Completed</h4> 
              )}
              {jobsById?.status == 7 &&(
                  <h4 className="heading16">Job Cancelled</h4> 
              )}
               </div>
               </div>
             
              
            </div>

            <div className="jobViewBtn">
              {jobsById?.status == 1 && (
                <>
                  {" "}
                  <button
                    className="editBtnRounded"
                    onClick={() =>
                      router.push("/job/manageJob?id=" + jobsById?.id)
                    }
                  >
                    <Image
                      src={images.penIconGreen}
                      className="me-2"
                      alt="img"
                    />
                    <span>Edit Details</span>
                  </button>
                </>
              )}
              {jobsById?.status != 7 &&  <button
                className="editBtnRounded ms-3"
                onClick={() =>
                  router.push(
                    "/job/manageJob?id=" + jobsById?.id + "&type=duplicate"
                  )
                }
              >
                <i className="fa-regular fa-copy me-2"></i>
                <span>Create Duplicate Job</span>
              </button>}
             
            </div>
          </div>
          <div className="mb-3 d-flex">
            <Image
              src={images.locationIcon}
              className="locationImg"
              alt="locationIcon"
            />
           <div className="locationContent ps-3"> <span className="mb-0"> {jobsById?.sites?.name ?? "No Address"}{" "}</span>
            <br />
            <p className="text12">{jobsById?.sites?.address ?? "No Address"}{" "}</p></div> 
          </div>
          <div className="nurseDetailOuter mb-3">
            <div className="nurseDetailIconOuter">
              <Image src={images.doctorIcon} alt="img" />
            </div>
            <div className="nurseDetailText">
              <div className="nurseTag">{jobsById?.designation?.name}</div>
            </div>
          </div>

          <div className="row">
            <div className="requestCreateCommon mb-3">
              <p className="text14 mb-2">Request Created on</p>
              <Image src={images.calanderDark} className="me-2" alt="img" />
              <span className="requestCommonDate">
                {moment(jobsById?.created_at).format("DD MMM, yyyy")}
              </span>
            </div>
            <div className="requestCreateCommon mb-3">
              <p className="text14 mb-2">Scheduled (Hourly)</p>
              <Image src={images.calanderDark} className="me-2" alt="img" />
              <span className="requestCommonDate">
                {moment(jobsById?.start_date).format("DD MMM")} - {moment(jobsById?.end_date).format("DD MMM, yyyy")}
              </span>
              <div className="scheduleRequestCommon">
                <Image src={images.clockIcon} className="me-2" alt="img" />
                <span className="requestCommonDate">
                  {moment(jobsById?.time_start).format("HH:mm")} - {moment(jobsById?.time_end).format("HH:mm")}
                </span>
              </div>
            </div>
          </div>
          {jobsById?.status != 1 && (
            <>
              {" "}
              <div className="jobViewData">
                <div className=" jobRequestToData">
                  <Image
                    src={
                      jobsById?.posted_by_data?.user_profiles?.profile_photo ??
                      images.customerImg
                    }
                    width={50}
                    height={50}
                    className="customerImg"
                    alt="customerImg"
                  />
                  <div className="jobCustomerName">
                    {jobsById?.posted_by_data?.user_profiles?.first_name}{" "}
                    {jobsById?.posted_by_data?.user_profiles?.last_name}
                    <p className="text12">job requested by</p>
                  </div>
                </div>
              </div>
              {jobsById?.status !== 7 &&(
              <div className="jobViewData">
                <div className=" jobRequestToData">
                  <Image
                    src={
                      jobsById?.assigned_to_data?.user_profiles
                        ?.profile_photo ?? images.customerImg
                    }
                    width={50}
                    height={50}
                    className="customerImg"
                    alt="customerImg"
                  />
            
                 
                    <div className="jobCustomerName">
                    {jobsById?.assigned_to_data?.user_profiles?.first_name}{" "}
                    {jobsById?.assigned_to_data?.user_profiles?.last_name}
                    <p className="text12">job Assigned To</p>
                  </div>
                  
                  
                    
                </div>
              </div>
              )}
            </>
          )}
          <div className="row mt-2">
            <div className="col-md-12 mb-3">
              <div className="shiftReqDescription">
                <p className="text14 mb-2">Description</p>
                <p className="text14 mb-2">{jobsById?.description}</p>
              </div>
            </div>
            <div className="col-md-12">
              {jobsById?.status !== 7 && jobsById?.status !== 6 && (
                <button
                className="commonBtnFill me-3"
                onClick={() => {
                  jobsById?.status == 4 && !jobsById?.job_hours?.length
                    ? startTimeIn()
                    : jobsById?.status == 4 && jobsById?.job_hours?.length
                    ? endTime()
                    : router.push("/job/assignJob?id=" + jobsById?.id);
                }}
              >
                {jobsById?.status == 4 && !jobsById?.job_hours?.length
                  ? "Time in"  
                  : jobsById?.status == 4 && jobsById?.job_hours?.length
                  ? "Time Out"
                  : "Assign To"}
              </button>
              )}
              
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default withAuth(jobView);

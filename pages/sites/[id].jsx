import React, { useEffect, useState } from "react";
import * as images from "@/utilities/images.js";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  deleteACustomer,
  deleteSite,
  getSiteDetails,
} from "@/redux/slices/web";
import { useDispatch } from "react-redux";
import { nullString } from "@/function/commonFunctions";
import swal from "sweetalert";
import withAuth from "@/authentication/withauth";
import { toast } from "react-toastify";
import moment from "moment";
import Navbar from "@/Components/Common/Navbar";

const siteDetails = () => {
  const pageHeading = "Site"
  const router = useRouter();
  const id = router.query.id;
  const dispatch = useDispatch();
  const [data, setData] = useState();

  const getSiteAction = (id) => {
    console.log("worked");
    dispatch(
      getSiteDetails({
        id,
        cb(res) {
          setData(res);
        },
      })
    );
  };

  useEffect(() => {
    if (id) getSiteAction(id);
  }, [id]);
  const handleSiteDelete = (data) => {
    const params = { id: data?.id };
    swal({
      title: "Delete Site",
      text: "Are you sure? You want to delete this site",
      className: "swalCustom",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(
          deleteSite({
            ...params,
            cb(res) {
              swal("Site Deleted", `Hey! You successfully deleted site.`).then(
                () => {
                  router.push("/sites");
                  toast.success("Site Deleted SuccessFully");
                }
              );
            },
          })
        );
      }
    });
  };
  const [activeJobsAvailable, setActiveJobsAvailable] = useState(false);
  const [upcomingJobsAvailable, setUpcomingJobsAvailable] = useState(false);

  useEffect(() => {
    const checkJobAvailability = () => {
      setActiveJobsAvailable(true);
      setUpcomingJobsAvailable(true);
    };

    checkJobAvailability();
  }, []);

  return (
  <>
   <Navbar heading={pageHeading}/>
    <div className="siteDetails">
      <div className="commonHeader mb-3">
        <div className="hospitalDetail">
          <div className="backArrowBtn" onClick={() => router.back()}>
            <Image src={images.leftArrowLong} alt="leftArrowImg" />
          </div>
          <div className="hospitalDetailOuter">
            <div className="hospitalDetailText">
              <h4 className="heading16">Site Detail</h4>
            </div>
          </div>
        </div>
        <div className="customerBtns">
          <button
            className="editBtnRounded me-2"
            onClick={() => {
              router.push("/sites/manage?id=" + data?.id);
            }}
          >
            <Image
              src={images.penIconGreen}
              className="me-2"
              alt="penIconImg"
            />
            <span>Edit Details</span>
          </button>
          <button
            className="deleteBtnRounded"
            onClick={() => {
              handleSiteDelete(data);
            }}
          >
            <Image src={images.deleteIcon} className="me-2" alt="deleteImg" />
            <span>Delete</span>
          </button>
        </div>
      </div>
      <div className="siteDetails">
        <div className="siteName">
          <h6 className="heading16 mb-0">Site Name</h6>
          <div className="siteContentData">
            <Image
              src={images.locationIcon}
              alt="image"
              className="locationImg"
            />
            <span className="heading18 ps-2">{data?.name}</span>
          </div>
        </div>
        <div className="address mt-3">
          <h6 className="heading16 mb-0">Full Address</h6>
          <div className="addressData">
            <Image src={images.colorHash} alt="image" className="activeAddressImg"/>
            <span className="heading18 ps-2">{data?.address}</span>
          </div>
        </div>
        <div className="territory mt-3">
          <h6 className="heading16 mb-0">Territory</h6>
          <div className="territoryData">
            <Image src={images.flagIcon} alt="image" className="flagIcon"/>
            {data?.site_territories?.map((item) => (
              <>
                <span className="heading18 ps-2">
                  {" "}
                  {item?.territory_details?.name}
                </span>
              </>
            ))}
          </div>
        </div>
        <div className="city mt-3">
          <h6 className="heading16 mb-0">City</h6>
          <div className="cityData">
            <Image src={images.cityIcon} alt="image" className="cityImg"/>
            <span className="heading18 ps-2">{data?.city}</span>
          </div>
        </div>
        {activeJobsAvailable ? (
          <>
            <div className="activeHeading mt-5">
              <div className="siteDetailHeading">
                <h6 className="heading18">Active</h6>
              </div>
            </div>
            <Table data={data?.ongoingJobs} active={true} />
          </>
        ) : (
          <div className="noActiveHeading mt-5">
            <div className="siteDetailHeading">
              <h6 className="heading18">Active</h6>
            </div>
            <p className="heading18 ps-2">No Active Jobs Data</p>
          </div>
        )}

        <div className="upcomingHeading mt-5">
          <div className="siteDetailHeading">
            <h6 className="heading18">Upcoming</h6>
          </div>
        </div>
        <Table data={data?.upcomingJobs} active={false} />
      </div>
    </div>
  </>
  );
};

export default withAuth(siteDetails);

const Table = (props) => {
  return (
    <>
      {" "}
      {props.data && props?.data?.length > 0 ? (
        <div className="jobTable">
          <table className="commonTable">
            <thead>
              <tr>
                <th className="tableHeading">Location</th>
                <th className="tableHeading">Date</th>
                <th className="tableHeading">Request For</th>
                <th className="tableHeading jobRequestTo">Request By</th>
                <th className="tableHeading">Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {props.data?.map((item) => (
                <tr>
                  <td className="tableHeading">
                    <Image
                      src={images.locationIcon}
                      className="locationImg"
                      alt="locationIcon"
                    />
                    {item?.sites?.name}
                    <br />
                    <span className="text12">{item?.sites?.address}</span>
                  </td>
                  <td className="tableHeading">
                    <Image
                      src={images.calanderDark}
                      alt="calenderIcon"
                      className="calenderImg"
                    />
                    <span className="ps-1">
                      {moment(item.time_start).format("DD MMM")} -{" "}
                      {moment(item.time_end).format("DD MMM YYYY")}
                    </span>
                    <br />
                    <Image src={images.clockIcon} alt="clockIcon" />{" "}
                    <span className="ps-1">5:35pm - 3:35pm</span>
                  </td>
                  <td className="tableHeading">
                    <button className="requestForBtn">
                      {item?.designation?.name}
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
                    <p className="jobCustomerName">
                      {nullString(
                        item?.posted_by_data?.user_profiles?.first_name
                      ) +
                        " " +
                        nullString(
                          item?.posted_by_data?.user_profiles?.last_name
                        )}
                    </p>
                  </td>
                  <td className="tableHeading jobRequestToData">
                    <Image
                      src={
                        item?.assigned_by_data?.user_profiles?.profile_photo ??
                        images.customerImg
                      }
                      width={50}
                      height={50}
                      className="customerImg"
                      alt="customerImg"
                    />
                    <p className="jobCustomerName">
                      {nullString(
                        item?.assigned_by_data?.user_profiles?.first_name
                      ) +
                        " " +
                        nullString(
                          item?.assigned_by_data?.user_profiles?.last_name
                        )}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="heading18 ps-2">
          No {props?.active ? "active" : "upcoming"} Jobs Data
        </p>
        // <div className="col-md-12 mt-3">
        //   <div className="siteDetailHeading">
        //     <h6 className="heading18">Upcoming</h6>
        //     <h6 className="heading18">More</h6>
        //   </div>
        //   <p className="heading18 ps-2">No Upcoming Jobs Data</p>
        // </div>
      )}
    </>
  );
};

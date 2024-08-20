import React, { useEffect, useState } from "react";
import * as images from "@/utilities/images.js";
import Image from "next/image";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { deleteACustomer, getUserByID } from "@/redux/slices/web";
import { hanldeWholeNumbers, nullString } from "@/function/commonFunctions";
import { useDeleteCustomer } from "@/function/CustomerFunctions";
import { toast } from "react-toastify";
import CustomModal from "@/Components/Common/CustomModal";
import SendNotification from "@/Components/Customers/SendNotification";
import swal from "sweetalert";
import moment from "moment";
import withAuth from "@/authentication/withauth";
import Navbar from "@/Components/Common/Navbar";
const CustomerView = (props) => {
  const pageHeading = "Customer"
  const router = useRouter();
  const [key, setKey] = useState(Math.random());
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
    id: "",
  });
  const UserID = router.query?.id;
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const getUserAction = (id) => {
    dispatch(
      getUserByID({
        id,
        cb(res) {
          setData(res);
        },
      })
    );
  };
  const handleOnCloseModal = () => {
    setModalDetail({
      show: false,
      title: "",
      flag: "",
    });
    setKey(Math.random());
  };
  useEffect(() => {
    if (UserID && props?.isClient) {
      getUserAction(UserID);
    }
  }, [UserID]);
  const handleCustomerDelete = (data) => {
    const params = { id: data?.id };
    swal({
      title: "Delete Account",
      text: "Are you sure? You want to delete this account",
      className: "swalCustom",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(
          deleteACustomer({
            ...params,
            cb(res) {
              swal(
                "Account Deleted",
                `Hey! You successfully deleted ${
                  nullString(data?.user_profiles?.first_name) +
                  " " +
                  nullString(data?.user_profiles?.last_name)
                } user account.`
              ).then(() => {
                router.push("/customers");
                toast.success("Account Deleted SuccessFully");
              });
            },
          })
        );
      }
    });
  };
  return (
    <>
     <Navbar heading={pageHeading}/>
      <div className="customerViewOuter">
        <div className="commonHeader mb-3">
          <div className="hospitalDetail">
            <div
              className="backArrowBtn"
              onClick={() => {
                router.back();
              }}
            >
              <Image src={images.leftArrowLong} alt="leftArrowImg" />
            </div>
            <div className="hospitalDetailOuter">
              <div className="hospitalDetailText">
                <h4 className="heading16">Customer Detail</h4>
              </div>
            </div>
          </div>
          <div className="customerBtns">
            <button
              className="editBtnRounded me-2"
              onClick={() => {
                setModalDetail({
                  show: true,
                  title: "Send Notifcation",
                  flag: "notification",
                  id: UserID,
                });
                setKey(Math.random());
              }}
            >
              <span>Send Notification</span>
            </button>
            <button
              className="editBtnRounded me-2"
              onClick={() => router.push("/editProfile?id=" + UserID)}
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
                handleCustomerDelete(data);
              }}
            >
              <Image src={images.deleteIcon} className="me-2" alt="deleteImg" />
              <span>Delete</span>
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="customerDetailOuter mb-3">
              <div className="customerDetailLeft">
                <div className="customerDetailIconOuter">
                  <Image
                    src={
                      data?.user_profiles?.profile_photo ?? images.customerImg
                    }
                    width={50}
                    height={20}
                    alt="customerIcon"
                  />
                </div>
                <div className="customerDetailText">
                  <h4 className="heading16 mb-0">
                    {nullString(data?.user_profiles?.first_name) +
                      " " +
                      nullString(data?.user_profiles?.last_name)}
                  </h4>
                  <p className="text12 mb-0">{nullString(data?.email)}</p>
                  <p className="requestCommonDate mb-0">
                    {hanldeWholeNumbers(data?.customerCurrentJobs?.length)}{" "}
                    Shifts booked this month
                  </p>
                </div>
              </div>
              <div className="customerDetailRight">
                <p className="text12 mb-1">Associated with sites</p>
                <Image
                  src={images.locationIcon}
                  className="customerLocationIcon"
                  alt="locationImg"
                />
                <span className="requestCommonDate">
                  Work at Mercy Hospital +3 others
                </span>
              </div>
            </div>
          </div>
        </div>
        {Array.isArray(data?.customerCurrentJobs) &&
          data?.customerCurrentJobs.length > 0 && (
            <>
              {" "}
              <div className="row">
                <div className="col-md-12">
                  <h4 className="heading16Green">Current jobs</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="customerViewTable">
                    <JobTable data={data?.customerCurrentJobs}></JobTable>
                  </div>
                </div>
              </div>
            </>
          )}
      </div>
      {Array.isArray(data?.customerUpcomingJobs) &&
        data?.customerUpcomingJobs.length > 0 && (
          <>
            {" "}
            <div className="row pt-4">
              <div className="col-md-12">
                <h4 className="heading16Green">Customer Upcoming jobs</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="customerViewTable">
                  <JobTable data={data?.customerUpcomingJobs}></JobTable>
                </div>
              </div>
            </div>
          </>
        )}

      <CustomModal
        key={key}
        show={modalDetail.show}
        backdrop="static"
        showCloseBtn={true}
        isRightSideModal={false}
        mediumWidth={false}
        className={modalDetail.flag ? "commonWidth customContent" : ""}
        ids={modalDetail.flag}
        child={
          <SendNotification
            id={modalDetail.id}
            close={() => handleOnCloseModal()}
          />
        }
        onCloseModal={() => handleOnCloseModal()}
      />
    </>
  );
};

export default withAuth(CustomerView);

const JobTable = (props) => {
  const data = props?.data;
  return (
    <table className="commonTable">
      <thead>
        <tr>
          <th className="tableHeading">Location</th>
          <th className="tableHeading">Scheduled </th>
          <th className="tableHeading">Role</th>
          <th className="tableHeading text-center">View Details</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(data) &&
          data?.map((item) => {
            return (
              <>
                {" "}
                <tr>
                  <td className="tableHeading">
                    <div className="customerNameImg">
                      <Image
                        src={
                          item?.assigned_to_data?.user_profiles
                            ?.profile_photo ?? images.customerImg
                        }
                        width={50}
                        height={50}
                        className="customerImg"
                      />
                      <p className="heading16 mb-0">
                        {item?.assigned_to_data?.user_profiles?.first_name &&
                        item?.assigned_to_data?.user_profiles?.last_name
                          ? item.assigned_to_data.user_profiles.first_name +
                            " " +
                            item.assigned_to_data.user_profiles.last_name
                          : "Not Assigned"}
                      </p>
                    </div>
                  </td>
                  <td className="tableHeading customeViewScheduleHeading">
                    {item?.start_date
                      ? moment(item.start_date).format("DD MMM")
                      : ""}{" "}
                    -{" "}
                    {item?.start_date
                      ? moment(item.end_date).format("DD MMM, YYYY")
                      : ""}
                  </td>
                  <td className="tableHeading">
                    <button className="customerViewRoleBtn">
                      {item?.designation?.name}
                    </button>
                  </td>

                  <td className="tableHeading text-center">
                    <Image
                      src={images.rightArrow}
                      className="cursor"
                      alt="rightArrowImg"
                    />
                  </td>
                </tr>
              </>
            );
          })}
      </tbody>
    </table>
  );
};


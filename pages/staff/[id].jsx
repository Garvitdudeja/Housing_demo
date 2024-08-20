import React, { useEffect, useState } from "react";
import * as images from "@/utilities/images.js";
import Image from "next/image";
import { useRouter } from "next/router";
import { deleteACustomer, getUserByID } from "@/redux/slices/web";
import { useDispatch } from "react-redux";
import { nullString } from "@/function/commonFunctions";
import CustomModal from "@/Components/Common/CustomModal";
import SendNotification from "@/Components/Customers/SendNotification";
import swal from "sweetalert";
import withAuth from "@/authentication/withauth";
import Navbar from "@/Components/Common/Navbar";

function details(props) {
  const pageHeading ="Staff"
  const [activeTab, setActiveTab] = useState("personal");

  const showPersonalInfo = () => {
    setActiveTab("personal");
  };

  const showJobInfo = () => {
    setActiveTab("job");
  };
  const handleOnCloseModal = () => {
    setModalDetail({
      show: false,
      title: "",
      flag: "",
    });
    setKey(Math.random());
  };
  const router = useRouter();
  const id = router.query.id;
  const dispatch = useDispatch();
  const [data, setData] = useState();
  
  const getUserAction = (id) => {
    dispatch(
      getUserByID({
        id,
        cb(res) {
          console.log(res);
          setData(res);
        },
      })
    );
  };
  const [key, setKey] = useState(Math.random());
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
    id: "",
  });
  const handleCustomerDelete = (data) => {
    const params = { id: data?.id };
    swal({
      title: "Delete Account",
      text: "Are you sure? You want to delete this account",
      className:"swalCustom",
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
  useEffect(() => {
    if (id && props?.isClient) { getUserAction(id)};
  }, [id]);
  return (
    <>
     <Navbar heading={pageHeading}/>
    <div className="supervisorDetailOuter">
      <div className="commonHeader mb-3">
        <div className="hospitalDetail">
          <div
            className="backArrowBtn"
            onClick={() => {
              router.back();
            }}
          >
            <Image src={images.leftArrowLong} />
          </div>
          <div className="hospitalDetailOuter">
            <div className="hospitalDetailText">
              <h4 className="heading16">Staff Detail</h4>
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
                id: id,
              });
              setKey(Math.random());
            }}
          >
            <span>Send Notification</span>
          </button>
          <button
            className="editBtnRounded me-2"
            onClick={() => {
              router.push("/editProfile?id=" + id);
            }}
          >
            <Image src={images.penIconGreen} className="me-2" />
            <span>Edit Details</span>
          </button>
          <button className="deleteBtnRounded" onClick={() => {
                handleCustomerDelete(data);
              }}>
            <Image src={images.deleteIcon} className="me-2" />
            <span>Delete</span>
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="customerDetailOuter mb-3">
            <div className="customerDetailLeft">
              <div className="customerDetailIconOuter">
                <Image src={data?.user_profiles?.profile_photo ?? images.customerImg} width={50} height={20} />
              </div>
              <div className="customerDetailText">
                <h4 className="heading16 mb-0">
                  {nullString(data?.user_profiles?.first_name) +
                    " " +
                    nullString(data?.user_profiles?.last_name)}
                </h4>
                <p className="text12 mb-0">{nullString(data?.email)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="nurseDetailOuter mb-3">
            <div className="nurseDetailIconOuter">
              <Image
                src={images.rolesIcon}
                className="rolesImg"
                alt="rolesImg"
              />
            </div>
            <div className="nurseDetailText">
              {Array.isArray(data?.user_designation) &&
                data?.user_designation?.map((item) => (
                  <div key={item?.id} className="nurseTag">
                    {item?.designation?.name}
                  </div>
                ))}
              <p className="text14">{data?.user_profiles?.address}</p>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="employPersonalJobSlider">
            <p
              className={`heading16 employPersonalBtn ${
                activeTab === "personal" ? "active" : ""
              }`}
              onClick={showPersonalInfo}
            >
              Personal Information
            </p>
            <p
              className={`heading16 employPersonalBtn ${
                activeTab === "job" ? "active" : ""
              }`}
              onClick={showJobInfo}
            >
              Job Information
            </p>
          </div>
        </div>
        {activeTab === "personal" && (
          <>
            <div className="col-md-12">
              <div className="skillList">
                <h6 className="heading14">Skills</h6>
                <ul className="skillUnorderedList">
                  {Array.isArray(data?.user_skills) &&
                    data?.user_skills?.map((item) => (
                      <>{<li className="heading14">{item?.skill}</li>}</>
                    ))}
                </ul>
              </div>
            </div>
            {/* <div className="col-md-12">
              <div className="employDetailDescription">
                <h6 className="heading14 employdescriptionHeading">
                  Description
                </h6>
                <p className="heading14 employdescriptionPara">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                </p>
              </div>
            </div> */}
            <div className="col-md-12">
              <div className="certificate">
                <h6 className="heading14">Certificates</h6>
                <div className="certificateCollections"></div>
                <div className="certificateCollections">
                  {Array?.isArray(data?.user_documents) &&
                    data?.user_documents?.map((item, index) => (
                      <>
                        {" "}
                        <button
                          className="certificateBtn"
                          onClick={() => {
                            window.open(item?.document, "_blank");
                          }}
                        >
                          <div className="documentImg">
                            <Image src={images.documentImg} alt="documentImg" />
                          </div>
                          <span className="heading14 certificateText">
                            Document {index + 1}
                          </span>
                        </button>
                      </>
                    ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Job Information block */}
        {activeTab === "job" && (
          <div className="col-md-12">
            <div className="jobInfo">
              {/* <table className="commonTable">
                <thead>
                  <tr>
                    <th className="tableHeading">Name</th>
                    <th className="tableHeading">Role</th>
                    <th className="tableHeading">Job Location</th>
                    <th className="tableHeading">Shift Scheduled (Hourly)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="tableHeading">
                      <div className="jobInfoUser">
                        <Image
                          src={images.customerImg}
                          alt="customerImg"
                          width={45}
                          height={45}
                        />
                        <div>
                          <p className="mb-0 heading16">John Smith</p>
                          <p className="text12 mb-0">Job Requested by</p>
                        </div>
                      </div>
                    </td>
                    <td className="tableHeading">
                      <Image
                        src={images.briefcaseImg}
                        className="briefcaseImg"
                        alt="briefCaseImg"
                      />
                      <span className="roleText">Radiology</span>
                    </td>
                    <td className="tableHeading">
                      <Image
                        src={images.locationIcon}
                        className="customerLocationIcon"
                        alt="locationImg"
                      />
                      <span className="requestCommonDate">
                        Mercy Hospital, Tampa, FL
                      </span>
                      <p className="text12 mb-1 ps-4">
                        71445 Evie Turnpike Hayden Pass 98676
                      </p>
                    </td>
                    <td className="tableHeading">
                      24 Aug - 18 Sep, 2022 <br /> 05 pm - 10pm
                    </td>
                  </tr>
                  
                </tbody>
              </table> */}
              <div className="role">
                <h6 className="heading14">Role</h6>
                {data?.user_designation?.map(item=>( <div className="roleData mb-2" key={item?.id}>
                  <Image
                    src={images.briefcaseImg}
                    className="briefcaseImg"
                    alt="briefCaseImg"
                  />
                  <span className="roleText heading14">{item?.designation?.name}</span>
                </div>))}
               

              </div>
              <div className="role mt-4">
                <h6 className="heading14">Job Location</h6>
                <Image
                  src={images.locationIcon}
                  className="customerLocationIcon"
                  alt="locationImg"
                />
                <span className="requestCommonDate">
                  Mercy Hospital, Tampa, FL
                </span>
                <p className="text12 mb-1 ps-4">
                  71445 Evie Turnpike Hayden Pass 98676
                </p>
              </div>
              <div className="role mt-4">
                <h6 className="heading14">job Scheduled (Hourly)</h6>
                <p className="roleText heading14 ps-0">
                  24 Aug - 18 Sep, 2022 <br /> 05 pm - 10pm
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
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
              <SendNotification id={modalDetail.id} close={() => handleOnCloseModal()} />
           
          }
          onCloseModal={() => handleOnCloseModal()}
        /></>
  );
}


export default withAuth(details)
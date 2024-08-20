import withAuth from "@/authentication/withauth";
import BlueSpinner from "@/Components/Common/BlueSpinner";
import CustomModal from "@/Components/Common/CustomModal";
import Navbar from "@/Components/Common/Navbar";
import SendNotification from "@/Components/Customers/SendNotification";
import AddSupervisorModal from "@/Components/Supervisor/AddSupervisorModal";
import { hanldeWholeNumbers } from "@/function/commonFunctions";
import { useWebSelector } from "@/redux/selector/web";
import { deleteACustomer, getSupervisorList } from "@/redux/slices/web";
import * as images from "@/utilities/images.js";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import swal from "sweetalert";

const SupervisorListing = (props) => {
  const pageHeading = "Applicants"; 
  const webSelector = useWebSelector();
  const dispatch = useDispatch();
  const router = useRouter();
  const [supervisorListData, setSupervisorListData] = useState();
  const [filter, setFilter] = useState({ page: 1, limit: 10 });

  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
    id: "",
  });
  const [key, setKey] = useState(Math.random());

  //closeModal
  const handleOnCloseModal = () => {
    setModalDetail({
      show: false,
      title: "",
      flag: "",
    });
    setKey(Math.random());
  };
  const getSupervisorListAction = (filter) => {
    const params = {
      ...filter,
    };
    dispatch(
      getSupervisorList({
        ...params,
        cb(res) {
          setSupervisorListData(res);
        },
      })
    );
  };
  const handlePageClick = (event) => {
    setFilter((prev) => ({ ...prev, page: event.selected + 1 }));
  };
  const handleSupervisorDelete = (data) => {
    const params = { id: data?.id };
    swal({
      title: "Delete Account",
      text: "Are you sure? You want to delete this account",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(
          deleteACustomer({
            ...params,
            cb(res) {
              getSupervisorListAction(filter);
            },
          })
        );
      }
    });
  };

  useEffect(() => {
    getSupervisorListAction(filter);
  }, [filter]);

  return (
    <>
      <Navbar heading={pageHeading} />
      <div className="supervisorContent">
        <div className="shiftRequestFilter mt-3">
          <div>
            <h3 className="headingGreen20 mb-0">All Applicants </h3>
            <p className="text14 mb-0">
              {hanldeWholeNumbers(supervisorListData?.totalRecords)} Applications
            </p>
          </div>
          <div className="supervisorRight">
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
                      page: 1,
                      limit: 10,
                    }));
                  }}
                  value={filter?.search}
                />
                <Image
                  src={images.crossIcon}
                  alt="icon"
                  onClick={() =>
                    setFilter((prev) => ({
                      ...prev,
                      search: "",
                      page: 1,
                      limit: 10,
                    }))
                  }
                  className="customerCrossIcon"
                />
              </div>
            </form>
            <button
              className="profileBtn"
              onClick={() => {
                setModalDetail({
                  show: true,
                  title: "",
                  flag: "AddSupervisor",
                });
                setKey(Math.random());
              }}
            >
              <Image
                src={images.paitentIcon}
                className="me-2"
                alt="paitentImg"
              />
              <span>Add New Applicant</span>
            </button>
          </div>
        </div>

        {/* <div className="row mt-3">
        <div className="col-md-12">
          <div className="allCustomerHeading"><p className="heading14">All Supervisors</p></div>
        </div>
      </div> */}
        <div className="supervisorTable mt-3">
          <div className="supervisorTable">
            <table className="commonTable">
              <thead>
                <tr>
                  <th className="tableHeading">Name</th>
                  <th className="tableHeading">Email</th>
                  <th className="tableHeading">Send Notification</th>
                  <th className="tableHeading">Action</th>
                  <th className="tableHeading">Give Permissions</th>

                  {/* <th className="tableHeading text-center">View Details</th> */}
                </tr>
              </thead>
              <tbody>
                {props?.isClient && webSelector.loading ? (
                  <BlueSpinner />
                ) : props?.isClient && supervisorListData?.data?.length > 0 ? (
                  supervisorListData?.data?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="tableHeading nameSupervisor">
                          <div className="customerNameImg">
                            <Image
                              src={
                                item?.user_profiles?.profile_photo ??
                                images.customerImg
                              }
                              width={50}
                              height={50}
                              className="customerImg"
                              alt="supervisorImg"
                            />
                            <div className="customerNameEmail">
                              <p className="heading16 mb-0">
                                {(item?.user_profiles?.first_name ?? "") +
                                  " " +
                                  (item?.user_profiles?.last_name ?? "")}
                              </p>
                              {/* <p className="text12 mb-0">Trop@gmail.com</p> */}
                            </div>
                          </div>
                        </td>
                        <td className="tableHeading sendNotificationSupervisor">
                        <p className="heading16 mb-0">{item?.email}</p>
                        </td>
                        <td className="tableHeading sendNotificationSupervisor">
                          <button
                            className="assignToSelectBtn employSendBtn"
                            onClick={() => {
                              setModalDetail({
                                show: true,
                                title: "Send Notifcation",
                                flag: "notification",
                                id: item?.id,
                              });
                              setKey(Math.random());
                            }}
                          >
                            Send
                          </button>
                        </td>
                        <td className="tableHeading actionSupervisor">
                          <Image
                            src={images.deleteIcon}
                            className="me-2 cursor"
                            onClick={() => {
                              handleSupervisorDelete(item);
                            }}
                            alt="deleteImg"
                          />
                          <Image
                            src={images.penIcon}
                            className="ms-2 cursor"
                            alt="penIcon"
                            onClick={() => {
                              router.push("/editProfile?id=" + item?.id);
                            }}
                          />
                        </td>
                        <td className="tableHeading">
                          {/* <Image
                            src={images.permissionImg}
                            className="permissionImg"
                            alt="permissionImg"
                          /> */}
                          {/* <span className="permissionText">3 Permissions</span> */}
                          <Image
                            src={images.rightArrow}
                            className="rightArrowImg ms-4"
                            alt="image"
                            onClick={() =>
                              router.push(
                                "/supervisors/permissions/" + item?.id
                              )
                            }
                          />
                        </td>

                        {/* <td
                          className="tableHeading text-center"
                          onClick={() => {
                            router.push(`/customers/${item?.id}`);
                          }}
                        >
                          <Image
                            src={images.rightArrow}
                            className="cursor"
                            alt="image"
                          />
                        </td> */}
                      </tr>
                    );
                  })
                ) : (
                  <>
                    <tr>
                      <td colSpan="9" className="text-center p-4">
                        <h4>No Supervisor found.</h4>
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          {supervisorListData?.total_pages > 1 && (
            <ReactPaginate
              className="pagination"
              breakLabel="..."
              nextLabel="Next"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={supervisorListData?.total_pages}
              previousLabel="Previous"
              renderOnZeroPageCount={null}
            />
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
          modalDetail?.flag == "notification" ? (
            <SendNotification
              id={modalDetail.id}
              close={() => handleOnCloseModal()}
            />
          ) : (
            <AddSupervisorModal
              id={modalDetail.id}
              updateList={() => {
                getSupervisorListAction(filter);
              }}
              close={() => handleOnCloseModal()}
            />
          )
        }
        onCloseModal={() => handleOnCloseModal()}
      />
    </>
  );
};

export default withAuth(SupervisorListing);

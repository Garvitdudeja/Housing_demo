import withAuth from "@/authentication/withauth";
import AddAdminModal from "@/Components/Admin/AddAdminModal";
import BlueSpinner from "@/Components/Common/BlueSpinner";
import CustomModal from "@/Components/Common/CustomModal";
import Navbar from "@/Components/Common/Navbar";
import SendNotification from "@/Components/Customers/SendNotification";
import { hanldeWholeNumbers } from "@/function/commonFunctions";
import { useWebSelector } from "@/redux/selector/web";
import { deleteACustomer, getAdminList } from "@/redux/slices/web";
import * as images from "@/utilities/images.js";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import swal from "sweetalert";

const index = (props) => {
  const pageHeading = "Admin";
  const webSelector = useWebSelector();
  const dispatch = useDispatch();
  const router = useRouter();
  const [adminListData, setAdminListData] = useState();
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
  const getAdminListAction = (filter) => {
    const params = {
      ...filter,
    };
    dispatch(
      getAdminList({
        ...params,
        cb(res) {
          setAdminListData(res);
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
            cb() {
              getAdminListAction(filter);
            },
          })
        );
      }
    });
  };

  useEffect(() => {
    getAdminListAction(filter);
  }, [filter]);

  return (
    <>
      <Navbar heading={pageHeading} />
      <div className="supervisorContent">
        <div className="shiftRequestFilter mt-3">
          <div>
            <h3 className="headingGreen20 mb-0">All Admins </h3>
            <p className="text14 mb-0">
              {hanldeWholeNumbers(adminListData?.totalRecords)} Admins
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
                  flag: "AddAdmin",
                });
                setKey(Math.random());
              }}
            >
              <Image
                src={images.paitentIcon}
                className="me-2"
                alt="paitentImg"
              />
              <span>Add New Admin</span>
            </button>
          </div>
        </div>

        <div className="supervisorTable mt-3">
          <div className="supervisorTable">
            <table className="commonTable">
              <thead>
                <tr>
                  <th className="tableHeading">Name</th>
                  <th className="tableHeading">Send Notification</th>
                  <th className="tableHeading">Action</th>
                  <th className="tableHeading">Give Permissions</th>
                </tr>
              </thead>
              <tbody>
                {props?.isClient && webSelector.loading ? (
                  <BlueSpinner />
                ) : props?.isClient && adminListData?.data?.length > 0 ? (
                  adminListData?.data?.map((item, index) => {
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
                              alt="adminImg"
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
                          <Image
                            src={images.rightArrow}
                            className="rightArrowImg ms-4"
                            alt="image"
                            onClick={() =>
                              router.push("/admin/permissions/" + item?.id)
                            }
                          />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <>
                    <tr>
                      <td colSpan="9" className="text-center p-4">
                        <h4>No Admin found.</h4>
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          {adminListData?.total_pages > 1 && (
            <ReactPaginate
              className="pagination"
              breakLabel="..."
              nextLabel="Next"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={adminListData?.total_pages}
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
            <AddAdminModal
              id={modalDetail.id}
              updateList={() => {
                getAdminListAction(filter);
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

export default withAuth(index);

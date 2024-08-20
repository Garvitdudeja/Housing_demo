import React, { useEffect, useState } from "react";
import * as images from "@/utilities/images.js";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { deleteACustomer, deleteSite, getSiteList } from "@/redux/slices/web";
import ReactPaginate from "react-paginate";
import CustomModal from "@/Components/Common/CustomModal";
import SendNotification from "@/Components/Customers/SendNotification";
import swal from "sweetalert";
import { hanldeWholeNumbers, nullString } from "@/function/commonFunctions";
import { useRouter } from "next/router";
import withAuth from "@/authentication/withauth";
import { useWebSelector } from "@/redux/selector/web";
import { toast } from "react-toastify";
import axios from "axios";
import Navbar from "@/Components/Common/Navbar";
import BlueSpinner from "@/Components/Common/BlueSpinner";


const index = (props) => {
  const pageHeading = "Site"
  const [siteListData, setSiteListData] = useState({});
  const [key, setKey] = useState();
  const webSelector = useWebSelector();
  const dispatch = useDispatch();
  const router = useRouter();
  const [filter, setFilter] = useState({ page: 1, limit: 10 });
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
    id: "",
  });

  const handleOnCloseModal = () => {
    setModalDetail({
      show: false,
      title: "",
      flag: "",
    });
    setKey(Math.random());
  };
  const getSiteListAction = (filter) => {
    const params = {
      ...filter,
    };
    dispatch(
      getSiteList({
        ...params,
        cb(res) {
          setSiteListData(res);
        },
      })
    );
  };
  useEffect(() => {
    getSiteListAction(filter);
  }, [filter]);

  const handlePageClick = (event) => {
    setFilter((prev) => ({ ...prev, page: event.selected + 1 }));
  };
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
                  getSiteListAction(filter);
                  toast.success("Site Deleted SuccessFully");
                }
              );
            },
          })
        );
      }
    });
  };
  return (
    <>
     <Navbar heading={pageHeading}/>
      <div className="siteContent">
        <div className="shiftRequestFilter mt-3">
          <div>
            <h3 className="headingGreen20 mb-0">Sites</h3>
            <p className="text14 mb-0">
                  {hanldeWholeNumbers(siteListData?.total)} sites
                </p>
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
            <div
              className="profileBtn"
              onClick={() => {
                router.push("/sites/manage");
              }}
            >
              <i className="fa-solid fa-plus"></i>
              <span className="ps-2">Add Site</span>
            </div>
          </div>
        </div>

        <div className="siteTable mt-3">
          <table className="commonTable">
            <thead>
              <tr>
                <th className="tableHeading siteNameHeading">Site Name</th>
                <th className="tableHeading territoryNameHeading">
                  Territory Name
                </th>
                <th className="tableHeading cityHeading">City</th>
                <th className="tableHeading">Action</th>
                <th className="tableHeading text-center">View Details</th>
              </tr>
            </thead>
            <tbody>
              {console.log(siteListData, "siteListdat")}

              {props?.isClient && webSelector.loading  ? <BlueSpinner/> :  props?.isClient &&
              siteListData?.site?.length > 0 ? (
                siteListData?.site?.map((item) => (
                  <tr key={item?.id}>
                    <td className="tableHeading">{item?.name}</td>
                    <td className="tableHeading">
                      {item?.site_territories?.map(item=><button className="requestForBtn m-2">{item.territory_details?.name}</button>)}
                    </td>
                    <td className="tableHeading">{item?.city}</td>
                    <td className="tableHeading">
                      <Image
                        src={images.deleteIcon}
                        className="me-2 cursor"
                        alt="img"
                        onClick={() => {
                          handleSiteDelete(item);
                        }}
                      />
                      <Image
                        onClick={() => {
                          router.push("/sites/manage?id=" + item.id);
                        }}
                        src={images.penIcon}
                        className="ms-2 cursor"
                        alt="img"
                      />
                    </td>
                    <td className="tableHeading text-center">
                      <Image
                        src={images.rightArrow}
                        className="cursor"
                        alt="img"
                        onClick={() => router.push("/sites/" + item?.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center p-4">
                    <h4>No Site found.</h4>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {siteListData?.total_pages > 1 && (
          <ReactPaginate
            className="pagination"
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={siteListData?.total_pages}
            previousLabel="Previous"
            renderOnZeroPageCount={null}
          />
        )}
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

export default withAuth(index);

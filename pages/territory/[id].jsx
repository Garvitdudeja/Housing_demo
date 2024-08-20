import React, { useEffect, useState } from "react";
import * as images from "@/utilities/images.js";
import Image from "next/image";
import { useRouter } from "next/router";
import withAuth from "@/authentication/withauth";
import { useDispatch } from "react-redux";
import { deleteTerrority, getTerritory } from "@/redux/slices/web";
import { nullString } from "@/function/commonFunctions";
import swal from "sweetalert";
import Navbar from "@/Components/Common/Navbar";

const territoryView = () => {
  const pageHeading = "Territory";
  const router = useRouter();
  const [data, setData] = useState({});
  const id = router?.query?.id;
  const dispatch = useDispatch();
  const getTerritoryAction = (id) => {
    dispatch(
      getTerritory({
        id,
        cb(res) {
          setData(res);
        },
      })
    );
  };
  useEffect(() => {
    if (id) {
      getTerritoryAction(id);
    }
  }, [id]);
  const handleTerrorityDelete = (data) => {
    const params = { id: data?.id };
    swal({
      title: "Delete Territory",
      text: "Are you sure? You want to delete this account",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(
          deleteTerrority({
            ...params,
            cb(res) {
              swal(
                "Territory Deleted",
                `Hey! You successfully deleted territory.`
              ).then(router.push("/territory"));
            },
          })
        );
      }
    });
  };

  return (
    <>
      <Navbar heading={pageHeading} />
      <div className="territoryView">
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
                <h4 className="heading16">Territory Detail</h4>
              </div>
            </div>
          </div>
          <div className="customerBtns">
            <button
              className="editBtnRounded me-2"
              onClick={() => {
                router.push("/territory/manageTerritory?id=" + id);
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
                handleTerrorityDelete(data);
              }}
            >
              <Image src={images.deleteIcon} className="me-2" alt="deleteImg" />
              <span>Delete</span>
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h6 className="heading16">Territory</h6>
            <p className="heading18">{data?.name}</p>
          </div>
        </div>
        <div className="row">
          <h6 className="heading16">Supervisors or Admins</h6>
          {data?.territory_details?.length > 0
            ? data?.territory_details.map((item) => (
                <div className="col-md-3 mt-2">
                  <div className="supervisorList">
                    <Image
                      src={
                        item?.territory_user_detail?.user_profiles
                          ?.profile_photo ?? images.customerImg
                      }
                      width={100}
                      height={100}
                      alt="customerImg"
                      className="customerImg"
                    />
                    <div>
                      <p className="haeding16 mb-0">
                        {nullString(
                          item?.territory_user_detail?.user_profiles?.first_name
                        ) +
                          " " +
                          nullString(
                            item?.territory_user_detail?.user_profiles
                              ?.last_name
                          )}
                      </p>
                      <small>
                        {item?.user_roles?.role_id == 2
                          ? "Supervisor"
                          : "Admin"}
                      </small>
                    </div>
                  </div>
                </div>
              ))
            : "No Supervisor Found"}
        </div>
      </div>
    </>
  );
};

export default withAuth(territoryView);

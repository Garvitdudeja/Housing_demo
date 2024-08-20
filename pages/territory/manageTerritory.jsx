import React, { useEffect, useState } from "react";
import * as images from "@/utilities/images.js";
import Image from "next/image";
import { useRouter } from "next/router";
import withAuth from "@/authentication/withauth";
import {
  addTerritory,
  getAdminList,
  getSupervisorList,
  getTerritory,
  updateTerritory,
} from "@/redux/slices/web";
import { useDispatch } from "react-redux";
import { useWebSelector } from "@/redux/selector/web";
import Spinner from "@/Components/Common/Spinner";
import { toast } from "react-toastify";
import Navbar from "@/Components/Common/Navbar";

const AddTerritory = () => {
  const pageHeading = "Territory";
  const router = useRouter();
  const webSelector = useWebSelector();
  const [showSupervisors, setShowSupervisors] = useState(false);
  const [supervisorList, setSupervisorListData] = useState([]);
  const [adminList, setAdminListData] = useState([]);
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({ user_id: [] });
  const toggleSupervisors = () => {
    setShowSupervisors((prev) => !prev);
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

  const handleAddTerritory = (e) => {
    e.preventDefault();
    toast.dismiss();
    if (!postData?.name || postData?.name.trim() == "") {
      toast.error("Enter a valid Territory Name");
      return;
    }
    if (postData?.name.split(" ").length >= 20) {
      toast.error("Territory Name must be less then 20 words");
      return;
    }
    if (postData?.name.length < 3) {
      toast.error("Territory Name should be at least 3 characters");
      return;
    }
    if (postData?.user_id.length == 0) {
      toast.error("Select atleast one supervisor!");
      setShowSupervisors(true);
      return;
    }
    if (editId) {
      dispatch(
        updateTerritory({
          ...postData,
          id: editId,
          cb(res) {
            router.push("/territory/" + editId);
          },
        })
      );
    } else {
      dispatch(
        addTerritory({
          ...postData,
          cb(res) {
            router.push("/territory");
          },
        })
      );
    }
  };

  useEffect(() => {
    getSupervisorListAction();
    getAdminListAction();
  }, []);

  const getTerritoryAction = (id) => {
    dispatch(
      getTerritory({
        id,
        cb(res) {
          console.log(res, "resssss");
          const userList = res?.territory_details.map((item) => item?.user_id);
          setPostData({ name: res?.name, user_id: [...userList] });
        },
      })
    );
  };
  //Handle Edit
  const editId = router.query.id;
  useEffect(() => {
    if (editId) {
      getTerritoryAction(editId);
    }
  }, [editId]);

  return (
    <>
      <Navbar heading={pageHeading} />
      <div className="commonHeader mb-3">
        <div className="hospitalDetail">
          <div className="backArrowBtn" onClick={() => router.back()}>
            <Image src={images.leftArrowLong} alt="img" />
          </div>
          <div className="hospitalDetailOuter">
            <div className="hospitalDetailText">
              <h4 className="heading16">
                {editId ? "Edit " : "Add "} Territory
              </h4>
              <p className="text14">Add details below for territory</p>
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={handleAddTerritory}>
        <div className="addTerritoryForm">
          <div className="row mt-4">
            <div className="col-md-6">
              <div className="shiftReqDescription">
                <p className="text12 mb-0">Territory Name</p>
                <div className="editProfileInputOuter">
                  <Image
                    src={images.flagIcon}
                    className="flagIcon"
                    alt="userIcon"
                  />
                  <input
                    type="text"
                    value={postData?.name}
                    onChange={(e) =>
                      setPostData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="filterInput w-100"
                    placeholder="Territory Name"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="filterFormOuter mb-3">
                <p className="text12 mb-0">Supervisors or Admin</p>
                <div className="selectSupervisor" onClick={toggleSupervisors}>
                  <div className="select d-flex">
                    <Image
                      src={images.supervisorsIcon}
                      alt="image"
                      className="supervisorImg"
                    />
                    <p className="heading14 mb-0 ps-2">select</p>
                  </div>
                  <Image src={images.selectDown} alt="selectImg" />
                </div>
              </div>
              <div
                className={`allSupervisor ${
                  showSupervisors ? "visible" : "hidden"
                }`}
              >
                {(Array.isArray(supervisorList?.data) ||
                  Array.isArray(adminList?.data)) && (
                  <>
                    {supervisorList?.data?.map((item, index) => (
                      <div
                        className="supervisorOne mt-3 customCheck "
                        key={index}
                      >
                        <label htmlFor="supervisor1">
                          <Image
                            src={
                              item?.user_profiles?.profile_photo ??
                              images.customerImg
                            }
                            height={50}
                            width={50}
                            alt="customerIcon"
                          />
                          <span className="heading14 ms-2">
                            {(item?.user_profiles?.first_name ?? "") +
                              " " +
                              (item?.user_profiles?.last_name ?? "")}
                            <br />
                            <small>
                              {item?.user_roles?.role_id == 2
                                ? "Supervisor"
                                : "Admin"}
                            </small>
                          </span>
                        </label>
                        <input
                          type="checkbox"
                          id="supervisor1"
                          checked={postData?.user_id.includes(item?.id)}
                          name="supervisor1"
                          value="Bike"
                          onChange={(e) => {
                            setPostData((prev) => {
                              if (e.target.checked) {
                                const user_id = [...prev?.user_id];
                                user_id.push(item?.id);
                                return { ...prev, user_id: user_id };
                              } else {
                                const user_id = prev.user_id.filter(
                                  (x) => x != item?.id
                                );
                                return { ...prev, user_id };
                              }
                            });
                          }}
                          className="supervisorInput"
                        />
                      </div>
                    ))}

                    {adminList?.data?.map((item, index) => (
                      <div
                        className="supervisorOne mt-3 customCheck "
                        key={index}
                      >
                        <label htmlFor="supervisor1">
                          <Image
                            src={
                              item?.user_profiles?.profile_photo ??
                              images.customerImg
                            }
                            height={50}
                            width={50}
                            alt="customerIcon"
                          />
                          <span className="heading14 ms-2">
                            {(item?.user_profiles?.first_name ?? "") +
                              " " +
                              (item?.user_profiles?.last_name ?? "")}
                            <br />
                            <small>
                              {item?.user_roles?.role_id == 2
                                ? "Supervisor"
                                : "Admin"}
                            </small>
                          </span>
                        </label>
                        <input
                          type="checkbox"
                          id="supervisor1"
                          checked={postData?.user_id.includes(item?.id)}
                          name="supervisor1"
                          value="Bike"
                          onChange={(e) => {
                            setPostData((prev) => {
                              if (e.target.checked) {
                                const user_id = [...prev?.user_id];
                                user_id.push(item?.id);
                                return { ...prev, user_id: user_id };
                              } else {
                                const user_id = prev.user_id.filter(
                                  (x) => x != item?.id
                                );
                                return { ...prev, user_id };
                              }
                            });
                          }}
                          className="supervisorInput"
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
            <div className="editSkilsBtnInner">
              <div className="col-md-12 mt-4">
                <button className="profileBtn">
                  {webSelector.loading ? (
                    <Spinner />
                  ) : editId ? (
                    "Edit "
                  ) : (
                    "Add "
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default withAuth(AddTerritory);

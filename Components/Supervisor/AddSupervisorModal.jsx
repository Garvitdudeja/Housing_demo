import {
  ImageUpload,
  createSupervisor,
  sendUserNotification,
} from "@/redux/slices/web";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as images from "@/utilities/images.js";
import Image from "next/image";
import { emailREgex } from "@/utilities/Regex.js";

const AddSupervisorModal = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const handleAddSuperversior = (event) => {
    event.preventDefault();
    const params = {
      ...data,
      role_id: 2,
    };
    if(!data?.email && !data?.last_name && !data?.first_name){
      toast.error("please fill the data");
      return;
    }
    else if (!emailREgex.test(data?.email)) {
      toast.error("Enter a valid Email!");
      return;
    } else if (!data?.first_name) {
      toast.error("Enter First Name!");
      return;
    } else if (!data?.last_name) {
      toast.error("Enter Last Name!");
      return;
    } else if (!data?.profile_photo) {
      toast.error("Add a Profile Photo!");
      return;
    }else if(!data?.email && !data?.last_name && !data?.first_name){
      toast.error("please fill the data");
      return;
    }else if(data?.first_name.trim( )== "" || data?.first_name[0] == " " || data?.first_name.split(" ").length > 1){
      toast.error("Enter a valid First Name");
      return;
    }
    else if(data?.last_name.trim( )== "" || data?.last_name[0] == " " || data?.last_name.split(" ").length > 1){
      toast.error("Enter a valid Last Name");
      return;
    }
    dispatch(
      createSupervisor({
        ...params,
        cb(res) {
          props?.updateList();
          toast.success("Supervisor Added Successfully! ");
          props?.close();
        },
      })
    );
  };
  const handleImageUpload = (event) => {
    try {
      const params = {
        photo: event.target.files[0],
      };
      dispatch(
        ImageUpload({
          ...params,
          cb(res) {
            setData((prev) => ({ ...prev, profile_photo: res?.url }));
          },
        })
      );
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="addSupervisorModal">
        <h2 className="heading24">Add New User</h2>
        <form onSubmit={handleAddSuperversior}>
          <div className="position-relative text-center">
            <div className="supervisorDetailUser"
            >
              <Image
                src={data?.profile_photo ?? images.userIconImg}
                className="userProfileImg"
                alt="customerImg"
                width={100}
                height={100}
              />
            </div>
            <div className="pencilImg">
              <input
                type="file"
                name="file-input"
                id="file-input"
                onChange={(event) => {
                  handleImageUpload(event);
                }}
                className="customerInput"
              />
              <label className="customerInputLable cursor" htmlFor="file-input">
                <Image
                  src={images.pencilImg}
                  className="pencil "
                  alt="pencilImg"
                />
              </label>
            </div>
          </div>
          <div className="editProfileForm">
            <div className="row my-4">
              <div className="col-md-12">
                <div className="shiftReqDescription">
                  <p className="text12 mb-0">First Name</p>
                  <div className="editProfileInputOuter">
                    <Image
                      src={images.userIconImg}
                      className="userIconImg"
                      alt="userIcon"
                    />
                    <input
                      type="text"
                      maxlength="20" 
                      onChange={(e) => {
                        setData((prev) => ({
                          ...prev,
                          first_name: e.target.value,
                        }));
                      }}
                      className="filterInput"
                      placeholder="Enter First Name"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-12 mt-2">
                <div className="shiftReqDescription">
                  <p className="text12 mb-0">Last Name</p>
                  <div className="editProfileInputOuter">
                    <Image
                      src={images.userIconImg}
                      className="userIconImg"
                      alt="userIcon"
                    />
                    <input
                      type="text"
                      maxlength="20" 
                      onChange={(e) => {
                        setData((prev) => ({
                          ...prev,
                          last_name: e.target.value,
                        }));
                      }}
                      className="filterInput"
                      placeholder="Enter last Name"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-12 mt-2">
                <div className="shiftReqDescription">
                  <p className="text12 mb-0">Email</p>
                  <div className="editProfileInputOuter">
                    <Image
                      src={images.emailImg}
                      className="userIconImg"
                      alt="userIcon"
                    />
                    <input
                      type="text"
                      onChange={(e) => {
                        setData((prev) => ({ ...prev, email: e.target.value }));
                      }}
                      className="filterInput"
                      placeholder="Enter Email"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-12 mt-2">
                <div className="shiftReqDescription">
                  <p className="text12 mb-0">Phone Number</p>
                  <div className="editProfileInputOuter">
                    <Image
                      src={images.emailImg}
                      className="userIconImg"
                      alt="userIcon"
                    />
                    <input
                      type="text"
                      onChange={(e) => {
                        setData((prev) => ({ ...prev, email: e.target.value }));
                      }}
                      className="filterInput"
                      placeholder="Enter Phone Number"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-12 mt-4 text-center">
                <button className="profileBtn">Add</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddSupervisorModal;

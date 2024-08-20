import React, { useEffect, useState } from "react";
import * as images from "@/utilities/images.js";
import Image from "next/image";
import { useRouter } from "next/router";
import { ImageUpload, getUserByID, updateUser } from "@/redux/slices/web";
import { useDispatch } from "react-redux";
import Spinner from "@/Components/Common/Spinner";
import { useWebSelector } from "@/redux/selector/web";
import { toast } from "react-toastify";
import withAuth from "@/authentication/withauth";
import Navbar from "@/Components/Common/Navbar";
const editProfile = (props) => {
  const pageHeading = "Edit";
  const router = useRouter();
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const webData = useWebSelector();
  const id = router.query.id;
  const getUserAction = (id) => {
    dispatch(
      getUserByID({
        id,
        cb(res) {
          const temp = res;
          setData({
            first_name: temp?.user_profiles?.first_name,
            last_name: temp?.user_profiles?.last_name,
            address: temp?.user_profiles?.address,
            email: temp?.email,
            profile_photo: temp?.user_profiles?.profile_photo,
            id: temp?.id,
            user_role: temp?.user_roles?.role_id,
          });
        },
      })
    );
  };
  useEffect(() => {
    if (id) getUserAction(id);
  }, [id]);
  const handleEditProfile = (event, data) => {
    event.preventDefault();
    if (!data?.profile_photo) {
      delete data.profile_photo;
    }
    dispatch(
      updateUser({
        ...data,
        cb(res) {
          if (data?.user_role == "4") {
            toast.success("Staff Updated Sucessfully!");
            router.push("/staff");
            return;
          }
          if (data?.user_role == "2") {
            toast.success("Supervisor Updated Sucessfully!");
            router.push("/supervisors");
            return;
          }
          if (data?.user_role == "5") {
            toast.success("Admin Updated Sucessfully!");
            router.push("/admin");
            return;
          }
          toast.success("Customer Updated Sucessfully!");
          router.push("/customers/" + res?.id);
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
      <Navbar heading={pageHeading} />
      <div className="commonHeader mb-3">
        <div className="hospitalDetail">
          <div
            className="backArrowBtn"
            onClick={() => router.back()}
            alt="leftArrowImg"
          >
            <Image src={images.leftArrowLong} />
          </div>
          <div className="hospitalDetailOuter">
            <div className="hospitalDetailText">
              <h4 className="heading16">Edit Profile</h4>
              <p className="text14">Edit your profile details</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="editCustomerProfile">
          <div className="position-relative">
            {props?.isClient && (
              <Image
                src={data?.profile_photo ?? images.customerImg}
                className="customerProfileImg"
                alt="customerImg"
                width={100}
                height={100}
              />
            )}

            <div className="pencilImg">
              <input
                type="file"
                name="file-input"
                id="file-input"
                className="customerInput w-100"
                onChange={(event) => {
                  handleImageUpload(event);
                }}
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

          <div className="editProflePara">
            <p className="heading14 mb-0">Hi</p>
            <p className="heading14 mb-0">Welcome</p>
            <p className="heading12 mb-0">Change your profile image</p>
          </div>
        </div>
      </div>
      <form
        onSubmit={(event) => {
          handleEditProfile(event, data);
        }}
      >
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
                    className="filterInput w-100"
                    placeholder="Enter First Name"
                    value={data?.first_name}
                    required
                    onChange={(event) =>
                      setData((prev) => ({
                        ...prev,
                        first_name: event.target.value,
                      }))
                    }
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
                    required
                    className="filterInput w-100"
                    placeholder="Enter First Name"
                    value={data?.last_name}
                    onChange={(event) =>
                      setData((prev) => ({
                        ...prev,
                        last_name: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12 mt-2">
              <div className="shiftReqDescription">
                <p className="text12 mb-0">Email Address</p>
                <div className="editProfileInputOuter">
                  <Image
                    src={images.emailImg}
                    className="userIconImg"
                    alt="userIcon"
                  />
                  <input
                    type="email"
                    required
                    className="filterInput w-100"
                    placeholder="Enter Your Email"
                    value={data?.email}
                    onChange={(event) =>
                      setData((prev) => ({
                        ...prev,
                        email: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12 mt-2">
              <div className="shiftReqDescription">
                <p className="text12 mb-0">Address</p>
                <div className="editProfileInputOuter">
                  <Image
                    src={images.hashtagImg}
                    className="userIconImg"
                    alt="userIcon"
                  />
                  <input
                    type="text"
                    className="filterInput w-100"
                    placeholder="Enter Your Address"
                    required
                    value={data?.address}
                    onChange={(event) =>
                      setData((prev) => ({
                        ...prev,
                        address: event.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
            <div className="editSkilsBtnInner">
              <div className="col-md-12 mt-4">
                <button
                  className={`profileBtn ${
                    webData.loading ? "inactiveBtn" : ""
                  }`}
                  type="submit"
                >
                  {webData?.loading && <Spinner className="pr-2" />}
                  Save Changes
                </button>
                {data?.user_role == 4 && (
                  <button
                    className={`profileBtn inactiveBtn ms-3`}
                    type="button"
                    onClick={() => {
                      router.push("/staff/skills/" + data?.id);
                    }}
                  >
                    Edit Skills
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default withAuth(editProfile);

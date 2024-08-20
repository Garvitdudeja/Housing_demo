import React, { useEffect } from "react";
import * as images from "@/utilities/images.js";
import Image from "next/image";
import withAuth from "@/authentication/withauth";
import { useRouter } from "next/router";
import { employeeListJob } from "@/redux/slices/web";
import { useDispatch } from "react-redux";
import Navbar from "@/Components/Common/Navbar";

const assign = () => {
  const pageHeading = "Jobs"
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  console.log(id)
  const employeeListJobAction = () => {
    dispatch(
      employeeListJob({id,
        cb(res) {
          console.log(res);
        },
      })
    );
  };
  useEffect(() => {
   if(id) employeeListJobAction();
  },[id]);
  return (
    <>
     <Navbar heading={pageHeading}/>
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
              <h4 className="heading16">Assign To</h4>
              <p className="text14">Select the Customer to assign Site</p>
            </div>
          </div>
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
              />
              <Image
                src={images.crossIcon}
                alt="icon"
                className="customerCrossIcon"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h6 className="heading16">Available</h6>
        </div>
      </div>
    </>
  );
};
export default withAuth(assign);

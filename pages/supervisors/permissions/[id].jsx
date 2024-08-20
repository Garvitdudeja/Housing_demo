import React, { useEffect, useState } from "react";
import * as images from "@/utilities/images.js";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getUserPermissions, updateUserPermission } from "@/redux/slices/web";
import withAuth from "@/authentication/withauth";
import Navbar from "@/Components/Common/Navbar";

const permission = () => {
  const pageHeading = "Supervisor"
  const router = useRouter();
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const id = router.query.id;
  const getUserPermissionAction = (id) => {
    const params = {
      id,
    };
    dispatch(
      getUserPermissions({
        ...params,
        cb(res) {
          setData(res);
        },
      })
    );
  };
  const formatName = (str) => {
    return str
      .split("_")
      .map((item) => item[0].toUpperCase() + item.slice(1))
      .join(" ");
  };
  useEffect(() => {
    if (id) {
      getUserPermissionAction(id);
    }
  }, [id]);

  const UpdatePermission = (status, id) => {
    const params = {
      status: status ? 1 : 0,
      id,
    };
    dispatch(
      updateUserPermission({
        ...params,
        cb(res) {
          setData((prev) => prev.map((item) => {
            if(id == item?.id){
              return {...item, status: status ? 1 : 0 }
            }else{
              return {...item}
            }
          }));
        },
      })
    );
  };
  return (
    <>
     <Navbar heading={pageHeading}/>
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
              <h4 className="heading16">Give Permissions</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="permissions">
        <div className="row">
          {data?.map((item) => (
            <div key={item?.id} className="col-md-4 mt-2">
              <div className="createSitePermission">
                <p className="mb-0 createSiteText">
                  {formatName(item?.permission_details?.name)}
                </p>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={item?.status}
                    onChange={(e) => {
                      UpdatePermission(e.target.checked, item?.id);
                    }}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default withAuth(permission);

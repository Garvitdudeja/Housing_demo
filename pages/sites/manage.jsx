import React, { useEffect, useState } from "react";
import * as images from "@/utilities/images.js";
import Image from "next/image";
import { useRouter } from "next/router";
import withAuth from "@/authentication/withauth";
import { useDispatch } from "react-redux";
import {
  addSite,
  getSiteDetails,
  getTerritoryList,
  updateSite,
} from "@/redux/slices/web";
import { useWebSelector } from "@/redux/selector/web";
import Spinner from "@/Components/Common/Spinner";
import Select from "react-select";
import { toast } from "react-toastify";
import Navbar from "@/Components/Common/Navbar";

const editsite = () => {
  const pageHeading = "Site"
  const router = useRouter();
  const [data, setData] = useState({territory_id:[]});
  const dispatch = useDispatch();
  const [territoryListData, setTerritoryListData] = useState();
  const webSelector = useWebSelector();
  const handleAddSite = (e) => {
    e.preventDefault();
    console.log(data)
    if(data?.territory_id.length == 0){
      toast.error("Please select territory");
      return;
    }
    if(data?.name.split(" ").length >= 20 ){
      toast.error("Site Name must be less than 20 words");
      return;
    }
    if(data?.address.split(" ").length >= 20 ){
      toast.error("Address must be less than 20 words");
      return;
    }
    if(data?.city.split(" ").length >= 20 ){
      toast.error("city must be less than 20 words");
      return;
    }
    if (id) {
      dispatch(
        updateSite({
          ...data,territory_id: data?.territory_id?.map(item=>item.value.toString()),
          id,
          cb(res) {
            router.push("/sites/" + id);
          },
        })
      );
    } else {
      dispatch(
        addSite({
          ...data,territory_id: data?.territory_id?.map(item=>item.value.toString()),
          cb(res) {
            router.push("/sites");
          },
        })
      );
    }
  };
  const id = router.query?.id;
  console.log(id, "first");
  // Edit Site

  const getSiteAction = (id) => {
    dispatch(
      getSiteDetails({
        id,
        cb(res) {
          setData({
            name: res.name,
            address: res.address,
            city: res.city,
            territory_id: res?.site_territories.map((item) => ({value: item?.territory_id, label: item?.territory_details?.name})),
          });
        },
      })
    );
  };
  console.log(data);
  useEffect(() => {
    if (id) getSiteAction(id);
    if (!territoryListData) getTerritoryListAction();
  }, [id]);

  const getTerritoryListAction = (filter) => {
    const params = {
      ...filter,
    };
    dispatch(
      getTerritoryList({
        ...params,
        cb(res) {
          setTerritoryListData(
            res?.data?.map((item) => ({ value: item?.id, label: item?.name }))
          );
        },
      })
    );
  };
  return (
    <>
     <Navbar heading={pageHeading}/>
      <div className="commonHeader mb-3">
        <div className="hospitalDetail">
          <div className="backArrowBtn" onClick={() => router.back()}>
            <Image src={images.leftArrowLong} alt="img" />
          </div>
          <div className="hospitalDetailOuter">
            <div className="hospitalDetailText">
              <h4 className="heading16">{id ? "Edit" : "Add"} Site</h4>
              <p className="text14">Add details below for Site.</p>
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={handleAddSite}>
        <div className="addTerritoryForm">
          <div className="row mt-4">
            <div className="col-md-6">
              <div className="shiftReqDescription">
                <p className="text12">Site Name</p>
                <div className="editProfileInputOuter">
                  <Image
                    src={images.locationIcon}
                    className="loactionImg"
                    alt="locationIcon"
                  />
                  <input
                    type="text"
                    value={data?.name}
                    onChange={(e) => {
                      setData((prev) => ({ ...prev, name: e.target.value }));
                    }}
                    className="filterInput w-100"
                    placeholder="Enter Sitename"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="shiftReqDescription">
                <p className="text12">Address</p>
                <div className="editProfileInputOuter">
                  <Image
                    src={images.hashtagImg}
                    className="userIconImg"
                    alt="userIcon"
                  />
                  <input
                    type="text"
                    onChange={(e) => {
                      setData((prev) => ({ ...prev, address: e.target.value }));
                    }}
                    maxLength="50"
                    value={data?.address}
                    className="filterInput w-100"
                    placeholder="Enter the Address"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="filterFormOuter  mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                className="txt12 form-label filterLabel mb-0"
                >
                  Territory
                </label>
                <Select
                className="editSiteSearch"
                placeholder="select Territory"
                id="editSite"
                  options={territoryListData}
                  isMulti
                  value={data?.territory_id}
                  onChange={(selected) => {
                    setData((prev) => ({
                      ...prev,
                      territory_id: selected,
                    }));
                  }}
                ></Select>
                {/* <select className="filterSelect" value={data?.territory_id} onChange={(e)=>{console.log( e.target.value); setData(prev=>({...prev, territory_id: [e.target.value]}))}}>
                  {territoryListData?.map(item=>((<option value={item.id}>{console.log(data?.territory_id)}{item.name}</option>)))}
                </select> */}
              </div>
            </div>
            <div className="col-md-6 mt-3">
              <div className="shiftReqDescription">
                <p className="text12">City</p>
                <div className="editProfileInputOuter">
                  <Image
                    src={images.cityIcon}
                    className="cityImg"
                    alt="userIcon"
                  />
                  <input
                    type="text"
                    className="filterInput w-100"
                    placeholder="Enter City"
                    maxLength="20"
                    onChange={(e) => {
                      setData((prev) => ({ ...prev, city: e.target.value }));
                    }}
                    value={data?.city}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="editSkilsBtnInner">
              <div className="col-md-12 mt-2">
                <button className="profileBtn">
                  {webSelector?.loading ? <Spinner /> : id ? "Edit" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default withAuth(editsite);

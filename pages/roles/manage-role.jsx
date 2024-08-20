import React, { useEffect, useState } from "react";
import * as images from "@/utilities/images.js";
import Image from "next/image";
import { useRouter } from "next/router";
import Navbar from "@/Components/Common/Navbar";
import { useDispatch } from "react-redux";
import { addRole, getDesignationById, updateDesignation } from "@/redux/slices/web";
import { useWebSelector } from "@/redux/selector/web";
import Spinner from "@/Components/Common/Spinner";
import { toast } from "react-toastify";

const ManageRole = () => {
  const router = useRouter();
  const dispatch = useDispatch()
  const pageHeading = "Roles";
  const id = router.query?.id
  const [data, setData] = useState({sub_designation:[]})
  const webSelector = useWebSelector()

  const handleAddRole = () => {
    setData(prev=>({...prev, sub_designation: [...prev?.sub_designation,""]}))
  };

  const handleRemoveRole = (idToRemove) => {
    console.log(data.sub_designation)
    setData(prev=>({...prev, sub_designation: prev?.sub_designation?.filter((x,index)=>index!=idToRemove)}))
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!data?.name || data?.name.trim() == ""){
      toast.error("Enter a valid Role Name")
      return
    }
    if(data?.name.split(' ').length>=20){
      toast.error("Role Name must be less then 20 words")
      return;
    }
    if (data?.name.length < 3){
      toast.error("Role Name should be at least 3 characters")
      return
    }
    for (let item of data?.sub_designation) {
      if (!item || item?.trim() === "") {
        toast.error("Enter a valid Sub-Role Name");
        return;
      }
      if (item?.split(" ").length >= 20) {
        toast.error("Sub-Role Name must be less than 20 words");
        return;
      }
      if (item?.length < 3) {
        toast.error("Sub-Role Name should be at least 3 characters");
        return;
      }
      if (item.trim() === "") {
        toast.error("Sub-Role Name cannot be empty");
        return;
      }
    }
    if(id){
      // data?.sub_designation?.forEach(item=>{

      // })
    
      dispatch(updateDesignation({
        ...data, newly_added: data?.sub_designation,id,
        cb(res){
        router.push("/roles");

        }
      }))
    }else
    {
      dispatch(addRole({...data, cb(res){
        router.push("/roles");
      }}))
    }
  };
  const getDesignation = (id)=>{
    dispatch(getDesignationById({id,cb(res){
      setData({name: res?.name, prevDesignation: [...res?.sub_designations], sub_designation:[],delete_designation:[]})
    }}))
  }

  useEffect(()=>{
    if(id){
      getDesignation(id)
    }
  },[id])


  return (
    <>
      <Navbar heading={pageHeading} />
      <div className="addRoleData">
        <div className="roleDetail">
          <div className="commonHeader mb-3">
            <div className="hospitalDetail">
              <div className="backArrowBtn" onClick={() => router.back()}>
                <Image src={images.leftArrowLong} alt="leftArrowImg" />
              </div>
              <div className="hospitalDetailOuter">
                <div className="hospitalDetailText">
                  <h4 className="heading16">Add New Role</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="addRoleContent">
          <div className="shiftReqDescription">
            <p className="text12 mb-0">Role Name</p>
            <div className="editProfileInputOuter">
              <Image
                src={images.supervisorsActive}
                className="userIconImg"
                alt="userIcon"
              />
              <input
                type="text"
                onChange={(e)=>{setData(prev=>({...prev, name: e.target.value}))}}
                value={data?.name}
                className="filterInput w-100"
                placeholder="Enter the Role"
                required
              />
            </div>
          </div>

          <div className="subRoles mt-4">
            <h4 className="heading16">Sub-Roles</h4>
            {data?.prevDesignation?.length > 0 && data?.prevDesignation?.map((role,index)=>(<> <div key={role.id} className="shiftReqDescription mb-2">
                <p className="text12 mb-0">Role Name</p>
                <div className="editProfileInputOuter">
                  <Image
                    src={images.crossIcon}
                    alt="crossImg"
                    className="crossImg"
                    onClick={() => {
                      const delete_designation = [...data?.delete_designation, role?.id]
                      setData(prev=>({...prev, prevDesignation: prev?.prevDesignation?.filter((x,i)=>i!=index),delete_designation}))}}
                  />
                  <Image
                    src={images.supervisorsActive}
                    className="userIconImg"
                    alt="userIcon"
                  />
                  <input
                    type="text"
                    className="filterInput"
                    placeholder="Enter the Role"
                    value={role.name}
                    disabled
                    required
                  />
                </div>
              </div></>))}
            {data?.sub_designation.map((role,index) => (
              <div key={role.id} className="shiftReqDescription mb-2">
                <p className="text12 mb-0">Role Name</p>
                <div className="editProfileInputOuter">
                  <Image
                    src={images.crossIcon}
                    alt="crossImg"
                    className="crossImg"
                    onClick={() => handleRemoveRole(index)}
                  />
                  <Image
                    src={images.supervisorsActive}
                    className="userIconImg"
                    alt="userIcon"
                  />
                  <input
                    type="text"
                    className="filterInput"
                    placeholder="Enter the Role"
                    value={role}
                    onChange={(e) =>
                      setData(prev => ({...prev, sub_designation: prev?.sub_designation.map((x, i) => i === index? e.target.value : x ) }))
                    }
                    required
                  />
                </div>
              </div>
            ))}
            <button className="text14 addSubRoleBtn" type="button" onClick={handleAddRole}>
              + Add Sub-Role
            </button>
          </div>
        </div>
        <div className="addRoleBtns mt-4">
          <button type="button" onClick={()=>router.back()} className="clearFilter">
            Cancel
          </button>
          <button className="applyFilter ms-2">{webSelector?.loading ? <Spinner/>: id ? "Update" : "Add"}</button>
        </div>
        </form>
      </div>
    </>
  );
};

export default ManageRole;

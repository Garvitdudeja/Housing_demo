import React, { useEffect, useState } from "react";
import * as images from "@/utilities/images.js";
import Image from "next/image";
import { useRouter } from "next/router";
import { getUserByID, updateStaffSkills } from "@/redux/slices/web";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import withAuth from "@/authentication/withauth";
import Navbar from "@/Components/Common/Navbar";

const skills = (props) => {
  const pageHeading = "Staff"
  const [skillList, setSkillList] = useState([]);
  const [skill, setSkill] = useState("");
  const [newSkills, setNewSkills] = useState([]);
  const [deletedSkills, setDeletedSkills] = useState([]);
  const [data, setData] = useState();
  const router = useRouter();
  const id = router.query.id;
  const dispatch = useDispatch();
  const removeSkill = (id, status) => {
    if(status == "old"){
      setSkillList((prev) => {
        const newList = prev.filter((item) => item?.id != id);
        return newList;
      });
      setDeletedSkills(prev=>([...prev,id]))
    }
    else{
      setNewSkills(prev=>{
        const newSkills = prev.filter(item=>item!=id)
        return newSkills
      })
    }
  };

  const handleSubmit = () => {
    console.log(deletedSkills)
    const params = {
      addedSkills: newSkills,
      user_id: id,
      deletedSkills: deletedSkills
    };
    dispatch(updateStaffSkills({...params,cb(res){
      router.push("/staff/"+id)
    }}))
  };
  const handleAddSkill = (event) => {
    event.preventDefault();
    if (!skill || skill.trim() == "") {
      toast.error("Enter A valid Skill!");
      return;
    }
    setNewSkills((prev) => [...prev, skill]);
    setSkill("");
  };

  const getUserAction = (id) => {
    dispatch(
      getUserByID({
        id,
        cb(res) {
          setData(res);
          setSkillList(res?.user_skills);
        },
      })
    );
  };

  useEffect(() => {
    if (props?.isClient && id) {
      getUserAction(id);
    }
  }, [id]);


  return (
    <>
     <Navbar heading={pageHeading}/>
      <div className="editSkill">
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
                <h4 className="heading16">Edit Skills</h4>
                <p className="text14">Edit your profile details</p>
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={handleAddSkill}>
          <div className="col-md-12 mt-2">
            <div className="shiftReqDescription">
              <p className="text12 mb-0">Edit Skills</p>
              <div className="editProfileInputOuter">
                <textarea
                  rows={7}
                  cols={155}
                  className="editSkillsTextarea"
                  value={skill}
                  onChange={(e) => {
                    setSkill(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-md-12 mt-3">
            <button className="editBtnRounded" >
              Add Skills
            </button>
          </div>
        </form>
        <div className="col-md-12 mt-4">
          <div className="selectRoleList">
            <h6 className="heading14">User Skills</h6>
            <ul className="skillUnorderedList">
            {Array.isArray(newSkills) &&
                newSkills.map((item) => (
                  <React.Fragment key={item}>
                   <div className="crossSkill">
                   <Image src={images.crossImg} alt="crossImg"  onClick={() => {
                        removeSkill(item, "new");
                      }}/>
                   <p className="heading14 mb-0 ms-2">{item}</p>
                    
                   </div>
                  </React.Fragment>
                ))}
              {Array.isArray(skillList) &&
                skillList.map((item) => (
                  <React.Fragment key={item?.id}>
                    <div className="crossSkill">
                    <Image src={images.crossImg} alt="corssImg" onClick={() => {
                        removeSkill(item?.id , "old");
                      }}/>
                    <p className="heading14 mb-0 ms-2">{item?.skill}</p>
                   
                    </div>
                  </React.Fragment>
                ))}
            </ul>
          </div>
        </div>

        <div className="col-md-12">
          <div className="skillsBtn">
            <button type="button" className="clearFilter w-auto" onClick={() => handleSubmit()}>
              Save
            </button>
            {/* <button className="applyFilter w-auto ms-3 px-3">Edit Certiicates</button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(skills);

import withAuth from '@/authentication/withauth'
import React, {useState, useEffect} from 'react';
import * as images from "@/utilities/images.js";
import Image from "next/image";
import { useRouter } from 'next/router';
import { deleteACustomer, deleteRole, getRolesList } from "@/redux/slices/web";
import ReactPaginate from "react-paginate";
import CustomModal from "@/Components/Common/CustomModal";
import swal from "sweetalert";
import { hanldeWholeNumbers, nullString } from "@/function/commonFunctions";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import Navbar from '@/Components/Common/Navbar';
import { useWebSelector } from "@/redux/selector/web";
import BlueSpinner from "@/Components/Common/BlueSpinner";

const index = (props) => {
  const webSelector = useWebSelector();
  const pageHeading = "Roles"
  const [rolesData, setRolesData] = useState({});
  console.log(rolesData ,"role");
  const [filter, setFilter] = useState({ page: 1, limit: 10 });
  const [key, setKey] = useState();
  const router = useRouter()
  const dispatch = useDispatch()

  const getRolesListAction = (filter) => {
    const params = {
      ...filter,
    };
    dispatch(
      getRolesList({
        ...params,
        cb(res) {
          console.log(res?.user_desgination)
          setRolesData(res);
        },
      })
    );
  };
  useEffect(() => {
    getRolesListAction(filter);
  }, [filter]);

  const handlePageClick = (event) => {
    setFilter((prev) => ({ ...prev, page: event.selected + 1 }));
  };
  const handleRoleDelete = (data)=>{
    swal({
      title: "Delete Role",
      text: "Are you sure? You want to delete this role",
      className: "swalCustom",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(
          deleteRole({
            id: data?.id,
            cb(res) {
              swal(
                "Role Deleted",
                `Hey! You successfully deleted ${
                  nullString(data?.name) 
                } role.`
              ).then(() => {
                router.push("/roles");
                getRolesListAction(filter);
                toast.success("Role Deleted SuccessFully");
              });
            },
          })
        );
      }
    });
  }

  return (
    <>
 <Navbar heading={pageHeading}/>
    <div className="rolesContent">
       <div className="shiftRequestFilter mt-3">
          <div>
            <h3 className="headingGreen20 mb-0">Roles</h3>
            <p className="text14 mb-0">
            {hanldeWholeNumbers(rolesData?.total)}  roles
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
                router.push("/roles/manage-role");
              }}
            >
              <i className="fa-solid fa-plus"></i>
              <span className="ps-2">Add Roles</span>
            </div>
          </div>
        </div>
        <div className="siteTable mt-3">
          <table className="commonTable">
            <thead>
              <tr>
                <th className="tableHeading siteNameHeading">Roles</th>
                <th className="tableHeading territoryNameHeading">
                 Sub Roles
                </th>
                <th className="tableHeading rolesAction">Action</th>
                {/* <th className="tableHeading text-center">View Details</th> */}
              </tr>
            </thead>
            <tbody>
            {console.log(rolesData, "rolesdata")}
            {props?.isClient && webSelector.loading  ? <BlueSpinner/> :  props?.isClient &&
              rolesData?.user_desgination?.length > 0 ? (
                rolesData?.user_desgination?.map((item) => (
                  <tr key={item?.id}>
                    <td className="tableHeading">{item?.name}</td>
                    <td className="tableHeading">
                    {item?.sub_designations?.length > 0 ?  item?.sub_designations?.map(x=>(<button className="requestForBtn m-2">{x?.name}</button>)) : "No Subdesignation"}
                    
                    </td>
                    <td className="tableHeading">
                      <Image
                        onClick={()=>{router.push("/roles/manage-role?id="+item?.id)}}
                        src={images.penIcon}
                        className="ms-2 cursor"
                        alt="img"
                      />
                      <Image
                        src={images.deleteIcon}
                        onClick={()=>{handleRoleDelete(item)}}
                        className="ms-4 cursor"
                        alt="img"
                      />
                    </td>
                    {/* <td className="tableHeading text-center">
                      <Image
                        src={images.rightArrow}
                        className="cursor"
                        alt="img"
                      />
                    </td> */}
                  </tr>
                   ))
                  ) : (
                    <tr>
                  <td colSpan="9" className="text-center p-4">
                    <h4>No Roles found.</h4>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {rolesData?.total_pages > 1 && (
          <ReactPaginate
            className="pagination"
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={rolesData?.total_pages}
            previousLabel="Previous"
            renderOnZeroPageCount={null}
          />
        )}
    </div>
    </>
  )
}

export default withAuth(index)
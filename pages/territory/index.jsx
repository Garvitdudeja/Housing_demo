import withAuth from "@/authentication/withauth";
import BlueSpinner from "@/Components/Common/BlueSpinner";
import Navbar from "@/Components/Common/Navbar";
import { hanldeWholeNumbers } from "@/function/commonFunctions";
import { useWebSelector } from "@/redux/selector/web";
import {
  deleteTerrority,
  getTerritoryList
} from "@/redux/slices/web";
import * as images from "@/utilities/images.js";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import swal from "sweetalert";

const index = (props) => {
  const webSelector = useWebSelector()
  const pageHeading="Territory"
  const router= useRouter()
  const dispatch = useDispatch();
  const [territoryListData, setTerritoryListData] = useState({});
  const [key, setKey] = useState();
  const [filter, setFilter] = useState({ page: 1, limit: 10, status: 1 });
  const [modalDetail, setModalDetail] = useState({
    show: false,
    title: "",
    flag: "",
    id: "",
  });

  const getTerritoryListAction = (filter) => {
    const params = {
      ...filter,
    };
    dispatch(
      getTerritoryList({
        ...params,
        cb(res) {
          setTerritoryListData(res);
        },
      })
    );
  };
  useEffect(() => {
    getTerritoryListAction(filter);
  }, [filter]);
  const handlePageClick = (event) => {
    setFilter((prev) => ({ ...prev, page: event.selected + 1 }));
  };
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
              ).then(getTerritoryListAction(filter));
            },
          })
        );
      }
    });
  };
  return (
    <>
     <Navbar heading={pageHeading}/>
      <div className="territoryContent mt-3">
          <div className="shiftRequestFilter">
            <div>
              <h3 className="headingGreen20 mb-0">Territory</h3>
              <p className="text14 mb-0">
                  {hanldeWholeNumbers(territoryListData?.total)} territory
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
                    onClick={() =>
                      setFilter((item) => ({ ...item, search: "" }))
                    }
                    className="customerCrossIcon"
                  />
                </div>
              </form>
              <div
                className="profileBtn"
                onClick={() => {
                  router.push("/territory/manageTerritory");
                }}
              >
                <i className="fa-solid fa-plus"></i>
                <span className="ps-2">Add Territory</span>
              </div>
            </div>
          </div>
  
   
         <div className="territoryTable mt-3">
         <table className='commonTable'>
            <thead>
              <tr>
                <th className='tableHeading territoryName'>Territory Name</th>
                <th className='tableHeading'>Supervisors</th>
                <th className='tableHeading'>Action</th>
                <th className='tableHeading text-center'>View Details</th>
              </tr>
            </thead>
            <tbody>
            {props?.isClient && webSelector.loading  ? <BlueSpinner/> :  props?.isClient && territoryListData?.data?.length>0 ?
                  territoryListData?.data?.map((item) => (
              <tr>
                <td className='tableHeading territoryNameData'>{item?.name}</td>
                <td className='tableHeading'>{item?.territory_details?.length ?? 0}</td>
                <td className='tableHeading'>
                  <Image src={images.deleteIcon} className='me-2 cursor' alt='img' onClick={() => {
                                handleTerrorityDelete(item);
                              }}/>
                  <Image src={images.penIcon} className='ms-2 cursor' alt='img' onClick={()=>{router.push("/territory/manageTerritory?id="+ item?.id)}}/>
                </td>
                <td className='tableHeading text-center'>
                  <Image src={images.rightArrow} className='cursor' alt='img'  onClick={() => {
                  router.push("/territory/"+item?.id);
                }}/>
                </td>
              </tr>
              )):
              <tr>
                  <td colSpan="9" className="text-center p-4">
                  <h4>No Territory found.</h4>
                </td>
                </tr>}
            </tbody>
          </table>
         </div>
          {territoryListData?.total_pages > 1 && (
              <ReactPaginate
                className="pagination"
                breakLabel="..."
                nextLabel="Next"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={territoryListData?.total_pages}
                previousLabel="Previous"
                renderOnZeroPageCount={null}
              />
            )}
        </div>
    
    </>
  );
};

export default withAuth(index);

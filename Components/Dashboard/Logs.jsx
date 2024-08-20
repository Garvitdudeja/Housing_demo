import { getLogUsers, getLogs } from "@/redux/slices/web";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../Common/Spinner";
import moment from "moment";
import * as images from "@/utilities/images.js";
import Image from "next/image";
import DatePicker from "react-datepicker";

const Logs = () => {
  const filterOptions = [
    { id: 1, name: "Admins" },
    { id: 2, name: "Supervisors" },
    { id: 3, name: "Customers" },
    { id: 4, name: "Employees" },
    { id: 5, name: "Sites" },
    { id: 6, name: "Territories" },
    { id: 7, name: "Designation" },
    { id: 8, name: "Any" },
  ];
  const userID = {
    1: "user_id",
    2: "user_id",
    3: "user_id",
    4: "user_id",
    5: "site_id",
    6: "territory_id",
    7: "designation_id",
    8: "Any"
  }
  const [filterTab, setFilterTab] = useState(false);
  const [data, setData] = useState({ data: [] });
  const [userData, setUserData] = useState();
  const [selectedItems, setSelectedItems] = useState({});
  const [openInput,setOpenInput] = useState(false)

  const [dataFilters, setDataFilter] = useState({
    page: 1,
    limit: 10,
    userFilter: 1,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();
  }, []);
  const handleUserTypeChnage = (id, search) => {
    const params = {
      id,
      search,
    };
    dispatch(
      getLogUsers({
        ...params,
        cb(res) {
          setUserData(res);
        },
      })
    );
  };
  useEffect(() => {
    handleUserTypeChnage(dataFilters?.userFilter, dataFilters?.search);
  }, [dataFilters?.search]);
  const fetchData = (filter = {}) => {
    const params = { page: dataFilters?.page, limit: 10, ...filter };
    if (!filter?.clearList){
      Object.keys(selectedItems).map(item=>{
        var temp = "";
        [...selectedItems[item]].map((x)=>{
          temp += x.id+','
        })
        
        params[userID[item]] = params[userID[item]] ? params[userID[item]]+temp : temp
        return
      })
    }
    dispatch(
      getLogs({
        ...params,
        cb(res) {
          if (filter?.clearList) {
            setData(res);
            setDataFilter((prev) => ({ ...prev, page: prev?.page + 1 }));
          } else {
            setData((prev) => ({ ...res, data: [...prev?.data, ...res.data] }));
            setDataFilter((prev) => ({ ...prev, page: prev?.page + 1 }));
          }
        },
      })
    );
  };
  const handleFilters = (event) => {
    event.preventDefault();
    setDataFilter((prev) => ({ ...prev, page: 1 }));
    // clearList will help in clearing the previous data so only new Data is visible
    fetchData({ ...dataFilters, clearList: true });
  };
  const handleClearFilter = () => {
    setDataFilter((prev) => ({ page: 1, limit: 10 }));
    setSelectedItems({});
    fetchData({ page: 1, clearList: true });
  };
  const handleRemoveItems = (type, item) => {
    setSelectedItems(prev=>({...prev,[type]:new Set([...prev[type]].filter(x=>x.id!=item.id))}))
  };


  return (
    <div>
      {" "}
      <div className="row mt-3">
        <div className="col-md-12">
          <div className="allLogsFilter">
            <div className="dashLog">
              <h3 className="heading16 mb-0">All</h3>
              <p className="text14Fade">Recent Logs</p>
            </div>
            <div className="dashFilter">
              <button
                className="dashFilterBtn"
                onClick={() => {
                  setFilterTab((prev) => !prev);
                }}
              >
                <Image src={images.filterIcon} className="me-2" alt="filterIcon"/> Filter
                <Image src={filterTab ? images.upArrow : images.downArrow} className="ms-2" alt="downArrowImg"/>
               
              </button>
              <div className={`${filterTab ? "filterOuter" : "d-none"}`}>
                <h4 className="heading16 fw-600 mb-0">Filter By</h4>
                <p className="text12">Log Creation Date:</p>
                <form onSubmit={handleFilters}>
                  <div className="row">
                  <div className="col-md-12">
                      <div className="filterFormOuter  mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label filterLabel"
                        >
                          Filter By
                        </label>
                        <select
                          className="filterSelect"
                          onChange={(event) => {
                            setDataFilter((prev) => ({
                              ...prev,
                              userFilter: event.target.value,
                            }));
                            handleUserTypeChnage(
                              event.target.value,
                              dataFilters?.search
                            );
                          }}
                        >
                          {filterOptions.map((item) => (
                            <option value={item?.id} key={item?.id}>
                              {item?.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="filterFormOuter  mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label filterLabel mb-0"
                        >
                          Search
                        </label>
                        <input onClick={()=>{setOpenInput(prev=>!prev)}}
                          type="search"
                          onChange={(e) => {
                            setDataFilter((prev) => ({
                              ...prev,
                              search: e.target.value,
                            }));
                          }}
                          value={dataFilters?.search}
                          className="form-control filterInput filterSearch"
                          id="exampleFormControlInput1"
                          placeholder="Type here"
                        />
                        <Image src={images.searchIcon} className="searchIcon" alt="searchImg"/>
                      </div>
                      <div className={`${openInput ? "userList":"d-none"}`} >
                        {Array.isArray(userData) &&
                          userData?.map((item) => (
                            <p
                              onClick={(e) => {
                                setOpenInput(prev=>!prev)
                                setSelectedItems((prev) => {
                                  if (dataFilters?.userFilter in prev) {
                                    // Create a new Set from the existing one and add the new value
                                    return {
                                      ...prev,
                                      [dataFilters?.userFilter]: new Set([
                                        ...prev[dataFilters?.userFilter],
                                        item,
                                      ]),
                                    };
                                  } else {
                                    // Create a new entry with a Set containing the value
                                    return {
                                      ...prev,
                                      [dataFilters?.userFilter]: new Set([
                                        item,
                                      ]),
                                    };
                                  }
                                });
                              }}
                            >
                              {/* handling Admin Supervisors, Cutomers, staff */}
                              {item?.user_name}{" "}
                              {item?.user_email
                                ? "{" + item?.user_email + "}"
                                : ""}
                              {dataFilters?.userFilter == 5
                                ? item?.site_name +
                                  (item?.site_address
                                    ? " { " + item?.site_address + " }"
                                    : "")
                                : dataFilters?.userFilter == 6
                                ? item?.territory_name
                                : dataFilters?.userFilter == 7
                                ? item?.designation_name
                                : ""}
                            </p>
                          ))}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="filterFormOuter mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label filterLabel"
                        >
                          From Date
                        </label>
                        <Image
                          src={images.calanderIcon}
                          className="calanderIcon"
                          alt="calenderImg"
                        />
                        <DatePicker
                          onChange={(date) => {
                            setDataFilter((prev) => ({
                              ...prev,
                              start_date: moment(date).format("YYYY-MM-DD"),
                            }));
                          }}
                          selected={dataFilters.start_date}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="filterFormOuter filterFormLast mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label filterLabel"
                        >
                          To Date
                        </label>
                        <Image
                          src={images.calanderIcon}
                          className="calanderIcon"
                          alt="calenderIcon"
                        />
                        <DatePicker
                          onChange={(date) => {
                            setDataFilter((prev) => ({
                              ...prev,
                              end_date: moment(date).format("YYYY-MM-DD"),
                            }));
                          }}
                          selected={dataFilters.end_date}
                        />
                      </div>
                    </div>
                  
                    <ul className="
                    filterSearchList">
                      {Object?.keys(selectedItems).map((item) => (
                        <>
                          {[...selectedItems[item]].map((x) => (
                            <li className="heading12 searchList">
                              {x?.user_name}{" "}
                              {x?.user_email ? "{" + x?.user_email + "}" : ""}
                              {item == 5
                                ? x?.site_name +
                                  (x?.site_address
                                    ? " { " + x?.site_address + " }"
                                    : "")
                                : item == 6
                                ? x?.territory_name
                                : item == 7
                                ? x?.designation_name
                                : ""}
                             <Image src={images.crossImg} className="crossImg" alt="crossIcon" onClick={() => {
                                  handleRemoveItems(item, x);
                                }}/>
                            </li>
                          ))}
                        </>
                      ))}
                    </ul>
                    <div className="col-md-6">
                      <button
                        onClick={handleClearFilter}
                        type="button"
                        className="clearFilter"
                      >
                        Clear Filter
                      </button>
                    </div>
                    <div className="col-md-6">
                      <button
                        onClick={() => {
                          setFilterTab((prev) => !prev);
                        }}
                        className="applyFilter"
                      >
                        Apply Filter
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 dashboard-items" id="scrollableDiv">
          <InfiniteScroll
            dataLength={data?.data?.length ?? 0}
            next={() => fetchData(dataFilters)}
            hasMore={data.data.length < data?.total}
            className="overflow-hidden"
            scrollableTarget="scrollableDiv"
            loader={<Spinner />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>That's All ! No Logs Left </b>
              </p>
            }
            // below props only if you need pull down functionality
          >
            {data?.data?.map((item) => {
              return (
                <div className="dashboardData" key={item?.id}>
                  <p className="text14Green mb-1">{item?.message}</p>
                  <p className="text14Fade mb-0">
                    {moment(item?.created_at).fromNow()}
                  </p>
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default Logs;

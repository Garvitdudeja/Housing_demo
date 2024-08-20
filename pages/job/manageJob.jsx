import React, { useEffect, useState } from "react";
import * as images from "@/utilities/images.js";
import Image from "next/image";
import DatePicker from "react-datepicker";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useWebSelector } from "@/redux/selector/web";
import withAuth from "@/authentication/withauth";
import {
  addJob,
  getCustomerList,
  getDesignation,
  getJobByJobId,
  getSiteList,
  updateJob,
} from "@/redux/slices/web";
import Select from "react-select";
import { nullString } from "@/function/commonFunctions";
import moment from "moment";
import { toast } from "react-toastify";
import Navbar from "@/Components/Common/Navbar";

const createJob = () => {
  const pageHeading = "Projects";
  const router = useRouter();
  const dispatch = useDispatch();
  const { id, type } = router.query;
  const webSelector = useWebSelector();
  const [designationList, setDesignationList] = useState();
  const [customerList, setCustomerList] = useState([]);
  const [siteList, setsiteList] = useState([]);
  const [data, setData] = useState({
    designation_id: [],
    end_date: new Date(),
    start_date: new Date(),
    time_start: "",
    time_end: "",
  });

  const savedSiteList = webSelector?.siteList?.site;

  const getCustomerListAction = (filter) => {
    const params = {
      ...filter,
    };
    dispatch(
      getCustomerList({
        ...params,
        cb(res) {
          setCustomerList([
            { label: "Select Customer" },
            ...res.data.map((item) => ({
              label:
                nullString(item?.user_profiles?.first_name) +
                " " +
                nullString(item?.user_profiles?.last_name),
              value: item?.id,
            })),
          ]);
        },
      })
    );
  };

  const getDesignationList = () => {
    dispatch(
      getDesignation({
        cb(res) {
          setDesignationList(res?.user_desgination);
        },
      })
    );
  };
  useEffect(() => {
    getDesignationList();
    getSiteListAction();
    getCustomerListAction();
  }, []);

  useEffect(() => {
    if (id) getJob();
  }, [id]);

  const getSiteListAction = () => {
    dispatch(
      getSiteList({
        cb(res) {
          setsiteList([
            { label: "Select Site" },
            ...res.site.map((item) => ({ label: item?.name, value: item?.id })),
          ]);
        },
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation checks
    const startDate = new Date(data.start_date);
    const endDate = new Date(data.end_date);
    const startTime = new Date(data.time_start);
    const endTime = new Date(data.time_end);
    const currentTime = new Date();

    // Check if start date is today and job start time must be greater than current time
    if (startDate.toDateString() === currentTime.toDateString()) {
      if (startTime <= currentTime) {
        toast.error(
          "Job start time must be greater than current time when start date is today."
        );
        return;
      }
    }

    // Check if start date is less than end date
    if (startDate > endDate) {
      toast.error("Start date must be before end date.");
      return;
    }

    // Check if start date and time combined is less than end date and time combined
    const startDateTime = new Date(`${data.start_date}T${data.time_start}`);
    const endDateTime = new Date(`${data.end_date}T${data.time_end}`);

    if (startDateTime >= endDateTime) {
      toast.error("Start date and time must be before end date and time.");
      return;
    }

    if (data?.designation_id.length < 1) {
      toast.error("Role is required!");
      return;
    }
    if (id && !type) {
      dispatch(
        updateJob({
          ...data,
          id: id,
          customer_id: data?.customer_id?.value,
          site_id: data?.site_id?.value,
          shift_type: 3,
          cb(res) {
            router.push("/job");
          },
        })
      );
    } else {
      dispatch(
        addJob({
          ...data,
          customer_id: data?.customer_id?.value,
          site_id: data?.site_id?.value,
          shift_type: 3,
          cb(res) {
            router.push("/job");
          },
        })
      );
    }
  };

  const getJob = () => {
    let params = {
      id: id,
    };
    dispatch(
      getJobByJobId({
        ...params,
        cb(res) {
          const designationList = [res?.designation.id];
          if (Array.isArray(res?.designation?.sub_designations)) {
            designationList.push(
              ...res?.designation?.sub_designations.map((item) => item?.id)
            );
          }
          setData({
            designation_id: designationList,
            customer_id: {
              value: res?.posted_by_data?.user_profiles?.id,
              label:
                nullString(res?.posted_by_data?.user_profiles?.first_name) +
                " " +
                nullString(res?.posted_by_data?.user_profiles?.last_name_name),
            },
            site_id: { value: res?.sites?.id, label: res?.sites?.name },
            address: { address: res?.sites?.address },
            start_date: res?.start_date,
            end_date: res?.end_date,
            time_start: res?.time_start,
            time_end: res?.time_end,
            description: res?.description,
          });
        },
      })
    );
  };

  return (
    <>
      <Navbar heading={pageHeading} />
      <div className="createJobContent">
        <div className="commonHeader mb-3">
          <div className="hospitalDetail">
            <div className="backArrowBtn" onClick={() => router.back()}>
              <Image src={images.leftArrowLong} alt="leftArrowImg" />
            </div>
            <div className="hospitalDetailOuter">
              <div className="hospitalDetailText">
                <h4 className="heading16">
                  {id && !type ? "Edit" : "Create"} Project
                </h4>
                <p className="text14">Add details of Project</p>
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="createJob">
            <div className="jobCreateSelectCustomer">
              <h6 className="heading16">Select Customer</h6>
              <Select
                required
                options={customerList}
                value={data?.customer_id}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, customer_id: e }))
                }
              ></Select>
            </div>
            <div className="jobCreateSelectRole mt-3">
              <h6 className="heading16">Select Role</h6>
              {designationList?.length > 0 &&
                designationList?.map((item) => (
                  <>
                    <div className="customCheck mb-2">
                      <input
                        type="checkbox"
                        id={item?.id}
                        checked={data?.designation_id.includes(item?.id)}
                        name="role1"
                        onChange={(e) => {
                          setData((prev) => {
                            if (e.target.checked) {
                              const designation_id = [...prev?.designation_id];
                              designation_id.push(item?.id);
                              return {
                                ...prev,
                                designation_id: [item?.id],
                              };
                            } else {
                              const designation_id = prev.designation_id.filter(
                                (x) => x != item?.id
                              );
                              return {
                                ...prev,
                                designation_id: designation_id,
                              };
                            }
                          });
                        }}
                        value="role"
                        className="roleInput"
                      />
                      <label htmlFor="role1" className="ps-2 roleLable heading16">
                        {" "}
                        {item?.name}
                      </label>
                    </div>
                    {data?.designation_id.includes(item?.id) &&
                      item?.sub_designations.length > 0 &&
                      item?.sub_designations.map((x) => (
                        <div className="customCheck ms-4 m-2">
                          <input
                            type="checkbox"
                            id={x?.id}
                            checked={data?.designation_id.includes(x?.id)}
                            name="role1"
                            value="role"
                            onChange={(e) => {
                              setData((prev) => {
                                if (e.target.checked) {
                                  const designation_id = [
                                    ...prev?.designation_id,
                                  ];
                                  designation_id.push(x?.id);
                                  return {
                                    ...prev,
                                    designation_id: designation_id,
                                  };
                                } else {
                                  const designation_id =
                                    prev.designation_id.filter(
                                      (x) => x != item?.id
                                    );
                                  return {
                                    ...prev,
                                    designation_id: designation_id,
                                  };
                                }
                              });
                            }}
                            className="roleInput"
                          />
                          <label
                            htmlFor="role1"
                            className="ps-2 roleLable heading16"
                          >
                            {" "}
                            {x?.name}
                          </label>
                        </div>
                      ))}
                  </>
                ))}
            </div>

            <div className="container-fluid pt-2">
              <div className="row">
                <div className="col-md-6">
                  <div className="filterFormOuter  mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label filterLabel mb-0"
                    >
                      Place Name
                    </label>
                    <Select
                      required
                      options={siteList}
                      value={data?.site_id}
                      onChange={(e) => {
                        setData((prev) => ({
                          ...prev,
                          site_id: e,
                          address: savedSiteList?.find(
                            (item) => item.id == e.value
                          ),
                        }));
                      }}
                    ></Select>
                  </div>
                </div>
                <div className="col-md-6">
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
                        disabled
                        value={data?.address?.address}
                        className="filterInput w-100"
                        placeholder="71445 Evie Turnpike HaydenPass 98676"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <div className="filterFormOuter mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label filterLabel"
                    >
                      Start Date
                    </label>
                    <Image
                      src={images.calanderIcon}
                      className="calanderIcon"
                      alt="calenderImg"
                    />
                    <DatePicker
                      required
                      minDate={new Date()}
                      onChange={(date) => {
                        setData((prev) => ({
                          ...prev,
                          start_date: date,
                        }));
                      }}
                      selected={data.start_date}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="filterFormOuter mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label filterLabel"
                    >
                      End Date
                    </label>
                    <Image
                      src={images.calanderIcon}
                      className="calanderIcon"
                      alt="calenderImg"
                    />
                    <DatePicker
                      required
                      minDate={Math.max(new Date(), data?.start_date)}
                      onChange={(date) => {
                        setData((prev) => ({
                          ...prev,
                          end_date: date,
                        }));
                      }}
                      selected={data.end_date}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="filterFormOuter mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label filterLabel"
                    >
                      Job Time From
                    </label>
                    <input
                      type="time"
                      className="timePicker"
                      required
                      value={
                        data?.time_start
                          ? moment(data?.time_start).utc().format("HH:mm")
                          : ""
                      }
                      onChange={(e) => {
                        const selectedTime = e.target.value;
                        const selectedDate = new Date(data?.start_date)
                          .toISOString()
                          .slice(0, 10);

                        if (
                          moment(
                            `${selectedDate} ${e.target.value}`,
                            "YYYY-MM-DD HH:mm"
                          ).isBefore(moment())
                        ) {
                          toast.error("Please select future time");
                        } else {
                          const combinedDateTime = `${selectedDate}T${selectedTime}:00.000Z`;
                          setData((prev) => ({
                            ...prev,
                            time_start: combinedDateTime,
                          }));
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="filterFormOuter mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label filterLabel"
                    >
                      Job Time To
                    </label>
                    <input
                      type="time"
                      className="timePicker"
                      required
                      value={
                        data?.time_end
                          ? moment(data?.time_end).utc().format("HH:mm")
                          : ""
                      }
                      onChange={(e) => {
                        const selectedTime = e.target.value;
                        const currentDate = new Date(data?.end_date)
                          .toISOString()
                          .slice(0, 10);
                        const startTime = moment(data?.time_start)
                          .utc()
                          .format("YYYY-MM-DD HH:mm");
                        const endTime = moment(
                          `${currentDate} ${selectedTime}`,
                          "YYYY-MM-DD HH:mm"
                        );

                        if (endTime.isBefore(moment(startTime))) {
                          toast.error(
                            "Please select a time after the start time"
                          );
                        } else {
                          const combinedDateTime = `${currentDate}T${selectedTime}:00.000Z`;
                          setData((prev) => ({
                            ...prev,
                            time_end: combinedDateTime,
                          }));
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="shiftReqDescription">
                    <p className="text14 mb-0">Description</p>
                    <input
                      type="text"
                      value={data?.description}
                      onChange={(e) => {
                        setData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }));
                      }}
                      className="filterInput w-100"
                      placeholder="write..."
                      required
                    />
                  </div>
                </div>
                <div className="col-md-12 mt-3">
                  <button className="commonBtnFill me-3 mb-2">
                    {id && !type ? "Edit" : "Create"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default withAuth(createJob);

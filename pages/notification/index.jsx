import { getNotifications, markAllRead, markRead } from "@/redux/slices/web";
import * as images from "@/utilities/images.js";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import Navbar from "@/Components/Common/Navbar";
import swal from "sweetalert";

function index() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [data, setData] = useState({ notification: [] });
  const [filter, setFilter] = useState({ page: 1, limit: 10 });

  const getNotificationList = (filter) => {
    const params = {
      ...filter,
    };
    dispatch(
      getNotifications({
        ...params,
        cb(resp) {
          setData(resp);
        },
      })
    );
  };

  useEffect(() => {
    getNotificationList(filter);
  }, [filter]);

  const handlePageClick = (event) => {
    setFilter((prev) => ({ ...prev, page: event.selected + 1 }));
  };

  const handleMarkReadAll = () => {
    const body = {
      is_read: 1,
    };
    swal({
      title: "Mark all notifications as read.",
      text: "Are you sure? You want to mark all notifications as read.",
      dangerMode: true,
      buttons: true,
    }).then((willmark) => {
      if (willmark) {
        dispatch(
          markAllRead({
            ...body,
            cb(res) {
              swal(
                "Success",
                `All notifications are marked as read successfully.`
              ).then(getNotificationList(filter));
            },
          })
        );
      }
    });
  };

  const handleNotificationMark = (id) => {
    const body = {
      is_read: 1,
    };
    dispatch(
      markRead({
        id,
        ...body,
        cb(res) {
          return getNotificationList(filter);
        },
      })
    );
  };

  const handleNavigate = (item) => {
    handleNotificationMark(item?.id);
    if ([5, 7].includes(item.notification_type)) {
      return router.push(`/job/job-view/${item?.id}`);
    } else {
      return;
    }
  };

  return (
    <>
      <Navbar heading={"Notification"} />
      <div className="commonHeader mt-2 justify-content-end">
        <div className="hospitalDetail">
          <div className="hospitalDetailOuter">
            <div className="chat">
              <h4
                className="heading16 "
                style={{ cursor: "pointer" }}
                onClick={handleMarkReadAll}
              >
                Mark all as read
                {/* <span className="unreadCount">04</span> */}
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="notification">
        <div className="row">
          {data?.notification && data?.notification.length > 0 ? (
            data?.notification?.map((item, index) => {
              return (
                <div
                  className="col-md-12 mb-3"
                  key={index}
                  onClick={() => handleNavigate(item)}
                >
                  <div
                    className={
                      item.notification_type == 7 || item.notification_type == 5
                        ? "notificationCard notificationArea"
                        : "notificationCard "
                    }
                    style={{
                      cursor:
                        item.notification_type == 7 ||
                        item.notification_type == 5
                          ? "pointer"
                          : "auto",
                    }}
                  >
                    {/* <div className="patientImg me-3">
                      <Image
                        src={images.paitentIcon}
                        alt="image"
                        className="customerProfile"
                      />
                    </div> */}
                    <div className="notificationtext">
                      <h6
                        className={
                          item?.is_read == 1 ? "heading14" : "font-weight-bold"
                        }
                      >
                        {item?.short_description}
                      </h6>
                      <p className="text12">
                        {" "}
                        {moment(item?.created_at)?.fromNow()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-md-12">
              <p className="text-center">No Notifications Yet</p>
            </div>
          )}
          {data?.total_pages > 1 && (
            <ReactPaginate
              className="pagination"
              breakLabel="..."
              nextLabel="Next"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={data?.total_pages}
              previousLabel="Previous"
              renderOnZeroPageCount={null}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default index;

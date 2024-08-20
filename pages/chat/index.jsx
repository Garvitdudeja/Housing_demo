import Navbar from "@/Components/Common/Navbar";
import { db, PARENT_COLLECTION } from "@/firebase-config";
import { useWebSelector } from "@/redux/selector/web";
import { endChat } from "@/redux/slices/web";
import * as images from "@/utilities/images.js";
import "firebase/database";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import swal from "sweetalert";

function index() {
  const [filterTab, setFilterTab] = useState(false);
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState([]);
  const dispatch = useDispatch();
  const { logUsers: userDetails } = useWebSelector();
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = getInboxList();
    return () => {
      unsubscribe();
    };
  }, []);

  const getInboxList = (filters = []) => {
    const chats = query(
      collection(db, PARENT_COLLECTION),
      orderBy("createdAt", "desc"),
      where("chatPartner", "==", userDetails?.[0]?.id)
    );
    setLoading(true);
    const unsb = onSnapshot(chats, (snap) => {
      const list = snap.docs.map((doc) => {
        const id = doc.id;
        return { id, ...doc.data() };
      });

      if (filters && filters.length > 0) {
        let filtered = list.filter((i) => filters.includes(String(i.userRole)));
        setChatList(filtered);
      } else {
        setChatList(list);
      }
      setLoading(false);
    });

    return unsb;
  };

  const role = {
    1: "Admin",
    2: "Supervisor",
    3: "Customer",
    4: "Staff",
  };

  const handleFilterChange = (e) => {
    if (filters.includes(e.target.value)) {
      setFilters(filters.filter((i) => i != e.target.value));
    } else {
      setFilters([...filters, e.target.value]);
    }
  };

  const handleCheckAll = (e) => {
    if (e.target.checked) {
      setFilters(["2", "3", "4"]);
    } else {
      setFilters([]);
    }
  };

  const handleClearFilter = () => {
    setFilters([]);
    getInboxList();
    setFilterTab(false);
  };

  const handleDeleteChat = (id) => {
    swal({
      title: "Warning",
      text: "Are you sure? You want to delete.",
      dangerMode: true,
      buttons: true,
    }).then(async (res) => {
      if (res) {
        await deleteDoc(doc(db, PARENT_COLLECTION, id));
        swal("Success", `Chat has been deleted successfully.`);
      }
    });
  };

  const handleEndChat = (roomId) => {
    swal({
      title: "Warning",
      text: "Are you sure? You want to end this chat.",
      dangerMode: true,
      buttons: true,
    }).then(async (res) => {
      if (res) {
        try {
          await Promise.all([
            dispatch(
              endChat({
                body: { chat_id: roomId },
                cb(res) {
                  updateDoc(doc(db, PARENT_COLLECTION, roomId), {
                    chatStatus: false,
                  }),
                    swal("Success", `Chat has been Ended`);
                },
              })
            ),
          ]);
        } catch (error) {
          toast.error("Unable to end the chat. Try again!");
          throw error;
        }
      }
    });
  };
  return (
    <>
      <Navbar heading={"Message"} />
      <div className="commonHeader mt-2">
        <div className="hospitalDetail ps-3">
          <div className="hospitalDetailOuter">
            <div className="chat">
              {/* <h4 className="heading16">
                Total Unread message <span className="unreadCount">04</span>
              </h4> */}
            </div>
          </div>
        </div>
        <div className="chatRight">
          <div className="shiftRequestRight"></div>
          <button
            className="dashFilterBtn"
            onClick={() => {
              setFilterTab((prev) => !prev);
            }}
          >
            <Image src={images.filterIcon} className="me-2" alt="filterIcon" />{" "}
            Filter
            <Image
              src={filterTab ? images.upArrow : images.downArrow}
              className="ms-2"
              alt="downArrowImg"
            />
          </button>
          <div className={`${filterTab ? "filterOuter" : "d-none"}`}>
            <h4 className="heading16 fw-600 mb-0">Filter By</h4>

            <form>
              <div className="selectChat mt-3 customCheck">
                <input
                  type="checkbox"
                  id="allChat"
                  className="supervisorInput"
                  checked={filters.length == 3}
                  onChange={handleCheckAll}
                />
                <label className="heading14" htmlFor="allChat">
                  All Chat
                </label>
              </div>
              <div className="selectChat mt-3 customCheck">
                <input
                  type="checkbox"
                  id="supervisor"
                  className="supervisorInput"
                  value={2}
                  checked={filters.includes("2")}
                  onChange={handleFilterChange}
                />
                <label className="heading14" htmlFor="supervisor">
                  Supervisor
                </label>
              </div>
              <div className="selectChat mt-3 customCheck">
                <input
                  type="checkbox"
                  id="customer"
                  className="supervisorInput"
                  value={3}
                  checked={filters.includes("3")}
                  onChange={handleFilterChange}
                />
                <label className="heading14" htmlFor="customer">
                  Customer
                </label>
              </div>
              <div className="selectChat mt-3 customCheck">
                <input
                  type="checkbox"
                  id="employee"
                  className="supervisorInput"
                  value={4}
                  checked={filters.includes("4")}
                  onChange={handleFilterChange}
                />
                <label className="heading14" htmlFor="employee">
                  Staff
                </label>
              </div>

              <div className="row mt-3">
                <div className="col-md-6">
                  <button
                    type="button"
                    className="clearFilter"
                    onClick={handleClearFilter}
                  >
                    Clear Filter
                  </button>
                </div>
                <div className="col-md-6">
                  <button
                    className="applyFilter"
                    onClick={() => {
                      getInboxList(filters);
                      setFilterTab(false);
                    }}
                    type="button"
                  >
                    Apply Filter
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="row me-2">
        {loading ? (
          <div className="col-md-12 mb-3">
            <h4 className="text-center">Loading...</h4>
          </div>
        ) : chatList && chatList.length > 0 ? (
          chatList?.map((item, index) => {
            return (
              <div
                className="col-md-12 mb-3"
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => router.push(`/chat/${item?.id}`)}
              >
                <div className="chatCard">
                  <div className="chatCardLeft">
                    <div className="cardCustomerImg">
                      <Image
                        src={
                          item?.userPhoto?.includes(
                            "https://precisiononcall-backend.itechnolabs.tech"
                          )
                            ? item?.userPhoto
                            : images.userIconImg
                        }
                        alt="image"
                        height={58}
                        width={58}
                        className="customerImg"
                      />
                    </div>
                    <div className="customerRight ms-4">
                      <h6 className="heading16 mb-0">{item?.userName}</h6>
                      <p className="text12 customerCategory mb-0">
                        {role[item?.userRole]}
                      </p>
                      <p className="text12 mb-0 chatDescription">{item?.lastMsg?.text}</p>
                    </div>
                  </div>
                  <div
                    className="chatCardRight"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Dropdown className="d-inline mx-2">
                      <Dropdown.Toggle id="dropdown-autoclose-true">
                        <Image
                          src={images.threedot}
                          alt="image"
                          className="dotImg"
                        />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => {
                            handleDeleteChat(item.id);
                          }}
                          className="dotListMain"
                        >
                          <div className="dotList">
                            <Image
                              src={images.deleteIcon}
                              alt="image"
                              className="me-2"
                            />
                            <p className="heading16 mb-0">Delete Chat</p>
                          </div>
                        </Dropdown.Item>

                        <Dropdown.Item
                          onClick={() => handleEndChat(item?.id)}
                          className="dotListMain"
                        >
                          <div className="dotList">
                            <Image
                              src={images.chat}
                              alt="image"
                              className="me-2 chatIcon"
                            />
                            <p className="heading16 mb-0">End Chat</p>
                          </div>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                    <div className="unreadNumber">
                      {/* <p className="mb-0 unreadmessageCount">2</p> */}
                      <p className="mb-0 text12">
                        {item?.lastMsg?.time &&
                          moment(item?.lastMsg?.time).fromNow()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-md-12 mb-3">
            <h4 className="text-center">No Chats Found.</h4>
          </div>
        )}
      </div>
    </>
  );
}

export default index;

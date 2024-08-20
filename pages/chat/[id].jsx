import Navbar from "@/Components/Common/Navbar";
import { CHILD_COLLECTION, db, PARENT_COLLECTION } from "@/firebase-config";
import { useWebSelector } from "@/redux/selector/web";
import { sendNotificationToUser } from "@/redux/slices/web";
import * as images from "@/utilities/images.js";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import moment from "moment";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const chatView = () => {
  const router = useRouter();
  const param = useParams();
  const [user, setUser] = useState("");
  const [message, setMessage] = useState([]);
  const [msg, setMsg] = useState("");
  const msgRef = useRef();
  const { logUsers: userDetails } = useWebSelector();
  const [initialScrollDone, setInitialScrollDone] = useState(false);
  const dispatch = useDispatch();

  const role = {
    1: "Admin",
    2: "Supervisor",
    3: "Customer",
    4: "Staff",
  };

  useEffect(() => {
    if (param?.id) {
      getUser(param?.id);
      getMessageList(param?.id);
      return () => getMessageList(param?.id);
    }
  }, [param?.id]);

  // useEffect(() => {
  //   if (!initialScrollDone && message.length > 0 && msgRef.current) {
  //     setInitialScrollDone(true);
  //     msgRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [message.length, initialScrollDone]);

  useEffect(() => {
    if (message.length > 0 && msgRef.current) {
      msgRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message.length]);

  const getUser = async (id) => {
    const docRef = doc(db, PARENT_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap?.exists()) {
      setUser(docSnap?.data());
    } else {
      console.log("No such document!");
    }
  };

  const getMessageList = async (roomId) => {
    const chats = query(
      collection(db, PARENT_COLLECTION, roomId, CHILD_COLLECTION),
      orderBy("createdAt", "asc")
    );

    let unsb = onSnapshot(chats, (snap) => {
      const list = snap.docs.map((doc) => {
        const id = doc.id;
        return { id, ...doc.data() };
      });
      setMessage(list);
    });

    await updateDoc(doc(db, PARENT_COLLECTION, roomId), { recentMsgs: [] });

    return unsb;
  };

  const isToday = (someDate) => {
    return moment(someDate).isSame(moment(), "day");
  };

  const sendMsg = async () => {
    if (!msg && msg.length <= 0) return;
    setMsg("");

    await addDoc(
      collection(db, PARENT_COLLECTION, param?.id, CHILD_COLLECTION),
      {
        _id: uuidv4(),
        text: msg,
        senderId: userDetails?.[0]?.id,
        receiverId: user?.user,
        createdAt: moment().toISOString(),
      },
      { merge: true }
    );
    await updateDoc(doc(db, PARENT_COLLECTION, param?.id), {
      lastMsg: { text: msg, time: moment().toISOString() },
    });
    let body = {
      user_id: user.user,
      body: msg,
    };
    dispatch(
      sendNotificationToUser({
        ...body,
        cb(res) {},
      })
    );

    if (msgRef.current) {
      msgRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <Navbar heading={"Message"} />
      <div className="commonHeader mb-3">
        <div className="hospitalDetail">
          <div className="backArrowBtn me-2" onClick={() => router.back()}>
            <Image src={images.leftArrowLong} alt="img" />
          </div>
          <div className="chatCardLeft">
            <div className="cardCustomerImg">
              <Image
                src={
                  user?.userPhoto?.includes(
                    "https://precisiononcall-backend.itechnolabs.tech"
                  )
                    ? user?.userPhoto
                    : images.userIconImg
                }
                height={58}
                width={58}
                alt="image"
                className="customerImage"
              />
            </div>
            <div className="customerRight">
              <h6 className="heading16 mb-0">{user?.userName}</h6>
              <p className="text12 customerCategory mb-0">
                {role[user?.userRole]}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="chatData">
        {message && message?.length > 0 ? (
          message?.map((msg, index) => {
            const currentDate = moment(msg.createdAt);
            const prevMsg = index > 0 ? message[index - 1] : null;
            const prevDate = prevMsg ? moment(prevMsg.createdAt) : null;
            // Determine if to show the date or "Today"
            const showDate = !prevDate || !currentDate.isSame(prevDate, "day");
            const sentToday = isToday(msg.createdAt);
            return (
              <React.Fragment key={index}>
                {showDate &&
                  (sentToday ? (
                    <p className="mb-0 text12 text-center">Today</p>
                  ) : (
                    <p className="mb-0 text12 text-center">
                      {moment(msg.createdAt).format("MMMM Do YYYY")}
                    </p>
                  ))}
                <div
                  className={
                    userDetails?.[0]?.id == msg?.senderId
                      ? "messageRight"
                      : "messageLeft"
                  }
                >
                  <p className="message">{msg?.text}</p>
                  <div className="time">
                    <p className="mb-0 text12">
                      {moment(msg?.createdAt).format("hh:mm A")}
                    </p>{" "}
                    {/* <span className="check">
                        <Image
                          src={images.tick}
                          alt="image"
                          className="tickImg"
                        />
                      </span> */}
                  </div>
                </div>
                <div ref={msgRef} />
              </React.Fragment>
            );
          })
        ) : (
          <div className="chatData">
            <p className="mb-0 text12 text-center">Loading...</p>{" "}
          </div>
        )}
      </div>

      <div className="input-area">
        {/* <input type="file" id="file-input" />
         <label htmlFor="file-input" className="inputLabel">
           <Image
             src={images.attachment}
             alt="image"
             className="attachmentImg"
           />
           <span></span>
         </label> */}
        <input
          type="text"
          placeholder="Write..."
          className="text12"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => e.key == "Enter" && sendMsg()}
        />
        <Image
          src={images.sendChat}
          alt="image"
          className="sendChat"
          onClick={sendMsg}
        />
      </div>
    </>
  );
};

export default chatView;

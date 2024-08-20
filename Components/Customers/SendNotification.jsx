import { sendUserNotification } from "@/redux/slices/web";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const SendNotification = (props) => {
  const dispatch = useDispatch();
  const handleSendNotification = (event) => {
    event.preventDefault();
    const params = {
      user_id: props.id,
      body: message,
    };
    if(!message || message.trim()== ""){
      toast.error("Message is required!")
      return
    }
    dispatch(
      sendUserNotification({
        ...params,
        cb(res) {
          toast.success("Notification Sent!");
          props?.close();
        },
      })
    );
  };
  const [message, setMessage] = useState("");
  return (
    <>
      <div className="notificationModal">
        <h2 className="heading24 text-center">Send Notification</h2>
        <form onSubmit={handleSendNotification}>
          <textarea
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
            placeholder="Write..."
            rows={6}
            cols={41}
            className="textArea heading14"
          ></textarea>
          <div className="col-md-12 mt-2 text-center">
            <button className="profileBtn">Send</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SendNotification;

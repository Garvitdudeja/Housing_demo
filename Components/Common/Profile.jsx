import { useWebSelector } from "@/redux/selector/web";
import { crossIcon, emailImg, profile } from "@/utilities/images";
import Image from "next/image";
import { Col, Modal, Row } from "react-bootstrap";

const Profile = ({ show, setShow }) => {
  const details = useWebSelector();
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      centered
      className="profileModal"
    >
      <div className="notificationModal">
        <div className="d-flex justify-content-between mb-2">
          <h3 className="heading20">My Profile</h3>
          <Image
            src={crossIcon}
            className="profileModalEmail"
            style={{ cursor: "pointer" }}
            onClick={() => setShow(false)}
          />
        </div>
        <Row>
          <Col md={12} className="d-flex justify-content-center">
            <Image alt="customerImg" width="150" height="150" src={profile} />
          </Col>
          <p className="heading16 text-center mt-3 mb-0">
            {details?.logUsers?.[0]?.user_name}
          </p>

          <div className="d-flex justify-content-center p-2">
            <Image
              src={emailImg}
              width="30"
              height="25"
              className="profileModalEmail"
            />
            <p className="heading16 mb-4">
              {details?.logUsers?.[0]?.user_email}
            </p>
          </div>
        </Row>
      </div>
    </Modal>
  );
};

export default Profile;

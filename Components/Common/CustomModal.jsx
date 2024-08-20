import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ModalDialog from 'react-bootstrap/ModalDialog'

const CustomModal = (props) => {
  const [show, setShow] = useState(props.show);

  const handleClose = () => {
    setShow(false);
    if (props.onCloseModal) {
      props.onCloseModal();
    }
  }

  if(props.flag === "CommentBox"){  
    const childElement = document.getElementById('commentBox');
    // Check if the child element exists and has a parent
    if (childElement && childElement.parentElement) {
      // Access the parent element and apply CSS styles
      const parentElement = childElement.parentElement;
      parentElement.style.backdropFilter = 'blur(0px)';
    }
  }

  return (
    <>
    <Modal
      show={show}
      onHide={()=>{handleClose()}}
      keyboard={false}
      centered
      size={props.size}
      id={props.ids}
      dialogClassName={props.classNames === "google_login_Social" ? "":""}
      className={props.isRightSideModal ? 'pe-0' : ''}
      animation={true}
      backdrop={props.backdrop ?? false}
      
    >
      
      {props.style &&
        <div className="modal-backdrop" style={props.style} />
      }

      {props.showCustomBackdrop &&
        <div className="modal-backdrop" style={props.style} />
      }


      {(props.header || props.showCloseBtn) ?
        <Modal.Header closeButton>
          {props.header} 
          {/* {props.title ?
            <Modal.Title>{props.title}</Modal.Title>
            :
            ""
          } */}

        </Modal.Header>
        :
        ""
      }  
      <Modal.Body className={props.isRightSideModal ? "p-0" : ""}>
        {props.child}
      </Modal.Body>

      {props.footerContent ?
        <Modal.Footer className={props.footerClasses}>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close Modal
          </Button> */}
          {props.footerContent}
        </Modal.Footer>
        :
        ""
      }
    </Modal>
    </>
  );
};

export default CustomModal;

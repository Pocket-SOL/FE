import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { FaRegMessage } from "react-icons/fa6";
export default function Comment({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // 댓글 창
  function CommentArea() {
    return (
      <>
        <FloatingLabel
          controlId="floatingTextarea"
          label="Comments"
          className="mb-3"
        >
          <Form.Control as="textarea" placeholder="Leave a comment here" />
        </FloatingLabel>
      </>
    );
  }

  return (
    <>
      <Button
        style={{
          height: "2rem",
          fontSize: "10px",
          marginRight: "16px",
          marginTop: "12px",
        }}
        variant="secondary"
        onClick={handleShow}
      >
        <FaRegMessage
          style={{
            marginRight: "5px",
            marginBottom: "1.5px",
          }}
        />
        댓글달기(개수)
      </Button>
      <Offcanvas
        scroll={true}
        show={show}
        onHide={handleClose}
        {...props}
        placement="bottom"
        style={{
          maxWidth: 375,
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>댓글</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <CommentArea />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

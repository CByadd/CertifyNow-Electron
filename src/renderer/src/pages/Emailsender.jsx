import { useState,useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { IoSend } from "react-icons/io5";
import './../styles/email.css';

Modal.setAppElement("#root"); // Ensure accessibility

function EmailSender() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const location = useLocation();
  const user = location.state?.user;

  const inputRef = useRef(null);
  const buttonRef = useRef(null);


  useEffect(() =>{
    const handlekey = (event) =>{
      if(event.key === "Enter" && document.activeElement === inputRef.current){
        event.preventDefault();
        buttonRef.current?.click();
      }
    };
    document.addEventListener("keydown", handlekey);
    return () => document.removeEventListener("keydown", handlekey);
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setModalContent([]); // Reset modal content



    const formData = new FormData();
    formData.append("message", message);

    const serverUrls = [
      "http://localhost:5000/send-email",
      "http://localhost:5001/send-email",
      "http://localhost:5002/send-email",
      "http://localhost:5003/send-email",
      "http://localhost:5004/send-email",
      // "http://localhost:5005/send-email",
      "http://localhost:5006/send-email",
      "http://localhost:5007/send-email",
      "http://localhost:5008/send-email",
      // "http://localhost:5009/send-email",
    ];

    try {
      const responses = await Promise.all(
        serverUrls.map((url) =>
          fetch(url, {
            method: "POST",
            body: formData,
          })
        )
      );

      const results = await Promise.all(responses.map((res) => res.json()));

      const newModalContent = results.map((result, index) => ({
        server: serverUrls[index],
        message: result.message || "Failed to send email.",
      }));

      setModalContent(newModalContent);
      setModalIsOpen(true);
    } catch (err) {
      setModalContent([{ server: "Error", message: err.message }]);
      setModalIsOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner">
            <img src="https://res.cloudinary.com/dvmuf6jfj/image/upload/v1739648272/Portfolio/Certifynow/output_YlUDgG_1_h3sdin.gif" alt="op" />
          </div>
          <p>Sending Emails...</p>
        </div>
      )}

      <div>
        <img
          src="https://res.cloudinary.com/dvmuf6jfj/image/upload/v1739604535/Portfolio/CERTIYFNOW_vlocwl.png"
          alt="logo"
          className="logox"
        />
      </div>

      <div className="mainholderx">
        {/* <div className="usercon">
          <h1>Current Session</h1>
          <p>Name: {user.name}</p>
          <p>Id: {user.email}</p>
        </div> */}
        <h1 className="msg">Custom Message that should be embedded in the Mail</h1>
        <form onSubmit={handleSubmit}>
          <div className="tetx">
            <div className="tetholder">
              <textarea
                placeholder="Enter your custom message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                ref={inputRef}
              />
            </div>
            <button className="buttoncl" type="submit" disabled={loading} ref={buttonRef}>
              {loading ? "Sending..." : "Send"}
              <IoSend />
            </button>
          </div>
        </form>
      </div>

      {/* Modal for showing results */}
     <div>
     <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="modal-content"
        overlayClassName="modalcont"
      >
        {/* <h2>Email Sending Results</h2> */}
        {/* <div className="modalcontx"></div> */}
      <div className="warn">
      <ul>
          {modalContent.map((item, index) => (
            <li key={index}>
              <strong>{index+1}:</strong> {item.message}
            </li>
          ))}
        </ul>
      </div>
        <button className="close-btn" onClick={() => setModalIsOpen(false)}>X</button>
      </Modal>
     </div>
    </div>
  );
}

export default EmailSender;

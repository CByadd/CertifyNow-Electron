import React, { useState, useEffect } from "react";
import axios from "axios";

const Developer = () => {
  const [email, setEmail] = useState("");
  const [team, setTeam] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [img, setImg] = useState(null);
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    fetchRecipients();
  }, []);
  const serverUrls = [
    "http://localhost:5000/recipients",
    "http://localhost:5001/recipients",
    "http://localhost:5002/recipients",
    "http://localhost:5003/recipients",
    "http://localhost:5004/recipients",
    // "http://localhost:5005/recipients",
    "http://localhost:5006/recipients",
    "http://localhost:5007/recipients",
    "http://localhost:5008/recipients",
    // "http://localhost:5009/recipients",
  ];
  
  const fetchRecipients = async () => {
    try {
      const responses = await Promise.all(
        serverUrls.map(url => axios.get(url).catch(err => null)) // Catch errors for individual requests
      );
  
      // Filter out failed requests and extract data
      const data = responses
        .filter(response => response && response.data)
        .flatMap(response => response.data);
  
      setRecipients(data);
    } catch (error) {
      console.error("Error fetching recipients:", error);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !team || !certificate || !img) {
      alert("Please fill all fields and upload files.");
      return;
    }

    // const formData = new FormData();
    // formData.append("user", email);
    // formData.append("team", team);
    // formData.append("certificate", certificate);
    // formData.append("img", img);

    try {
      await axios.post("http://localhost:5000/add-recipient", formData);
      alert("Recipient added successfully!");
      fetchRecipients();
      setEmail("");
      setTeam("");
      setCertificate(null);
      setImg(null);
    } catch (error) {
      console.error("Error adding recipient:", error);
    }
  };

  return (
    <div className="containerxv">
      {/* <h2>Add Recipient</h2> */}
      {/* <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="email"
          placeholder="Recipient Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Team Name"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCertificate(e.target.files[0])}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImg(e.target.files[0])}
          required
        />
        <button type="submit">Add Recipient</button>
      </form> */}

      <h1>Existing Recipients</h1>
      <span className="infocontainer">
        {recipients.map((recipient, index) => (
          <p className="infoele" key={index}>
            <h3 style={{color:recipient.user == 'NA' ? 'red':""}}>{recipient.user}</h3> . <h4>{recipient.team}</h4>
            <span className="drive" style={{color: recipient.driveLink == 'NA' ? 'red' : ""}} >{recipient.driveLink.length > 15 ? recipient.driveLink.slice(0,50) + '...' : recipient.driveLink}</span>
          </p>
        ))}
      </span>
    </div>
  );
};

export default Developer;

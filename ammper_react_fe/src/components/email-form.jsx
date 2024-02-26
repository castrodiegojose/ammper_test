import React, { useState } from "react";
import { Link } from "react-router-dom";

const EmailForm = () => {
  const [formData, setFormData] = useState({
    from_email: "",
    to_email: "",
    subject: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(process.env.REACT_APP_URL_BE_EMAIL_SENDER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Email sent successfully.");
        setErrorMessage("");
      } else {
        setErrorMessage("Error sending the email.");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div id="emailSender" className="max-w-[1040px] m-auto md:pl-20 p-4 py-16">
      <h1 className="text-4xl font-bold text-center text-[#001b5e]">
        Email Sender
      </h1>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid md:grid-cols-2 gap-4 w-full py-2">
          <div className="flex flex-col">
            <label className="uppercase text-sm py-2">From</label>
            <input
              className="border-2 rounded-lg p-3 flex border-gray-300"
              type="email"
              name="from_email"
              placeholder="Email address"
              value={formData.from_email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col py-2">
          <label className="uppercase text-sm py-2">To</label>
          <input
            className="border-2 rounded-lg p-3 flex border-gray-300"
            type="email"
            name="to_email"
            placeholder="Email address"
            value={formData.to_email}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="uppercase text-sm py-2">Subject</label>
          <input
            className="border-2 rounded-lg p-3 flex border-gray-300"
            type="text"
            name="subject"
            placeholder="Subject"
            id=""
            value={formData.subject}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="uppercase text-sm py-2">Message</label>
          <textarea
            className="border-2 rounded-lg p-3 flex border-gray-300"
            rows="10"
            name="message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-[#001b5a] text-gray-100 mt-4 w-full p-4 rounded-lg"
        >
          Send Email
        </button>
        <button>
          <Link to="/stats">Email Stats</Link>
        </button>
      </form>
    </div>
  );
};

export default EmailForm;

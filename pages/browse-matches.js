import Layout from "../components/Layout";
import Styles from "../components/Theme";
import Spacer from "../components/Spacer";
import React, { useState } from "react";
import pageStyles from "../components/SubmitScore.module.css";
import Button from "../components/Button";
import axios from "axios";

export default function Index() {
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    try {
      const result = await axios.post("http://localhost:3001/compare-users", {
        address1,
        address2,
      });
      setResponse(result.data); // Store the response from the API
    } catch (error) {
      console.error("Error comparing users:", error);
    }
  };

  return (
    <div>
      <Layout />
      <div style={Styles.heroContent}>
        <h1> Let's calculate your compatibility. </h1>
        <div className={pageStyles.inputContainer}>
          <Spacer height="1" />
          <label htmlFor="address1">Address #1</label>
          <Spacer height="1" />
          <input
            type="text"
            id="address1"
            name="address1"
            placeholder="Enter your address"
            required
            className={pageStyles.inputbox}
            value={address1}
            onChange={(e) => setAddress1(e.target.value)} // Update state
          />
        </div>
        <div className={pageStyles.inputContainer}>
          <Spacer height="1" />
          <label htmlFor="address2">Address #2</label>
          <Spacer height="1" />
          <input
            type="text"
            id="address2"
            name="address2"
            placeholder="Enter the second address"
            required
            className={pageStyles.inputbox}
            value={address2}
            onChange={(e) => setAddress2(e.target.value)} // Update state
          />
        </div>
        <Spacer height="2" />
        <Button onClick={handleSubmit} text="Calculate" color="green" />
        {response && (
          <div>
            <p>{response.message}</p>
            <p>Match Percentage: {response.matchPercentage}</p>
            <p>Differing Responses: {response.differingResponses}</p>
          </div>
        )}
      </div>
    </div>
  );
}
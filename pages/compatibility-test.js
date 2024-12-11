import Layout from "../components/Layout";
import Styles from "../components/Theme";
import Spacer from "../components/Spacer";
import React, { useState } from "react";
import pageStyles from "../components/SubmitScore.module.css";
import Button from "../components/Button";

export default function Index() {
  const [address1, setAddress1] = useState("aleo1cewxkdjmuued69axf7mke0thuhxww324rs48qae76cgj0kwtcuzsjep2w4");
  const [address2, setAddress2] = useState("aleo1jcsyvzul83038yezal68hl3rnmnuwmgh2j76xrrptr8ca9wswcrs0qttxr");
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    try {
      // Call the compare-users API with the addresses
      const response = await fetch("/api/compare-users", {
        method: "POST", // Specify the method as POST
        headers: {
          "Content-Type": "application/json", // Set the Content-Type to application/json
        },
        body: JSON.stringify({ // Convert the data to JSON
          userA: address1,
          userB: address2,
        }),
      });
  
      if (!response.ok) {
        // Handle non-2xx HTTP responses
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong.");
      }
  
      const result = await response.json(); // Parse the JSON response
      console.log(result);
      setResponse(result); // Set the response in state
    } catch (error) {
      console.error("Error comparing users:", error);
      setResponse({ message: "Error comparing users. Please try again." });
    }
  };

  return (
    <div>
      <Layout />
      <div style={Styles.heroContent}>
        <h1>Let's calculate your compatibility.</h1>
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
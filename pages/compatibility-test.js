import Layout from "../components/Layout";
import Styles from "../components/Theme";
import Spacer from "../components/Spacer";
import React, { useState, useEffect } from "react"; // Import useEffect
import pageStyles from "../components/SubmitScore.module.css";
import Button from "../components/Button";

export default function Index() {
  const [address1, setAddress1] = useState(
    "aleo1cewxkdjmuued69axf7mke0thuhxww324rs48qae76cgj0kwtcuzsjep2w4"
  );
  const [address2, setAddress2] = useState(
    "aleo1e07jkqg62706c2dknmtqvevnpltck8ntungfr42kny7jxreggqrstamrm5"
  );
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [secondsWaiting, setSecondsWaiting] = useState(0); // Timer state

  useEffect(() => {
    let intervalId;

    // Start the timer when loading begins
    if (loading) {
      intervalId = setInterval(() => {
        setSecondsWaiting((prev) => prev + 1);
      }, 1000);
    } else {
      setSecondsWaiting(0); // Reset timer when not loading
    }

    // Clear interval on component unmount or when loading ends
    return () => clearInterval(intervalId);
  }, [loading]);

  const handleSubmit = async () => {
    setLoading(true);
    setSuccess(false); // Reset success state before API call
    try {
      const response = await fetch("/api/compare-users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userA: address1,
          userB: address2,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong.");
      }

      const result = await response.json();
      console.log(result);
      setResponse(result);
      setSuccess(true); // Set success to true on a successful response
    } catch (error) {
      console.error("Error comparing users:", error);
      setResponse({ message: "Error comparing users. Please try again." });
    } finally {
      setLoading(false);
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
            onChange={(e) => setAddress1(e.target.value)}
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
            onChange={(e) => setAddress2(e.target.value)}
          />
        </div>
        <Spacer height="2" />
        <Button onClick={handleSubmit} text="Calculate" color="green" />

        {/* Show loading GIF while waiting for the response */}
        {loading && (
          <div className={pageStyles.loadingContainer}>
            <Spacer height="4" />
            <p>It takes a bit for the program to execute. In the meantime, enjoy these gifts! You've been waiting for {secondsWaiting} second{secondsWaiting !== 1 ? 's' : ''}... 🦁</p>
            <p>Isn't that a cute lion? Keep your fingers crossed!</p>
            <img src="/cuteLion.gif" alt="Loading..." />
            <img src="/cuteCat.gif" alt="Loading..." />
            <img src="/yorkieConfused.gif" alt="Loading..." />
            <img src="/yorkie.gif" alt="Loading..." />
           
          </div>
        )}

        {/* Show success GIF on successful response */}
        {success && (
          <div className={pageStyles.successContainer}>
            <Spacer height="4" />
            <img src="/letsGoLions.gif" alt="Success!" />
          </div>
        )}

        {response && success && (
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
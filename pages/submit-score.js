import Layout from "../components/Layout";
import Styles from "../components/Theme";
import Spacer from "../components/Spacer";
import React, { useState, useEffect } from "react";
import pageStyles from "../components/SubmitScore.module.css";
import Button from "../components/Button";

const QUESTIONS = [
  "Do you prefer quiet dates?",
  "Do you like to travel?",
  "Do you enjoy cooking?",
  "Do you like pets?",
  "Do you prefer mornings over nights?",
  "Did you go to a bougie school?",
  "Do you thrash your body around at concerts?",
  "Zk puzzles are my friends",
  "I prefer Le Mans over F1",
  "I work lift and grind and you eat love pray",
];

export default function Index() {
  const [answers, setAnswers] = useState({});
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [waitingTime, setWaitingTime] = useState(0);
  let timer; // Declare the timer variable

  const handleInputChange = (index, value) => {
    setAnswers({
      ...answers,
      [index]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true);
    setWaitingTime(0); // Reset waiting time
    console.log(loading);
    // Start the timer
    timer = setInterval(() => {
      setWaitingTime((prev) => prev + 1); // Increment waiting time every second
    }, 1000);

    try {
      // Prepare user address and hash for the API call
      const userAddress = document.getElementById("public-key").value; // Get the user address from input

      // Generate the hash array based on the user's answers
      const hash = QUESTIONS.map((_, index) =>
        answers[index] !== undefined ? answers[index] : "0"
      ); // Default to "0" if no answer is provided

      // Send a POST request to /api/set-hash using fetch
      const response = await fetch("/api/set-hash", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify({
          userAddress,
          hash,
        }),
      });

      // Check if the response is okay (status in the range 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the response data
      const result = await response.json();

      // Set response data from the API
      setResponse(result);
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      clearInterval(timer); // Clear the timer
      setLoading(false); // Reset loading state
    }
  };

  useEffect(() => {
    // Cleanup function to clear the timer when the component unmounts
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={pageStyles.testContainer}>
      <Layout />
      <Spacer height="8" />
      <h1> Take the test</h1>
      <p>
        {" "}
        Take the test, deploy your results onto a leo program, yes its public
        and yes they know what it might map to but we could do some randomizing
        magic to make sure the inputs at least are mixed up :){" "}
      </p>

      <Spacer height="4" />
      <form onSubmit={handleSubmit}>
        {QUESTIONS.map((question, index) => (
          <div key={index}>
            <Spacer height="1" />
            <label className={pageStyles.questionLabel}>{question}</label>
            <div>
              <label>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={1}
                  onChange={() => handleInputChange(index, "1")} // Store "1" for "Yes"
                  required
                  className={pageStyles.radioButton}
                />
                <span className={pageStyles.option}> Yes </span>
              </label>
              <label>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={0}
                  onChange={() => handleInputChange(index, "0")} // Store "0" for "No"
                  className={pageStyles.radioButton}
                />
                <span className={pageStyles.option}> No </span>
              </label>
            </div>
          </div>
        ))}
        <Spacer height="1" />
      </form>

      <Spacer height="4" />
      <div className={pageStyles.stepContainer}>
        <div className={pageStyles.inputContainer}>
          <p>Please enter a valid public key.</p>
          <Spacer height="1" />
          <label htmlFor="public-key">Public Key</label>
          <Spacer height="1" />
          <input
            type="text"
            id="public-key"
            name="public-key"
            placeholder="Enter your public key"
            required
            className={pageStyles.inputbox}
          />
        </div>
        <Spacer height="4" />
        <div className={pageStyles.inputContainer}>
          <p>Please enter a valid private key.</p>
          <Spacer height="1" />
          <label htmlFor="private-key">Private Key</label>
          <Spacer height="1" />
          <input
            type="text"
            id="private-key"
            name="private-key"
            placeholder="Enter your private key"
            required
            className={pageStyles.inputbox}
          />
        </div>
        <Spacer height="4" />
        <div className={pageStyles.inputContainer}>
          <p>Please enter a fee for executing the program.</p>
          <Spacer height="1" />
          <label htmlFor="fee">Fee</label>
          <Spacer height="1" />
          <input
            type="text"
            id="fee"
            name="fee"
            placeholder="Enter your program fee"
            required
            className={pageStyles.inputbox}
          />
        </div>
        <Spacer height="4" />

        <Button type="submit" text="Submit" color="green" />

        <Spacer height="16" />

        {/* Loading State */}
        {loading && (
          <div className={pageStyles.loadingContainer}>
            <img
              src={"/cuteCat.gif"}
              alt="Loading..."
              className={pageStyles.loadingGif}
            />
            <p>Waiting for response... {waitingTime} seconds</p>
          </div>
        )}

        {response && (
          <div>
            <h3>Response:</h3>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

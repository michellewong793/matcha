import React, { useState } from "react";
import Layout from "../components/Layout";
import Styles from "../components/Theme";
import Spacer from "../components/Spacer";
import pageStyles from "../components/SubmitScore.module.css";
import Button from "../components/Button";
import axios from "axios";

const QUESTIONS = [
  "Do you prefer quiet dates?",
  "Do you like to travel?",
  "Do you enjoy cooking?",
  "Do you like pets?",
  "Do you prefer mornings over nights?",
  "Do you enjoy outdoor activities?",
];

export default function Index() {
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(false)); // Initialize with false
  const [response, setResponse] = useState(null);

  const handleCheckboxChange = (index) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[index] = !newAnswers[index]; // Toggle the boolean value
      return newAnswers;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const leoInput = answers.map((answer, index) => ({
        question: QUESTIONS[index],
        answer: answer, // This will be true or false
      }));
      const result = await axios.post(
        "https://aleo-api-endpoint.com/process-preferences",
        {
          preferences: leoInput,
        }
      );
      setResponse(result.data);
      alert("Your preferences have been successfully submitted! Just wait a little bit. The next step is to meditate for 15 minutes as we work behind the scenes to bring you your people.");

    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className={pageStyles.centerPage}>
      <Layout />

      <div style={Styles.submitContent} className={pageStyles.formContainer}>
        <h1> Get Started </h1>
        <h2> So how this works is that you can send this to someone you're interested in, and they can answer questions. You also answer the questions. Then you go to compatibility match page to see if your scores match up greater than 50%. None of your answers are revealed to each other, but you can verify that your statements were a majority of the same. </h2>
        <form
          className={pageStyles.form}
          onSubmit={handleSubmit} // Call handleSubmit on submit
        >
          {QUESTIONS.map((question, index) => (
            <div key={index} className={pageStyles.sliderContainer}>
              <Spacer height="1" />
              <label>{question}</label>
              <Spacer height="1" />
              <div className={pageStyles.checkboxContainer}>
                <input
                  type="checkbox"
                  id={`question-${index}`}
                  name={`question-${index}`}
                  checked={answers[index]} // Bind checkbox to boolean value
                  onChange={() => handleCheckboxChange(index)} // Toggle boolean value on change
                />
                <label
                  htmlFor={`question-${index}`}
                  className={pageStyles.checkboxOption}
                >
                  {answers[index] ? "Yes" : "No"}
                </label>
              </div>
            </div>
          ))}
          <Spacer height="2" />
        </form>

        <div className={pageStyles.stepContainer}>
<p> Create an account</p>        <a className={pageStyles.link} href="https://www.provable.tools/account" target="_blank"> Create Account</a>
          <Spacer height="1" />

<div className={pageStyles.inputContainer}>
          <label className={pageStyles.inputLabel} htmlFor="public-key">Account (Address)</label>
          <Spacer height="1" />
          <input
            type="text"
            id="public-key"
            name="public-key"
            placeholder="Enter your address"
            required
            className={pageStyles.inputbox}
          />
          </div>
        </div>
        <Spacer height="4" />

        <div className={pageStyles.stepContainer}>
          <p>
            Step 2: Please enter your private key. We don't store this, just for
            executing the program.
          </p>
          <Spacer height="1" />
          <div className={pageStyles.inputContainer}>

          <label className={pageStyles.inputLabel}  htmlFor="private-key">Private Key</label>
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
        </div>
        <Spacer height="4" />

    

        <div className={pageStyles.messageText}>
          <p> You're all done! Submit below to get the matching started. </p>
          <p>
            {" "}
            Disclaimer: It may take up to 15 minutes to throw your profile into
            the pool, but don't worry! Just go grab a water and do something you like.{" "}
          </p>
          <p>
            {" "}
            When you're ready, head over to Matches to see if we have
            loaded your matches. luv{" "}
          </p>
        </div>
        <Spacer height="8" />

        <Button onClick={handleSubmit} text="submit, LFG" color="green" />

        <Spacer height="8" />
      </div>
    </div>
  );
}

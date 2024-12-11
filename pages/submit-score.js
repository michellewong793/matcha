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
  const [answers, setAnswers] = useState({});
  const [response, setResponse] = useState(null);

  const handleRadioChange = (index, value) => {
    setAnswers({
      ...answers,
      [index]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const leoInput = Object.entries(answers).map(([key, value]) => ({
        question: key,
        answer: value,
      }));
      const result = await axios.post(
        "https://aleo-api-endpoint.com/process-preferences",
        {
          preferences: leoInput,
        }
      );
      setResponse(result.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className={pageStyles.centerPage}>
      <Layout />

      <div style={Styles.content} className={pageStyles.formContainer}>
        <form
          className={pageStyles.form}
          onSubmit={(e) => {
            e.preventDefault();
            // handleSubmit();
          }}
        >
          {QUESTIONS.map((question, index) => (
            <div key={index} className={pageStyles.sliderContainer}>
              <label>{question}</label>
              <div className={pageStyles.radioContainer}>
                {[1, 2, 3, 4, 5, 6].map((value) => (
                  <label key={value} className={pageStyles.radioOption}>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={value}
                      checked={answers[index] === value.toString()}
                      onChange={() => handleRadioChange(index, value)}
                    />
                    {value}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <Spacer height="2" />

        </form>

        <div>
          <p>Step 1: Please enter a valid public key.</p>
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

        <div>
          <p>
            Step 2: Please enter your private key. We don't store this, just
            for executing the program.
          </p>
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

        <div>
          <p>Step 3: Please enter a fee for executing the program.</p>
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

        <Button link="/submit-score" text="Submit" color="green" />

      </div>
    </div>
  );
}
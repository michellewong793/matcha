import Layout from "../components/Layout";
import Styles from "../components/Theme";
import Spacer from "../components/Spacer";
import React, { useState } from "react";
import pageStyles from "../components/SubmitScore.module.css";

const QUESTIONS = [
  "Do you prefer quiet dates?",
  "Do you like to travel?",
  "Do you enjoy cooking?",
  "Do you like pets?",
  "Do you prefer mornings over nights?",
  "Do you enjoy outdoor activities?",
  "Do you watch romantic movies?",
  "Do you enjoy reading books?",
  "Are you open to long-distance relationships?",
  "Do you prioritize career over leisure?",
];

export default function Index() {
  const [answers, setAnswers] = useState({});
  const [response, setResponse] = useState(null);

  const handleInputChange = (index, value) => {
    setAnswers({
      ...answers,
      [index]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      // Sending user preferences to Aleo network API
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

      // Assuming the API returns compatibility mappings
      setResponse(result.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div>
      <Layout />
      <div style={Styles.content}>
        <div className={pageStyles.inputContainer}>
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
            className={pageStyles.inputbox} /* Correct usage */
          />
        </div>
        <Spacer height="4" />

        <div className={pageStyles.inputContainer}>
          <p>
            Step 2: Please enter your private key. We don't store this btw, just
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
            className={pageStyles.inputbox} /* Correct usage */
          />
        </div>
        <Spacer height="4" />

        <div className={pageStyles.inputContainer}>
          <p>Step 3: Please enter a fee for executing the program.</p>
          <Spacer height="1" />
          <label htmlFor="private-key">Fee</label> <Spacer height="1" />
          <input
            type="text"
            id="fee"
            name="fee"
            placeholder="Enter your program fee"
            required
            className={pageStyles.inputbox} /* Correct usage */
          />
        </div>
        <Spacer height="4" />

        <span>Step 2: State your preferences. Let's find your match!</span>
        <Spacer height="1" />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {QUESTIONS.map((question, index) => (
            <div key={index}>
              <label>{question}</label>
              <div>
                <label>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={1}
                    onChange={() => handleInputChange(index, 1)}
                    required
                    className={pageStyles.radioButton} /* Correct usage */
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={0}
                    onChange={() => handleInputChange(index, 0)}
                    className={pageStyles.radioButton} /* Correct usage */
                  />
                  No
                </label>
              </div>
            </div>
          ))}
          <Spacer height="1" />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

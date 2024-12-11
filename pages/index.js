import Layout from "../components/Layout";
import Styles from "../components/Theme";
import Spacer from "../components/Spacer";
import React, { useState } from "react";
import Link from "next/link";

// Questions
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
  return (
    <div style={Styles.appContainer}>
      <Layout />
      <div style={Styles.content}>
        <h1 style={Styles.heroHeading}> find your match-a</h1>
        <p style={Styles.heroText}> because life is short and then you die</p>
        <div style={{ margin: "20px 0" }}>
          <Link href="/submit-score">
            <button style={Styles.button}>create profile</button>
          </Link>
        </div>
        <div>
          <Link href="/browse-matches">
            <button style={Styles.button}>find compatible matches</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

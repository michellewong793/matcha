import Layout from "../components/Layout";
import Styles from "../components/Theme";
import Spacer from "../components/Spacer";
import React, { useState } from 'react';



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
  "Do you prioritize career over leisure?"
];


export default function Index() {

  return (
    <div>
      <Layout />
      <div style={Styles.content}>
        <h1> Zk-date</h1>
          <p> find your match, verify your zk-compability score before you meet! 
          </p>
          <p> what is zk-compatibility? </p>
          <p> zk-compatibility is a score that is generated by a leo program you can run on this app that will verify that your compatibility score is equal to or greater than 50%</p>


          <p> how do we do this? </p>
          <p> we implement a distance based hashing algorithm for privacy in our leo program which takes your form answers below as well as your potential match's and shows you whether or not you are a match based on proximity of answers </p>
       

    
      </div>
    </div>
  );
}

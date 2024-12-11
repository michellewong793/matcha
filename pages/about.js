import Layout from "../components/Layout";
import Styles from "../components/Theme";
import Button from "../components/Button";
import Spacer from "../components/Spacer";

// Questions
const QUESTIONS = [
  "I like to go outside with my partner",
  "I like cats",
  "I like to exercise",
  "I care about the environment",
  "I am a skater boy",
  "I like music",
  "I am monogamous",
  "A Volvo is my dream car",
  "I’m a homebody",
  "I like to lift weights",
];

export default function Index() {
  return (
    <div style={Styles.appContainer}>
      <Layout />
      <div style={Styles.heroContent}>
        <h1 style={Styles.heroHeading}>about us</h1>
        <Spacer height="4"></Spacer>
        <p style={Styles.heroText}>
          <i>
            this was made in vegas in 24 hours
    on 12/10/2024 - 12/11/2024 
          </i>
          <p> <i> further work is obv required </i></p>
          <Spacer height="4"/>

          <p style={Styles.pinkText}> team </p>
          <Spacer height="1"/>
          <i>miche - product </i>
          <i>mia - leo </i>
          <i>wei - theory </i>
          <i>niklas - cryptography researcher </i>
        </p>
      </div>
    </div>
  );
}

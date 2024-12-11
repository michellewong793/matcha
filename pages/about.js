import Layout from "../components/Layout";
import Styles from "../components/Theme";
import Button from "../components/Button";
import Spacer from "../components/Spacer";
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
      <div style={Styles.heroContent}>
        <h1 style={Styles.heroHeading}>about us</h1>
        <Spacer height="4"></Spacer>
        <p style={Styles.heroText}>
          <i>
           this was made in vegas
          </i>
        </p>
       
      </div>
    </div>
  );
}

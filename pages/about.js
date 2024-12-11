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
           imagine a future where you can find who you want to find without compromising on privacy
          </i>
        </p>
        <p style={Styles.heroText}>
          <i>
          this project was built by matcha team for hack provable 2024 
          </i>
        </p>
        <p style={Styles.heroText}>
          <i>
            <b style={Styles.pinkText}>miche</b> - frontend & design 
          </i>
        </p>
        <p style={Styles.heroText}>
          <i>
            <b style={Styles.pinkText}>wei</b> - project manager
          </i>
        </p>
        <p style={Styles.heroText}>
          <i>
            <b style={Styles.pinkText}>niklas</b> - cryptography research 
          </i>
        </p>
        <p style={Styles.heroText}>
          <i>
            <b style={Styles.pinkText}>mia</b> - leo + backend apis for computing compatibility + deploying program 
          </i>
        </p>
      </div>
    </div>
  );
}

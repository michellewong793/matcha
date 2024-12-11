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
        <h1 style={Styles.heroHeading}>find your match-a</h1>
        <p style={Styles.heroText}>
          <i>
           privately
          </i>
        </p>
        <p style={Styles.heroText}>
          <i>
            because life is <i>short</i> and then you{" "}
            <i>die, so you deserve a verifiable true love, without feeling some type of way about sharing your true preferences </i>
          </i>
        </p>
        <Spacer height="4" />
        <div style={{ margin: "20px 0" }}>
          <Button link="/submit-score" text="Create Profile" color="green" />
        </div>
        <div>
          <Button link="/browse-matches" text="Find Them" color="pink" />
        </div>

        <Spacer height="2" />
        <hr />
        <Spacer height="2" />
        <h2> how does it work? </h2>
        <p>
          {" "}
          we use <a style={Styles.link} href="https://docs.leo-lang.org/getting_started">leo</a> to
          deploy a program that takes your inputs in the form of booleans, and
          adds it to a mapping of the program.{" "}
        </p>
        <p>
          {" "}
          when you see a match you want to compare compatibility with, we pull
          your mappings, randomize the inputs for privacy on our end, and
          generate a score that indicates the compatibility between you and the
          match, keeping your preferences private but your compatibility public
        </p>
      </div>
    </div>
  );
}

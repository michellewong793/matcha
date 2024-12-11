let styles = {
  appContainer: {
    color: "white",
  },
  matchPageContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(3, 1fr)",
    gap: "10px" /* Space between grid items */,
    width: "10rem" /* Adjust as needed */,
    height: "10rem" /* Adjust as needed */,
    margin: "6rem auto",
  },

  matchContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  heroHeading: {
    fontSize: "76px",
    color: "white",
    marginBottom: "0.5rem",
  },
  heroText: {
    color: "white",
    fontSize: "24px",
    fontWeight: "600",
    marginTop: "0",
  },
  link: {
    color: "#EF94E9",
    textDecoration: "none",
  },
  inputContainer: {
    width: "50%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
  },

  h2: {
    fontSize: "16px",
  },

  content: {
    marginTop: "15rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingBottom: "1rem",
    marginBottom: 100,
    textAlign: "center",
    maxWidth: "700px",
    marginLeft: "auto",
    marginRight: "auto",
  },
};
export default styles;

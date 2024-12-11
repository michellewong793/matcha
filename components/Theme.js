let styles = {
  appContainer: {
    backgroundColor: "#3C5642",
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
    fontSize: "64px",
    color: "white"
  },
  heroText: {
    color: "white",
    fontSize: "54px"
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

  header: {},

  link: {
    fontSize: "14px",
    textDecoration: "none",
  },

  content: {
    marginTop: "20rem",
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

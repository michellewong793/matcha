let styles = {
  appContainer: {
    color: "white",
  },

  matchPageContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gridTemplateRows: "repeat(6, 1fr)",
    gap: "4rem" /* Space between grid items */,
    margin: "0 auto", 
    maxWidth: "75%",

   
  },

  matchContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid white",
    padding: "1rem",
    borderRadius: "9px",
    backgroundColor: "#6BA46A",
  },
  
  inputBox: {
    padding: "1rem",
    width: "fit-content",
    border: "1px solid white",
    backgroundColor: "#EF94E9"
  },

  pinkText: {
    color: "#EF94E9",
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
    color: "white",
    paddingLeft: "2rem",
    paddingRight:"2rem",
    marginTop: "15rem",
    marginBottom: "6rem",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },

  heroContent: {
    color: "white",
    paddingLeft: "2rem",
    paddingRight:"2rem",
    marginTop: "15rem",
    marginBottom: "6rem",
    textAlign: "center",
    maxWidth: "700px",
    marginLeft: "auto",
    marginRight: "auto",
  },
};
export default styles;

import Link from "next/link";
import Spacer from "./Spacer";

const linkStyle = {
  marginRight: 15,
  textDecoration: "none",
  color: "black",
};

const header = {
  position: "fixed",
  padding: "1rem",
  top: 0,
  left: 0,
  width: "35rem",
  height: "1rem",
  color: "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems:"center"

  
};

const footer = {
  position: "fixed",
  padding: "1rem",
  left: 0,
  bottom: 0,
  width: "100%",
  height: "1rem",
  color: "white",
  display: "flex",
  justifyContent: "center",
};

const link = {
  textDecoration: 'none'
}

const Header = () => (
  <div style={header}>
    <a style={link} href="/"> Home</a>
    <a style={link} href="/submit-score"> Submit your score </a>
    <a style={link} href="/browse-matches"> Browse Matches </a>
  </div>
);

const Layout = () => {
  return (
    <>
      {" "}
      <Header /> <Footer />
    </>
  );
};

const Footer = () => <div style={footer}></div>;

export default Layout;

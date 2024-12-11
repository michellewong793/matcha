import Link from "next/link";
import Spacer from "./Spacer";



const header = {
  position: "fixed",
  padding: "1rem",
  top: 0,
  left: 0,
  width: "50rem",
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
 
  color: "white",
  display: "flex",
  justifyContent: "center",
};

const link = {
  textDecoration: 'none',
  color: "#ABE895",
  fontFamily: "Inter",
  textTransform: "uppercase",
}

const Header = () => (
  <div style={header}>
    <img src="/matchaLogoSmall.svg"/>
    <a style={link} href="/"> Home</a>
    <a style={link} href="/submit-score"> Get Started </a>
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

const Footer = () => <div style={footer}>
  <p> make dating chill again </p>
</div>;

export default Layout;

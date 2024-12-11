import Link from "next/link";
import Spacer from "./Spacer";
import { useRouter } from "next/router"; // Import useRouter for route handling




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

const activeLink = {
  ...link, // Inherit the existing link styles
  fontWeight: 'bold', // Add bold style for the active link
  color: "#EF94E9"
};


const Header = () => {
  const router = useRouter(); // Get the current route

  return (
    <div style={header}>
      <Link href="/">
      <img src="/matchaLogoSmall.svg"/>
      </Link>
      <Link href="/about">
        <a style={router.pathname === '/submit-score' ? activeLink : link}>About</a>
      </Link>
      <Link href="/submit-score">
        <a style={router.pathname === '/submit-score' ? activeLink : link}>Get Started</a>
      </Link>
      <Link href="/browse-matches">
        <a style={router.pathname === '/browse-matches' ? activeLink : link}>Browse Matches</a>
      </Link>
    </div>
  );
};

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

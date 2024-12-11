import Link from "next/link";

const Button = ({ link, text, color }) => {
  const styles = {
    base: {
      display: "inline-block",
      textAlign: "center",
      textDecoration: "none",
      fontFamily: "Inter, sans-serif",
      fontSize: "24px",
      fontWeight: "bold",
      padding: "12px 24px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      transition: "transform 0.2s ease-in-out",
    },
    green: {
      color: "#3C5642",
      backgroundColor: "#ABE895",
    },
    pink: {
      color: "#552251",
      backgroundColor: "#EF94E9",
    },
  };

  const buttonStyle =
    color === "green" ? { ...styles.base, ...styles.green } : { ...styles.base, ...styles.pink };

  return (
    <Link href={link}>
      <a style={buttonStyle}>{text}</a>
    </Link>
  );
};

export default Button;
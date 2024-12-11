import Link from "next/link";
import styles from "./Button.module.css"; // Import the CSS module

const Button = ({ link, text, color, onClick }) => {
  // Use appropriate class names based on the color prop
  const buttonClass = `${styles.button} ${color === "green" ? styles.green : styles.pink}`;

  if (link) {
    // Render as a link if the link prop is provided
    return (
      <Link href={link}>
        <a className={buttonClass}>{text}</a>
      </Link>
    );
  }

  // Render as a button if no link is provided
  return (
    <button className={buttonClass} onClick={onClick} type="button">
      {text}
    </button>
  );
};

export default Button;
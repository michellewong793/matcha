import Link from "next/link";
import styles from "./Button.module.css"; // Import the CSS module

const Button = ({ link, text, color }) => {
  // Use appropriate class names based on the color prop
  const buttonClass = `${styles.button} ${color === "green" ? styles.green : styles.pink}`;

  return (
    <Link href={link}>
      <a className={buttonClass}>{text}</a>
    </Link>
  );
};

export default Button;
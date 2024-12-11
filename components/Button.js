import styles from "./Button.module.css"; // Import the CSS module

const Button = ({ onClick, text, color }) => {
  // Use appropriate class names based on the color prop
  const buttonClass = `${styles.button} ${color === "green" ? styles.green : styles.pink}`;

  return (
    <button className={buttonClass} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
import styles from "./Button.module.css";

export const Button = ({ text }) => (
    <button className={styles.button}>{text}</button>
);
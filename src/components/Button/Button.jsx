import styles from "./Button.module.css";

export const Button = ({ text, type, onClick }) => (
    <button 
        className={styles.button}
        type={type}
        onClick={onClick}
    >
        {text}
    </button>
);
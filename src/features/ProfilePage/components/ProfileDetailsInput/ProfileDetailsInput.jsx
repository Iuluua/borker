import styles from "./ProfileDetailsInput.module.css";
import { useState } from "react";
import clsx from "clsx";

export const ProfileDetailsInput = ({ label, type, name, isFocused }) => {
    const [hasText, setHasText] = useState(false);

    return (
        <div className={styles.profileDetailsInputContainer}>
            <input 
                id={name}
                type={type}
                name={name}
                className={styles.profileDetailsInput} 
                onFocus={() => setHasText(true)} />
            <label 
                htmlFor={name}
                className={clsx({
                    [styles.profileDetailsLabelHasText]: isFocused ? true : hasText, 
                    [styles.profileDetailsLabelDoesntHaveText]: !hasText}, 
                    styles.profileDetailsLabel)}>
                {label}
            </label>
        </div>
    );
}
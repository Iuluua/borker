import styles from "./ProfileDetailsInput.module.css";
import { forwardRef, useState } from "react";
import clsx from "clsx";

export const ProfileDetailsInput = forwardRef(({ label, type, name, isFocused, isError, errorMessage, ...props }, ref) => {
    const [hasText, setHasText] = useState(false);

    return (
        <div className={styles.profileDetailsInputContainer}>
            <input 
                id={name}
                type={type}
                name={name}
                className={clsx({
                    [styles.profileDetailsError]: isError,
                    [styles.profileDetailsNonError]: !isError},
                    styles.profileDetailsInput)} 
                onFocus={() => setHasText(true)}
                ref={ref}
                {...props} />
            <label 
                htmlFor={name}
                className={clsx({
                    [styles.profileDetailsLabelHasText]: isFocused ? true : hasText, 
                    [styles.profileDetailsLabelDoesntHaveText]: !hasText}, 
                    styles.profileDetailsLabel)}>
                {label}
            </label>
            {isError && <p className={styles.errorMessage}>{errorMessage}</p>}
        </div>
    );
})
import styles from "./ProfileDetailsInput.module.css";
import { forwardRef, useState } from "react";
import clsx from "clsx";

export const ProfileDetailsInput = forwardRef(({ label, type, name, value, readOnly, isFocused, isError, errorMessage, ...props }, ref) => {
    const [hasText, setHasText] = useState(false);

    return (
        <div className={styles.profileDetailsInputContainer}>
            <input 
                id={name}
                type={type}
                name={name}
                value={value}
                readOnly={readOnly}
                className={clsx({
                    [styles.profileDetailsReadOnly]: readOnly,
                    [styles.profileDetailsError]: isError,
                    [styles.profileDetailsDefault]: !isError && !readOnly},
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
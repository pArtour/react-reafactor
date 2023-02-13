import React from "react";
import styles from "./Button.module.css";

/** Button component props interface */
interface IButtonProps {
  type?: "button" | "submit" | "reset";
  className?: string;
  primary?: boolean;
  onClick?: () => void | Promise<void>;
  children: React.ReactNode;
}

export const Button: React.FC<IButtonProps> = ({ type = "button", className = "", primary = true, onClick, children }) => (
    <button className={`${className} ${primary ? styles.primary : styles.secondary} ${styles.button}`} type={type} onClick={onClick} >
        {children}
    </button>
);

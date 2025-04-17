"use client";

import { Icon } from "../Icon/Icon";
import styles from "./Input.module.scss";

interface InputProps {
  type: "number" | "text";
  value?: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  iconName?: string;
}

export const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  placeholder,
  iconName,
}) => {
  return (
    <div className={styles.InputWrapper}>
      {iconName && <Icon name={iconName} />}
      <input
        className={styles.Input}
        type={type === "number" ? "number" : "text"}
        min={type === "number" ? 0 : ""}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

"use client";

import { Icon } from "../Icon/Icon";
import styles from "./Input.module.scss";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  iconName?: string;
}

export const Input: React.FC<InputProps> = ({
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
        type="text"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

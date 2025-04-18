"use client";

import classNames from "classnames";
import { Icon } from "../Icon/Icon";
import styles from "./Input.module.scss";

interface InputProps {
  type: "number" | "text";
  value?: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  iconName?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  type,
  value,
  onChange,
  placeholder,
  iconName,
  className,
}) => {
  return (
    <div className={classNames(styles.InputWrapper, className)}>
      {iconName && (
        <div className={styles.IconWrapper}>
          <Icon name={iconName} />
        </div>
      )}
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

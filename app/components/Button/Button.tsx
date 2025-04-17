import classNames from "classnames";
import styles from "./Button.module.scss";
import { Icon } from "../Icon/Icon";

interface ButtonProps {
  title?: string;
  onClick: () => void;
  variant: "primary" | "secondary" | "accend";
  disabled?: boolean;
  iconName?: string;
  size?: "sm" | "md" | "iconBox";
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  variant,
  disabled,
  iconName,
  size,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        styles.Button,
        disabled ? styles.Disabled : "",
        {
          [styles.Primary]: variant === "primary",
          [styles.Secondary]: variant === "secondary",
          [styles.Accend]: variant === "accend",
        },
        {
          [styles.Medium]: size === "md",
          [styles.Small]: size === "sm",
          [styles.IconBox]: size === "iconBox",
        },
        styles.button
      )}
    >
      <div className={styles.ButtonInner}>
        <span className={styles.ButtonTitle}>{title}</span>
        {iconName && (
          <span className={styles.Icon}>
            <Icon name={iconName} />
          </span>
        )}
      </div>
    </button>
  );
};

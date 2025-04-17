import classNames from "classnames";
import styles from "./Button.module.scss";
import { Icon } from "../Icon/Icon";

interface ButtonProps {
  title?: string;
  onClick?: () => void;
  variant: "primary" | "secondary" | "link";
  disabled?: boolean;
  iconName?: string;
  size?: "sm" | "md" | "iconBox";
  iconPositon?: "before" | "after";
  iconColor?: "light" | "dark";
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  variant,
  disabled,
  iconName,
  size,
  iconPositon,
  iconColor,
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
          [styles.Link]: variant === "link",
        },
        {
          [styles.Medium]: size === "md",
          [styles.Small]: size === "sm",
          [styles.IconBox]: size === "iconBox",
        },
        styles.button
      )}
    >
      <div
        className={classNames(
          styles.ButtonInner,
          iconPositon === "before" ? styles.ReverseCol : ""
        )}
      >
        <span className={styles.ButtonTitle}>{title}</span>
        {iconName && (
          <span className={styles.Icon}>
            <Icon name={iconName} color={iconColor} />
          </span>
        )}
      </div>
    </button>
  );
};

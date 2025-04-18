"use client";

import React from "react";
import classNames from "classnames";
import styles from "./Text.module.scss";

interface TextProps {
  title?: string | number | null;
  size?: "sm" | "md" | "xl";
  subtitle?: string | number;
  subtitleSize?: "sm" | "md" | "xl";
  subtitlePosition?: "up" | "down" | "after" | "before";
  className?: string;
  type: "h1" | "h2" | "h3" | "h4" | "span" | "p";
  children?: React.ReactNode;
  numberColor?: boolean;
}

export const Text: React.FC<TextProps> = ({
  title,
  subtitle,
  size = "md",
  subtitleSize = "sm",
  subtitlePosition = "down",
  className,
  type,
  children,
  numberColor = false,
}) => {
  const HeadingTag = type;

  const isNumber = typeof title === "number";
  const isPositive = numberColor && isNumber && (title as number) > 0;
  const isNegative = numberColor && isNumber && (title as number) < 0;

  return (
    <div
      className={classNames(
        styles.Wrapper,
        styles[`TextPosition--${subtitlePosition}`],

        {
          [styles.isPositive]: isPositive,
          [styles.isNegative]: isNegative,
        },

        className
      )}
    >
      <HeadingTag className={classNames(styles.Title, styles[size])}>
        {title}
      </HeadingTag>
      {subtitle && (
        <p
          className={classNames(
            styles.Subtitle,
            styles[`Subtitle--${subtitleSize}`]
          )}
        >
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
};

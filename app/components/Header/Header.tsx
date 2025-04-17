"use client";

import Link from "next/link";
import styles from "./Header.module.scss";
import { Button } from "../Button/Button";
import classNames from "classnames";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div className={classNames(styles.Header)}>
      <Link href="/">
        <Button
          variant="primary"
          size="iconBox"
          iconName="HiOutlineHome"
          iconPositon="before"
        />
      </Link>
      <Link href="/calculator">
        <Button
          variant="primary"
          size="iconBox"
          iconName="IoCalculator"
          iconPositon="before"
        />
      </Link>
      <Link href="/statistics">
        <Button
          variant="primary"
          size="iconBox"
          iconName="FaChartPie"
          iconPositon="before"
        />
      </Link>
    </div>
  );
};

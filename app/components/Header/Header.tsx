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
    </div>
  );
};

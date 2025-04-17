"use client";

import Link from "next/link";
import Calculator from "./calculator/Calculator";
import List from "./components/List/List";
import "./styles/utils/page.scss";
import { useData } from "./hooks/Provider";

export default function Home() {
  // const { totalCalculatorValue } = useData();

  // const total = totalCalculatorValue();

  return (
    <div className="Page">
      <div className="FlexRow">
        {/* HEADER */}
        <Link href="/">Home</Link>
        <Link href="/calculator">Calculator</Link>

        {/* <span>{total}</span> */}
      </div>

      <div className="FlexRow">
        <div className="col-70 p-block">
          <List />
        </div>
        <div className="col-30 p-block">
          <Calculator />
        </div>
      </div>
    </div>
  );
}

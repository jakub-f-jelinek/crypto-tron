"use client";

import List from "./components/List/List";
import "./styles/utils/page.scss";

import { Calculator } from "./components/CalculatorComp/Calculator";

export default function Home() {
  return (
    <div className="Page">
      <div className="BodyContainer">
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

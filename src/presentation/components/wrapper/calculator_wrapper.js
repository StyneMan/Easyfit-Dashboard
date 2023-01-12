import React from "react";
import "../calculator/";
import Calculator from "../calculator/";

const CalculatorWrapper = (props) => {
  let { setAnchorPopperEl } = props;

  return <Calculator setAnchorPopperEl={setAnchorPopperEl} />;
};

export default CalculatorWrapper;

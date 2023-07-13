import React from "react";
import ReactDOM from "react-dom";

import "antd/dist/reset.css";

import { init } from "./utils";
import { Wrapper } from "./style";
import { BasicUse, CustomLayout, CustomValidationRule, Mutator } from "./forms";

init();

const App: React.FC = () => {
  return (
    <Wrapper>
      <BasicUse />
      <br />
      <CustomLayout />
      <br />
      <CustomValidationRule />
      <br />
      <Mutator />
    </Wrapper>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

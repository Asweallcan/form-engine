import React from "react";

import { Wrapper } from "../../types";
import { FlexBase } from "./FlexBase";

export const FlexRow: Wrapper = (props) => (
  <FlexBase {...props} direction="row" className="react-form-engine-flex-row" />
);

export const FlexColumn: Wrapper = (props) => (
  <FlexBase
    {...props}
    direction="column"
    className="react-form-engine-flex-column"
  />
);

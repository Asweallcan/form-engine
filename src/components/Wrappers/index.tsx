import React from "react";

import { Wrapper } from "../../types";
import { FlexBase } from "./FlexBase";

const FlexRow: Wrapper = (props) => (
  <FlexBase {...props} direction="row" className="react-form-engine-flex-row" />
);

const FlexColumn: Wrapper = (props) => (
  <FlexBase
    {...props}
    direction="column"
    className="react-form-engine-flex-column"
  />
);

const BuildInWrappers = {
  FlexRow,
  FlexColumn,
} as Record<string, Wrapper>;

export default BuildInWrappers;

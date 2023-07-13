import React from "react";
import { omit } from "lodash";

import { FormItem } from "./FormItem";
import BuiltInWrappers from "./Wrappers";
import { LayoutItem as LayoutItemType } from "../types";
import { Wrappers } from "../constants";

export const LayoutItem: React.FC<{
  layoutItem: LayoutItemType;
}> = (props) => {
  const { layoutItem } = props;

  if (typeof layoutItem === "string") {
    return <FormItem name={layoutItem} />;
  }

  if (Array.isArray(layoutItem)) {
    return (
      <BuiltInWrappers.FlexRow>
        {layoutItem.map((l, index) => (
          <LayoutItem key={index} layoutItem={l} />
        ))}
      </BuiltInWrappers.FlexRow>
    );
  }

  if ("children" in layoutItem) {
    const Comp =
      !layoutItem.wrapper || typeof layoutItem.wrapper === "string"
        ? BuiltInWrappers[layoutItem.wrapper || "FlexRow"] ||
          Wrappers[layoutItem.wrapper || ""]
        : layoutItem.wrapper;

    return (
      <Comp {...omit(layoutItem, "children")}>
        {layoutItem.children.map((child, index) => (
          <LayoutItem key={index} layoutItem={child} />
        ))}
      </Comp>
    );
  }

  return <FormItem {...omit(layoutItem, "children")} name={layoutItem.field} />;
};

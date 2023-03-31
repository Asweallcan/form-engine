import React, { CSSProperties, ReactNode } from "react";
import { Title, Content, Wrapper } from "./style";

export const FlexBase: React.FC<{
  style?: CSSProperties;
  title?: ReactNode;
  children: ReactNode;
  className: string;
  direction: "row" | "column";
}> = (props) => {
  return (
    <Wrapper>
      {props.title ? <Title>{props.title}</Title> : null}
      <Content style={{ ...props.style, flexDirection: props.direction }}>
        {props.children}
      </Content>
    </Wrapper>
  );
};

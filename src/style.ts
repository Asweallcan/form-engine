import styled from "styled-components";
import { Wrapper as FormItem } from "./components/FormItem/style";

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${FormItem}:not(:last-child) {
    margin-bottom: 12px;
  }
`;

export const Title = styled.div`
  margin-bottom: 12px;
`;

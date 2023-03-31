import styled from "styled-components";
import { Wrapper as FormItem } from "../../FormItem/style";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  margin-bottom: 6px;
  font-size: 1rem;
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;

  & > ${FormItem}:not(:last-child) {
    margin-right: 4px;
  }
`;

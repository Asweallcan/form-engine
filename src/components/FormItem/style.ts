import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div<{ required?: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 2px;
  width: 100%;
`;

export const TitleText = styled.div<{ required?: boolean }>`
  position: relative;

  ${({ required }) =>
    required &&
    css`
      &::after {
        display: block;
        content: "*";
        position: absolute;
        top: 0;
        right: -10px;
        color: #f00;
        font-weight: 500;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      }
    `}
`;

export const ErrorText = styled.div`
  color: #f00;
`;

import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 20px;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #eee;
  padding: 20px;
  width: 680px;
  justify-content: flex-end;

  .react-form-engine-title {
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
  }

  .ant-input-number {
    width: 100%;
  }
`;

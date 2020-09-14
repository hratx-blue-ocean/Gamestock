import styled from "styled-components";

export const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: #54f3f7;
  &:hover {
    background: skyblue;
    cursor: pointer;
  }
  color: #2d1c7b;
  padding: 0.25em 1em;
  border: 2px solid #2d1c7b;
  border-radius: 10px;
  margin-right: 50px;
  margin: auto;
`;

export const BannerWrapper = styled.div`
  display: flex;
  background: #2d1c7b;
  color: #54f3f7;
  border-radius: 10px;
  border: 3px solid #eb29fd;
  flex-wrap: wrap;
  justify-content: space-between;
  align-item: center;
  box-sizing: border-box;
`;

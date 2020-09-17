import React from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
  body {
    font-family: 'Press Start 2P', sans-serif;
    font-size: 12px;
    color: #54f3f7;
  }
  body.freeze {
    width: 100%;
    max-height: 100%;
    position: fixed;
    overflow: hidden;
  }
  span.hidden {
    display: none;
  }
`;

// to use the freeze effect on the background, you can use a function like this:

// const freeze = (modalState) => {
//   const page = document.getElementsByTagName("body")[0];
//   if (!modalState) {
//     page.classList.add("freeze");
//     toggleModalState();
//   } else {
//     page.classList.remove("freeze");
//     toggleModalState();
//   }
// };

export const Modal = styled.div`
  opacity: ${({ modalState }) => (modalState ? 1 : 0)};
  pointer-events: ${({ modalState }) => (modalState ? "auto" : "none")};
  transition: ${({ modalState }) =>
    modalState ? "opacity 0.4s ease-in-out" : "none"};
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.65);
  disply: flex;
`;

export const ModalInner = styled.div`
  width: 600px;
  opacity: 1;
  margin: auto;
  margin-top: 100px;
`;

export const Wrapper = styled.div`
  margin: 0px auto;
  margin-top: 20px;
  padding: 10px;
  background: #1e1e1e;
  color: #54f3f7;
  border-radius: 10px;
  border: 2px solid #eb29fd;
  box-sizing: border-box;
  max-width: 1200px;
`;

export const StyledButton = styled.button`
  font-family: "Press Start 2P", sans-serif;
  font-size: 10px;
  background: #54f3f7;
  &:hover {
    background: skyblue;
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
  color: #2d1c7b;
  padding: 5px 10px;
  border: 2px solid #2d1c7b;
  border-radius: 10px;
  margin-right: 50px;
  margin: auto;
`;

export const NegativeButton = styled.button`
  font-family: "Press Start 2P", sans-serif;
  font-size: 10px;
  background: #2d1c7b;
  &:hover {
    background: #5a2dad;
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
  color: #54f3f7;
  padding: 5px 10px;
  border: 2px solid #2d1c7b;
  border-radius: 10px;
  margin-right: 50px;
  margin: auto;
`;

export const StyledInput = styled.input`
  min-width: 300px;
  padding: 3px 10px;
  color: #2d1c7b;
  background-color: lightgray;
  border-color: #2d1c7b;
  border-radius: 10px;
  margin-right: 10px;
  &:focus {
    outline: none;
    border-color: #eb29fd;
  }
`;

export const StyledSelect = styled.select`
  min-width: 200px;
  padding: 3px 10px;
  color: #2d1c7b;
  border-color: #2d1c7b;
  border-radius: 10px;
  background-color: lightgray;
  &:focus {
    outline: none;
    border-color: #eb29fd;
  }
`;

export const Title = styled.h2`
  display: flex;
  justify-content: center;
  align-item: center;
`;

export const SplitFormItem = styled.span`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-item: flex-start;
`;

export const WrapGrid = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 100px 100px 100px auto 100px 100px 100px 100px 100px;
`;

export const StyledForm = styled.form``;

export const Dropdown = styled.select`
  font-family: "Press Start 2P", sans-serif;
  font-size: 10px;
  // -webkit-appearance: none;
  // appearance: none;
  color: var(--baseFg);
  border: 1px solid var(--baseFg);
  line-height: 1;
  outline: 0;
  padding: 0.65em 2.5em 0.55em 0.75em;
  border-radius: var(--radius);
  background-color: var(--baseBg);
  background-image: linear-gradient(var(--baseFg), var(--baseFg)),
    linear-gradient(-135deg, transparent 50%, var(--accentBg) 50%),
    linear-gradient(-225deg, transparent 50%, var(--accentBg) 50%),
    linear-gradient(var(--accentBg) 42%, var(--accentFg) 42%);
  background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
  background-size: 1px 100%, 20px 22px, 20px 22px, 20px 100%;
  background-position: right 20px center, right bottom, right bottom,
    right bottom;

  margin-right: 15px;
  &:hover {
    color: #54f3f7;
    cursor: pointer;
  }
  &:root {
    --radius: 2px;
    --baseFg: dimgray;
    --baseBg: white;
    --accentFg: #006fc2;
    --accentBg: #bae1ff;
  }
`;

// export const StyledRadio = styled.div`
//   input [type="radio"] {
//     display: none;
//     &:checked + label:before {
//       border-color: #eb29fd;
//       animation: ripple 0.1s linear forwards;
//     }
//     &:checked + label:after {
//       transform: scale(1);
//     }
//   }
// `;

// export const RadioButtion = ({ label, value, id, isSelected, changed }) => {
//   return (
//     <StyledRadio>
//       <input
//         type="radio"
//         id={id}
//         onChange={changed}
//         value={value}
//         checked={isSelected}
//       />
//       <label htmlFor={id}>{label}</label>
//     </StyledRadio>
//   );
// };

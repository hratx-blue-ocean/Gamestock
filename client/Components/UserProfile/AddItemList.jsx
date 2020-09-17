import React from "react";
import {
  StyledButton,
  Modal,
  ModalInner,
  Wrapper,
  Title,
  StyledForm,
  StyledInput,
} from "../Core/coreStyles.jsx";
import styled from "styled-components";

const UnorderedList = styled(Wrapper)`
  list-style: none;
  max-height: 300px;
  width: 400px;
  margin: 0;
  overflow: auto;
  padding: 0;
  text-indent: 10px;
`;
const SingleListItem = styled(Wrapper)`
  margin-top: 0;
  line-height: 25px;
  padding: 0;
`;

const AddItemList = (props) => {
  return (
    <UnorderedList>
      {props.items.map((itemObj, idx) => {
        return (
          <SingleListItem
            key={idx}
            onClick={() => {
              props.select(itemObj);
              props.getImage();
            }}
          >
            {itemObj["console-name"]} {itemObj["product-name"]}
          </SingleListItem>
        );
      })}
    </UnorderedList>
  );
};

export default AddItemList;

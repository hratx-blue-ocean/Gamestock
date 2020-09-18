import React from "react";
import { CardWrapper, Text, Thumbnail } from "../Core/CardView.jsx";
import {
  StyledInput,
  Wrapper,
  GlobalStyles,
  Title,
  WrapGrid,
  StyledButton,
  StyledForm,
} from "../Core/coreStyles.jsx";
import styled from "styled-components";

const AndrewWrapper = styled(Wrapper)`
  display: flex;
  justify-content: center;
`;

const Paginator = ({
  collection,
  cardsPerPage,
  currentCards,
  handlePageClick,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(collection.length / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <AndrewWrapper>
        <ul className="pagination">
          {pageNumbers.map((page) => {
            return (
              <StyledButton key={page}>
                <li value={page} onClick={(e) => handlePageClick(e)}>
                  {page}
                </li>
              </StyledButton>
            );
          })}
        </ul>
      </AndrewWrapper>
    </div>
  );
};

export default Paginator;

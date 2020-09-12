import styled from 'styled-components';

export const Button = styled.button`
/* Adapt the colors based on primary prop */
background: ${props => props.primary ? "#2D1C7B" : "#54F3F7"};
color: ${props => props.primary ? "#54F3F7" : "#2D1C7B"};

font-size: 1em;
margin: 1em;
padding: 0.25em 1em;
border: 2px solid #2D1C7B;
border-radius: 3px;
`;
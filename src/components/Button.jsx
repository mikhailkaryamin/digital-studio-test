import React from "react";
import styled from "styled-components";
import { string, func } from "prop-types";

import { ColorScheme } from "../shared/consts";

const ButtonEl = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: ${ColorScheme.WHITE};
  &:hover {
    opacity: 0.9;
  }
  ${(props) => props.addStyle ? props.addStyle : ""}
`;

const Button = ({ title, onClick, addStyle, type }) => {
  return <ButtonEl onClick={onClick} addStyle={addStyle} type={type}>{title}</ButtonEl>;
};

Button.propTypes = {
  title: string.isRequired,
  onClick: func.isRequired,
  addStyle: string,
  type: string
};

export default Button;

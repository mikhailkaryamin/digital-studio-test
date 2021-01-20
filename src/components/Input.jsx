import React from "react";
import styled from "styled-components";
import { bool, string, func } from "prop-types";

const InputEl = styled.input`
  width: 100%;
  padding: 10px;
`;
const Label = styled.label`
  ${(props) => (props.addStyle ? props.addStyle : "")}
`;

const Input = ({ placeholder, type, addStyle, onChange, isRequired }) => {
  return (
    <Label>
      <InputEl
        type={type}
        placeholder={placeholder}
        addStyle={addStyle}
        onChange={(evt) => onChange(evt.target.value)}
        required={isRequired ? true : false}
      />
    </Label>
  );
};

Input.propTypes = {
  placeholder: string.isRequired,
  type: string.isRequired,
  addStyle: string,
  onChange: func.isRequired,
  isRequired: bool
};

export default Input;

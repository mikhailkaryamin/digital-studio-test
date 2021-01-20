import React from "react";
import styled from "styled-components";
import { array, func } from "prop-types";

import { ColorScheme, DEFAULT_GROUP } from "../shared/consts";

import Button from "./Button";

const STYLE_FOR_BUTTON = `
  background-color: ${ColorScheme.DARK_BLUE};
  margin-bottom: 10px;
`;

const Container = styled.div`
  display: flex;
  width: 150px;
  flex-direction: column;
  padding: 0 10px;
`;

const Sidebar = ({ typesFilter, onSetCurrentGroup }) => {
  return (
    <Container>
      {typesFilter.map((type) => {
        return (
          <Button
            key={type}
            onClick={() => onSetCurrentGroup(type)}
            title={type}
            addStyle={STYLE_FOR_BUTTON}
          />
        );
      })}
      <Button
        title={DEFAULT_GROUP}
        key={DEFAULT_GROUP}
        addStyle={STYLE_FOR_BUTTON}
        onClick={() => onSetCurrentGroup(DEFAULT_GROUP)}
      />
    </Container>
  );
};

Sidebar.propTypes = {
  onSetCurrentGroup: func.isRequired,
  typesFilter: array.isRequired,
};

export default Sidebar;

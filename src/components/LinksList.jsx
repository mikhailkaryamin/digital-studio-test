import React from "react";
import styled from "styled-components";
import { array, func } from "prop-types";

import Link from "./Link";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  > * {
    margin-bottom: 10px;
  :last-child{
    margin-bottom: 0;
  }
`;

const STYLE_LINK = `
  margin-bottom: 10px;
`;

const LinksList = ({ linksListData, onRemoveLink }) => {
  return (
    <Container>
      {linksListData.map((item) => {
        return (
          <Link
            link={item.link}
            title={item.title}
            id={item.id}
            key={item.id}
            addStyle={STYLE_LINK}
            onRemoveLink={onRemoveLink}
          />
        );
      })}
    </Container>
  );
};

LinksList.propTypes = {
  linksListData: array.isRequired,
  onRemoveLink: func.isRequired,
};

export default LinksList;

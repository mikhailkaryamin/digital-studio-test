import React from "react";
import styled from "styled-components";
import { string, func } from "prop-types";

import { ColorScheme } from "../shared/consts";

import Button from "./Button";

const SettingButton = {
  title: "Удалить ссылку",
  style: `background-color: ${ColorScheme.RED}`,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 1px solid ${ColorScheme.BLUE};
  border-radius: 3px;
  &:hover {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  }
  > * {
    margin-bottom: 10px;
  :last-child{
    margin-bottom: 0;
  }
  ${(props) => props.addStyle ? props.addStyle : ""}
`;

const Title = styled.span`
  font-weight: 700;
  word-wrap: break-word;
`;

const LinkUrl = styled.a``;

const Link = ({ link, title, addStyle, id, onRemoveLink }) => {
  return (
    <Container addStyle={addStyle}>
      <Title>{title}</Title>
      <LinkUrl href={link}>{link}</LinkUrl>
      <Button title={SettingButton.title} addStyle={SettingButton.style} onClick={() => onRemoveLink(id)}/>
    </Container>
  );
};

Link.propTypes = {
  link: string.isRequired,
  title: string.isRequired,
  id: string.isRequired,
  addStyle: string,
  onRemoveLink: func.isRequired,
};

export default Link;

import React, { useState } from "react";
import styled from "styled-components";
import { array, func } from "prop-types";

import { ColorScheme } from "../shared/consts";

import Input from "./Input";
import Button from "./Button";

const Style = {
  INPUT: `margin-bottom: 10px`,
  BUTTON_ADD: `background-color: ${ColorScheme.CYAN_BLUE}`,
  BUTTON_CLOSE: `background-color: ${ColorScheme.RED}`,
};

const Title = {
  ADD_BUTTON: "Добавить",
  CLOSE_MODAL: "Закрыть",
  NAME: "Название",
  URL: "http://somelink",
};

const Form = styled.form`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 350px;
  top: 30%;
  left: calc(50% - 150px);
  z-index: 100;
  padding: 20px;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.25);
  > * {
    margin-bottom: 10px;
  :last-child{
    margin-bottom: 0;
  }
`;
const Span = styled.span`
  text-align: center;
  font-size: 16;
  text-transform: uppercase;
`;
const Select = styled.select``;
const Option = styled.option``;

const Modal = ({ typesGroup, onSetShowModal, setNewLink }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [group, setGroup] = useState(typesGroup[0]);

  const onSubmitForm = (evt) => {
    evt.preventDefault();

    setNewLink({
      title,
      link: url,
      group,
    });

    onSetShowModal(false);
  };

  const onChangeSelect = (evt) => {
    setGroup(evt.target.value);
  };

  return (
    <Form onSubmit={onSubmitForm}>
      <Span>Форма добавления ссылки</Span>
      <Input
        type="text"
        addStyle={Style.INPUT}
        placeholder={Title.NAME}
        isRequired={true}
        onChange={setTitle}
      />
      <Input
        type="url"
        addStyle={Style.INPUT}
        placeholder={Title.URL}
        onChange={setUrl}
        isRequired={true}
      />
      <Select
        onChange={onChangeSelect}
      >
        {typesGroup.map((type) => {
          return (
            <Option value={type.toLowerCase()} key={type}>
              {type}
            </Option>
          );
        })}
      </Select>
      <Button
        title={Title.ADD_BUTTON}
        onClick={() => {}}
        addStyle={Style.BUTTON_ADD}
        type="submit"
      />
      <Button
        title={Title.CLOSE_MODAL}
        addStyle={Style.BUTTON_CLOSE}
        onClick={() => onSetShowModal(false)}
      />
    </Form>
  );
};

Modal.propTypes = {
  typesGroup: array.isRequired,
  onSetShowModal: func.isRequired,
  setNewLink: func.isRequired,
};

export default Modal;

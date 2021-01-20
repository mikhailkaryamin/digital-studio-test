import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocalStorage } from "react-use";
import { nanoid } from "nanoid";

import {
  ColorScheme,
  DEFAULT_GROUP,
  KEY_STORAGE_LINKS,
} from "../shared/consts";

import Button from "./Button";
import Modal from "./Modal";
import LinksList from "./LinksList";
import Sidebar from "./Sidebar";
import Input from "./Input";

const GROUPS_MOCK = ["группа 1", "группа 2", "группа 3"];

const STYLE_FOR_BUTTON = `
  background-color: ${ColorScheme.CYAN_BLUE}
`;

const TITLE_ADD_BUTTON = "Добавить ссылку";

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 1000px;
  margin: 0 auto;
  padding-top: 50px;
  padding-right: 10px;
  padding-left: 10px;
`;

const ContainerCenter = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  padding: 0 10px;
`;

const ContainerButton = styled.div`
  width: 150px;
  padding: 0 10px;
`;

const ContainerInput = styled.div`
  margin-bottom: 30px;
`;

const getFilteredLinksByGroup = (currentGroup, links) => {
  if (currentGroup === DEFAULT_GROUP) {
    return links;
  }

  const filteredLinksByGroup = links.filter(
      (link) => currentGroup === link.group
  );

  return filteredLinksByGroup;
};

const getFilteredLinksBySearch = (searchValue, links) => {
  if (searchValue === "") {
    return links;
  }

  const isIncludeInLinks = (link) => {
    const arrayFromSearch = searchValue.split(" ");
    const linkWithoutSpace = link["title"].toLowerCase().split(" ").join("");
    const isInclude = arrayFromSearch.every((word) =>
      linkWithoutSpace.includes(word.toLowerCase())
    );

    return isInclude;
  };

  const filteredLinksBySearch = links.filter(isIncludeInLinks);

  return filteredLinksBySearch;
};

const App = () => {
  const [linksFromStorage, setLinksFromStorage] = useLocalStorage(
      KEY_STORAGE_LINKS, []
  );

  const [showModal, setShowModal] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(DEFAULT_GROUP);
  const [linksByGroup, setLinksByGroup] = useState(linksFromStorage);
  const [searchValue, setSearchValue] = useState("");
  const [linksBySearch, setLinksBySearch] = useState(linksByGroup);
  const [newLink, setNewLink] = useState(null);
  const [linkIdForRemove, setLinkIdForRemove] = useState(null);

  useEffect(() => {
    const links = getFilteredLinksByGroup(currentGroup, linksFromStorage);
    setLinksByGroup(links);
  }, [currentGroup, linksFromStorage]);

  useEffect(() => {
    const links = getFilteredLinksBySearch(searchValue, linksByGroup);
    setLinksBySearch(links);
  }, [searchValue, linksByGroup]);

  useEffect(() => {
    if (newLink) {
      const id = nanoid();

      const newLinkWithId = {
        ...newLink,
        id,
      };

      const newLinksForStorage = [...linksFromStorage, newLinkWithId];
      setLinksFromStorage(newLinksForStorage);
      setNewLink(null);
    }
  }, [newLink]);

  useEffect(() => {
    if (linkIdForRemove) {

      const newLinksForStorage = linksFromStorage.filter((link) => link.id !== linkIdForRemove);
      setLinksFromStorage(newLinksForStorage);
      setLinkIdForRemove(null);
    }
  }, [linkIdForRemove]);

  return (
    <Container>
      <Sidebar typesFilter={GROUPS_MOCK} onSetCurrentGroup={setCurrentGroup} />
      <ContainerCenter>
        <ContainerInput>
          <Input type="text" placeholder="Поиск..." onChange={setSearchValue} />
        </ContainerInput>
        <LinksList linksListData={linksBySearch} onRemoveLink={setLinkIdForRemove}/>
      </ContainerCenter>
      <ContainerButton>
        <Button
          title={TITLE_ADD_BUTTON}
          onClick={() => setShowModal(true)}
          addStyle={STYLE_FOR_BUTTON}
        />
      </ContainerButton>

      {showModal && (
        <Modal
          typesGroup={GROUPS_MOCK}
          onSetShowModal={setShowModal}
          setNewLink={setNewLink}
        />
      )}
    </Container>
  );
};

export default App;

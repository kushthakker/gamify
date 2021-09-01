import React, { useCallback, useRef, useState, useEffect } from "react";
/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useSelector, useDispatch } from "react-redux";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import api from "../api/api";
import {
  Spinner,
  Button,
  Kbd,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  InputLeftElement,
} from "@chakra-ui/react";
import { searchValue } from "../actions/index";
import { status } from "../actions/index";

import "react-circular-progressbar/dist/styles.css";
import { useHistory } from "react-router-dom";

import Prompt from "../components/Prompt";

const Result = ({
  status,
  inputValue,
  setValue,
  posTop = "2rem",
  posLeft = "",
  width = "30rem",
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = (event) => {
    console.log(`render`);
    event.preventDefault();
    const value = inputValue.current.value;
    setValue(value);
  };

  const keyDownFnc = (e) => {
    if (e.key === "k" && e.ctrlKey) {
      e.preventDefault();
      isOpen ? onClose() : onOpen();
    }
  };

  useEffect(() => {
    if (status === "success") {
      onClose();
    }
  }, [onClose, status]);

  useEffect(() => {
    document.documentElement.addEventListener("keydown", keyDownFnc);
    return () => {
      document.documentElement.removeEventListener("keydown", keyDownFnc);
    };
  }, []);

  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: posTop,
        marginLeft: posLeft,
      }}
    >
      <Button
        d="flex"
        w={width}
        borderRadius="0.5rem"
        p="1.5rem"
        alignItems="center"
        onClick={onOpen}
      >
        <div
          css={{
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
            position: "relative",
          }}
        >
          <i className="fas fa-search"></i>
        </div>
        <div css={{ position: "absolute", left: "5rem" }}>
          <p> Search Games</p>
        </div>
        <div
          css={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <span>
            <Kbd>ctrl</Kbd> + <Kbd>K</Kbd>
          </span>
        </div>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={inputValue}>
        <ModalOverlay />
        <ModalContent top="5rem">
          <form type="search" onSubmit={onSubmit}>
            <InputGroup>
              <InputLeftElement
                children={<i className="fas fa-search"></i>}
                pointerEvents="none"
                d="flex"
                h="100%"
                alignContent="center"
              />
              <Input ref={inputValue} placeholder={`Search Games`} size="lg" />
              <InputRightElement
                children={status === "loading" ? <Spinner /> : null}
                d="flex"
                h="100%"
                alignContent="center"
              />
            </InputGroup>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

const SearchBar = ({ posLeft, posTop, width }) => {
  const [value, setValue] = useState(null);
  const inputValue = useRef();

  const statusState = useSelector((state) => state.status);

  const dispatch = useDispatch();
  const history = useHistory();

  const fetchGames = useCallback(() => {
    console.log(`render1`);
    if (value === null) return;

    dispatch(status("loading"));

    const fetchApi = async function () {
      try {
        const req = await api.get("/games", {
          params: {
            search: value,
            //   ? encodeURIComponent(value)
            //   : encodeURIComponent(query),
            // search_precise: true,
            page_size: 50,
          },
        });

        if (!req.status) {
          dispatch(status("error"));
          throw new Error(req.statusText);
        } else {
          console.log(req);
          dispatch(searchValue(req.data.results));

          dispatch(status("success"));
          history.push(`/discover/${value}`);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, [dispatch, history, value]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  Prompt("Press control+K to Search from anywhere", "searchPrompt");

  return (
    <div>
      <Result
        setValue={setValue}
        status={statusState}
        inputValue={inputValue}
        posLeft={posLeft}
        posTop={posTop}
        width={width}
      />
    </div>
  );
};

export default React.memo(SearchBar);

// TODO: on submit the query will be pushed to url like discoved/cyberpunk then the api gets called from that url extract so every time we go back from any game it goes to search item rather then plane discover page

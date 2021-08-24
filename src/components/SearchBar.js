import React, { useCallback, useRef, useState, useEffect } from "react";
/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useSelector, useDispatch } from "react-redux";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import api from "../api/api";
import { Spinner } from "@chakra-ui/react";
import { searchValue } from "../actions/index";
import { status } from "../actions/index";

import "react-circular-progressbar/dist/styles.css";
import { Link, useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import Prompt from "../components/Prompt";

const Result = ({ status, inputValue, setValue }) => {
  const onSubmit = (event) => {
    console.log(`render`);
    event.preventDefault();
    const value = inputValue.current.value;
    setValue(value);
  };

  return (
    <motion.div
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "2rem",
      }}
    >
      <form type="search" onSubmit={onSubmit}>
        <InputGroup>
          <Input
            variant="outline"
            ref={inputValue}
            placeholder={`Search`}
            css={{
              width: "500px",
            }}
          />
          <InputRightElement
            children={status === "loading" ? <Spinner /> : null}
          />
        </InputGroup>
      </form>
    </motion.div>
  );
};

const SearchBar = () => {
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

  const keyDownFnc = (e) => {
    if (e.key === "k" && e.ctrlKey) {
      e.preventDefault();
      inputValue.current.scrollIntoView({ behavior: "smooth" });
      inputValue.current.focus();
    }
  };

  useEffect(() => {
    document.documentElement.addEventListener("keydown", keyDownFnc);
    return () => {
      document.documentElement.removeEventListener("keydown", keyDownFnc);
    };
  }, []);

  Prompt("Press control+K to Search from anywhere", "searchPrompt");

  return (
    <div>
      <Result
        setValue={setValue}
        status={statusState}
        inputValue={inputValue}
      />
    </div>
  );
};

export default SearchBar;

// TODO: on submit the query will be pushed to url like discoved/cyberpunk then the api gets called from that url extract so every time we go back from any game it goes to search item rather then plane discover page

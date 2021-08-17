import React, { useCallback, useRef, useState, useEffect } from "react";
import { useVirtual } from "react-virtual";
/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useSelector, useDispatch } from "react-redux";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import api from "../api/api";
import { Spinner, CloseIcon } from "@chakra-ui/react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";

const Items = (props) => (
  <div
    css={{
      display: "grid",
      gridTemplateRows: "auto 1fr",
      maxWidth: "20rem",
      backgroundColor: "rgb(20,25,35)",
      borderRadius: "1rem",
      // minHeight: "auto",
      // maxHeight: "34rem",
      overflow: "hidden",
      filter: "drop-shadow(0 0 0.75rem crimson)",
    }}
    {...props}
  ></div>
);

const H3 = styled.h3({
  marginRight: "1rem",
  fontSize: "1.2rem",
  fontWeight: "bold",
});

const MyListData = ({ searchResult }) => {
  const listRef = useRef();
  const rowVirtualizer = useVirtual({
    size: searchResult.length,
    parentRef: listRef,
    estimatedSize: React.useCallback(() => 5, []),
    overscan: 5,
  });

  const List = styled.div({
    position: "relative",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridAutoFlow: "row dense",
    gap: "3rem",
    padding: "3rem",
  });

  return (
    <div ref={listRef}>
      <List>
        {rowVirtualizer.virtualItems.map(({ index, size, start }) => {
          const item = searchResult[index];
          const Xbox = <i className="fab fa-xbox" />;
          const playstation = <i className="fab fa-playstation" />;
          const Pc = <i className="fas fa-desktop" />;
          const mac = <i className="fab fa-apple" />;

          const platformsStored = [];

          item?.platforms?.map((ele) => {
            if (ele?.platform?.name.search("Xbox") !== -1)
              platformsStored.push(Xbox);
            if (ele?.platform?.name.search("PlayStation") !== -1)
              platformsStored.push(playstation);
            if (ele?.platform?.name.search("PC") !== -1)
              platformsStored.push(Pc);
            if (ele?.platform?.name.search("macOS") !== -1)
              platformsStored.push(mac);
            return null;
          });

          const uniquePlatform = [...new Set(platformsStored)];

          const Metacritic = (
            <div css={{ width: "50px", height: "50px" }}>
              <CircularProgressbar
                value={item.metacritic}
                text={item.metacritic}
                styles={buildStyles({
                  strokeLinecap: "butt",

                  textSize: "2rem",

                  pathColor: `white`,
                  textColor: "white",
                  trailColor: "black",
                  backgroundColor: "#3e98c7",
                })}
              />
            </div>
          );

          return (
            <Link to={`/game/${item.id}`}>
              <Items key={`item-${index}`}>
                <div css={{ width: "20rem", height: "100%" }}>
                  <img
                    src={item.background_image}
                    alt={item.name}
                    css={{
                      borderRadius: "1rem 1rem 0 0",
                      width: "100%",
                      maxHeight: "15rem",
                      objectFit: "fill",
                    }}
                  />
                </div>
                <div
                  css={{
                    maxHeight: "20rem",
                    overflow: "hidden",
                    padding: "1rem",
                  }}
                >
                  <div
                    css={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "white",
                      width: "100%",
                    }}
                  >
                    <div>
                      <h1
                        css={{
                          fontWeight: "bold",
                          fontSize: "1.8rem",
                          width: "auto",
                        }}
                      >
                        {item?.name}
                      </h1>
                    </div>
                    <div css={{ marginLeft: "0.5rem" }}>
                      {item.metacritic === null ? null : Metacritic}
                    </div>
                  </div>
                  <div
                    css={{
                      display: "flex",
                      color: "white",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    {item?.released ? <H3>Release Date : </H3> : null}
                    {item.released}
                  </div>
                  <H3>
                    {item?.esrb_rating ? (
                      <div css={{ color: "white" }}>
                        {item?.esrb_rating.name}
                      </div>
                    ) : null}
                  </H3>
                  <div
                    css={{
                      display: "flex",
                      flexFlow: "row wrap",
                      alignItems: "center",
                      width: "100%",
                      color: "white",
                    }}
                  >
                    {item?.genres.length === 0 ? null : <H3>Genres :</H3>}

                    {item.genres.map((ele) => (
                      <div css={{ margin: "0 10px 0 10px" }}>{ele.name}</div>
                    ))}
                  </div>
                  <div
                    css={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      marginTop: "0.5rem",
                      color: "white",
                    }}
                  >
                    {uniquePlatform.length === 0
                      ? null
                      : uniquePlatform.map((ele) => (
                          <div css={{ margin: "0 10px 0 10px" }}>{ele}</div>
                        ))}
                  </div>
                </div>
              </Items>
            </Link>
          );
        })}
      </List>
    </div>
  );
};

const Data = React.memo(MyListData);

const Result = ({ status, inputValue, setValue }) => {
  const isLoading = status === "loading";

  const onSubmit = (event) => {
    console.log(`render`);
    event.preventDefault();
    const value = inputValue.current.value;
    setValue(value);
  };

  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form type="search" onSubmit={onSubmit}>
        <InputGroup>
          <Input
            variant="outline"
            ref={inputValue}
            placeholder={`Search |  Press control/alt + Enter to serach from anywhere`}
            errorBorderColor="red"
            css={{
              width: "500px",
            }}
          />
          <InputRightElement
            children={isLoading ? <Spinner color="white" /> : null}
          />
        </InputGroup>
      </form>
    </div>
  );
};

const Output = ({ status, searchResult }) => {
  const isSuccess = status === "success";
  const isError = status === "error";
  return (
    <div>
      {isError ? (
        <div css={{ color: "red" }}>
          Sorry, it looks like a network error. Please try again after
          sometimes.
        </div>
      ) : null}
      {isSuccess ? (
        searchResult?.length ? (
          <div css={{ marginTop: "3rem" }}>
            <Data searchResult={searchResult} />
          </div>
        ) : (
          <p>No books found. Try another search.</p>
        )
      ) : null}
    </div>
  );
};

const Search = () => {
  const [value, setValue] = useState(null);
  const [searchResult, setSearchResult] = useState(0);
  const [status, setStatus] = React.useState("idle");
  const inputValue = useRef();

  const fetchGames = useCallback(() => {
    console.log(`render1`);
    if (!value) return;
    setStatus("loading");
    const fetchApi = async function () {
      try {
        const req = await api.get("/games", {
          params: {
            search: encodeURIComponent(value),
            // search_precise: true,
            page_size: 50,
          },
        });
        console.log(req);
        if (!req.status) {
          setStatus("error");
          console.log(`hi`);
          throw new Error(req.statusText);
        } else {
          console.log(req);
          setSearchResult(req.data.results);
          setStatus("success");
          inputValue.current.value = "";
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, [value]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  const keyDownFnc = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
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

  return (
    <div
      css={{
        overflow: "auto",
        maxHeight: "100vh",
        // padding: "3rem",
      }}
    >
      <Result setValue={setValue} status={status} inputValue={inputValue} />
      <Output status={status} searchResult={searchResult} />
    </div>
  );
};

export default Search;

// TODO: on submit the query will be pushed to url like discoved/cyberpunk then the api gets called from that url extract so every time we go back from any game it goes to search item rather then plane discover page

import React, { useCallback, useRef, useState, useEffect } from "react";
import { useVirtual } from "react-virtual";
/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useSelector, useDispatch } from "react-redux";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import api from "../api/api";
import { Spinner, Kbd } from "@chakra-ui/react";

const Item = styled.div({
  display: "grid",
  gridTemplateRows: "auto auto",
  maxWidth: "20rem",
  backgroundColor: "rgb(20,25,35)",
  borderRadius: "1rem",
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
    gridTemplateRows: "auto",
    gap: "3rem",
    margin: "5rem",
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

          return (
            <Item key={`item-${index}`}>
              <div>
                <img
                  src={item.background_image}
                  alt={item.name}
                  css={{
                    borderRadius: "1rem 1rem 0 0",
                    objectFit: "fit",
                  }}
                />
              </div>
              <div
                css={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  color: "white",
                }}
              >
                <h1 css={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                  {item?.name}
                </h1>
                <h3>
                  {" "}
                  {item?.metacritic ? `Metacritic: ${item.metacritic}` : null}
                </h3>
              </div>
              <h3>
                {item?.released ? `Release Date: ${item.released}` : null}
              </h3>
              <h3>
                {item?.esrb_rating
                  ? `Ratings: ${item?.esrb_rating.name}`
                  : null}
              </h3>
              <div
                css={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <h3> Genres : </h3>
                {item?.genres?.map((ele) => (
                  <div css={{ margin: "0 10px 0 10px" }}>{ele.name}</div>
                ))}
              </div>
              <div
                css={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <h3>Platforms : </h3>
                {uniquePlatform.map((ele) => (
                  <div css={{ margin: "0 10px 0 10px" }}>{ele}</div>
                ))}
              </div>
            </Item>
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
  return (
    <div>
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
        if (req.status !== 200) throw new Error(req.statusText);
        console.log(req);
        setSearchResult(req.data.results);
        setStatus("success");
        inputValue.current.value = "";
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
      }}
    >
      <Result setValue={setValue} status={status} inputValue={inputValue} />
      <Output status={status} searchResult={searchResult} />
    </div>
  );
};

export default Search;

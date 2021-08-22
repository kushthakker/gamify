import React, { useCallback, useRef, useState, useEffect } from "react";
import { useVirtual } from "react-virtual";
/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useSelector, useDispatch } from "react-redux";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import api from "../api/api";
import { Spinner, CloseIcon, Box, Badge, Image } from "@chakra-ui/react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link, useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import Prompt from "../components/Prompt";

const transition = {
  duration: 0.4,
  ease: [0.43, 0.13, 0.23, 0.96],
};

// const Item = ({ index, item, uniquePlatform, Metacritic }) => {
//   return (
//     <Items
//       key={Math.random()}
//       whileHover={{ scale: 1.1 }}
//       transition={transition}
//     >
//       <div css={{ width: "20rem", height: "100%" }}>
//         <img
//           key={`item-${index}`}
//           src={item.background_image}
//           alt={item.name}
//           css={{
//             borderRadius: "1rem 1rem 0 0",
//             width: "100%",
//             maxHeight: "15rem",
//             objectFit: "fill",
//           }}
//         />
//       </div>
//       <div
//         css={{
//           maxHeight: "20rem",
//           overflow: "hidden",
//           padding: "1rem",
//         }}
//       >
//         <div
//           css={{
//             display: "flex",
//             alignItems: "center",
//             width: "100%",
//             color: "white",
//             justifyContent: "space-between",
//           }}
//         >
//           <div css={{ display: "flex" }}>
//             {uniquePlatform.length === 0
//               ? null
//               : uniquePlatform.map((ele) => (
//                   <div css={{ margin: "0 10px 0 10px" }} key={Math.random()}>
//                     {ele}
//                   </div>
//                 ))}
//           </div>
//           <div>
//             <div css={{ marginLeft: "0.5rem" }}>
//               {item.metacritic === null ? null : Metacritic}
//             </div>
//           </div>
//         </div>
//         <div
//           css={{
//             display: "flex",
//             // justifyContent: "space-between",
//             color: "white",
//             width: "100%",
//           }}
//         >
//           <div>
//             <h1
//               css={{
//                 fontWeight: "bold",
//                 fontSize: "1.8rem",
//                 width: "auto",
//                 marginBottom: "0.5rem",
//               }}
//             >
//               {item?.name}
//             </h1>
//           </div>
//           {/* <div css={{ marginLeft: "0.5rem" }}>
//           {item.metacritic === null ? null : Metacritic}
//         </div> */}
//         </div>
//         <div
//           css={{
//             display: "flex",
//             color: "white",
//             width: "100%",
//             alignItems: "center",
//           }}
//         >
//           {item?.released ? <H3>Release Date : </H3> : null}
//           {item.released}
//         </div>
//         {/* <H3>
//         {item?.esrb_rating ? (
//           <div css={{ color: "white" }}>
//             {item?.esrb_rating.name}
//           </div>
//         ) : null}
//       </H3> */}
//         <div
//           css={{
//             display: "flex",
//             flexFlow: "row wrap",
//             alignItems: "center",
//             width: "100%",
//             color: "white",
//           }}
//         >
//           {item?.genres.length === 0 ? null : <H3>Genres :</H3>}

//           {item.genres.map((ele) => (
//             <div key={Math.random()}>{ele.name}</div>
//           ))}
//         </div>
//       </div>
//     </Items>
//   );
// };

// const ItemsMemo = React.memo(Item);

const Items = (props) => (
  <motion.div
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
  ></motion.div>
);

const H3 = styled.h3({
  marginRight: "1rem",
  fontSize: "1.2rem",
  fontWeight: "bold",
});

const MyListData = ({ searchResult }) => {
  const listRef = useRef();
  // const [imageData, setImageData] = useState(null);
  const rowVirtualizer = useVirtual({
    size: searchResult.length,
    parentRef: listRef,
    estimatedSize: React.useCallback(() => 20, []),
    overscan: 10,
  });

  const List = (props) => {
    return (
      <motion.div
        css={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridAutoFlow: "dense row",
          gridTemplateRows: "masonry",
          masonryAutoFlow: "next",
          columnGap: "1.5rem",
          rowGap: "2.5rem",
          padding: "2rem",
        }}
        {...props}
      ></motion.div>
    );
  };

  return (
    <div ref={listRef}>
      <List exit={{ opacity: 0 }} transition={transition}>
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
            <div css={{ width: "40px", height: "40px" }}>
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
            <Link to={`/games/${item.id}`} key={Math.random()}>
              {/* <Item
                index={index}
                item={item}
                uniquePlatform={uniquePlatform}
                Metacritic={Metacritic}
              /> */}
              <Box
                w="20rem"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
              >
                <img
                  src={item.background_image}
                  alt={item.name}
                  css={{
                    width: "100%",
                    maxHeight: "15rem",
                    objectFit: "fill",
                    minHeight: "200px",
                  }}
                />

                <Box p="6">
                  <Box d="flex" alignItems="baseline">
                    {/* <Badge borderRadius="full" px="2" colorScheme="teal">
                      Release
                    </Badge> */}
                    <Box
                      color="gray.500"
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="xs"
                      textTransform="uppercase"
                      ml="2"
                    >
                      {item.released}
                    </Box>
                  </Box>

                  <Box
                    mt="1"
                    fontWeight="bold"
                    as="h"
                    lineHeight="tight"
                    // isTruncated
                    d="grid"
                    gridTemplateColumns="1fr auto"
                    justifyItems="flex-end"
                    width="100%"
                  >
                    <div
                      css={{
                        position: "relative",
                        left: "0.3rem",
                        fontSize: "1.5rem",
                        width: "auto",
                        display: "flex",
                        justifySelf: "flex-start",
                      }}
                    >
                      {item.name}
                    </div>
                    {item.metacritic === null ? null : Metacritic}
                  </Box>
                  <Box mt="1rem">
                    <Badge
                      borderRadius="full"
                      px="2"
                      colorScheme="teal"
                      mb="0.5rem"
                    >
                      Platforms
                    </Badge>
                    <Box d="flex">
                      {uniquePlatform.length === 0
                        ? null
                        : uniquePlatform.map((ele) => (
                            <div
                              css={{ margin: "0 10px 0 10px" }}
                              key={Math.random()}
                            >
                              {ele}
                            </div>
                          ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Link>
          );
        })}
      </List>
    </div>
  );
};

const Data = React.memo(MyListData);

const Result = ({ status, inputValue, setValue, match }) => {
  const isLoading = status === "loading";
  const history = useHistory();

  const onSubmit = (event) => {
    console.log(`render`);
    event.preventDefault();
    const value = inputValue.current.value;
    setValue(value);
    history.push(`/discover/${value}`);
  };

  return (
    <div
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
          <InputRightElement children={isLoading ? <Spinner /> : null} />
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

const OutputMemo = React.memo(Output);

const Search = ({ match }) => {
  const [value, setValue] = useState(null);
  const [searchResult, setSearchResult] = useState(0);
  const [query, setQuery] = useState(null);
  const [status, setStatus] = React.useState("idle");
  const inputValue = useRef();

  const fetchGames = useCallback(() => {
    console.log(`render1`);
    if (value === null) setStatus("idle");
    // else {
    setStatus("loading");
    const fetchApi = async function () {
      try {
        const req = await api.get("/games", {
          params: {
            search: value
              ? encodeURIComponent(value)
              : encodeURIComponent(query),
            // search_precise: true,
            page_size: 50,
          },
        });

        if (!req.status) {
          setStatus("error");
          throw new Error(req.statusText);
        } else {
          console.log(req);
          setSearchResult(req.data.results);
          // inputValue.current.value = "";
          setStatus("success");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
    // }
  }, [query, value]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  // useEffect(() => {
  //   setQuery(match.params.q);
  // }, [match.params.q]);

  console.log(query, value);

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

  // useState(() => {
  //   value === null && query === undefined
  //     ? setStatus("idle")
  //     : setStatus("loading");
  // });

  Prompt("Press control/alt + enter to Search", "searchPrompt");

  return (
    <div
      css={{
        overflow: "auto",
        maxHeight: "100vh",
        width: "100vw",
        // padding: "3rem",
      }}
    >
      <Result
        setValue={setValue}
        status={status}
        inputValue={inputValue}
        match={query}
      />
      <OutputMemo status={status} searchResult={searchResult} />
    </div>
  );
};

export default Search;

// TODO: on submit the query will be pushed to url like discoved/cyberpunk then the api gets called from that url extract so every time we go back from any game it goes to search item rather then plane discover page

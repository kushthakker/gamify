import React, { useCallback, useRef, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useVirtual } from "react-virtual";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useSelector, useDispatch } from "react-redux";
import { Box, Badge, Spinner } from "@chakra-ui/react";
import SearchBar from "../components/SearchBar";
import { urlQuery } from "../actions/index";
import SideBarMemoized from "../components/Sidebar";
import LoginButton from "../components/LoginButton";
import HomeIcon from "../components/HomeIcon";

const transition = {
  duration: 0.4,
  ease: [0.43, 0.13, 0.23, 0.96],
};

const MyListData = ({ searchResult }) => {
  const listRef = useRef();
  // const [imageData, setImageData] = useState(null);
  const rowVirtualizer = useVirtual({
    size: searchResult.length,
    parentRef: listRef,
    estimatedSize: React.useCallback(() => 20, []),
    overscan: 10,
  });

  const itemVariant = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const container = {
    hidden: { opacity: 0, scale: 1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        // delayChildren: 0.3,
        // staggerChildren: 0.2,
        duration: 3,
        delay: 0.5,
        ...transition,
      },
    },
  };

  const List = (props) => {
    return (
      <div
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
      ></div>
    );
  };

  return (
    <div ref={listRef}>
      <List
        exit={{ opacity: 0 }}
        transition={transition}
        variants={container}
        initial="hidden"
        animate="visible"
      >
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 5,
                  transition: { delay: 1.2, ...transition },
                }}
                transition={transition}
              >
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
              </motion.div>
            </Link>
          );
        })}
      </List>
    </div>
  );
};

const Data = React.memo(MyListData);

const Output = ({ match }) => {
  //   const isLoading = status === "loading";
  const statusState = useSelector((state) => state.status);
  const searchResult = useSelector((state) => state.searchResult);
  const isError = statusState === "error";
  const isSuccess = statusState === "success";

  const dispatch = useDispatch();

  console.log(`match`, match.params.q);

  useState(() => {
    if (statusState === "success") window.scrollTo(0, 0);
    dispatch(urlQuery(match.params.q));
  });

  return (
    <div>
      {isError ? (
        <div css={{ color: "red" }}>
          Sorry, it looks like a network error. Please try again after
          sometimes.
        </div>
      ) : null}
      {isSuccess ? (
        searchResult?.length !== 0 ? (
          <div>
            <LoginButton />
            <HomeIcon />
            <div>
              <div css={{ marginTop: "3rem" }}>
                <Data searchResult={searchResult} />
              </div>
            </div>
          </div>
        ) : (
          <p>No Games found. Try another search.</p>
        )
      ) : (
        <div
          css={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            margin: "0",
          }}
        >
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default React.memo(Output);

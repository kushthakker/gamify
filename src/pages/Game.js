import React, { useEffect, useState } from "react";
/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useInView } from "react-intersection-observer";
import { useSelector, useDispatch } from "react-redux";
import api from "../api/api";
import youtube from "../api/youtube";
import { motion, useAnimation } from "framer-motion";
import Vidmain from "../components/Vidmain";
import { ErrorBoundary } from "react-error-boundary";
import Vidlist from "../components/Vidlist";
import Marquee from "react-fast-marquee";
import FadeInWhenVisible from "../components/FadeInWhenVisible";
import SideBarMemoized from "../components/Sidebar";
import LoginButton from "../components/LoginButton";
import { addToWishlist } from "../actions/index";
import { removeFromWishlist } from "../actions/index";
import { addToCollection } from "../actions/index";
import { removeFromCollection } from "../actions/index";
import { addToMygames } from "../actions/index";
import { removeFromMygames } from "../actions/index";
import SearchBar from "../components/SearchBar";
import { useLastLocation } from "react-router-last-location";

import {
  Spinner,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Badge,
  Image,
  useToast,
  Tooltip,
  ButtonGroup,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
  Divider,
} from "@chakra-ui/react";
import { Link, useHistory, useLocation } from "react-router-dom";
import gog from "../img/gog.svg";
import epicGames from "../img/epic-games.svg";
import nintendoSwitch from "../img/nintendo-switch.svg";
import itchIo from "../img/itch-io.svg";
import "../index.css";

import ModalImage from "react-modal-image";
// import Prompt from "../components/Prompt";

function ErrorFallback({ error }) {
  const history = useHistory();
  return (
    <div
      role="alert"
      css={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        margin: "0",
      }}
    >
      <div css={{ marginBottom: "1rem" }}>
        <p css={{ textAlign: "center", fontSize: "2rem" }}>
          Something went wrong:
        </p>
        <pre>{error.message}</pre>
      </div>
      <div>
        <Button onClick={() => history.replace("/")}>Try again</Button>
      </div>
    </div>
  );
}

const transition = {
  duration: 1,
  ease: [0.43, 0.13, 0.23, 0.96],
};

const Title = styled.h1({
  textAlign: "center",
  fontSize: "4.5rem",
  fontFamily: "Staatliches",
  letterSpacing: "0.3rem",
});

const By = styled.h3({
  fontSize: "1.5rem",
  fontFamily: "Staatliches",
  letterSpacing: "0.3rem",
  marginBottom: "1rem",
});

const SubHeadings = styled.h2({
  fontSize: "2.4rem",
  fontFamily: "Staatliches",
  letterSpacing: "0.3rem",
  marginBottom: "2rem",
});

const ScoreGrid = styled.div((props) => ({
  border: `${
    props.data >= 80
      ? "2px solid green"
      : props.data < 80 && props.data >= 50
      ? "2px solid yellow"
      : "2px solid red"
  }`,
  borderRadius: "0.4rem",
  padding: "0.5rem",
  width: "3rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const findName = (id, url) => {
  switch (id) {
    case 1:
      return (
        <Button
          colorScheme="white"
          variant="outline"
          rightIcon={<i className="fab fa-steam"></i>}
          w="300"
          h="50"
          onClick={() => window.open(url)}
        >
          <span css={{ fontSize: "1.2rem" }}>Steam</span>
        </Button>
      );

    case 2:
      return (
        <Button
          colorScheme="white"
          variant="outline"
          rightIcon={<i className="fab fa-xbox"></i>}
          w="300"
          h="50"
          onClick={() => window.open(url)}
        >
          <span css={{ fontSize: "1.2rem" }}>Xbox Store</span>
        </Button>
      );
    case 3:
      return (
        <Button
          colorScheme="white"
          variant="outline"
          rightIcon={<i className="fab fa-playstation"></i>}
          w="300"
          h="50"
          onClick={() => window.open(url)}
        >
          <span css={{ fontSize: "1.2rem" }}>Playstation Store</span>
        </Button>
      );
    case 11:
      return (
        <Button
          colorScheme="white"
          variant="outline"
          rightIcon={
            <img
              src={epicGames}
              alt="Epic Games"
              css={{ width: "22px", height: "22px" }}
            />
          }
          w="300"
          h="50"
          onClick={() => window.open(url)}
        >
          <span css={{ fontSize: "1.2rem" }}>Epic Games</span>
        </Button>
      );
    case 5:
      return (
        <Button
          colorScheme="white"
          variant="outline"
          rightIcon={
            <img src={gog} alt="GOG" css={{ width: "22px", height: "22px" }} />
          }
          w="300"
          h="50"
          onClick={() => window.open(url)}
        >
          <span css={{ fontSize: "1.2rem" }}>GOG</span>
        </Button>
      );
    case 6:
      return (
        <Button
          colorScheme="white"
          variant="outline"
          rightIcon={
            <img
              src={nintendoSwitch}
              alt="Nintendo Switch"
              css={{ width: "22px", height: "22px" }}
            />
          }
          w="300"
          h="50"
          onClick={() => window.open(url)}
        >
          <span css={{ fontSize: "1.2rem" }}>Nintendo Store</span>
        </Button>
      );
    case 9:
      return (
        <Button
          colorScheme="white"
          variant="outline"
          rightIcon={
            <img
              src={itchIo}
              alt="Nintendo Switch"
              css={{ width: "22px", height: "22px" }}
            />
          }
          w="300"
          h="50"
          onClick={() => window.open(url)}
        >
          <span css={{ fontSize: "1.2rem" }}>Itch Io</span>
        </Button>
      );
    default:
      return "";
  }
};

const ShowData = ({
  data,
  img,
  storeData,
  dlcs,
  gameInSeries,
  videos,
  current,
  setCurrent,
  lastLocation,
}) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const image = React.useRef();
  const toast = useToast();
  const dispatch = useDispatch();

  const showDetail = (video) => {
    setCurrent(video);
  };

  const userId = useSelector((state) => state?.user?.userID);
  const profile = useSelector((state) => state?.profileDataApi);
  const collection = useSelector((state) => state?.profileDataApi?.collection);
  const wishlist = useSelector((state) => state?.profileDataApi?.wishlist);
  const mygames = useSelector((state) => state?.profileDataApi?.mygames);

  const mygamesUncategorized = useSelector(
    (state) => state?.profileDataApi?.mygames?.uncategorized
  );
  const mygamesCurrentPlaying = useSelector(
    (state) => state?.profileDataApi?.mygames?.currentPlaying
  );
  const mygamesFinished = useSelector(
    (state) => state?.profileDataApi?.mygames?.finished
  );
  const mygamesnotPlayedYet = useSelector(
    (state) => state?.profileDataApi?.mygames?.notPlayedYet
  );

  const [wishlistadded, setWishlistadded] = useState(
    wishlist?.includes(data.id)
  );
  const [collectionadded, setCollectionadded] = useState(
    collection?.includes(data.id)
  );

  const uncategorized = mygamesUncategorized?.includes(data.id);
  const currentPlaying = mygamesCurrentPlaying?.includes(data.id);
  const finished = mygamesFinished?.includes(data.id);
  const notPlayedYet = mygamesnotPlayedYet?.includes(data.id);
  const isLoggedIn = useSelector((state) => state?.user?.isLoggedIn);

  const [mygamesType, setMygamesType] = useState(
    uncategorized
      ? "uncategorized"
      : currentPlaying
      ? "Current Playing"
      : finished
      ? "Finished"
      : notPlayedYet
      ? "Not Played Yet"
      : null
  );
  const [mygamesadded, setMygamesadded] = useState(
    uncategorized || currentPlaying || finished || notPlayedYet
  );

  const addToMyGamesClick = (type, id) => {
    if (!isLoggedIn) {
      toast({
        title: "Please Login to add items",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      console.log(type);
      if (type === "uncategorized") {
        addToMyGamesUncategorized(id);
      } else if (type === "Current Playing") {
        addToMyGamesCurrentPlaying(id);
      } else if (type === "Finished") {
        addToMyGamesFinished(id);
      } else if (type === "Not Played Yet") {
        addToMyGamesNotPlayedYet(id);
      }
    }
  };
  const addToMyGamesUncategorized = (id) => {
    if (!isLoggedIn) {
      toast({
        title: "Please Login to add items",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      setMygamesType("uncategorized");
      if (mygamesadded === true) {
        // remove from wishlist
        setMygamesType("");
        setMygamesadded(!mygamesadded);
        dispatch(
          removeFromMygames(userId, {
            ...profile,
            mygames: {
              ...profile.mygames,
              uncategorized: [
                ...mygames.uncategorized.filter((item) => item !== id),
              ],
            },
          })
        );
      } else {
        setMygamesadded(!mygamesadded);

        dispatch(
          addToMygames(userId, {
            ...profile,
            mygames: {
              ...profile.mygames,
              uncategorized: [...mygames.uncategorized, id],
            },
          })
        );
      }
      console.log(mygamesadded);
      toast({
        title: mygamesadded
          ? `Removed from uncategorized`
          : `Added to uncategorized`,
        status: mygamesadded ? "error" : "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const addToMyGamesCurrentPlaying = (id) => {
    if (!isLoggedIn) {
      toast({
        title: "Please Login to add items",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      setMygamesType("Current Playing");
      if (mygamesadded === true) {
        setMygamesType("");
        // remove from wishlist
        setMygamesadded(!mygamesadded);
        dispatch(
          removeFromMygames(userId, {
            ...profile,
            mygames: {
              ...profile.mygames,
              currentPlaying: [
                ...mygames.currentPlaying.filter((item) => item !== id),
              ],
            },
          })
        );
      } else {
        setMygamesadded(!mygamesadded);

        dispatch(
          addToMygames(userId, {
            ...profile,
            mygames: {
              ...profile.mygames,
              currentPlaying: [...mygames.currentPlaying, id],
            },
          })
        );
      }
      console.log(mygamesadded);
      toast({
        title: mygamesadded
          ? `Removed from Current Playing`
          : `Added to Current Playing`,
        status: mygamesadded ? "error" : "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const addToMyGamesFinished = (id) => {
    if (!isLoggedIn) {
      toast({
        title: "Please Login to add items",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      setMygamesType("Finished");
      if (mygamesadded === true) {
        // remove from wishlist
        setMygamesType("");
        setMygamesadded(!mygamesadded);
        dispatch(
          removeFromMygames(userId, {
            ...profile,
            mygames: {
              ...profile.mygames,
              finished: [...mygames.finished.filter((item) => item !== id)],
            },
          })
        );
      } else {
        setMygamesadded(!mygamesadded);

        dispatch(
          addToMygames(userId, {
            ...profile,
            mygames: {
              ...profile.mygames,
              finished: [...mygames.finished, id],
            },
          })
        );
      }
      console.log(mygamesadded);
      toast({
        title: mygamesadded ? `Removed from Finished` : `Added to Finished`,
        status: mygamesadded ? "error" : "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const addToMyGamesNotPlayedYet = (id) => {
    if (!isLoggedIn) {
      toast({
        title: "Please Login to add items",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      setMygamesType("Not Played Yet");
      if (mygamesadded === true) {
        setMygamesType("");
        setMygamesadded(!mygamesadded);
        dispatch(
          removeFromMygames(userId, {
            ...profile,
            mygames: {
              ...profile.mygames,
              notPlayedYet: [
                ...mygames.notPlayedYet.filter((item) => item !== id),
              ],
            },
          })
        );
      } else {
        setMygamesadded(!mygamesadded);

        dispatch(
          addToMygames(userId, {
            ...profile,
            mygames: {
              ...profile.mygames,
              notPlayedYet: [...mygames.notPlayedYet, id],
            },
          })
        );
      }
    }
    console.log(mygamesadded);
    toast({
      title: mygamesadded
        ? `Removed from Not Played Yet`
        : `Added to Not Played Yet`,
      status: mygamesadded ? "error" : "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const addToWishlistClick = (id) => {
    if (!isLoggedIn) {
      toast({
        title: "Please Login to add items",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      if (wishlistadded === true) {
        // remove from wishlist
        setWishlistadded(!wishlistadded);
        dispatch(
          removeFromWishlist(userId, {
            ...profile,
            wishlist: [...profile.wishlist.filter((item) => item !== id)],
          })
        );
      } else {
        setWishlistadded(!wishlistadded);
        dispatch(
          addToWishlist(userId, {
            ...profile,
            wishlist: [...profile.wishlist, id],
          })
        );
      }
      console.log(wishlistadded);
      toast({
        title: wishlistadded ? "Removed from Wishlist" : "Added to Wishlist",
        status: wishlistadded ? "error" : "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const addToCollectionClick = (id) => {
    if (!isLoggedIn) {
      toast({
        title: "Please Login to add items",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      if (collectionadded === true) {
        // remove from wishlist
        setCollectionadded(!collectionadded);
        dispatch(
          removeFromCollection(userId, {
            ...profile,
            collection: [...profile.collection.filter((item) => item !== id)],
          })
        );
      } else {
        setCollectionadded(!collectionadded);
        dispatch(
          addToCollection(userId, {
            ...profile,
            collection: [...profile.collection, id],
          })
        );
      }
      toast({
        title: collectionadded
          ? "Removed from Collection"
          : "Added to Collection",
        status: collectionadded ? "error" : "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  function showImgNote() {
    const prompt = localStorage.getItem("imgInfo");
    if (prompt === "1") return;
    else {
      // console.log(prompt);
      toast({
        title: "Note",
        description: "You can close image by clicking outside of the image",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
      localStorage.setItem(`imgInfo`, "1");
    }
  }

  const location = lastLocation?.pathname ? lastLocation.pathname : "/";

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div
        css={{
          overflowY: "auto",
          maxHeight: "100vh",
          boxSizing: "border-box",
        }}
        transition={transition}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 5,
            transition: { delay: 1.2, ...transition },
          }}
          style={{
            marginTop: "2rem",
            marginLeft: "2.5rem",
            maxWidth: "5rem",
          }}
        >
          <Link to={location}>
            <Button
              css={{
                display: "flex",
                maxWidth: "10rem",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              colorScheme="teal"
              variant="solid"
            >
              <div css={{ paddingRight: ".5rem" }}>
                <i className="fas fa-arrow-left"></i>
              </div>
              <div>
                <span css={{ fontFamily: "Staatliches", fontSize: "1.4rem" }}>
                  Go Back
                </span>
              </div>
            </Button>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{
            opacity: 1,
            y: -73,
            transition: { delay: 1.2, ...transition },
          }}
          style={{
            width: "20rem",
            position: "relative",
            top: "0.1rem",
            left: "180px",
          }}
        >
          <SearchBar width="20rem" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 1.2, ...transition },
          }}
          style={{
            width: "100%",
            display: "grid",
            justifyItems: "center",
            alignItems: "center",
            position: "relative",
            top: "5rem",
          }}
        >
          <Title>{data.name}</Title>
          <By>By {data.developers[0].name}</By>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{
            opacity: 1,
            y: 180,
            transition: { delay: 1.2, ...transition },
          }}
        >
          <ButtonGroup
            css={{
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
            variant="outline"
            colorScheme="blue"
          >
            <Menu
              placement="auto"
              enabled={mygamesadded ? false : true}
              autoSelect={false}
              closeOnSelect={true}
            >
              <MenuButton
                as={Button}
                variant="solid"
                colorScheme={mygamesadded ? "red" : "green"}
                rightIcon={
                  mygamesadded ? (
                    <i className="fas fa-times"></i>
                  ) : (
                    <i className="fas fa-plus"></i>
                  )
                }
                onClick={() => addToMyGamesClick(mygamesType, data.id)}
              >
                {mygamesadded
                  ? `Remove from ${mygamesType}`
                  : `Add to my games`}
              </MenuButton>
              <MenuList>
                <MenuItem
                  command="???T"
                  onClick={() => addToMyGamesUncategorized(data.id)}
                >
                  Uncategorized
                </MenuItem>
                <MenuItem
                  command="???N"
                  onClick={() => addToMyGamesCurrentPlaying(data.id)}
                >
                  Currently Playing
                </MenuItem>
                <MenuItem
                  command="??????N"
                  onClick={() => addToMyGamesFinished(data.id)}
                >
                  Finished
                </MenuItem>
                <MenuItem
                  command="???O"
                  onClick={() => addToMyGamesNotPlayedYet(data.id)}
                >
                  Not played yet
                </MenuItem>
              </MenuList>
              {/* <IconButton
              aria-label="Add to friends"
              colorScheme="blue"
              icon={<i class="fas fa-plus"></i>}
            /> */}
            </Menu>

            <Button
              variant="solid"
              colorScheme={wishlistadded ? "red" : "green"}
              mr="-px"
              rightIcon={
                wishlistadded ? (
                  <i class="fas fa-times"></i>
                ) : (
                  <i className="fas fa-gift"></i>
                )
              }
              onClick={() => addToWishlistClick(data.id)}
            >
              {wishlistadded ? `Remove from Wishlist` : `Add to Wishlist`}
            </Button>

            <Button
              variant="solid"
              colorScheme={collectionadded ? "red" : "green"}
              mr="-px"
              rightIcon={
                collectionadded ? (
                  <i class="fas fa-times"></i>
                ) : (
                  <i className="fas fa-folder-open"></i>
                )
              }
              onClick={() => addToCollectionClick(data.id)}
            >
              {collectionadded
                ? `Remove from Collection`
                : `Save to Collection`}
            </Button>
          </ButtonGroup>
        </motion.div>
        <motion.div
          initial={{
            x: "25%",
            y: "50%",
            width: "300px",
            height: "300px",
          }}
          animate={{
            x: "0",
            y: "70%",
            width: `100%`,
            height: "450px",
            transition: { delay: 0.2, ...transition },
          }}
        >
          <img
            src={data.background_image}
            alt={data.name}
            css={{
              height: "600px",
              width: "100%",
              objectFit: "cover",
              filter: `drop-shadow(0 0 0.75rem rgba(255,255,255,0.75))`,
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 1, y: 560 }}
          css={{
            padding: "3rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: "1rem",
          }}
        >
          <div className="side-1">
            <div className="side-1-a">
              <FadeInWhenVisible>
                <SubHeadings>About</SubHeadings>
                <div css={{ fontSize: "1.2rem", padding: "0 2rem 0 0" }}>
                  {data.description_raw}
                </div>
              </FadeInWhenVisible>
            </div>
            <FadeInWhenVisible>
              <div
                className="side-1-b"
                css={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  gridAutoFlow: "dense",
                  marginTop: "2rem",
                }}
              >
                {data.metacritic ? (
                  <div>
                    <By>MetaScore</By>
                    <ScoreGrid data={data.metacritic}>
                      <p
                        css={{
                          color: `${
                            data.metacritic >= 80
                              ? "green"
                              : data.metacritic < 80 && data.metacritic >= 50
                              ? "yellow"
                              : "red"
                          }`,
                          fontWeight: "bold",
                        }}
                      >
                        {data.metacritic}
                      </p>
                    </ScoreGrid>{" "}
                  </div>
                ) : null}

                <div>
                  <By>Release Date</By>
                  <div>{data.released}</div>
                </div>
                <div>
                  <By>Genre</By>
                  <div>
                    {data.genres.map((ele) => {
                      return (
                        <div
                          css={{ fontSize: "1.1rem", opacity: "0.8" }}
                          key={Math.random()}
                        >
                          {ele.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <By>Platforms</By>
                  <div>
                    {data.parent_platforms.map((ele) => {
                      return (
                        <div
                          css={{ fontSize: "1.1rem", opacity: "0.8" }}
                          key={Math.random()}
                        >
                          {ele.platform.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
                {data?.esrb_rating?.name ? (
                  <div>
                    <By>Age Rating</By>
                    <div>{data.esrb_rating.name}</div>
                  </div>
                ) : null}

                <div>
                  <By>Publisher</By>
                  <div>
                    {data.publishers.map((ele) => {
                      return <div key={Math.random()}>{ele.name}</div>;
                    })}
                  </div>
                </div>
                {data.reddit_url ? (
                  <div>
                    <By>SubReddit</By>
                    <a target="_blank" href={data.reddit_url} rel="noreferrer">
                      {data.reddit_name}
                    </a>
                  </div>
                ) : null}
              </div>
            </FadeInWhenVisible>
            {/* <FadeInWhenVisible>
            <div className="side-1-c">
              <SubHeadings>Minimum Requirements</SubHeadings>
            </div>
          </FadeInWhenVisible> */}
          </div>
          <div className="side-2">
            <div className="side-2-a">
              <FadeInWhenVisible>
                <SubHeadings>Screenshots</SubHeadings>
                <div
                  css={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                    gridAutoFlow: "dense",
                  }}
                >
                  {img.map((ele, index) => {
                    return (
                      <div key={Math.random()}>
                        <Tooltip
                          label="Click to view in enlarge mode"
                          aria-label="A tooltip"
                        >
                          <div onClick={() => showImgNote()}>
                            <ModalImage
                              small={ele.image}
                              large={ele.image}
                              // alt={ele.id}
                              ref={image}
                              hideDownload="true"
                              css={{
                                height: "180px",
                                width: "100% ",
                              }}
                            />
                          </div>
                        </Tooltip>
                      </div>
                    );
                  })}
                </div>
              </FadeInWhenVisible>
            </div>
            <div className="side-2-b">
              <FadeInWhenVisible>
                <SubHeadings css={{ marginTop: "2rem", padding: "1rem" }}>
                  Where to buy
                </SubHeadings>
                <div
                  className="Buttons"
                  css={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gridAutoFlow: "dense",
                    gap: "1rem",
                    padding: "0 1rem",
                  }}
                >
                  {storeData.map((ele) => {
                    return (
                      <React.Fragment key={Math.random()}>
                        {findName(ele.store_id, ele.url)}
                      </React.Fragment>
                    );
                  })}
                </div>
              </FadeInWhenVisible>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 1, y: 620 }}
          css={{
            padding: "3rem",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <FadeInWhenVisible>
            <div className="accordion" css={{ width: "700px" }}>
              {data.platforms.map((ele) => {
                return ele.platform.name === "PC" &&
                  ele.requirements.minimum ? (
                  <div key={Math.random()}>
                    <SubHeadings>System Requirements</SubHeadings>
                    <Accordion defaultIndex={[0]} allowMultiple>
                      <AccordionItem key={Math.random()}>
                        <h2>
                          <AccordionButton>
                            <Box flex="1" textAlign="left">
                              <h2
                                css={{
                                  fontSize: "2rem",
                                  fontFamily: "Staatliches",
                                  letterSpacing: "0.3rem",
                                }}
                              >
                                {ele.platform.name}
                              </h2>
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <h3
                            css={{
                              fontSize: "1.2rem",
                              fontFamily: "Staatliches",
                              letterSpacing: "0.3rem",
                            }}
                          >
                            Minimum
                          </h3>
                          <span>
                            {ele.requirements?.minimum?.replace("Minimum:", "")}
                          </span>
                          <h3
                            css={{
                              fontSize: "1.2rem",
                              fontFamily: "Staatliches",
                              letterSpacing: "0.3rem",
                              marginTop: "2rem",
                            }}
                          >
                            Recommended
                          </h3>
                          <span>
                            {ele.requirements?.recommended?.replace(
                              "Recommended:",
                              ""
                            )}
                          </span>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </div>
                ) : null;
              })}
            </div>
          </FadeInWhenVisible>
        </motion.div>
        <motion.div
          initial={{ opacity: 1, y: 650 }}
          css={{ display: "flex", justifyContent: "center" }}
        >
          <FadeInWhenVisible>
            <SubHeadings
              css={{ display: "grid", justifyItems: "center", width: "100%" }}
            >
              Videos
            </SubHeadings>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              d="flex"
              justfy="center"
              align="center"
              maxH="1100px"
              maxW="1300px"
              p="2rem"
            >
              <Vidmain videos={videos} current={current} />
              <Divider orientation="vertical" />
              <Vidlist
                videos={videos}
                current={current}
                onVideoSelect={showDetail}
              />
            </Box>
          </FadeInWhenVisible>
        </motion.div>
        <motion.div initial={{ opacity: 1, y: 700 }}>
          <FadeInWhenVisible>
            {gameInSeries.length !== 0 ? (
              <SubHeadings
                css={{
                  display: "grid",
                  justifyItems: "center",
                  width: "100%",
                }}
              >
                Other games in Series
              </SubHeadings>
            ) : null}

            <div
              css={{
                display: "grid",
                gridAutoFlow: "column",
                gap: "1rem",
                overflowX: "auto",
                minWidth: "100%",
                justifyItems: "center",
              }}
              // ref={useHorizontalScroll()}
            >
              {gameInSeries.map((ele, i) => {
                const rowLen = ele.length;
                return (
                  <Link to={`/games/${ele.id}`}>
                    <div
                      key={Math.random()}
                      css={{ marginRight: `${rowLen === i ? "3rem" : "0"}` }}
                    >
                      <Box
                        w="27rem"
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                      >
                        <Image
                          src={ele.background_image}
                          alt={ele.name}
                          h="241px"
                          w="100%"
                        />

                        <Box p="6">
                          <Box d="flex" alignItems="baseline">
                            <Badge
                              borderRadius="full"
                              px="2"
                              colorScheme="teal"
                            >
                              series
                            </Badge>
                            <Box
                              color="gray.500"
                              fontWeight="semibold"
                              letterSpacing="wide"
                              fontSize="xs"
                              textTransform="uppercase"
                              ml="2"
                            >
                              {ele.released}
                            </Box>
                          </Box>

                          <Box
                            mt="1"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            isTruncated
                          >
                            {ele.name}
                          </Box>
                        </Box>
                      </Box>
                    </div>
                  </Link>
                );
              })}
            </div>
          </FadeInWhenVisible>
        </motion.div>
        <motion.div initial={{ opacity: 1, y: 750 }}>
          <FadeInWhenVisible>
            {dlcs.length !== 0 ? (
              <SubHeadings
                css={{
                  display: "grid",
                  justifyItems: "center",
                  width: "100%",
                }}
              >
                DLC's And Special edition
              </SubHeadings>
            ) : null}

            {/* <div
              css={{
                display: "grid",
                gridAutoFlow: "column",
                gap: "1rem",
                overflowX: "auto",
                minWidth: "100%",
                justifyItems: "center",
              }}
              ref={useHorizontalScroll()}
            > */}
            <Marquee speed="80" gradient="false" gradientWidth="0">
              {dlcs.map((ele, i) => {
                return (
                  <Link to={`/games/${ele.id}`}>
                    <div key={Math.random()} css={{ marginRight: "3rem" }}>
                      <Box
                        w="27rem"
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                      >
                        <Image
                          src={ele.background_image}
                          alt={ele.name}
                          maxH="241px"
                          w="100%"
                        />

                        <Box p="6">
                          <Box d="flex" alignItems="baseline">
                            <Badge
                              borderRadius="full"
                              px="2"
                              colorScheme="teal"
                            >
                              DLC
                            </Badge>
                            <Box
                              color="gray.500"
                              fontWeight="semibold"
                              letterSpacing="wide"
                              fontSize="xs"
                              textTransform="uppercase"
                              ml="2"
                            >
                              {ele.released}
                            </Box>
                          </Box>

                          <Box
                            mt="1"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            isTruncated
                          >
                            {ele.name}
                          </Box>
                        </Box>
                      </Box>
                    </div>
                  </Link>
                );
              })}
            </Marquee>
            {/* </div> */}
          </FadeInWhenVisible>
        </motion.div>
      </div>
    </ErrorBoundary>
  );
};

const DataMemoized = React.memo(ShowData);

const Game = ({ match }) => {
  const [data, setData] = useState(null);
  const [img, setImg] = useState(null);
  const [storeData, setStoreData] = useState(null);
  const [dlcs, setDlcs] = useState(null);
  const [gameInSeries, setGameInSeries] = useState(null);
  const [videos, setVideos] = React.useState([]);
  const [current, setCurrent] = React.useState(null);
  const lastLocation = useLastLocation();
  const location = useLocation();
  const history = useHistory();

  console.log(lastLocation);

  const Fetch = function (id) {
    try {
      const req = api
        .get(`/stores/${id}`, {
          params: {
            id: id,
            // search_precise: true,
          },
        })
        .then((data) => console.log(data));
      console.log(req);
      // setStoreName(req.name);
      // return req.name;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetch = async function () {
      try {
        const gameId = parseInt(match.params.id);
        const req = await api.get(`/games/${gameId}`, {
          params: {
            id: gameId,
            // search_precise: true,
          },
        });
        const clipsReq = await api.get(`/games/${gameId}/screenshots`, {
          params: {
            id: gameId,
            // search_precise: true,
          },
        });

        const stores = await api.get(`/games/${gameId}/stores`, {
          params: {
            id: gameId,
            // search_precise: true,
          },
        });
        const dlcs = await api.get(`/games/${gameId}/additions`, {
          params: {
            id: gameId,
            // search_precise: true,
          },
        });
        const gameInSeries = await api.get(`/games/${gameId}/game-series`, {
          params: {
            id: gameId,
          },
        });
        const yt = await youtube.get(`/search`, {
          params: {
            q: req.data.name,
          },
        });

        const dataYt = yt.data.items;

        if (!req.status) {
          throw new Error(req.statusText);
        } else {
          setVideos(dataYt);
          setCurrent(dataYt[0]);
          setGameInSeries(gameInSeries.data.results);
          setDlcs(dlcs.data.results);
          setData(req.data);
          setImg(clipsReq.data.results);
          setStoreData(stores.data.results);
        }
      } catch (err) {
        return (
          <div
            role="alert"
            css={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              margin: "0",
            }}
          >
            <div css={{ marginBottom: "1rem" }}>
              <p css={{ textAlign: "center", fontSize: "2rem" }}>
                Something went wrong:
              </p>
              <pre>{err.message}</pre>
            </div>
            <div>
              <Button onClick={() => history.replace("/")}>Try again</Button>
            </div>
          </div>
        );
      }
    };
    fetch();
  }, [history, match.params.id]);

  // console.log(img);

  return data && img && storeData && Fetch && dlcs && gameInSeries && videos ? (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div key={location.key} css={{ maxHeight: "100vh" }}>
        {/* <SideBarMemoized /> */}

        <LoginButton />
        <DataMemoized
          data={data}
          img={img}
          storeData={storeData}
          Fetch={Fetch}
          dlcs={dlcs}
          gameInSeries={gameInSeries}
          videos={videos}
          current={current}
          setCurrent={setCurrent}
          lastLocation={lastLocation}
        />
      </div>
    </ErrorBoundary>
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
  );
};

export default Game;

// TODO: try adding video to the game page
// TODO: add wishlist and currently playing or played button (need to implemnet login functionality for this)

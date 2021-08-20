import React, { useEffect, useState } from "react";
/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useInView } from "react-intersection-observer";
import { useSelector, useDispatch } from "react-redux";
import api from "../api/api";
import { motion, useAnimation } from "framer-motion";
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
  IconButton,
} from "@chakra-ui/react";
import { Link, useHistory, useLocation } from "react-router-dom";
import gog from "../img/gog.svg";
import epicGames from "../img/epic-games.svg";
import nintendoSwitch from "../img/nintendo-switch.svg";
import itchIo from "../img/itch-io.svg";
import "../index.css";

import ModalImage from "react-modal-image";
// import Prompt from "../components/Prompt";
import { InView } from "react-intersection-observer";

const transition = {
  duration: 1.2,
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

function FadeInWhenVisible({ children }) {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.4 }}
      variants={{
        visible: {
          opacity: 1,
          y: 0,
          transition: { delay: 0.3, ...transition },
        },
        hidden: { opacity: 0, y: 20 },
      }}
    >
      {children}
    </motion.div>
  );
}

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
          key={Math.random()}
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
          key={Math.random()}
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
          key={Math.random()}
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
              key={Math.random()}
            />
          }
          w="300"
          h="50"
          onClick={() => window.open(url)}
          key={Math.random()}
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
          key={Math.random()}
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
          key={Math.random()}
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
          key={Math.random()}
        >
          <span css={{ fontSize: "1.2rem" }}>Itch Io</span>
        </Button>
      );
    default:
      return "";
  }
};

const ShowData = ({ data, img, storeData, Fetch, dlcs }) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const image = React.useRef();
  const toast = useToast();
  const history = useHistory();

  // const modal = (ele, img) => {
  //   console.log(img);
  //   return (
  //     <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="scale">
  //       <ModalOverlay />
  //       <ModalContent maxW="1024px" maxH="1080px">
  //         {/* <ModalHeader>ScreenShot</ModalHeader> */}
  //         {/* <ModalCloseButton /> */}
  //         <ModalBody>
  //           <img
  //             src={ele.image}
  //             alt={ele.id}
  //             css={{ borderRadius: "0.3rem" }}
  //           />
  //         </ModalBody>

  //         <ModalFooter>
  //           <Button colorScheme="red" mr={3} onClick={onClose}>
  //             Close
  //           </Button>
  //         </ModalFooter>
  //       </ModalContent>
  //     </Modal>
  //   );
  // };

  function useHorizontalScroll() {
    const elRef = React.useRef();
    useEffect(() => {
      const el = elRef.current;
      if (el) {
        const onWheel = (e) => {
          if (e.deltaY === 0) return;
          e.preventDefault();
          el.scrollTo({
            left: el.scrollLeft + e.deltaY,
          });
        };
        el.addEventListener("wheel", onWheel);
        return () => el.removeEventListener("wheel", onWheel);
      }
    }, []);
    return elRef;
  }

  function showImgNote() {
    const prompt = localStorage.getItem("imgInfo");
    if (prompt === "1") return;
    else {
      console.log(prompt);
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

  return (
    <div
      css={{
        overflowY: "scroll",
        maxHeight: "100vh",
        boxSizing: "border-box",
      }}
      transition={transition}
    >
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
          <ButtonGroup isAttached>
            <Button variant="outline" colorScheme="blue" mr="-px">
              Add to Uncategorized
            </Button>
            <IconButton
              aria-label="Add to friends"
              colorScheme="blue"
              icon={<i class="fas fa-plus"></i>}
            />
          </ButtonGroup>
          <ButtonGroup isAttached>
            <Button variant="outline" colorScheme="blue" mr="-px">
              Add to Wishlist
            </Button>
            <IconButton
              aria-label="Add to Wishlist"
              colorScheme="blue"
              icon={<i class="fas fa-gift"></i>}
            />
          </ButtonGroup>
          <ButtonGroup isAttached>
            <Button variant="outline" colorScheme="blue" mr="-px">
              Save to Collection
            </Button>
            <IconButton
              aria-label="Save to Collection"
              colorScheme="blue"
              icon={<i class="fas fa-folder-open"></i>}
            />
          </ButtonGroup>
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
              <div css={{ fontSize: "1.2rem" }}>{data.description_raw}</div>
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
                            css={{ height: "180px", width: "100% " }}
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
                  return findName(ele.store_id, ele.url);
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
              return ele.platform.name === "PC" && ele.requirements.minimum ? (
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
      <motion.div initial={{ opacity: 1, y: 660 }}>
        <FadeInWhenVisible>
          {dlcs.length !== 0 ? (
            <SubHeadings
              css={{ display: "grid", justifyItems: "center", width: "100%" }}
            >
              DLC's And GOTY edition
            </SubHeadings>
          ) : null}

          <div
            css={{
              display: "grid",
              gridAutoFlow: "column",
              gap: "1rem",
              overflowX: "scroll",
              minWidth: "100%",
              justifyItems: "center",
            }}
            ref={useHorizontalScroll()}
          >
            {dlcs.map((ele, i) => {
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
                      <Image src={ele.background_image} alt={ele.name} />

                      <Box p="6">
                        <Box d="flex" alignItems="baseline">
                          <Badge borderRadius="full" px="2" colorScheme="teal">
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
          </div>
        </FadeInWhenVisible>
      </motion.div>
    </div>
  );
};

const DataMemoized = React.memo(ShowData);

const Game = ({ match }) => {
  const [data, setData] = useState(null);
  const [img, setImg] = useState(null);
  const [storeData, setStoreData] = useState(null);
  const [dlcs, setDlcs] = useState(null);

  const location = useLocation();

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
        if (!req.status) {
          throw new Error(req.statusText);
        } else {
          console.log(req);
          console.log(stores);
          console.log(dlcs);
          setDlcs(dlcs.data.results);
          setData(req.data);
          setImg(clipsReq.data.results);
          setStoreData(stores.data.results);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, [match.params.id]);

  // console.log(img);

  return data && img && storeData && Fetch && dlcs ? (
    <div key={location.key} css={{ maxHeight: "100vh" }}>
      <DataMemoized
        data={data}
        img={img}
        storeData={storeData}
        Fetch={Fetch}
        dlcs={dlcs}
      />
    </div>
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

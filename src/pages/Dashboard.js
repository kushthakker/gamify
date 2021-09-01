import React from "react";
/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useSelector, useDispatch } from "react-redux";
import SideBarMemoized from "../components/Sidebar";
import LoginButton from "../components/LoginButton";
import {
  Spinner,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Badge,
  Image,
  Input,
  InputRightElement,
  InputGroup,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
} from "@chakra-ui/react";
import { useHistory, Link } from "react-router-dom";
import api from "../api/api";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";
import { isLoggedIn } from "../actions/index";
import { userId } from "../actions/index";
import { email } from "../actions/index";
import { deleteUser } from "../actions/index";
import { editUser } from "../actions/index";

const Title = styled.h1({
  textAlign: "center",
  fontSize: "2rem",
  fontFamily: "Staatliches",
  letterSpacing: "0.3rem",
  display: "flex",
  justifyContent: "flex-start",
  marginBottom: "3rem",
  marginTop: "2rem",
  marginLeft: "2rem",
});

const ParentCenterDiv = styled.div({
  display: "grid",
  justifyContent: "center",
  justifyItems: "center",
  padding: "0.5rem",
});

const CenterEle = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  justifyContent: "center",
  justifyItems: "center",
  gridAutoFlow: "dense row",
  gridTemplateRows: "masonry",
  masonryAutoFlow: "next",
  rowGap: "3rem",
});

const m = new Magic("pk_live_8BB9335EFCCF939E", {
  extensions: [new OAuthExtension()],
}); // ✨
const Mygames = ({
  uncategorizedGames,
  notPlayedGames,
  finishedGames,
  currentlyPlayingGames,
}) => {
  return (
    <>
      <ParentCenterDiv>
        {uncategorizedGames.length > 0 ? <Title>Uncategorized</Title> : null}

        <CenterEle css={{ gap: "1rem" }}>
          {uncategorizedGames.map((game) => (
            <div>
              <Link to={`/games/${game.id}`}>
                <div key={Math.random()}>
                  <Box
                    w="27rem"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                  >
                    <Image
                      src={game.background_image}
                      alt={game.name}
                      h="241px"
                      w="100%"
                    />

                    <Box p="6">
                      <Box d="flex" alignItems="baseline">
                        {/* <Badge borderRadius="full" px="2" colorScheme="teal">
                        series
                      </Badge> */}
                        <Box
                          color="gray.500"
                          fontWeight="semibold"
                          letterSpacing="wide"
                          fontSize="xs"
                          textTransform="uppercase"
                          ml="2"
                        >
                          {game.released}
                        </Box>
                      </Box>

                      <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                        isTruncated
                      >
                        {game.name}
                      </Box>
                    </Box>
                  </Box>
                </div>
              </Link>
            </div>
          ))}
        </CenterEle>
      </ParentCenterDiv>
      <ParentCenterDiv>
        {currentlyPlayingGames.length > 0 ? (
          <Title>Current Playing</Title>
        ) : null}
        <CenterEle css={{ gap: "1rem" }}>
          {currentlyPlayingGames.map((game) => (
            <React.Fragment key={Math.random()}>
              <Link to={`/games/${game.id}`}>
                <div key={Math.random()}>
                  <Box
                    w="27rem"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                  >
                    <Image
                      src={game.background_image}
                      alt={game.name}
                      h="241px"
                      w="100%"
                    />

                    <Box p="6">
                      <Box d="flex" alignItems="baseline">
                        {/* <Badge borderRadius="full" px="2" colorScheme="teal">
                        series
                      </Badge> */}
                        <Box
                          color="gray.500"
                          fontWeight="semibold"
                          letterSpacing="wide"
                          fontSize="xs"
                          textTransform="uppercase"
                          ml="2"
                        >
                          {game.released}
                        </Box>
                      </Box>

                      <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                        isTruncated
                      >
                        {game.name}
                      </Box>
                    </Box>
                  </Box>
                </div>
              </Link>
            </React.Fragment>
          ))}
        </CenterEle>
      </ParentCenterDiv>
      <ParentCenterDiv>
        {finishedGames.length > 0 ? <Title>Finished</Title> : null}
        <CenterEle css={{ gap: "1rem" }}>
          {finishedGames.map((game) => (
            <React.Fragment key={Math.random()}>
              <Link to={`/games/${game.id}`}>
                <div key={Math.random()}>
                  <Box
                    w="23rem"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                  >
                    <Image
                      src={game.background_image}
                      alt={game.name}
                      h="241px"
                      w="100%"
                    />

                    <Box p="6">
                      <Box d="flex" alignItems="baseline">
                        {/* <Badge borderRadius="full" px="2" colorScheme="teal">
                        series
                      </Badge> */}
                        <Box
                          color="gray.500"
                          fontWeight="semibold"
                          letterSpacing="wide"
                          fontSize="xs"
                          textTransform="uppercase"
                          ml="2"
                        >
                          {game.released}
                        </Box>
                      </Box>

                      <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                        isTruncated
                      >
                        {game.name}
                      </Box>
                    </Box>
                  </Box>
                </div>
              </Link>
            </React.Fragment>
          ))}
        </CenterEle>
      </ParentCenterDiv>
      <ParentCenterDiv>
        {notPlayedGames.length > 0 ? <Title>Not played yet</Title> : null}
        <CenterEle>
          {notPlayedGames.map((game) => (
            <React.Fragment key={Math.random()}>
              <div
                css={{
                  display: "grid",
                  gridAutoFlow: "column dense",
                  gap: "2rem",
                }}
              >
                <Link to={`/games/${game.id}`}>
                  <div key={Math.random()} css={{ marginRight: "3rem" }}>
                    <Box
                      w="27rem"
                      borderWidth="1px"
                      borderRadius="lg"
                      overflow="hidden"
                    >
                      <Image
                        src={game.background_image}
                        alt={game.name}
                        h="241px"
                        w="100%"
                      />

                      <Box p="6">
                        <Box d="flex" alignItems="baseline">
                          {/* <Badge borderRadius="full" px="2" colorScheme="teal">
                        series
                      </Badge> */}
                          <Box
                            color="gray.500"
                            fontWeight="semibold"
                            letterSpacing="wide"
                            fontSize="xs"
                            textTransform="uppercase"
                            ml="2"
                          >
                            {game.released}
                          </Box>
                        </Box>

                        <Box
                          mt="1"
                          fontWeight="semibold"
                          as="h4"
                          lineHeight="tight"
                          isTruncated
                        >
                          {game.name}
                        </Box>
                      </Box>
                    </Box>
                  </div>
                </Link>
              </div>
            </React.Fragment>
          ))}
        </CenterEle>
      </ParentCenterDiv>
    </>
  );
};

const MyWishlist = ({ wishlist }) => {
  return (
    <ParentCenterDiv>
      {console.log(`wishlist`)}
      <Title>Wishlist</Title>
      <CenterEle>
        {wishlist.map((game) => (
          <div key={Math.random()}>
            <Link to={`/games/${game.id}`}>
              <div css={{ marginRight: "3rem" }}>
                <Box
                  w="27rem"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                >
                  <Image
                    src={game.background_image}
                    alt={game.name}
                    h="241px"
                    w="100%"
                  />

                  <Box p="6">
                    <Box d="flex" alignItems="baseline">
                      {/* <Badge borderRadius="full" px="2" colorScheme="teal">
                        series
                      </Badge> */}
                      <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                      >
                        {game.released}
                      </Box>
                    </Box>

                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                      isTruncated
                    >
                      {game.name}
                    </Box>
                  </Box>
                </Box>
              </div>
            </Link>
          </div>
        ))}
      </CenterEle>
    </ParentCenterDiv>
  );
};

const MyCollection = ({ collection }) => {
  return (
    <ParentCenterDiv>
      <Title>Collection</Title>
      <CenterEle>
        {collection.map((game) => (
          <React.Fragment key={Math.random()}>
            <div>
              <Link to={`/games/${game.id}`}>
                <div key={Math.random()} css={{ marginRight: "3rem" }}>
                  <Box
                    w="27rem"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                  >
                    <Image
                      src={game.background_image}
                      alt={game.name}
                      h="241px"
                      w="100%"
                    />

                    <Box p="6">
                      <Box d="flex" alignItems="baseline">
                        {/* <Badge borderRadius="full" px="2" colorScheme="teal">
                        series
                      </Badge> */}
                        <Box
                          color="gray.500"
                          fontWeight="semibold"
                          letterSpacing="wide"
                          fontSize="xs"
                          textTransform="uppercase"
                          ml="2"
                        >
                          {game.released}
                        </Box>
                      </Box>

                      <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                        isTruncated
                      >
                        {game.name}
                      </Box>
                    </Box>
                  </Box>
                </div>
              </Link>
            </div>
          </React.Fragment>
        ))}
      </CenterEle>
    </ParentCenterDiv>
  );
};

const MySettings = ({ profile, id }) => {
  const [edit, setEdit] = React.useState(false);
  const handleClick = () => setEdit(!edit);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const [currentName, setCurrentName] = React.useState(profile.name);
  const userIdProfile = useSelector((state) => state.profileDataApi.id);
  const profileData = useSelector((state) => state.profileDataApi);
  const toast = useToast();

  const logout = async function (dispatch) {
    try {
      await m.user.logout();
      dispatch(isLoggedIn(false));
      dispatch(userId(null));
      dispatch(email(null));
    } catch (err) {
      console.log(err);
    }
  };
  const deleteAccount = async function (dispatch) {
    try {
      await m.user.logout();
      dispatch(isLoggedIn(false));
      dispatch(userId(null));
      dispatch(email(null));
      dispatch(deleteUser(id));
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(userIdProfile);
    console.log(currentName);
    setEdit(false);
    dispatch(
      editUser(userIdProfile, {
        ...profileData,
        data: { ...profileData.data, name: currentName },
      })
    );
    toast({
      title: "Changes Saved",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const onChange = (e) => {
    e.preventDefault();
    setCurrentName(e.target.value);
  };

  return (
    <div>
      <Title css={{ marginTop: "-1rem" }}>Settings</Title>
      <div css={{ display: "flex", width: "auto" }}>
        <h3
          css={{
            fontSize: "1.5rem",
            width: "15rem",
            textAlign: "center",
            marginBottom: "2rem",
            position: "relative",
            top: "0.5rem",
          }}
        >
          Change the name :
        </h3>
        <form onSubmit={onSubmit}>
          <InputGroup w="20rem">
            {edit ? (
              <Input
                size="md"
                as="input"
                w="20rem"
                h="3rem"
                pos="relative"
                defaultValue={currentName}
                fontSize="1.5rem"
                type="text"
                onChange={onChange}
                // ref={input}
              />
            ) : (
              <Input
                size="md"
                w="20rem"
                h="3rem"
                pos="relative"
                value={currentName}
                fontSize="1.5rem"
                isReadOnly
              />
            )}
            <InputRightElement width="4.5rem">
              <div onClick={handleClick}>
                {edit ? (
                  <div
                    css={{
                      display: "grid",
                      width: "5rem",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "0.5rem",
                      position: "relative",
                      top: "0.2rem",
                      right: "1.5rem",
                    }}
                  >
                    <Button
                      h="2rem"
                      w="1.5rem"
                      p="0.5rem"
                      type="submit"
                      onClick={onSubmit}
                    >
                      <CheckIcon />
                    </Button>
                    <Button
                      h="2rem"
                      w="1.5rem"
                      p="0.5rem"
                      onClick={() => setEdit(false)}
                    >
                      <CloseIcon />
                    </Button>
                  </div>
                ) : (
                  <Button
                    h="2rem"
                    w="1.5rem"
                    p="0.5rem"
                    position="relative"
                    top="0.2rem"
                  >
                    Edit
                  </Button>
                )}
              </div>
            </InputRightElement>
          </InputGroup>
        </form>
      </div>
      <div
        css={{
          display: "flex",
          width: "100vw",
          marginTop: "2rem",
        }}
      >
        <div
          css={{
            margin: "0 6rem 0 3rem",
            d: "flex",
            justify: "flex-start",
            position: "relative",
            right: "1rem",
          }}
        >
          <Button backgroundColor="red" onClick={() => setIsOpen(true)}>
            Delete Customer
          </Button>

          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Delete Customer
                </AlertDialogHeader>

                <AlertDialogBody>
                  All your saved games will be deleted from your account. Are
                  you sure? You can't undo this action afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    backgroundColor="red"
                    onClick={() => deleteAccount(dispatch)}
                    ml={3}
                  >
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </div>
        <Button
          colorScheme="red"
          variant="solid"
          d="flex"
          justify="flex-end"
          onClick={() => logout(dispatch)}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

const Main = ({
  uncategorizedGames,
  notPlayedGames,
  finishedGames,
  currentlyPlayingGames,
  wishlist,
  collection,
  profile,
  id,
}) => {
  return (
    <div
      css={{
        maxWidth: "100vw",
        maxHeight: "100vh",
        display: "grid",
        gridTemplateRows: "350px 1fr",
      }}
    >
      <div
        css={{
          backgroundColor: "#9999ff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          css={{
            fontSize: "3rem",
            fontWeight: "bold",
            fontFamily: "Pacifico",
            letterSpacing: "0.5rem",
            color: "black",
          }}
        >
          Dashboard
        </h1>
      </div>
      <div>
        <Tabs isFitted variant="enclosed" colorScheme="facebook">
          <div css={{ padding: "3rem", justifyContent: "center" }}>
            <TabList>
              <Tab>My games</Tab>
              <Tab>Wishlist</Tab>
              <Tab>Collection</Tab>
              <Tab>Settings</Tab>
            </TabList>
          </div>
          <TabPanels>
            <TabPanel>
              <Mygames
                uncategorizedGames={uncategorizedGames}
                currentlyPlayingGames={currentlyPlayingGames}
                finishedGames={finishedGames}
                notPlayedGames={notPlayedGames}
              />
            </TabPanel>
            <TabPanel>
              <MyWishlist wishlist={wishlist} />
            </TabPanel>
            <TabPanel>
              <MyCollection collection={collection} />
            </TabPanel>
            <TabPanel>
              <MySettings profile={profile} id={id} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};
const Heading = styled.h1({
  fontSize: "3rem",
  fontFamily: "Staatliches",
});

const Dashboard = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const history = useHistory();

  const [uncategorizedGames, setUncategorizedGames] = React.useState([]);
  const [currentlyPlayingGames, setCurrentlyPlayingGames] = React.useState([]);
  const [finishedGames, setFinishedGames] = React.useState([]);
  const [notPlayedGames, setNotPlayedGames] = React.useState([]);
  const [saveWishlist, setSaveWishlist] = React.useState([]);
  const [saveCollection, setSaveCollection] = React.useState([]);

  const collectionState = useSelector(
    (state) => state?.profileDataApi?.collection
  );

  const profileDataApi = useSelector((state) => state?.profileDataApi?.data);
  const wishlistState = useSelector((state) => state?.profileDataApi?.wishlist);
  const id = useSelector((state) => state?.profileDataApi?.id);

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

  const Output = () => {
    return (
      <div>
        <Main
          uncategorizedGames={uncategorizedGames}
          currentlyPlayingGames={currentlyPlayingGames}
          finishedGames={finishedGames}
          notPlayedGames={notPlayedGames}
          collection={saveCollection}
          wishlist={saveWishlist}
          profile={profileDataApi}
          id={id}
        />
      </div>
    );
  };

  React.useLayoutEffect(() => {
    const fetch = async function () {
      let uncategorized = [];
      let currentPlaying = [];
      let notPlayedYet = [];
      let finished = [];
      let collection = [];
      let wishlist = [];
      if (id) {
        try {
          await mygamesUncategorized.map(async (ele) => {
            let req = await api.get(`/games/${ele}`, {
              params: {
                id: ele,
                // search_precise: true,
              },
            });
            uncategorized.push(req.data);
            setUncategorizedGames(uncategorized);
          });
          await mygamesCurrentPlaying.map(async (ele) => {
            let req = await api.get(`/games/${ele}`, {
              params: {
                id: ele,
                // search_precise: true,
              },
            });
            currentPlaying.push(req.data);
            if (currentPlaying.length === mygamesCurrentPlaying.length)
              setCurrentlyPlayingGames(currentPlaying);
          });
          await mygamesFinished.map(async (ele) => {
            let req = await api.get(`/games/${ele}`, {
              params: {
                id: ele,
                // search_precise: true,
              },
            });
            finished.push(req.data);

            if (finished.length === mygamesFinished.length)
              setFinishedGames(finished);
          });

          await mygamesnotPlayedYet.map(async (ele) => {
            let req = await api.get(`/games/${ele}`, {
              params: {
                id: ele,
                // search_precise: true,
              },
            });
            notPlayedYet.push(req.data);
            if (notPlayedYet.length === mygamesnotPlayedYet.length)
              setNotPlayedGames(notPlayedYet);
          });
          await collectionState.map(async (ele) => {
            let req = await api.get(`/games/${ele}`, {
              params: {
                id: ele,
                // search_precise: true,
              },
            });
            collection.push(req.data);
            if (collection.length === collectionState.length)
              setSaveCollection(collection);
          });

          await wishlistState.map(async (ele) => {
            let req = await api.get(`/games/${ele}`, {
              params: {
                id: ele,
                // search_precise: true,
              },
            });
            wishlist.push(req.data);

            // return wishlist;
            if (wishlist.length === wishlistState.length)
              setSaveWishlist(wishlist);
          });

          console.log("coll", collection);
          console.log("wish", wishlist);

          console.log(`wishlist saved`, wishlist);
        } catch (err) {
          console.log(err);
        }
      } else {
        <div
          css={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0",
          }}
        >
          <Spinner />
        </div>;
      }
    };

    fetch();
  }, [
    collectionState,
    id,
    mygamesCurrentPlaying,
    mygamesFinished,
    mygamesUncategorized,
    mygamesnotPlayedYet,
    wishlistState,
  ]);

  return (
    <div>
      {isLoggedIn === true &&
      mygamesUncategorized &&
      collectionState &&
      wishlistState ? (
        <div css={{ maxWidth: "100vw", overflowX: "hidden" }}>
          {console.log(`mygamesUncategorized`)}
          <SideBarMemoized />
          <LoginButton />
          <Output />
        </div>
      ) : isLoggedIn === false ? (
        <div
          css={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "red",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "black",
            flexDirection: "column",
          }}
        >
          <SideBarMemoized />
          <Heading>Please login to view this page </Heading>
          <Button
            colorScheme="white"
            variant="outline"
            onClick={() => history.push("/login")}
          >
            Login
          </Button>
        </div>
      ) : (
        <div>
          <div
            css={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0",
            }}
          >
            <Spinner />
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(Dashboard);

//TODO: add a rest api server and host it on heroku. Store all users in it with id as the identifier and in that id store the user didToken, name, avatar and user's data like their wishlist, collection, etc.
//TODO: A option to show merge both accounts in the user dashboard if we have different mails in same userid/didId.

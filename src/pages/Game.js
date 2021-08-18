import React, { useEffect, useState } from "react";
/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled/macro";
import { useInView } from "react-intersection-observer";
import { useSelector, useDispatch } from "react-redux";
import api from "../api/api";
import { motion, useAnimation } from "framer-motion";
import { Spinner } from "@chakra-ui/react";

const transition = {
  duration: 1.2,
  ease: [0.43, 0.13, 0.23, 0.96],
};

const Title = styled.h1({
  fontSize: "4.5rem",
  fontFamily: "Staatliches",
  letterSpacing: "0.3rem",
});

const By = styled.h3({
  fontSize: "1.5rem",
  fontFamily: "Staatliches",
  letterSpacing: "0.3rem",
});

const SubHeadings = styled.h2({
  fontSize: "2.4rem",
  fontFamily: "Staatliches",
  letterSpacing: "0.3rem",
});

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

const ShowData = ({ data }) => {
  return (
    <div
      css={{
        overflow: "auto",
        height: "100vh",
        padding: "2rem",
        boxSizing: "border-box",
      }}
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
          position: "relative",
          top: "5rem",
        }}
      >
        <Title>{data.name}</Title>
        <By>By {data.developers[0].name}</By>
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
            height: "500px",
            width: "100%",
            objectFit: "cover",
            filter: `drop-shadow(0 0 0.75rem rgba(255,255,255,0.75))`,
            // position: "relative",
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 1, y: 460 }}
        css={{
          padding: "2rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: "1rem",
        }}
      >
        <div className="side-1">
          <FadeInWhenVisible>
            <SubHeadings>About</SubHeadings>
            <div css={{ fontSize: "1.2rem" }}>{data.description_raw}</div>
          </FadeInWhenVisible>
        </div>
        <div className="side-2"></div>
      </motion.div>
    </div>
  );
};

const Game = ({ match }) => {
  const [data, setData] = useState(null);
  const [clips, setClips] = useState(null);
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
        if (!req.status) {
          throw new Error(req.statusText);
        } else {
          console.log(req);
          setData(req.data);
          setClips(clipsReq);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, [match.params.id]);

  console.log(clips);

  return data ? (
    <ShowData data={data} />
  ) : (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Spinner />
    </div>
  );
};

export default Game;

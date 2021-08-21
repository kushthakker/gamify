import React from "react";
import { AspectRatio, Box, Text } from "@chakra-ui/react";

const VidMain = ({ current }) => {
  if (current !== null) {
    return (
      <Box>
        <AspectRatio maxW="800px" ratio={1}>
          <iframe
            src={`https://www.youtube.com/embed/${current.id.videoId}`}
            title="current player"
          />
        </AspectRatio>
        <Box p="6">
          <Text fontSize="2rem" fontWeight="bold">
            {current.snippet.title}
          </Text>
          <Text fontSize="1rem">{current.snippet.description}</Text>
        </Box>
      </Box>
    );
  } else return null;
};

export default VidMain;

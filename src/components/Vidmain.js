import React from "react";
import { AspectRatio, Box, Text } from "@chakra-ui/react";

const VidMain = ({ current }) => {
  if (current !== null) {
    return (
      <Box justify="center">
        <AspectRatio w="900px" h="560px" ratio={1}>
          <iframe
            src={`https://www.youtube.com/embed/${current.id.videoId}`}
            title="current player"
          />
        </AspectRatio>
        <Box p="6" borderWidth="1px" borderRadius="lg" w="900px" mt="25px">
          <Text fontSize="2rem" fontWeight="bold" textAlign="left" mb="1rem">
            {current.snippet.title}
          </Text>
          <Text fontSize="1rem" textAlign="left">
            {current.snippet.description}
          </Text>
        </Box>
      </Box>
    );
  } else return null;
};

export default VidMain;

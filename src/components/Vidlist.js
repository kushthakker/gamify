import React from "react";
import { Image, Box, Text, Flex } from "@chakra-ui/react";
const Vidlist = ({ onVideoSelect, videos, current }) => {
  const renderList = videos.map((video) => {
    if (video === current) return null;
    return (
      <div key={video.id.videoId} style={{ margin: "1rem" }}>
        <Box w="300px" onClick={() => onVideoSelect(video)}>
          <Image
            boxSize="300px"
            objectFit="fill"
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
          />
          <Box maxW="300px">
            <Text fontSize="0.7rem" fontWeight="bold">
              {video.snippet.title}
            </Text>
          </Box>
        </Box>
      </div>
    );
  });
  return (
    <Box d="grid" templateColumns="auto 200px" align="center">
      {renderList}
    </Box>
  );
};

export default Vidlist;

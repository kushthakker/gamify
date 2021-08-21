import React from "react";
import { Image, Box, Text, Flex } from "@chakra-ui/react";
const Vidlist = ({ onVideoSelect, videos, current }) => {
  const renderList = videos.map((video) => {
    if (video === current) return null;
    return (
      <div key={video.id.videoId} style={{ margin: "1rem" }}>
        <Box w="200px" onClick={() => onVideoSelect(video)}>
          <Image
            boxSize="200px"
            objectFit="fill"
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
          />
          <Box maxW="200px">
            <Text fontSize="0.7rem" fontWeight="bold">
              {video.snippet.title}
            </Text>
          </Box>
        </Box>
      </div>
    );
  });
  return <Flex justfy="space-around">{renderList}</Flex>;
};

export default Vidlist;

import React from "react";
import { Image, Box, Text } from "@chakra-ui/react";
const Vidlist = ({ onVideoSelect, videos, current }) => {
  const renderList = videos.map((video) => {
    if (video === current) return null;
    return (
      <div key={video.id.videoId}>
        <Box
          w="auto"
          h="auto"
          mb="1rem"
          ml="1.5rem"
          borderWidth="1px"
          borderRadius="lg"
          cursor="pointer"
          onClick={() => onVideoSelect(video)}
        >
          <Image
            w="100%"
            h="180px"
            objectFit="fill"
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
          />
          <Box maxW="auto">
            <Text fontSize="1rem" fontWeight="bold" p="1rem">
              {video.snippet.title}
            </Text>
          </Box>
        </Box>
      </div>
    );
  });
  return (
    <Box
      d="grid"
      templatecolumns="1fr 1fr 1fr"
      //   align="center"
    >
      {renderList}
    </Box>
  );
};

export default Vidlist;

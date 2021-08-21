import React from "react";
import { Image, Box, Text, Flex } from "@chakra-ui/react";
const Vidlist = ({ onVideoSelect, videos, current }) => {
  const renderList = videos.map((video) => {
    if (video === current) return null;
    return (
      <div key={video.id.videoId} className="vidlist">
        <Box w="300px" onClick={() => onVideoSelect(video)}>
          <Image
            boxSize="150px"
            objectFit="cover"
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
          />
          <Box className="content">
            <Text fontSize="1.5rem" fontWeight="bold">
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

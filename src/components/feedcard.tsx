/* eslint-disable */

import React, { useState } from "react";
import {
  Button,
  Box,
  Badge,
  Image,
  Text,
  VStack,
  Heading,
  useColorModeValue,
  Flex,
  IconButton,
  Tooltip,
  Center,
  SimpleGrid,
} from "@chakra-ui/react";
import { FaRegHeart, FaShareSquare } from "react-icons/fa";
type CardProps = {
  catname: string;
  breed: string;
  text: string;
  image: string;
  username: string;
  title: string;
  id: string;
  likes: number;
};

const FeedCard = ({
  catname,
  breed,
  text,
  image,
  username,
  title,
  id,
}: CardProps) => {
  const cardBackground = useColorModeValue("white", "gray.800");
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
      <Center pt={"30px"} >
        <SimpleGrid columns={{ base: 1, md: 1 }}>
          <Box
            maxW="sm"
            borderRadius="lg"
            overflow="hidden"
            bg={cardBackground}
            boxShadow={"25px"}
            
          >
            <Image src={image} alt={breed} style={{ objectFit: "cover", height: "500px", width: "700px" }} />

            <VStack p={6} align="start" spacing={4}>
              <VStack align="start" spacing={0}>
                <Heading size="md">{title}</Heading>
                <Text fontSize="sm" color="gray.500">
                  By {username}
                </Text>
              </VStack>
              <Flex align="center" mt={2}>
                <Heading size="sm" mr={2}>
                  {catname}!
                </Heading>
                <Badge borderRadius="full" px="2" colorScheme="teal">
                  {breed}
                </Badge>
              </Flex>

              <Text mt={2}>{text}</Text>

              <Flex mt={2} align="center" justify="space-between" width="full">
                <Flex align="center">
                  <Tooltip label="Like this post" aria-label="Like this post">
                    <Button
                      rightIcon={<FaRegHeart />}
                      onClick={handleLike}
                      variant="outline"
                    />
                  </Tooltip>
                  <Box ml={2}>{likes}</Box>
                </Flex>
                <Tooltip label="Share this post" aria-label="Share this post">
                  <Button rightIcon={<FaShareSquare />} variant="outline" />
                </Tooltip>
              </Flex>
            </VStack>
          </Box>
        </SimpleGrid>
      </Center>
  );
};

export default FeedCard;

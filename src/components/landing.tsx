/* eslint-disable */

import React, { useState, useEffect } from "react";
import { Box, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import  Lottie  from "lottie-react";

export const Landing = () => {
  const [animationData, setAnimationData] = useState(null);
  const [bgAnimationData, setBgAnimationData] = useState(null);

  useEffect(() => {
    fetch('/landingani.json')
      .then(response => response.json())
      .then(data => setAnimationData(data));

    fetch('/landingbg.json')
      .then(response => response.json())
      .then(data => setBgAnimationData(data));
  }, []);

  const bgAnimationOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <Box position="relative" height="100vh" width="100vw" overflow="hidden">
      {bgAnimationData && (
        <Lottie
          animationData={bgAnimationData}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minHeight: '100%',
            minWidth: '100%',
            height: 'auto',
            width: 'auto',
            zIndex: 0,
          }}
          {...bgAnimationOptions}
        />
      )}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        alignItems="center"
        justifyContent="center"
        height="100%"
        padding={{ base: 5, md: 20 }}
        position="relative"
        zIndex={1}
        ml={{ md: '20%' }}
        mt={{ md: '0%' }}
      >
        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems={{ base: 'center', md: 'flex-start' }}
          color={useColorModeValue('gray.800', 'white')}
        >
          <Heading as="h1" size="2xl" mb={4}>
            Cat Social
          </Heading>
          <Text fontSize={{ base: 'md', md: 'xl' }}>
            A social media platform for cats.
          </Text>
        </Box>
        <Box
          flex="1"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width={{ base: '80%', md: '60%' }}
          height={{ base: '50%', md: '60%' }}
        >
          {animationData && (
            <Lottie
              animationData={animationData}
              style={{ width: '100%', height: '100%' }}
            />
          )}
        </Box>
      </Flex>
    </Box>
  );
};

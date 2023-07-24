/* eslint-disable */

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  VStack,
  useColorModeValue,
  Flex,
  HStack,
  Divider,
  Text,
  Stack,
  Avatar,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import {
  signIn,
  signOut,
  useSession,
  getCsrfToken,
  getProviders,
} from "next-auth/react";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { GitHubIcon } from "./login-logos";

interface MergedLoginFormProps {
  csrfToken: string;
  providers: any;
}

const LoginForm: React.FC<MergedLoginFormProps> = ({
  csrfToken,
  providers,
}) => {
  const { data: session } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [animationData, setAnimationData] = useState(null);
  const formBackground = useColorModeValue("#f7beab", "#f7beab");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signIn("credentials", { callbackUrl: "/", username, password });
  };

  useEffect(() => {
    fetch("/signincat.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data));
  }, []);

  if (session) {
    return (
      <Flex
        minHeight="100vh"
        width="full"
        align="center"
        justifyContent="center"
        bgColor={formBackground}
      >
        <Box
          p={8}
          maxWidth="500px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          borderColor={"#1c1c1c16"}
          textAlign="center"
        >
          {session.user.image && (
            <Avatar src={session.user.image} mb={4} size="2xl" />
          )}
          <Heading as="h1" size="lg" mb={2}>
            Signed in as:
          </Heading>
          <Text fontSize="2xl" mb={4}>
            {session.user.name}
          </Text>
          <Text fontSize="xl" mb={4}>
            {session.user.email}
          </Text>
          <Button colorScheme="orange" onClick={() => signOut()}>
            Sign out
          </Button>
        </Box>
      </Flex>
    );
  }
  return (
    <Flex
      minHeight="100vh"
      width="full"
      align="center"
      justifyContent="center"
      bgColor={formBackground}
    >
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        borderColor={"#1c1c1c16"}
      >
        <Box textAlign="center">
          {animationData && (
            <Lottie
              animationData={animationData}
              loop={true}
              style={{ height: "300px", width: "300px" }}
            />
          )}
        </Box>
        <Box my={4} textAlign="left">
          <form
            method="post"
            action="/api/auth/callback/credentials"
            onSubmit={handleSubmit}
          >
            <Input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <VStack spacing="5">
              <Box>
                <label>Username</label>
                <Input
                  name="username"
                  type="text"
                  borderColor={"#1c1c1c16"}
                  _hover={{ borderColor: "#1c1c1c16" }}
                  _focus={{ borderColor: "#1c1c1c16" }}
                  _active={{ borderColor: "#1c1c1c16" }}
                  placeholder="Mr. Cat"
                  _placeholder={{ color: "#1c1c1c50" }}
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Box>
              <Box>
                <label>Password</label>
                <Input
                  name="password"
                  type="password"
                  borderColor={"#1c1c1c16"}
                  _hover={{ borderColor: "#1c1c1c16" }}
                  _focus={{ borderColor: "#1c1c1c16" }}
                  _active={{ borderColor: "#1c1c1c16" }}
                  placeholder="*********"
                  _placeholder={{ color: "#1c1c1c50" }}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Box>
              <Button w={"50%"} colorScheme={"orange"} type="submit">
                Sign in
              </Button>
              <HStack>
                <Divider />
                <Text textStyle="sm" color="fg.muted">
                  OR
                </Text>
                <Divider />
              </HStack>
              <Stack spacing="3" alignItems={"center"}>
                <Button
                  pt={"8px"}
                  as={"a"}
                  onClick={() => signIn()}
                  _hover={{ bg: "#1a1a1c20" }}
                  px={"15px"}
                  border={"1px solid #1c1c1e"}
                  variant="unstyled"
                  leftIcon={<GitHubIcon />}
                >
                  Continue with GitHub
                </Button>
              </Stack>
            </VStack>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders();

  return {
    props: {
      csrfToken: csrfToken,
      providers: providers ?? [],
    },
  };
}

export default LoginForm;

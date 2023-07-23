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
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { signIn, getCsrfToken, getProviders } from "next-auth/react";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

interface MergedLoginFormProps {
  csrfToken: string;
  providers: any;
}

const LoginForm: React.FC<MergedLoginFormProps> = ({
  csrfToken,
  providers,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [animationData, setAnimationData] = useState(null);
  const formBackground = useColorModeValue("orange.100", "orange.700");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signIn("credentials", { callbackUrl: "/", username, password });
  };

  useEffect(() => {
    fetch("/signincat.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data));
  }, []);

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
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Box>
              <Button colorScheme={"orange"} type="submit">
                Sign in
              </Button>
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

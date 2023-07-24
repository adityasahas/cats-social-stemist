/* eslint-disable */

import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
  Text,
  // useColorModeValue,
  Center,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
// import { Dropzone } from "../components/Dropzone";

const Create = () => {
  // const cardBackground = useColorModeValue("white", "gray.800");
  const [title, setTitle] = useState("");
  const [catName, setCatName] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [breed, setBreed] = useState("");

  const { data: session } = useSession();

  
  if (session) {
    async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
    
      const post = {
        title,
        catname: catName,
        text,
        image,
        breed,
        username: session?.user.name,
        numLikes: 1,
      };
    
      await fetch("/api/create/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
    }
  
    return (
      <Center bg={"#f7beab"} minH={"100vh"}>
        <Box
          mt={20}
          maxW="sm"
          borderRadius="lg"
          overflow="hidden"
          p={6}
          boxShadow={"xl"}
        >
          <Heading mt={2} size="lg" mb={6}>
            Create a new post
          </Heading>
          <form onSubmit={handleSubmit}>
            <VStack align="stretch" spacing={4}>
              <FormControl id="title">
                <FormLabel>Title</FormLabel>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  borderColor={"#1c1c1c46"}
                  _hover={{ borderColor: "#1c1c1c" }}
                />
              </FormControl>
  
              <FormControl id="catName">
                <FormLabel>Cat Name</FormLabel>
                <Input
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  required
                  borderColor={"#1c1c1c46"}
                  _hover={{ borderColor: "#1c1c1c" }}
                />
              </FormControl>

              <FormControl id="breed">
                <FormLabel>Breed</FormLabel>
                <Input
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  required
                  borderColor={"#1c1c1c46"}
                  _hover={{ borderColor: "#1c1c1c" }}
                />
              </FormControl>
  
              <FormControl id="text">
                <FormLabel>Text</FormLabel>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                  borderColor={"#1c1c1c46"}
                  _hover={{ borderColor: "#1c1c1c" }}
                />
              </FormControl>
  
              <FormControl id="file">
                <FormLabel>Image</FormLabel>
                <Input
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                  borderColor={"#1c1c1c46"}
                  _hover={{ borderColor: "#1c1c1c" }}
                />
              </FormControl>
              <Button colorScheme="teal" type="submit" >
                Create Post
              </Button>
            </VStack>
          </form>
        </Box>
      </Center>
    );
  } else {
    return (
      <Text>Not logged in</Text>
    )
  }
};
// invalid hook call fkin hell
export default Create;

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
  useColorModeValue,
  Center,
  FormHelperText,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { Dropzone } from "../components/Dropzone";

const Create = () => {
  const cardBackground = useColorModeValue("white", "gray.800");
  const [title, setTitle] = useState("");
  const [catName, setCatName] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const { data: session } = useSession();

  const handlePostCreation = async (e) => {
    e.preventDefault();
    const data = {
      username: session.user.name,
      title,
      catName,
      text,
      image: file,
    };
    console.log(data);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

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
        <form onSubmit={handlePostCreation}>
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
              {/* <Input type="file" onChange={handleFileChange} required /> */}
              <Dropzone width="full" />
            </FormControl>

            <Button colorScheme="teal" type="submit">
              Create Post
            </Button>
          </VStack>
        </form>
      </Box>
    </Center>
  );
};

export default Create;

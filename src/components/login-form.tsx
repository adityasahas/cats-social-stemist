import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
} from '@chakra-ui/react';

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(username, password);
  };

  return (
    <Box width="md" mx="auto" mt={8} p={8} borderWidth={1} borderRadius="md">
      <Heading as="h2" size="lg" textAlign="center" mb={6}>
        Welcome
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </FormControl>
        <FormControl id="password" mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="teal" mt={6}>
          Login
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
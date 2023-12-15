import { Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { loginwithgithub } from "../Services/unAuthServices";

const LoginPage = () => {

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      w="100%"
      h="100%"
      minH="100vh"
      bg="gray.100"
    >
      <Flex textAlign="center" className="col" flexDir="column" gap="5">
        <Heading as="h1" fontWeight="600">
          Login to Bandwidth
        </Heading>
        <Button
          bg="black"
          color="white"
          variant="solid"
          border={0}
          leftIcon={<FaGithub />}
          onClick={loginwithgithub}
        >
          Continue with Github
        </Button>
      </Flex>
    </Flex>
  );
};

export default LoginPage;

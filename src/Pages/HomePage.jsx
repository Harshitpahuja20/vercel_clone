import React, { useEffect, useState } from "react";
import Repositiories from "../Components/Repositiories";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { socketIo } from "../Socket/socket";

const HomePage = () => {
  const [repos, setRepos] = useState([]);
  let token = localStorage.getItem("git_access_token");
  useEffect(() => {
    socketIo.emit("getRepo", token);
    socketIo.emit("getUser", token);
  }, []);

  useEffect(() => {
    socketIo.on("allrepo", (data) => {
      setRepos(data);
    });
    socketIo.on("userDetails", (data) => {
      localStorage.setItem("git_user_data" , {
        username : data?.login,
        profile : data.avatar_url,
      })
    });
  }, [socketIo]);

  return (
    <Flex w="100%" minH="100vh" display="flex" justify="center" align="center">
      <Flex flexDir={"column"}>
        <Box>
          <Heading as="h1" fontWeight="600">
            Let's build something new.
          </Heading>
          <Text fontSize="xs" color={"gray"} my="2" fontWeight="600">
            To deploy a new Project, import an existing Git Repository or get
            started with one of our Templates.
          </Text>
        </Box>
        <Repositiories repos={repos} />
      </Flex>
    </Flex>
  );
};

export default HomePage;

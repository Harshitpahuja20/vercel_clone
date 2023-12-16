import React, { useEffect, useState } from "react";
import Repositiories from "../Components/Repositiories";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { socketIo } from "../Socket/socket";
import Navbar from "../Components/Navbar";
import { TerminalController } from "../Components/terminalUi";

const HomePage = () => {
  const [repos, setRepos] = useState([]);
  const [isTerminal, setIsTerminal] = useState(false);
  let token = localStorage.getItem("git_access_token");
  useEffect(() => {
    socketIo.emit("getRepo", token);
    socketIo.emit("getUser", token);
  }, []);

  useEffect(() => {
    socketIo.on("allrepo", (data) => {
      setRepos(data);
      console.log(data)
    });
    socketIo.on("userDetails", (data) => {
      localStorage.setItem("git_user_data", JSON.stringify({
        username: data?.login,
        profile: data.avatar_url,
      }));
    });
  }, [socketIo]);

  return (
  <> {!isTerminal ? <>
      <Navbar />
      <Flex
        w="100%"
        minH="100vh"
        display="flex"
        justify="center"
        align="center"
      >
        <Flex flexDir={"column"} marginTop={10}>
          <Box>
            <Heading as="h1" fontWeight="600">
              Let's build something new.
            </Heading>
            <Text fontSize="xs" color={"gray"} my="2" fontWeight="600">
              To deploy a new Project, import an existing Git Repository or get
              started with one of our Templates.
            </Text>
          </Box>
          <Repositiories repos={repos} setIsTerminal={setIsTerminal}/>
        </Flex>
      </Flex>
    </> : <TerminalController setIsTerminal={setIsTerminal} />}</>
  );
};

export default HomePage;

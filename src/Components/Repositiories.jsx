import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Img,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { IoLockClosedOutline } from "react-icons/io5";
import { socketIo } from "../Socket/socket";
import { TerminalController } from "./terminalUi";

const Repositiories = ({ repos , setIsTerminal }) => {
  const [totalRepos, setTotalRepos] = useState(repos);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [serachQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [indexId, setIndexId] = useState(null);

  let userData = JSON.parse(localStorage.getItem("git_user_data"));
  let token = localStorage.getItem("git_access_token");

  const searchFunc = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchQuery(searchTerm);
    const filteredItems = totalRepos.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setFilteredRepos(filteredItems);
  };

  const ImportRepo = async (index, repo_name, owner) => {
    try {
      setIndexId(index);
      ToastExample();
      setLoading(true);
      let data = {
        username: owner,
        token: token,
        repo_name,
      };

      socketIo.emit("cloneRepo", data);
      setIsTerminal(true);
      setIndexId(null);
      setLoading(false);
    } catch (error) {
      console.error("Error importing repository:", error);
    }
  };

  function getDaysSincePastDate(pastDate) {
    const today = new Date();
    const past = new Date(pastDate);
    const daysDifference = Math.floor((today - past) / (1000 * 60 * 60 * 24));
    return daysDifference;
  }

  useEffect(() => {
    setTotalRepos(repos);
    setFilteredRepos(repos);
  }, [repos]);

  const toast = useToast();
  function ToastExample() {
    return toast({
      title: "Importing Git Repository",
      description: "Wait! while we are importing git repository.",
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "bottom-right",
    });
  }

  return (
    <>
       
        <Box
          border="1px solid"
          borderColor="gray.300"
          borderRadius={8}
          maxW="xl"
          padding={{ base: 3, lg: 8 }}
        >
          <Stack spacing={4}>
            <Box>
              <Heading as="h2" fontWeight="600">
                Import Git Repository
              </Heading>
            </Box>
            <Stack />
            <Flex gap="5">
              <InputGroup>
                <InputLeftElement pointerEvents="none" fontSize={"sm"}>
                  <FaGithub color="gray.300" />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder={userData?.username}
                  _placeholder={{ color: "black" }}
                  readOnly
                  outline="none"
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <IoSearchOutline color="gray.300" />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="Search Here"
                  value={serachQuery}
                  onChange={searchFunc}
                />
              </InputGroup>
            </Flex>
            <Box
              maxH={"350px"}
              minH={"350px"}
              overflowY={"scroll"}
              height={"100%"}
              className="repoboxes"
            >
              {filteredRepos?.map((data, index) => {
                return (
                  <Flex
                    align="center"
                    justify="space-between"
                    px="3"
                    py="2"
                    borderBottom={0}
                    border="1px solid"
                    borderColor="gray.200"
                    key={index}
                  >
                    <Flex gap="3">
                      <Box>
                        <Img
                          src="https://cdn.iconscout.com/icon/free/png-256/free-react-1-282599.png"
                          alt=""
                          width="100%"
                          maxW="45px"
                          objectFit="cover"
                          rounded={"100%"}
                        />
                      </Box>
                      <HStack spacing={4}>
                        <Flex align="center" gap={2}>
                          <Text>{data?.name}</Text>{" "}
                          {data?.private && <IoLockClosedOutline size="14px" />}
                        </Flex>
                        <Text>
                          {getDaysSincePastDate(data?.updated_at)}d ago
                        </Text>
                      </HStack>
                    </Flex>
                    <Flex>
                      <Button
                        size="sm"
                        bg={"black"}
                        color={"white"}
                        onClick={() =>
                          ImportRepo(index, data?.name, data?.owner?.login)
                        }
                        isDisabled={loading && index !== indexId}
                        isLoading={loading && index === indexId}
                      >
                        Import
                      </Button>
                    </Flex>
                  </Flex>
                );
              })}
            </Box>
          </Stack>
        </Box>
    </>
  );
};

export default Repositiories;

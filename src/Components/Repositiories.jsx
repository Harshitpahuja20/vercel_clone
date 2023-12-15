import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  Img,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { IoLockClosedOutline } from "react-icons/io5";

const Repositiories = ({repos}) => {
  const [totalRepos, setTotalRepos] = useState(repos);
  const [serachQuery , setSearchQuery] = useState("")

  const seacrhFunc = (e) => {
    setSearchQuery(e.target.value)
    const searchTerm = e.target.value.toLowerCase();
    const filteredItems = totalRepos.filter((item) =>
    item.toLowerCase().includes(searchTerm)
  );

  // Update the state with the filtered items and the current search query
  setTotalRepos(filteredItems);
  setSearchQuery(searchTerm);
  }

  function getDaysSincePastDate(pastDate) {
    const today = new Date();
    const past = new Date(pastDate);
    const daysDifference = Math.floor((today - past) / (1000 * 60 * 60 * 24));
    return daysDifference;
  }
  

  return (
    <Box
      border="1px solid"
      borderColor="gray.300"
      borderRadius={8}
      maxW="xl"
      padding={{ base: 3, lg: 8 }}
    >
      <Stack spacing={4}>
        <Box>
          <Heading as="H2" fontWeight="600">
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
              placeholder="Harshit Pahuja"
              _placeholder={{ color: "black" }}
              readOnly
              outline="none"
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <IoSearchOutline color="gray.300" />
            </InputLeftElement>
            <Input type="text" placeholder="Search Here" value={serachQuery} onChange={seacrhFunc}/>
          </InputGroup>
        </Flex>
        <Box maxH={"350px"} overflowY={"scroll"} height={"100%"}>          
         {repos?.map((data)=>{
          return  <Flex
          align="center"
          justify="space-between"
          px="3"
          py="2"
          borderBottom={0}
          border="1px solid"
          borderColor="gray.200"
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
                <Text>{data?.name}</Text> {data?.private && <IoLockClosedOutline size="14px"/>}
              </Flex>
              <Text>{getDaysSincePastDate(data?.updated_at)}d ago</Text>
            </HStack>
          </Flex>
          <Flex>
            <Button size="sm" bg={"black"} color={"white"}>
              Import
            </Button>
          </Flex>
        </Flex>
         })}
        </Box>
      </Stack>
    </Box>
  );
};

export default Repositiories;

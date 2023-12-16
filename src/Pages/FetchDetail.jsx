import React, { useEffect } from "react";
import { sendSessionCode } from "../Services/unAuthServices";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const FetchDetail = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    if (urlParams.get('error') === 'access_denied') {
      navigate('/');
    }

    if (codeParam) {
      sendSessionCode(codeParam);
    }
  }, []);

  return (
    <Flex height="100%" minH="100vh" justify="center" align="center">
      <Flex flexDir="column" align={"center"}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="black"
          size="xl"
        />
        <Text>Connecting...</Text>
      </Flex>
    </Flex>
  );
};

export default FetchDetail;

import React, { useEffect, useState } from "react";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";
import { socketIo } from "../Socket/socket";
import { Box, Button, Text } from "@chakra-ui/react";
import { FaArrowLeftLong } from "react-icons/fa6";

export const TerminalController = ({ setIsTerminal }) => {
  const [terminalLineData, setTerminalLineData] = useState([]);

  useEffect(() => {
    socketIo.on("cmd", (data) => {
      setTerminalLineData(prevData => [...prevData, data]);
    });
    socketIo.on("build-log", (data) => {
      console.log(data);
      setTerminalLineData(prevData => [...prevData, data]);
      // terminalLineData.push(<TerminalOutput>{data}</TerminalOutput>)
    });
  }, [socketIo]);

  return (
    <div className="container">
      <Box bg={"black"}>
        <Button onClick={() => setIsTerminal(false)}>
          <FaArrowLeftLong />
        </Button>
      </Box>
      {/* <Terminal name="BandWidth Terminal" colorMode={ColorMode.Dark}>
        {terminalLineData}
      </Terminal> */}
      <Box minH={"90vh"} minW={"90vw"} mx={"auto"} bg={"black"} color={"green"}>
        {terminalLineData.map((item, index) => {
          return <Text>{item}</Text>;
        })}
      </Box>
    </div>
  );
};

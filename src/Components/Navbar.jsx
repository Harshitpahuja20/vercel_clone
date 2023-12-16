import {
  Avatar,
  Box,
  Button,
  Flex,
  Img,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  let userData = JSON.parse(localStorage.getItem("git_user_data"));
  const log_out = () => {
    localStorage.removeItem("git_access_token");
    localStorage.removeItem("git_user_data");
    window.location.reload();
    window.location.href = "/";
  };

  return (
    <Flex
      width={"100%"}
      justify="space-between"
      pos={"fixed"}
      bg={"gray.50"}
      px={4}
      py={2}
      align={"center"}
      marginBottom={5}
    >
      <Box>
        <Link to="/">
          <Text fontSize={"2xl"} fontWeight={"600"}>
            BandWidth
          </Text>
        </Link>
      </Box>
      <Box>
        <Menu>
          <MenuButton>
            <Avatar
              name={userData?.username}
              src={userData?.profile}
              cursor="pointer"
            />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={log_out}>Log Out</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default Navbar;

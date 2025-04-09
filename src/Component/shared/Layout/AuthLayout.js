import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Header from "./Header";

const AuthLayout = ({ children }) => {
  return (
    <Flex direction="column" h="100vh">
      <Box
        as="header"
        flexShrink={0}
        position={"fixed"}
        w={"100%"}
        h={"10vh"}
        zIndex="1000"
      >
        <Header />
      </Box>

      <Flex flex="1">
        <Box as="main" flex="1" minH={"90vh"} overflowY="auto">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default AuthLayout;

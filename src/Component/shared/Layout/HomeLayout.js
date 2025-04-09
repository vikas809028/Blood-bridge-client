import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Header from "./Header";

const HomeLayout = ({ children }) => {
  return (
    <Flex direction="column">
      <Box
        as="header"
        flexShrink={0}
        position="sticky"
        h={"10vh"}
        top={0}
        zIndex="1000"
      >
        <Header />
      </Box>

      <Flex flex="1">
        <Box as="main" flex="1" p={4} minH={"90vh"} overflowY="auto">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default HomeLayout;

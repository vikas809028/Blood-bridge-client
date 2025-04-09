import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <Flex direction="column" h="100vh">
      
      <Box as="header" flexShrink={0} position="sticky" h={"10vh"} top={0} zIndex="1000">
        <Header />
      </Box>

      <Flex flex="1">
        
        <Sidebar />

        <Box as="main" flex="1" p={4} minH={"90vh"} overflowY="auto">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;

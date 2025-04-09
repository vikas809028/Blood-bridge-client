import React from "react";
import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
import { replace, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {
  Box,
  Flex,
  HStack,
  Text,
  Button,
  Icon,
  Badge,
} from "@chakra-ui/react";
import { FaDroplet, FaHandHoldingDroplet } from "react-icons/fa6";
import { logout } from "../../../Redux/features/auth/authSlice";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    dispatch(logout())
    localStorage.clear();
    alert("Logged out successfully!");
    navigate("/");
  };

  return (
    <Box
      as="nav"
      className="bg-[#cf0808]"
      
      px={4}
      h={"100%"}
      display={"flex"}
      alignItems={"center"}
      shadow="md"
      position="sticky"
      top={0}
      zIndex={1}
    >
      <Flex
        minW="100%"
        justify="space-between"
        align="center"
        maxW="container.lg"
        color="white"
      >
        {/* Brand Section */}
        <HStack spacing={2} cursor="pointer" onClick={() => navigate("/" ,{replace:true} ) }>
         
          <FaHandHoldingDroplet className="text-4xl" />
          <Text fontSize="4xl" fontWeight="bold">
            Blood Bridge
          </Text>
        </HStack>

        {/* Navigation Section */}
        <HStack spacing={6}>
          {/* User Welcome Section */}
          
          {user!==null ? (
            <HStack spacing={3}>
              <Icon as={BiUserCircle} boxSize={6} />
              <Text fontSize="md">
                Welcome, {" "}
                <Text as="span" fontWeight="bold">
                  {user?.name || user?.hospitalName || user?.organisationName}
                </Text>
              </Text>
              <Badge ml={2} rounded={'md'} p={1} colorScheme="red" fontSize="sm">
                {user?.role}
              </Badge>
              <Button
                size="sm"
                colorScheme="whiteAlpha"
                variant="solid"
                color="red.600"
                bg="white"
                _hover={{ bg: "gray.200" }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </HStack>
          ) : (
            <Button
              size="sm"
              colorScheme="whiteAlpha"
              variant="solid"
              color="red.600"
              bg="white"
              _hover={{ bg: "gray.200" }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
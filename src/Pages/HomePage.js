import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Grid,
  Icon,
  useBreakpointValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Badge,
  Stack,
  Progress,
  AspectRatio,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  FaHeartbeat,
  FaSyringe,
  FaUsers
} from "react-icons/fa";
import { GiBlood } from "react-icons/gi";
import { MdHealthAndSafety } from "react-icons/md";
import HomeLayout from "../Component/shared/Layout/HomeLayout";
import { useNavigate } from "react-router-dom";
import Carousel from "./Admin/Carousel";
import moment from "moment";

const HomePage = () => {
  const buttonSize = useBreakpointValue({ base: "md", md: "lg" });
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeSlide, setActiveSlide] = useState(0);
  const [bloodDemand, setBloodDemand] = useState([]);

  // Fetch blood demand data
  useEffect(() => {
    // Simulate API call
    const fetchBloodDemand = async () => {
      // In a real app, this would be an API call
      const data = [
        { type: "O+", demand: 78, supply: 45 },
        { type: "A+", demand: 65, supply: 38 },
        { type: "B+", demand: 42, supply: 28 },
        { type: "AB+", demand: 15, supply: 8 },
        { type: "O-", demand: 22, supply: 12 },
        { type: "A-", demand: 18, supply: 10 },
        { type: "B-", demand: 12, supply: 7 },
        { type: "AB-", demand: 5, supply: 3 },
      ];
      setBloodDemand(data);
    };

    fetchBloodDemand();
  }, []);

  const imageUrls = [
    "./assets/images/download (1).jpeg",
    "./assets/images/WhatsApp Image 2024-12-05 at 14.44.56_8f69cc54.jpg",
    "./assets/images/WhatsApp Image 2024-12-05 at 14.46.26_3b2bb634.jpg",
    "./assets/images/download (3).jpeg",
    "./assets/images/download.jpeg",
    "./assets/images/images (1).jpeg",
    "./assets/images/images.jpeg",
  ];

  const upcomingEvents = [
    {
      title: "Community Blood Drive",
      date: "2023-06-15",
      location: "City Center",
      time: "10:00 AM - 4:00 PM",
    },
    {
      title: "Emergency Blood Donation",
      date: "2023-06-20",
      location: "Main Hospital",
      time: "9:00 AM - 5:00 PM",
    },
    {
      title: "Blood Donation Camp",
      date: "2023-06-25",
      location: "University Campus",
      time: "11:00 AM - 3:00 PM",
    },
  ];

  return (
    <HomeLayout>
      {/* Hero Section with Animated Blood Drop */}
      <Box
        position="relative"
        minH={{ base: "80vh", md: "90vh" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgGradient="linear(to-r, red.600, red.700)"
        overflow="hidden"
      >
        {/* Animated blood drops in background */}
        <Box position="absolute" inset={0} overflow="hidden">
          {[...Array(10)].map((_, i) => (
            <Box
              key={i}
              position="absolute"
              w="40px"
              h="40px"
              borderRadius="50%"
              bg="whiteAlpha.200"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 10}s linear infinite`,
                transform: `scale(${0.5 + Math.random()})`,
              }}
            />
          ))}
        </Box>

        <Box position="absolute" inset={0} bg="blackAlpha.500" zIndex={0} />
        <Flex
          direction="column"
          align="center"
          textAlign="center"
          color="white"
          maxW="6xl"
          mx="auto"
          px={4}
          py={16}
          zIndex={1}
        >
          <Heading
            as="h1"
            size={{ base: "2xl", md: "4xl" }}
            mb={6}
            opacity={0}
            animation="fade-in-down 0.7s ease-out forwards"
            lineHeight="1.2"
          >
            <Box as="span" display="inline-flex" alignItems="center">
              <Icon as={GiBlood} mr={3} /> 
              Every Drop Counts
            </Box>
          </Heading>
          <Text
            fontSize={{ base: "lg", md: "2xl" }}
            mb={8}
            maxW="2xl"
            opacity={0}
            animation="fade-in-up 0.7s ease-out 0.3s forwards"
          >
            Join our community of heroes. Your single donation can save up to
            three lives.
          </Text>
          <Flex gap={4} wrap="wrap" justify="center">
            <Button
              colorScheme="whiteAlpha"
              size={buttonSize}
              rightIcon={<FaHeartbeat />}
              onClick={() => navigate("/register")}
              animation="heartbeat 2s ease-in-out infinite"
              _hover={{
                transform: "scale(1.05)",
                boxShadow: "xl",
                animation: "none",
              }}
              transition="all 0.3s"
              px={8}
            >
              Become a Donor
            </Button>
            <Button
              colorScheme="white"
              color="red.600"
              size={buttonSize}
              rightIcon={<MdHealthAndSafety />}
              onClick={onOpen}
              _hover={{
                transform: "scale(1.05)",
                boxShadow: "xl",
              }}
              transition="all 0.3s"
              px={8}
            >
              View Blood Needs
            </Button>
          </Flex>
        </Flex>
      </Box>

      {/* Blood Demand Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent borderRadius="xl" overflow="hidden">
          <ModalHeader bg="red.600" color="white">
            <Flex align="center">
              <Icon as={GiBlood} mr={2} />
              Current Blood Needs
            </Flex>
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody p={6}>
            <Stack spacing={6}>
              {bloodDemand.map((bloodType) => (
                <Box key={bloodType.type}>
                  <Flex justify="space-between" mb={2}>
                    <Text fontWeight="bold">{bloodType.type}</Text>
                    <Badge
                      colorScheme={
                        bloodType.supply >= bloodType.demand ? "green" : "red"
                      }
                      px={2}
                      py={1}
                      borderRadius="md"
                    >
                      {Math.round((bloodType.supply / bloodType.demand) * 100)}%
                      Met
                    </Badge>
                  </Flex>
                  <Progress
                    value={(bloodType.supply / bloodType.demand) * 100}
                    colorScheme={
                      bloodType.supply >= bloodType.demand ? "green" : "red"
                    }
                    size="lg"
                    borderRadius="full"
                  />
                  <Flex justify="space-between" mt={2}>
                    <Text fontSize="sm" color="gray.600">
                      Needed: {bloodType.demand} units
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      Available: {bloodType.supply} units
                    </Text>
                  </Flex>
                </Box>
              ))}
            </Stack>
            <Button
              colorScheme="red"
              mt={8}
              w="full"
              size="lg"
              onClick={() => {
                onClose();
                navigate("/register");
              }}
            >
              Register to Help
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Impact Section */}
      <Box py={16} bg="white">
        <Flex
          direction="column"
          align="center"
          maxW="6xl"
          mx="auto"
          px={4}
          textAlign="center"
        >
          <Badge
            colorScheme="red"
            px={4}
            py={1}
            borderRadius="full"
            mb={4}
            fontSize="md"
          >
            Our Impact
          </Badge>
          <Heading size="xl" mb={6}>
            Together We're Saving Lives
          </Heading>
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
            gap={8}
            w="full"
          >
            {[
              { number: "10,000+", label: "Lives Saved", icon: FaHeartbeat },
              { number: "5,000+", label: "Active Donors", icon: FaUsers },
              { number: "200+", label: "Monthly Donations", icon: FaSyringe },
            ].map((stat, index) => (
              <Flex
                key={index}
                direction="column"
                align="center"
                p={6}
                bg="red.50"
                borderRadius="xl"
                opacity={0}
                animation={`fade-in-up 0.5s ease-out ${
                  index * 0.2 + 0.2
                }s forwards`}
              >
                <Icon as={stat.icon} boxSize={8} color="red.600" mb={4} />
                <Text fontSize="4xl" fontWeight="bold" color="red.700">
                  {stat.number}
                </Text>
                <Text fontSize="lg" color="gray.700">
                  {stat.label}
                </Text>
              </Flex>
            ))}
          </Grid>
        </Flex>
      </Box>

      {/* How It Works Section */}
      <Box py={16} bg="gray.50">
        <Box maxW="6xl" mx="auto" px={4}>
          <Flex direction="column" align="center" textAlign="center" mb={12}>
            <Heading size="xl" mb={4}>
              How Blood Donation Works
            </Heading>
            <Text maxW="2xl" fontSize="lg" color="gray.600">
              The simple process that makes a huge difference
            </Text>
          </Flex>

          <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={6}>
            {[
              {
                step: "1",
                title: "Register",
                description: "Complete our quick registration form",
                icon: "📝",
              },
              {
                step: "2",
                title: "Screen",
                description: "Complete a health screening",
                icon: "🩺",
              },
              {
                step: "3",
                title: "Donate",
                description: "The quick donation process (10-15 mins)",
                icon: "💉",
              },
              {
                step: "4",
                title: "Refresh",
                description: "Enjoy snacks while you recover",
                icon: "🍪",
              },
            ].map((step, index) => (
              <Flex
                key={index}
                direction="column"
                align="center"
                textAlign="center"
                p={6}
                bg="white"
                borderRadius="xl"
                boxShadow="md"
                position="relative"
                _before={{
                  content: '""',
                  position: "absolute",
                  top: "50%",
                  left: "-24px",
                  transform: "translateY(-50%)",
                  width: "24px",
                  height: "2px",
                  bg: "red.200",
                  display: { base: "none", md: index !== 0 ? "block" : "none" },
                }}
                opacity={0}
                animation={`fade-in-up 0.5s ease-out ${index * 0.2}s forwards`}
              >
                <Flex
                  w="50px"
                  h="50px"
                  bg="red.100"
                  color="red.600"
                  borderRadius="full"
                  align="center"
                  justify="center"
                  fontSize="xl"
                  fontWeight="bold"
                  mb={4}
                >
                  {step.icon}
                </Flex>
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  {step.title}
                </Text>
                <Text color="gray.600">{step.description}</Text>
              </Flex>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Blood Type Information */}
      <Box py={16} bg="gray.50">
        <Box maxW="6xl" mx="auto" px={4}>
          <Flex direction="column" align="center" textAlign="center" mb={12}>
            <Heading size="xl" mb={4} color="red.600">
              Blood Type Compatibility
            </Heading>
            <Text maxW="2xl" fontSize="lg" color="gray.600">
              Know which blood types can help which patients.
            </Text>
          </Flex>

          <SimpleGrid columns={[1, 2,4]} spacing={6}>
            {[
              { type: "O-", donateTo: "All types", receiveFrom: "O-" },
              {
                type: "O+",
                donateTo: "O+, A+, B+, AB+",
                receiveFrom: "O+, O-",
              },
              {
                type: "A-",
                donateTo: "A+, A-, AB+, AB-",
                receiveFrom: "A-, O-",
              },
              {
                type: "A+",
                donateTo: "A+, AB+",
                receiveFrom: "A+, A-, O+, O-",
              },
              {
                type: "B-",
                donateTo: "B+, B-, AB+, AB-",
                receiveFrom: "B-, O-",
              },
              {
                type: "B+",
                donateTo: "B+, AB+",
                receiveFrom: "B+, B-, O+, O-",
              },
              {
                type: "AB-",
                donateTo: "AB+, AB-",
                receiveFrom: "A-, B-, AB-, O-",
              },
              { type: "AB+", donateTo: "AB+", receiveFrom: "All types" },
            ].map((blood) => (
              <Box
                key={blood.type}
                p={6}
                borderWidth={1}
                borderRadius="2xl"
                bg="white"
                boxShadow="lg"
                transition="all 0.3s ease"
                _hover={{ transform: "scale(1.03)", boxShadow: "xl" }}
              >
                <Heading size="md" mb={2} color="red.500">
                  Blood Type: {blood.type}
                </Heading>
                <Text fontWeight="medium" color="gray.700">
                  <strong>Can Donate To:</strong> {blood.donateTo}
                </Text>
                <Text mt={1} fontWeight="medium" color="gray.700">
                  <strong>Can Receive From:</strong> {blood.receiveFrom}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>

  

      {/* Testimonials Carousel */}
      <Box py={16}>
        <Box maxW="6xl" mx="auto" px={4}>
          <Carousel
            images={imageUrls}
            activeSlide={activeSlide}
            setActiveSlide={setActiveSlide}
          />
        </Box>
      </Box>

      {/* Final CTA */}
      <Box py={16} bg="red.700" color="white">
        <Flex
          direction="column"
          align="center"
          textAlign="center"
          maxW="2xl"
          mx="auto"
          px={4}
        >
          <Heading size="xl" mb={4}>
            Ready to Save Lives?
          </Heading>
          <Text fontSize="xl" mb={8}>
            Join our community of heroes today
          </Text>
          <Button
            colorScheme="white"
            color="red.700"
            size="lg"
            onClick={() => navigate("/register")}
            rightIcon={<FaHeartbeat />}
            _hover={{ transform: "scale(1.05)" }}
            transition="transform 0.3s"
            px={8}
            py={6}
            fontSize="lg"
          >
            Register Now
          </Button>
        </Flex>
      </Box>

      {/* Keyframe Styles */}
      <style>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes heartbeat {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </HomeLayout>
  );
};

export default HomePage;

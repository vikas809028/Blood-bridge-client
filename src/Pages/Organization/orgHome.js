import React from 'react';
import { 
  Box, 
  Flex, 
  Heading, 
  Text, 
  Button, 
  Image, 
  Stack, 
  Icon, 
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import { 
  FaHeartbeat, 
  FaUserPlus, 
  FaSearch, 
  FaHandsHelping,
  FaRegCalendarAlt,
  FaMapMarkerAlt,
  FaUsers
} from 'react-icons/fa';
import Layout from '../../Component/shared/Layout/Layout';



const OrganisationHomePage = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.700');
  

  return (
    <Layout>
      <Box minH="100vh" bg={bgColor}>
        {/* Hero Section */}
        <Flex
          align="center"
          justify="space-between"
          direction={{ base: 'column', md: 'row' }}
          px={{ base: 4, md: 16, lg: 24 }}
          py={{ base: 12, md: 20 }}
          maxW="1400px"
          mx="auto"
        >
          <Box flex="1" pr={{ md: 12 }} mb={{ base: 8, md: 0 }}>
            <Text 
              color="red.500" 
              fontWeight="bold" 
              mb={2}
              fontSize={{ base: 'md', md: 'lg' }}
            >
              LIFE SAVING NETWORK
            </Text>
            <Heading 
              as="h1" 
              size={{ base: '2xl', md: '3xl', lg: '4xl' }} 
              mb={6} 
              lineHeight="1.2"
              color={useColorModeValue('gray.800', 'white')}
            >
              Connecting <span style={{ color: '#E53E3E' }}>Hospitals</span> with Those in Need
            </Heading>
            <Text 
              fontSize={{ base: 'lg', md: 'xl' }} 
              mb={8}
              color={useColorModeValue('gray.600', 'gray.300')}
            >
              Join our life-saving community today. Your donation can save up to 3 lives.
            </Text>
            <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
              <Button 
                colorScheme="red" 
                size="lg" 
                rightIcon={<FaHeartbeat />}
                px={8}
                _hover={{ transform: 'translateY(-2px)' }}
                transition="all 0.2s"
              >
                Request Blood
              </Button>
              <Button 
                variant="outline" 
                colorScheme="red" 
                size="lg"
                px={8}
                _hover={{ transform: 'translateY(-2px)' }}
                transition="all 0.2s"
              >
                Learn More
              </Button>
            </Stack>
          </Box>
          
        </Flex>

        {/* Stats Section */}
        <Box 
          bg={useColorModeValue('red.50', 'gray.700')} 
          py={12}
          px={{ base: 4, md: 8 }}
        >
          <SimpleGrid 
            columns={{ base: 2, md: 3 }} 
            spacing={12} 
            maxW="1200px" 
            mx="auto"
          >
            
            <StatCard 
              icon={FaUsers} 
              number="5,000+" 
              label="Donors" 
              color="blue.500"
            />
            <StatCard 
              icon={FaMapMarkerAlt} 
              number="100+" 
              label="Locations" 
              color="green.500"
            />
            <StatCard 
              icon={FaRegCalendarAlt} 
              number="24/7" 
              label="Availability" 
              color="purple.500"
            />
          </SimpleGrid>
        </Box>

        {/* Features Section */}
        <Box py={16} px={{ base: 4, md: 8 }} maxW="1200px" mx="auto">
          <Heading 
            textAlign="center" 
            mb={4}
            color={useColorModeValue('gray.800', 'white')}
          >
            How It Works
          </Heading>
          <Text 
            textAlign="center" 
            mb={12} 
            fontSize="xl"
            color={useColorModeValue('gray.600', 'gray.300')}
            maxW="700px"
            mx="auto"
          >
            Our platform makes it easy to connect hospitals with blood donors and manage blood supplies efficiently.
          </Text>
          
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <FeatureCard 
              icon={FaSearch} 
              title="Find Donors" 
              description="Quickly locate eligible blood donors in your area based on blood type and availability."
              color="red.500"
            />
            <FeatureCard 
              icon={FaUserPlus} 
              title="Register Donors" 
              description="Easily register new donors with their information and blood type details."
              color="blue.500"
            />
            <FeatureCard 
              icon={FaHandsHelping} 
              title="Manage Inventory" 
              description="Track blood supply levels and manage distribution to hospitals in need."
              color="green.500"
            />
          </SimpleGrid>
        </Box>

        {/* Testimonial Section */}
        <Box 
          bg={useColorModeValue('red.50', 'gray.700')} 
          py={16}
          px={{ base: 4, md: 8 }}
        >
          <Box maxW="1200px" mx="auto">
            <Heading 
              textAlign="center" 
              mb={12}
              color={useColorModeValue('gray.800', 'white')}
            >
              Trusted by Hospitals Nationwide
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              <TestimonialCard 
                quote="This platform has revolutionized how we manage our blood supply. We've reduced shortages by 60%."
                name="Dr. Sarah Johnson"
                title="Chief Medical Officer"
                hospital="City General Hospital"
              />
              <TestimonialCard 
                quote="The donor matching system is incredibly efficient. We can now find rare blood types in minutes."
                name="Dr. Michael Chen"
                title="Head of Hematology"
                hospital="Regional Medical Center"
              />
            </SimpleGrid>
          </Box>
        </Box>

        {/* Call to Action */}
        <Box 
          bgGradient="linear(to-r, red.600, red.500)" 
          color="white" 
          py={16} 
          px={{ base: 4, md: 8 }}
          textAlign="center"
        >
          <Box maxW="800px" mx="auto">
            <Heading 
              size="xl" 
              mb={6}
             
            >
              Ready to Make a Difference?
            </Heading>
            <Text 
              fontSize="xl" 
              mb={8}
              px={{ base: 0, md: 8 }}
            >
              Every 2 seconds, someone needs blood. Your participation can save lives.
            </Text>
            <Stack 
              direction={{ base: 'column', sm: 'row' }} 
              spacing={4} 
              justify="center"
            >
              <Button 
                colorScheme="whiteAlpha" 
                size="lg" 
                rightIcon={<FaHeartbeat />}
                px={8}
                _hover={{ transform: 'translateY(-2px)', bg: 'whiteAlpha.800' }}
                transition="all 0.2s"
              >
                Join Now
              </Button>
              <Button 
                variant="outline" 
                colorScheme="whiteAlpha" 
                size="lg"
                px={8}
                _hover={{ transform: 'translateY(-2px)', bg: 'whiteAlpha.200' }}
                transition="all 0.2s"
              >
                Contact Us
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

const FeatureCard = ({ icon, title, description, color }) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  
  return (
    <Box
      p={8}
      bg={cardBg}
      borderRadius="xl"
      boxShadow="lg"
      textAlign="center"
      transition="all 0.3s"
      _hover={{ 
        transform: 'translateY(-8px)', 
        shadow: 'xl',
        borderBottom: `4px solid`,
        borderColor: color
      }}
    >
      <Icon 
        as={icon} 
        w={12} 
        h={12} 
        color={color} 
        mb={6} 
        p={2}
        bg={`${color}.50`}
        borderRadius="full"
      />
      <Heading as="h3" size="lg" mb={4} color={useColorModeValue('gray.800', 'white')}>
        {title}
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.300')}>
        {description}
      </Text>
    </Box>
  );
};

const StatCard = ({ icon, number, label, color }) => {
  return (
    <Box textAlign="center">
      <Icon 
        as={icon} 
        w={10} 
        h={10} 
        color={color} 
        mb={4} 
        mx="auto"
      />
      <Heading 
        as="h3" 
        size="xl" 
        mb={2}
        color={useColorModeValue('gray.800', 'white')}
      >
        {number}
      </Heading>
      <Text 
        color={useColorModeValue('gray.600', 'gray.300')}
        fontWeight="medium"
      >
        {label}
      </Text>
    </Box>
  );
};

const TestimonialCard = ({ quote, name, title, hospital }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  
  return (
    <Box
      p={8}
      bg={cardBg}
      borderRadius="xl"
      boxShadow="lg"
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        bgGradient: 'linear(to-r, red.500, orange.500)',
        borderTopRadius: 'xl'
      }}
    >
      <Text 
        fontSize="lg" 
        mb={6} 
        fontStyle="italic"
        color={useColorModeValue('gray.700', 'gray.200')}
      >
        "{quote}"
      </Text>
      <Box>
        <Text 
          fontWeight="bold"
          color={useColorModeValue('gray.800', 'white')}
        >
          {name}
        </Text>
        <Text 
          color={useColorModeValue('gray.600', 'gray.300')}
          fontSize="sm"
        >
          {title}, {hospital}
        </Text>
      </Box>
    </Box>
  );
};

export default OrganisationHomePage;
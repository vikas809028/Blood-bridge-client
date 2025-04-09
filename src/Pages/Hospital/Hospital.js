// import React from 'react';
// import { 
//   Box, 
//   Flex, 
//   Heading, 
//   Text, 
//   Button, 
//   Image, 
//   Stack, 
//   Icon, 
//   SimpleGrid,
//   useColorModeValue 
// } from '@chakra-ui/react';
// import { FaHeartbeat, FaUserPlus, FaSearch, FaHandsHelping } from 'react-icons/fa';
// import Layout from '../../Component/shared/Layout/Layout';

// const WelcomePage = () => {
//   const bgColor = useColorModeValue('red.50', 'gray.800');
//   const cardBg = useColorModeValue('white', 'gray.700');

//   return (
//    <Layout>
//      <Box minH="100vh" bg={bgColor}>
    

//       {/* Hero Section */}
//       <Flex
//         align="center"
//         justify="center"
//         direction={{ base: 'column', md: 'row' }}
//         px={8}
//         py={16}
//       >
//         <Box flex="1" pr={{ md: 12 }} mb={{ base: 8, md: 0 }}>
//           <Heading as="h2" size="2xl" mb={4} color="red.600">
//             Connecting Hospital with Those in Need
//           </Heading>
//           <Text fontSize="xl" mb={8}>
//             Join our life-saving community today. Your donation can save up to 3 lives.
//           </Text>
         
//         </Box>
//         <Box flex="1">
//           <Image
//             src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
//             alt="Blood donation"
//             borderRadius="lg"
//             shadow="xl"
//           />
//         </Box>
//       </Flex>

  

//       {/* Call to Action */}
//       <Box bg="red.600" color="white" py={16} px={8} textAlign="center">
//         <Heading mb={6}>Ready to Make a Difference?</Heading>
//         <Text fontSize="xl" mb={8}>
//           Every 2 seconds, someone needs blood. Your donation matters.
//         </Text>
       
//       </Box>

     
//     </Box>
//    </Layout>
//   );
// };

// const FeatureCard = ({ icon, title, description }) => {
//   const cardBg = useColorModeValue('white', 'gray.700');
  
//   return (
//     <Box
//       p={8}
//       bg={cardBg}
//       borderRadius="lg"
//       boxShadow="md"
//       textAlign="center"
//       transition="all 0.2s"
//       _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
//     >
//       <Icon as={icon} w={10} h={10} color="red.500" mb={4} />
//       <Heading as="h3" size="md" mb={4} color="red.600">
//         {title}
//       </Heading>
//       <Text>{description}</Text>
//     </Box>
//   );
// };

// export default WelcomePage;

import React from 'react';
import Layout from '../../Component/shared/Layout/Layout';
import { FaHeartbeat, FaUserPlus, FaSearch, FaHandsHelping } from 'react-icons/fa';

const features = [
  {
    icon: <FaHeartbeat className="w-8 h-8 mb-4 text-red-500" />,
    title: "Save Lives",
    description: "Your donation can save up to 3 lives. Make a difference today.",
  },
  {
    icon: <FaUserPlus className="w-8 h-8 mb-4 text-red-500" />,
    title: "Easy Registration",
    description: "Sign up in minutes and become a part of our life-saving community.",
  },
  {
    icon: <FaSearch className="w-8 h-8 mb-4 text-red-500" />,
    title: "Find Donors",
    description: "Hospitals can easily connect with registered donors in real-time.",
  },
  {
    icon: <FaHandsHelping className="w-8 h-8 mb-4 text-red-500" />,
    title: "Community Support",
    description: "Join hands with others in your city to build a supportive network.",
  },
];

const WelcomePage = () => {
  return (
    <Layout>
      {/* Custom CSS Animations */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
          }
        `}
      </style>

      <div className="min-h-screen text-gray-800 bg-red-50">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-between px-6 py-16 md:flex-row md:px-20">
          <div className="mb-10 md:w-1/2 md:mb-0 fade-in-up">
            <h2 className="mb-4 text-4xl font-bold text-red-600">
              Connecting Hospitals with Donors
            </h2>
            <p className="mb-6 text-lg">
              Join our life-saving community today. Your donation can save lives and give hope.
            </p>
            <button className="px-6 py-3 font-semibold text-white transition duration-300 bg-red-600 rounded-lg shadow-md hover:bg-red-700">
              Get Started
            </button>
          </div>
          <div className="md:w-1/2 fade-in-up">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
              alt="Blood donation"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="px-6 py-10 md:px-20 fade-in-up">
          <h3 className="mb-10 text-3xl font-bold text-center text-red-600">
            Why Join Us?
          </h3>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 text-center transition duration-300 transform bg-white shadow rounded-xl hover:shadow-lg hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.2}s`, animationFillMode: 'both' }}
              >
                {feature.icon}
                <h4 className="mb-2 text-lg font-semibold text-red-600">
                  {feature.title}
                </h4>
                <p className="text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="px-6 py-16 text-center text-white bg-red-600 md:px-20 fade-in-up">
          <h3 className="mb-4 text-3xl font-bold">Ready to Make a Difference?</h3>
          <p className="mb-6 text-lg">
            Every 2 seconds, someone needs blood. Your donation matters more than ever.
          </p>
        
        </div>
      </div>
    </Layout>
  );
};

export default WelcomePage;

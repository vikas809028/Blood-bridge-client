import React from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, VStack, HStack, Icon, Link, Text } from "@chakra-ui/react";
import {
  FaWarehouse,
  FaHandHoldingMedical,
  FaHospital,
  FaBuilding,
} from "react-icons/fa";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const donorMenu = [
    { to: "/donar", icon: FaBuilding, label: "Home" },
    { to: "/donor/donation", icon: FaBuilding, label: "Donation" },
    { to: "/donor/donate", icon: FaBuilding, label: "Donate" },
    { to: "/donor/purchase", icon: FaBuilding, label: "Purchase" },
    { to: "/donor/analytics", icon: FaBuilding, label: "Analytics" },
  ];

  const adminMenu = [
    { to: "/admin", icon: FaBuilding, label: "Home" },
    { to: "/admin/donars", icon: FaWarehouse, label: "Donar List" },
    {
      to: "/admin/hospitals",
      icon: FaHandHoldingMedical,
      label: "Hospital List",
    },
    {
      to: "/admin/organizations",
      icon: FaHospital,
      label: "Organisation List",
    },
    { to: "/admin/analytics", icon: FaBuilding, label: "Analytics" },
  ];

  const hospitalMenu = [
    { to: "/hospital", icon: FaBuilding, label: "Home" },
    { to: "/hospital/consumer", icon: FaBuilding, label: "consumer" },
    { to: "/hospital/analytics", icon: FaBuilding, label: "Analytics" },
    {
      to: "/hospital/organizations",
      icon: FaBuilding,
      label: "Organisation",
    },
  ];

  const organisationMenu = [
    { to: "/organization", icon: FaWarehouse, label: "Home" },
    { to: "/organization/donor", icon: FaWarehouse, label: "Donar" },
    {
      to: "/organization/donations",
      icon: FaHandHoldingMedical,
      label: "Donations",
    },
    {
      to: "/organization/donationrequests",
      icon: FaHandHoldingMedical,
      label: "Pending Donations",
    },
    {
      to: "/organization/consumers",
      icon: FaHandHoldingMedical,
      label: "Consumers",
    },
    { to: "/organization/analytics", icon: FaHospital, label: "Analytics" },
  ];

  const renderMenuItems = (menuItems) => {
    return menuItems.map((item) => (
      <HStack
        key={item.to}
        as={RouterLink}
        to={item.to}
        align="center"
        spacing={3}
        px={4}
        py={2}
        borderRadius="md"
        bg={location.pathname === item.to ? "red.500" : "transparent"}
        color={location.pathname === item.to ? "white" : "gray.700"}
        _hover={{ bg: "red.600", color: "white" }}
      >
        <Icon as={item.icon} />
        <Text>{item.label}</Text>
      </HStack>
    ));
  };

  return (
    <Box bg="gray.100" w="250px" minH="90vh" p={4}>
      <VStack spacing={4} align="stretch">
        {user?.role === "organisation" && renderMenuItems(organisationMenu)}
        {user?.role === "admin" && renderMenuItems(adminMenu)}
        {user?.role === "donar" && renderMenuItems(donorMenu)}
        {user?.role === "hospital" && renderMenuItems(hospitalMenu)}
      </VStack>
    </Box>
  );
};

export default Sidebar;

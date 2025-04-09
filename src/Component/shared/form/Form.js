
import React, { useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../Services/authService";
import {
  Box,
  Heading,
  Text,
  Button,
  Radio,
  RadioGroup,
  Stack,
  Divider,
  useColorModeValue,
  FormControl,
  FormLabel,
  Flex,
} from "@chakra-ui/react";
import {
  FaUser,
  FaHospitalSymbol,
  FaHandsHelping,
  FaUserShield,
  FaHandHoldingWater,
} from "react-icons/fa";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const cardBg = useColorModeValue("white", "gray.700");
  const roleHoverBg = useColorModeValue("red.50", "red.900");


  const RoleButton = ({ value, icon: Icon, label }) => (
    <FormControl
      as="label"
      p={3}
      borderWidth="1px"
      borderRadius="md"
      cursor="pointer"
      _hover={{ bg: roleHoverBg }}
      bg={role === value ? "red.50" : "transparent"}
      borderColor={role === value ? "red.300" : "gray.200"}
    >
      <Flex align="center" gap={2}>
        <Radio value={value} colorScheme="red" />
        <Icon color="red.500" />
        <Text fontSize="sm" fontWeight="500">
          {label}
        </Text>
      </Flex>
    </FormControl>
  );

  return (
    <Box
      maxW="lg"
      mx="auto"
      p={8}
      bg={cardBg}
      boxShadow="xl"
      rounded="2xl"
      borderWidth="1px"
      borderColor="red.100"
    >
     
        <Heading
        as="h1"
        size="xl"
        textAlign="center"
        mb={6}
        color="red.600"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <FaHandHoldingWater />
        {formTitle}
      </Heading>
   

      <form
        onSubmit={(e) => {
          if (formType === "login")
            return handleLogin(e, email, password, role);
          else if (formType === "register")
            return handleRegister(
              e,
              name,
              role,
              email,
              password,
              phone,
              organisationName,
              address,
              hospitalName,
              website
            );
        }}
      >
        <RadioGroup value={role} onChange={setRole} mb={8}>
          <Stack direction={["column", "row"]} spacing={4} wrap="wrap">
            <RoleButton value="donar" icon={FaUser} label="Donor" />
            <RoleButton value="admin" icon={FaUserShield} label="Admin" />
            <RoleButton
              value="hospital"
              icon={FaHospitalSymbol}
              label="Hospital"
            />
            <RoleButton
              value="organisation"
              icon={FaHandsHelping}
              label="Organization"
            />
          </Stack>
        </RadioGroup>

        <Divider borderColor="red.100" mb={8} />

        <Stack spacing={6}>
          {(() => {
            switch (true) {
              case formType === "login":
                return (
                  <>
                    <InputType
                      labelText="Email"
                      inputType="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputType
                      labelText="Password"
                      inputType="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </>
                );
              case formType === "register":
                return (
                  <>
                    {(role === "admin" || role === "donar") && (
                      <InputType
                        labelText="Name"
                        inputType="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    )}
                    {role === "organisation" && (
                      <InputType
                        labelText="Organization Name"
                        inputType="text"
                        value={organisationName}
                        onChange={(e) => setOrganisationName(e.target.value)}
                      />
                    )}
                    {role === "hospital" && (
                      <InputType
                        labelText="Hospital Name"
                        inputType="text"
                        value={hospitalName}
                        onChange={(e) => setHospitalName(e.target.value)}
                      />
                    )}
                    <InputType
                      labelText="Email"
                      inputType="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputType
                      labelText="Password"
                      inputType="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputType
                      labelText="Website"
                      inputType="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                    <InputType
                      labelText="Address"
                      inputType="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <InputType
                      labelText="Phone"
                      inputType="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </>
                );
            }
          })()}

          <Button
            colorScheme="red"
            size="lg"
            type="submit"
            width="full"
            py={6}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            transition="all 0.2s"
          >
            {submitBtn}
          </Button>

          <Text textAlign="center" color="gray.600">
            {formType === "login" ? (
              <>
                Not registered yet?{" "}
                <Link
                  to="/register"
                  className="font-medium text-red-600 hover:underline"
                >
                  Create Account
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-red-600 hover:underline"
                >
                  Sign In
                </Link>
              </>
            )}
          </Text>
        </Stack>
      </form>
    </Box>
  );
};

export default Form;

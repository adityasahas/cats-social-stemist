import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Button,
  IconButton,
  useDisclosure,
  HStack,
  useColorModeValue,
  useColorMode,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";


const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const focusBgColor = useColorModeValue("gray.300", "gray.700");

  const navBgColor = useColorModeValue("#ffffff9c", "#efefef19");

  const ColorModeToggle = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
      <IconButton
        aria-label="Toggle color mode"
        variant="ghost"
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        size={"sm"}
      />
    );
  };

  const router = useRouter();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Schedule", href: "#schedule" },
    { name: "Prizes", href: "#prizes" },
    { name: "FAQ", href: "#faq" },
    { name: "Sponsors", href: "#sponsors" },
  ];

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      w="100%"
      justifyContent="center"
      my={"30px"}
      position={"fixed"}
      zIndex={"999"}
    >
      {/* Mobile Drawer */}
      <Flex
        display={{ base: "flex", xl: "none" }} // Show on mobile, hide on xl screens
        justifyContent="space-between"
        w={{ base: "95%", sm: "60%"}}
        px={"30px"}
        py={"10px"}
        backdropFilter="blur(8px)"
        backgroundClip="padding-box"
        bgColor={navBgColor}
        borderRadius={"lg"}
        boxShadow={"lg"}
      >
        <Flex alignItems={"center"}>
          <Image
            src="/TechOptimumLogo.png"
            alt="Tech Optimum Logo"
            boxSize="50px"
            borderRadius={"full"}
            width={"32px"}
            height={"32px"}
            mr={"10px"}
          />
          <Text fontSize="lg" fontWeight="bold">
            Hacks SZN 2
          </Text>
        </Flex>
        <IconButton
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          variant="ghost"
          size={"sm"}
          onClick={onToggle}
          aria-label="Toggle Menu"
        />
      </Flex>

      {/* Mobile Drawer Content */}
      <Drawer placement="right" onClose={onToggle} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent
            bgGradient={`linear(-45deg, #3d89d52c, #797de823 50%, #ed4e862c)`}
          >
            <DrawerCloseButton />

            <DrawerHeader>
              <Image
                src="/TechOptimumLogo.png"
                alt="Tech Optimum Logo"
                boxSize="50px"
                borderRadius={"full"}
                width={"32px"}
                height={"32px"}
                mr={"10px"}
              />
            </DrawerHeader>

            <DrawerBody>
              <Flex direction="column">
                {navLinks.map((link) => (
                  <Button
                    key={link.name}
                    variant="unstyled"
                    color={colorMode === "light" ? "#2b6db1" : "#3399ff"}
                    _hover={{
                      color: colorMode === "light" ? "#004182" : "#96c5f3",
                    }}
                    _focus={{ bg: focusBgColor }}
                    isActive={router.pathname === link?.href}
                    onClick={() => {
                      router.push(link?.href);
                      onToggle(); // Close the drawer on link click
                    }}
                    fontWeight={"700"}
                    fontSize={"20px"}
                    my={1}
                  >
                    {link.name}
                  </Button>
                ))}
              </Flex>
            </DrawerBody>

            
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>

      {/* Desktop Navbar */}
      <Flex
        display={{ base: "none", xl: "flex" }} // Hide on mobile, show on xl screens
        h={16}
        alignItems="center"
        border="1px solid #ffffff17"
        borderRadius={"18px"}
        justifyContent={"space-between"}
        w={"80%"}
        px={"30px"}
        backdropFilter="blur(8px)"
        backgroundClip="padding-box"
        bgColor={navBgColor}
        boxShadow={"0 0 10px #00000017"}
      >
        <Flex alignItems={"center"}>
          <Image
            src="/TechOptimumLogo.png"
            alt="Tech Optimum Logo"
            boxSize="50px"
            borderRadius={"full"}
            width={"32px"}
            height={"32px"}
            mr={"10px"}
          />
          <Text fontSize="lg" fontWeight="bold">
            Hacks SZN 2
          </Text>
        </Flex>

        <Flex alignItems="center" justifyContent="center" gap={"20px"}>
          {navLinks.map((link) => (
            <Button
              key={link.name}
              variant="unstyled"
              color={colorMode === "light" ? "#2b6db1" : "#3399ff"}
              _hover={{ color: colorMode === "light" ? "#004182" : "#96c5f3" }}
              _focus={{ bg: focusBgColor }}
              isActive={router.pathname === link?.href}
              onClick={() => router.push(link?.href)}
              fontWeight={"700"}
              fontSize={"20px"}
            >
              {link.name}
            </Button>
          ))}
        </Flex>

      </Flex>
    </Flex>
  );
};

export default Navbar;

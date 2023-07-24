/* eslint-disable */

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
  Avatar
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();

  const router = useRouter();

  const { data: session } = useSession();
  let navLinks = [
    { name: "Home", href: "/" },
    { name: "Feed", href: "/feed" },
    { name: "Create", href: "/create" },
  ];
  if (!session) {
    navLinks.pop();
    navLinks.push({ name: "Login", href: "/login" });
  }


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
        w={{ base: "95%", sm: "60%" }}
        px={"30px"}
        py={"10px"}
        backdropFilter="blur(8px)"
        backgroundClip="padding-box"
        bgColor={"#ffffff21"}
        borderRadius={"lg"}
        boxShadow={"lg"}
      >
        <Flex alignItems={"center"}>
          <Image
            src="/logo.png"
            alt="Logo"
            boxSize="50px"
            borderRadius={"full"}
            width={"42px"}
            height={"42px"}
            mr={"10px"}
          />
          <Text fontSize="lg" fontWeight="bold">
            Cat Social
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
                src="/logo.png"
                alt="catsocial"
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
                    color={"#111111"}
                    _hover={{
                      bg: "#1c1c1c21",
                    }}
                    // _focus={{ bg: focusBgColor }}
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
        w={"50%"}
        px={"30px"}
        backdropFilter="blur(8px)"
        backgroundClip="padding-box"
        bgColor={"#ffffff21"}
        boxShadow={"0 0 10px #00000017"}
       
      >
        <Flex alignItems={"center"}>
          <Image
            src="/logo.png"
            alt="CatSocial Logo"
            boxSize="50px"
            borderRadius={"full"}
            width={"42px"}
            height={"42px"}
            mr={"10px"}
            transition={"all 0.2s ease-in-out"}
            _hover={{transform: " rotate(20deg) scale(1.1)"}}
          />
          <Text fontSize="lg" fontWeight="bold">
            Cat Social
          </Text>
        </Flex>

        <Flex alignItems="center" justifyContent="center" gap={"10px"}>
          {navLinks.map((link) => (
            <Button
              key={link.name}
              variant="unstyled"
              color={"#111111"}
              _hover={{
                bg: "#1c1c1c21",
              }}
              px={"10px"}
              // _focus={{ bg: focusBgColor }}
              isActive={router.pathname === link?.href}
              onClick={() => router.push(link?.href)}
              fontWeight={"500"}
              fontSize={"18px"}
            >
              {link.name}
            </Button>
          ))}
          {/* @ts-ignore */}
          {session && <Avatar size={"sm"} src={session.user.image} />}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;

// components/Navbar.tsx

import { Box, Flex, HStack, IconButton, useDisclosure, Stack } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import React from "react";
import Link from 'next/link'

const Links: { pageName: string, pageLink: string }[] = [
    { pageName: 'Home', pageLink: '/' },
    { pageName: 'Login', pageLink: '/login' }
];

const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <Link href={href} passHref>
        <Box
            px={2}
            py={1}
            rounded={'md'}
            _hover={{
                textDecoration: 'none',
                bg: 'gray.200',
            }}
        >
            {children}
        </Box>
    </Link>
);

function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box px={4} py={4} bg="transparent" position="fixed" width="100%" zIndex={10}>
            <Flex h={20} alignItems={'center'} justifyContent={'center'}>
                <IconButton
                    size={'md'}
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label={'Open Menu'}
                    display={{ md: 'none' }}
                    onClick={isOpen ? onClose : onOpen}
                />
                <HStack spacing={8} alignItems={'center'}>
                    <Box fontSize="xl" fontWeight="bold" letterSpacing="widest">Cat Chat</Box>
                    <HStack
                        as={'nav'}
                        spacing={4}
                        display={{ base: 'none', md: 'flex' }}
                    >
                        {Links.map((link) => (
                            <NavLink key={link.pageName} href={link.pageLink}>{link.pageName}</NavLink>
                        ))}
                    </HStack>
                </HStack>
            </Flex>

            {isOpen ? (
                <Box pb={4} display={{ md: 'none' }}>
                    <Stack as={'nav'} spacing={4}>
                        {Links.map((link) => (
                            <NavLink key={link.pageName} href={link.pageLink}>{link.pageName}</NavLink>
                        ))}
                    </Stack>
                </Box>
            ) : null}
        </Box>
    );
};

export default Navbar;

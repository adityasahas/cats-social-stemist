
import React from 'react';
import { Box } from "@chakra-ui/react";
import Navbar from '..//components/navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
  </>
);

export default Layout;

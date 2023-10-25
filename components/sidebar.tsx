"use client";
import {
  Box,
  CloseButton,
  Drawer,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  ManagerSidebarProps,
  SidebarProps,
  NavItemProps,
  LinkItemProps,
} from "../types/types";
import { useRouter } from "next/navigation";
import { FiSettings, FiUsers } from "react-icons/fi";
import { AiOutlineTransaction } from "react-icons/ai";
import KraIcon from "../public/kra.png";

const LinkItems: Array<LinkItemProps> = [
  { name: "Users", icon: FiUsers, path: "users" },
  { name: "Transactions", icon: AiOutlineTransaction, path: "transactions" },
  { name: "Setting", icon: FiSettings, path: "settings" },
];

const Sidebar = ({ children }: ManagerSidebarProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size={"full"}
        children="undefined"
      ></Drawer>
      <Box ml={{ base: 0, md: 400 }} p={4}>
        {children}
      </Box>
    </Box>
  );
};

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 400 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="left" m={4}>
        <Image
          borderRadius="full"
          boxSize="80px"
          src={KraIcon.src}
          alt="kra icon"
        />
        <Text fontSize="5xl" color="green.600" fontWeight="bold" as="i">
          KRA
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          <Text
            color="black"
            _groupHover={{ color: "white" }}
            fontWeight="250"
            fontSize="25"
          >
            {link.name}
          </Text>
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, path, ...rest }: NavItemProps) => {
  const router = useRouter();
  return (
    <Box
      as="a"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        onClick={() => router.push(`/${path}`)}
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            color="black"
            mr="4"
            fontSize="30"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

export default Sidebar;

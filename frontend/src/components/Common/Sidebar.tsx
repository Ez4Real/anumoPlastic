import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react"
import { useQueryClient } from "@tanstack/react-query"
import { FiLogOut, FiMenu } from "react-icons/fi"

import type { UserPublic } from "../../client"
import useAuth from "../../hooks/useAuth"
import SidebarItems from "./SidebarItems"
import SwitchLocalization from "../SwitchLocalization"

const Sidebar = () => {
  const queryClient = useQueryClient()
  const bgColor = useColorModeValue("ui.light", "ui.dark")
  const textColor = useColorModeValue("ui.dark", "ui.light")
  const secBgColor = useColorModeValue("ui.secondary", "ui.darkSlate")
  const logoFilter = useColorModeValue("invert(1)", "none");
  const languageSeparatorColor = useColorModeValue("ui.dark", "ui.light");
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { logout } = useAuth()

  const handleLogout = async () => {
    logout()
  }

  return (
    <>
      {/* Mobile */}
      <IconButton
        onClick={onOpen}
        display={{ base: "flex", md: "none" }}
        aria-label="Open Menu"
        position="absolute"
        fontSize="20px"
        m={4}
        icon={<FiMenu />}
      />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent maxW="250px">
          <DrawerCloseButton />
          <DrawerBody py={8}>
            <Flex flexDir="column" justify="space-between">
              <Box>
                <Image
                  src="logo.svg"
                  alt="Anumo Logo"
                  p={6}
                  />
                <SidebarItems onClose={onClose} />
                <Flex
                  as="button"
                  onClick={handleLogout}
                  p={2}
                  color="ui.danger"
                  fontWeight="bold"
                  alignItems="center"
                >
                  <FiLogOut />
                  <Text ml={2}>Log out</Text>
                </Flex>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                {currentUser?.email && (
                  <Text
                    color={textColor}
                    noOfLines={2}
                    fontSize="sm"
                    p={2}
                    maxW="180px"
                  >
                    Logged in as: {currentUser.email}
                  </Text>
                )}
                <SwitchLocalization
                  separatorLineColor={languageSeparatorColor}
                  fontSize=".875rem"
                />
              </Box>
              
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Desktop */}
      <Box
        bg={bgColor}
        p={2}
        minHeight="330px"
        h="100vh"
        position="sticky"
        top="0"
        display={{ base: "none", md: "flex" }}
      >
        <Flex
          flexDir="column"
          justify="space-between"
          bg={secBgColor}
          p={4}
          borderRadius={12}
        >
          <Box>
            <Image
              src="logo.svg"
              alt="Anumo Logo"
              w="180px"
              maxW="2xs"
              p={6}
              filter={logoFilter}
            />
            <SidebarItems />
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {currentUser?.email && (
              <Text
                color={textColor}
                noOfLines={2}
                fontSize="sm"
                maxW="180px"
              >
                Logged in as: {currentUser.email}
              </Text>
            )}
            <SwitchLocalization
              containerWidth="2rem"   
              separatorLineColor={languageSeparatorColor}
              fontSize=".875rem"
            />
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default Sidebar

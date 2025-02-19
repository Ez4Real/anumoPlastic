import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react"
import { FiFileText, FiMoreVertical } from "react-icons/fi";
import { FiEdit, FiTrash } from "react-icons/fi"

import { Link as RouterLink } from "@tanstack/react-router"
import type { OrderPublic, ProductPublic, UserPublic } from "../../client"
import EditUser from "../Admin/EditUser"
import EditProduct from "../Products/EditProduct"
import Delete from "./DeleteAlert"

interface ActionsMenuProps {
  type: string
  value: ProductPublic | UserPublic | OrderPublic
  disabled?: boolean
}

const ActionsMenu = ({ type, value, disabled }: ActionsMenuProps) => {
  const editUserModal = useDisclosure()
  const deleteModal = useDisclosure()

  return (
    <>
      <Menu>
        <MenuButton
          isDisabled={disabled}
          as={IconButton}
          icon={<FiMoreVertical />}
          variant="unstyled"
          display="flex"
          />
        <MenuList>
          {type === "Product" && (
            <MenuItem
              as={RouterLink}
              to={value.id}
              icon={<FiFileText fontSize="16px" />}
            >Details
            </MenuItem>
          )}
          <MenuItem
            onClick={editUserModal.onOpen}
            icon={<FiEdit fontSize="16px" />}
          >
            Edit {type}
          </MenuItem>
          <MenuItem
            onClick={deleteModal.onOpen}
            icon={<FiTrash fontSize="16px" />}
            color="ui.danger"
          >
            Delete {type}
          </MenuItem>
        </MenuList>
        {type === "User" ? (
          <EditUser
            user={value as UserPublic}
            isOpen={editUserModal.isOpen}
            onClose={editUserModal.onClose}
          />
        ) : (
          <EditProduct
            product={value as ProductPublic}
            isOpen={editUserModal.isOpen}
            onClose={editUserModal.onClose}
          />
        )}
        
        <Delete
          type={type}
          id={value.id}
          isOpen={deleteModal.isOpen}
          onClose={deleteModal.onClose}
        />
      </Menu>
    </>
  )
}

export default ActionsMenu

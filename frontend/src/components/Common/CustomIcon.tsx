import { type As, Icon } from "@chakra-ui/react"
interface ProductSizeFieldProps {
  icon: As
  isIndeterminate: boolean
  isChecked: boolean
}

const CustomIcon = ({
  icon,
  isIndeterminate,
  isChecked,
  ...rest
}: ProductSizeFieldProps) => {
  return (
    <>
      <Icon as={icon} boxSize="1rem" {...rest}></Icon>
    </>
  )
}

export default CustomIcon

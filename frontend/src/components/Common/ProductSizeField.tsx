import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react"
import type { Dispatch, SetStateAction } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { FiList } from "react-icons/fi"
import CustomIcon from "./CustomIcon"

interface ProductSizeFieldProps {
  id: string
  isChecked: boolean
  setIsChecked: Dispatch<SetStateAction<boolean>>
}

const ProductSizeField = ({
  id,
  isChecked,
  setIsChecked,
}: ProductSizeFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const { t } = useTranslation()

  return (
    <FormControl isRequired isInvalid={!!errors[id]}>
      <FormLabel htmlFor={id}>
        {t(`AdminPanel.products.addProduct.fields.${id}.title`)}
      </FormLabel>
      <InputGroup>
        <Input
          id={id}
          {...register(id, {
            required: t(`AdminPanel.products.addProduct.fields.${id}.required`),
            validate: (value) => {
              if (isChecked) {
                return value.length > 0
              }
              return value.trim() !== ""
            },
            setValueAs: (value) => {
              if (isChecked) {
                if (typeof value === "string") {
                  const sizes = value
                    .trim()
                    .split(" ")
                    .filter((size) => size !== "")
                  return sizes
                }
                return value
              }
              if (typeof value === "string") {
                return value.trim()
              }
              return value
            },
          })}
          placeholder={
            isChecked
              ? t(
                  `AdminPanel.products.addProduct.fields.${id}.placeholder.multiple`,
                )
              : t(
                  `AdminPanel.products.addProduct.fields.${id}.placeholder.single`,
                )
          }
        />
        <InputRightElement>
          <Checkbox
            isChecked={isChecked}
            isRequired={false}
            onChange={() => setIsChecked(!isChecked)}
            icon={
              <CustomIcon
                icon={FiList}
                isChecked={isChecked}
                isIndeterminate={false}
              />
            }
            sx={{
              ".chakra-checkbox__control": {
                width: "1.75rem",
                height: "1.75rem",
                borderWidth: "1px",
              },
              ".chakra-checkbox__control[data-checked]": {
                bg: "ui.main",
                color: "ui.light",
                borderColor: "ui.main",
              },
              ".chakra-checkbox__control[data-invalid]": {
                borderColor: "inherit",
              },
              ".chakra-checkbox__control[data-checked][data-hover]": {
                bg: "ui.main",
                borderColor: "ui.main",
              },
              ".chakra-checkbox__control:focus-visible, .chakra-checkbox__control[data-focus-visible], .chakra-checkbox__control[data-checked][data-focus-visible]":
                {
                  boxShadow: "0 0 0 3px rgba(0, 150, 136, 0.6)",
                },
            }}
          />
        </InputRightElement>
      </InputGroup>
      {errors[id] && (
        <FormErrorMessage>{errors[id].message as string}</FormErrorMessage>
      )}
    </FormControl>
  )
}

export default ProductSizeField

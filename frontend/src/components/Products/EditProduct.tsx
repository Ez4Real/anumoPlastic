import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type SubmitHandler, useForm } from "react-hook-form"

import {
  type ApiError,
  type ProductPublic,
  type ProductUpdate,
  ProductsService,
} from "../../client"
import useCustomToast from "../../hooks/useCustomToast"
import { handleError } from "../../utils"

interface EditProductProps {
  product: ProductPublic
  isOpen: boolean
  onClose: () => void
}

const EditProduct = ({ product, isOpen, onClose }: EditProductProps) => {
  const queryClient = useQueryClient()
  const showToast = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<ProductUpdate>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: product,
  })

  const mutation = useMutation({
    mutationFn: (data: ProductUpdate) =>
      ProductsService.updateProduct({ id: product.id, requestBody: data }),
    onSuccess: () => {
      showToast("Success!", "Product updated successfully.", "success")
      onClose()
    },
    onError: (err: ApiError) => {
      handleError(err, showToast)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })

  const onSubmit: SubmitHandler<ProductUpdate> = async (data) => {
    mutation.mutate(data)
  }

  const onCancel = () => {
    reset()
    onClose()
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "sm", md: "md" }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={!!errors.title_en}>
              <FormLabel htmlFor="title_en">EN Title</FormLabel>
              <Input
                id="title_en"
                {...register("title_en", {
                  required: "English Title is required",
                })}
                type="text"
              />
              {errors.title_en && (
                <FormErrorMessage>{errors.title_en.message}</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter gap={3}>
            <Button
              variant="primary"
              type="submit"
              isLoading={isSubmitting}
              isDisabled={!isDirty}
            >
              Save
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditProduct

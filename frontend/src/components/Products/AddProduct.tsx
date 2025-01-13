import { useState } from "react";

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
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,

} from "@chakra-ui/react"
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type SubmitHandler, useForm } from "react-hook-form"

import { type ApiError, type ProductCreate, ProductsService } from "../../client"
import useCustomToast from "../../hooks/useCustomToast"
import { handleError } from "../../utils"

interface AddProductProps {
  isOpen: boolean
  onClose: () => void
}

const AddProduct = ({ isOpen, onClose }: AddProductProps) => {
  const { t } = useTranslation();
  
  const queryClient = useQueryClient()
  const showToast = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductCreate>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      category: undefined,
      title_en: "",
      title_uk: "",
      material_en: "",
      material_uk: "",
      price_usd: 0,
      price_uah: 0,
      size: "",
      weight: "",
      tag: null,
      images: []
    },
  })

  const mutation = useMutation({
    mutationFn: (data: ProductCreate) =>
      ProductsService.createProduct({ requestBody: data }),
    onSuccess: () => {
      showToast(
        t('AdminPanel.products.addProduct.onSuccessCreateToast.Success'),
        t('AdminPanel.products.addProduct.onSuccessCreateToast.created'),
        "success")
      reset()
      onClose()
    },
    onError: (err: ApiError) => {
      handleError(err, showToast)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })

  const onSubmit: SubmitHandler<ProductCreate> = (data) => {
    mutation.mutate(data)
  }

  

  const format = (val: string, symbol: string) => symbol + val
  const parse = (val: string) => val.replace(/^\$/, '')

  const [usdValue, setUsdValue] = useState('0')
  const [uahValue, setUahValue] = useState('0')
  

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "lg"}}
        isCentered
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)} maxW='95%' margin="2rem">
          <ModalHeader>Add Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired isInvalid={!!errors.category} variant="floatingLabel">
              <FormLabel htmlFor="category">
                {t('AdminPanel.products.addProduct.fields.category.title')}
              </FormLabel>
              <Select placeholder={t('AdminPanel.products.addProduct.fields.category.placeholder')}>
                <option value='Carabiner'>
                  {t('AdminPanel.products.categories.carabiner')}
                </option>
                <option value='Book holder'>
                  {t('AdminPanel.products.categories.bookHolder')}
                </option>
                <option value='Choker'>
                  {t('AdminPanel.products.categories.choker')}
                </option>
                <option value='Plate'>
                  {t('AdminPanel.products.categories.plate')}
                </option>
                <option value='Soap holder'>
                  {t('AdminPanel.products.categories.soapHolder')}
                </option>
              </Select>
              {errors.category && (
                <FormErrorMessage>{errors.category.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.title_en} mt={4}>
              <FormLabel htmlFor="title_en">
                {t('AdminPanel.products.addProduct.fields.title_en.title')}
              </FormLabel>
              <Input
                id="title_en"
                {...register("title_en", {
                  required: t('AdminPanel.products.addProduct.fields.title_en.required')
                })}
                placeholder={t('AdminPanel.products.addProduct.fields.title_en.placeholder')}
                type="text"
              />
              {errors.title_en && (
                <FormErrorMessage>{errors.title_en.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.title_uk} mt={4}>
              <FormLabel htmlFor="title_uk">
                {t('AdminPanel.products.addProduct.fields.title_uk.title')}
              </FormLabel>
              <Input
                id="title_uk"
                {...register("title_uk", {
                  required: t('AdminPanel.products.addProduct.fields.title_uk.required')
                })}
                placeholder={t('AdminPanel.products.addProduct.fields.title_uk.placeholder')}
                type="text"
              />
              {errors.title_uk && (
                <FormErrorMessage>{errors.title_uk.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.material_en} mt={4}>
              <FormLabel htmlFor="material_en">
                {t('AdminPanel.products.addProduct.fields.material_en.title')}
              </FormLabel>
              <Input
                id="material_en"
                {...register("material_en", {
                  required: t('AdminPanel.products.addProduct.fields.material_en.required')
                })}
                placeholder={t('AdminPanel.products.addProduct.fields.material_en.placeholder')}
                type="text"
              />
              {errors.material_en && (
                <FormErrorMessage>{errors.material_en.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.material_uk} mt={4}>
              <FormLabel htmlFor="material_uk">
                {t('AdminPanel.products.addProduct.fields.material_uk.title')}
              </FormLabel>
              <Input
                id="material_uk"
                {...register("material_uk", {
                  required: t('AdminPanel.products.addProduct.fields.material_uk.required')
                })}
                placeholder={t('AdminPanel.products.addProduct.fields.material_uk.placeholder')}
                type="text"
              />
              {errors.material_uk && (
                <FormErrorMessage>{errors.material_uk.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.price_usd} mt={4}>
              <FormLabel htmlFor="price_usd">
                {t('AdminPanel.products.addProduct.fields.price_usd.title')}
              </FormLabel>
              <NumberInput
                {...register("price_usd", {
                  required: t('AdminPanel.products.addProduct.fields.price_usd.required')
                })}
                onChange={(val) => setUsdValue(parse(val))}
                value={format(usdValue, "$")}
                
                defaultValue={0}
                precision={2}
                step={0.2}
                min={0}
                max={10000}
                clampValueOnBlur={true}
                keepWithinRange={true}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {errors.price_usd && (
                <FormErrorMessage>{errors.price_usd.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.price_uah} mt={4}>
              <FormLabel htmlFor="price_uah">
                {t('AdminPanel.products.addProduct.fields.price_uah.title')}
              </FormLabel>
              <NumberInput
                onChange={(val) => setUahValue(parse(val))}
                value={format(uahValue, "₴")}

                defaultValue={0}
                precision={2}
                step={0.2}
                min={0}
                max={10000}
                clampValueOnBlur={true}
                keepWithinRange={true}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {errors.price_uah && (
                <FormErrorMessage>{errors.price_uah.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.size} mt={4}>
              <FormLabel htmlFor="size">
                {t('AdminPanel.products.addProduct.fields.size.title')}
              </FormLabel>
              <Input
                id="size"
                {...register("size", {
                  required: t('AdminPanel.products.addProduct.fields.size.required')
                })}
                placeholder={t('AdminPanel.products.addProduct.fields.size.placeholder')}
                type="text"
              />
              {errors.size && (
                <FormErrorMessage>{errors.size.message}</FormErrorMessage>
              )}
            </FormControl>
            
            <FormControl isInvalid={!!errors.weight} mt={4}>
              <FormLabel htmlFor="weight">
                {t('AdminPanel.products.addProduct.fields.weight.title')}
              </FormLabel>
              <Input
                id="weight"
                {...register("weight")}
                placeholder={t('AdminPanel.products.addProduct.fields.weight.placeholder')}
                type="text"
              />
              {errors.weight && (
                <FormErrorMessage>{errors.weight.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.tag} variant="floatingLabel">
              <FormLabel htmlFor="tag">
                {t('AdminPanel.products.addProduct.fields.tag.title')}
              </FormLabel>
              <Select placeholder={t('AdminPanel.products.addProduct.fields.tag.placeholder')}>
                <option value='bunny'>
                  {t('AdminPanel.products.tags.bunny')}
                </option>
                <option value='heart'>
                  {t('AdminPanel.products.tags.heart')}
                </option>
                <option value='shuriken'>
                  {t('AdminPanel.products.tags.shuriken')}
                </option>
                <option value='spikelet'>
                  {t('AdminPanel.products.tags.spikelet')}
                </option>
              </Select>
              {errors.tag && (
                <FormErrorMessage>{errors.tag.message}</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter gap={3}>
            <Button variant="primary" type="submit" isLoading={isSubmitting}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddProduct

import { useRef, useState } from "react";
import {
  Grid,
  GridItem,
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputLeftAddon,
  InputLeftElement,
  InputGroup,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Image,
  VStack,
  IconButton,
} from "@chakra-ui/react"
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  type SubmitHandler,
  useForm,
  useController,
} from "react-hook-form"
import { DragDropContext, Droppable, Draggable, ResponderProvided } from "react-beautiful-dnd";
import { DeleteIcon } from '@chakra-ui/icons'
import { FiImage } from "react-icons/fi";
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
    control,
    setError,
    clearErrors,
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
      price_usd: 0.9,
      price_uah: 0.9,
      size: "",
      weight: null,
      tag: null,
      images: []
    },
  })

  const mutation = useMutation({
    mutationFn: (data: ProductCreate) =>
      ProductsService.createProduct({ requestBody: data }),
    onSuccess: () => {
      showToast(
        t('AdminPanel.products.addProduct.onSuccessCreateToast.success'),
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

  const [images, setImages] = useState<Array<{ id: string; file: File; url: string }>>([]);

  const { field: imagesField } = useController({
    name: "images",
    control,
  });

  const validateFile = (
    file: File,
    index: number,
    allowedFormats: string[]
  ): { id: string; file: File; url: string } | null => {
    if (allowedFormats.includes(file.type)) {
      return {
        id: `${Date.now()}-${index}`,
        file,
        url: URL.createObjectURL(file),
      };
    }
    return null;
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const allowedFormats = ["image/png", "image/jpg", "image/jpeg", "image/jfif"]

    if (files) {
      const newImages = Array.from(files)
        .map((file, index) => validateFile(file, index, allowedFormats))
        .filter((image) => image !== null);

      if (newImages.length < files.length) {
        setError("images", {
          type: "manual",
          message: t("AdminPanel.products.addProduct.fields.images.invalidFormatMsg"),
        });
      } else {
        clearErrors("images");
      }

      setImages((prev) => [...prev, ...newImages]);
      imagesField.onChange(newImages.map((img) => img.file));
    }
  };

  // Hangle Change Order

  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit: SubmitHandler<ProductCreate> = (data) => {
    const imageFiles = images.map((img, index) => ({
      url: img.url,
      alt_text: data.category || "",
      order: index + 1,
    }));

    mutation.mutate({
      ...data,
      images: imageFiles,
    })

    setImages([])
  }




  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset='slideInBottom'
        scrollBehavior='outside'
      >
        <ModalOverlay
          backdropFilter='auto'
          backdropBlur='2px'
        />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)} maxW='95%'
        // top='2rem' mb='4rem'
        >
          <ModalHeader>{t('AdminPanel.actions.addProduct')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Grid templateColumns='repeat(2, 1fr)' gap='1rem'>
              <GridItem>
                <FormControl isRequired isInvalid={!!errors.category} variant="floatingLabel">
                  <FormLabel htmlFor="category">
                    {t('AdminPanel.products.addProduct.fields.category.title')}
                  </FormLabel>
                  <Select
                    {...register("category", {
                      required: t('AdminPanel.products.addProduct.fields.category.required')
                    })}
                    variant='outline'
                    placeholder={t('AdminPanel.products.addProduct.fields.category.placeholder')}
                  >
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
              </GridItem>
              <GridItem>
                <FormControl isRequired isInvalid={!!errors.size}>
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
              </GridItem>
              <GridItem>
                <FormControl isRequired isInvalid={!!errors.title_en}>
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
              </GridItem>
              <GridItem>
                <FormControl isRequired isInvalid={!!errors.title_uk}>
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
              </GridItem>
              <GridItem>
                <FormControl isRequired isInvalid={!!errors.material_en}>
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
              </GridItem>
              <GridItem>
                <FormControl isRequired isInvalid={!!errors.material_uk}>
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
              </GridItem>
              <GridItem>
                <FormControl isInvalid={!!errors.price_usd}>
                  <FormLabel htmlFor="price_usd">
                    {t('AdminPanel.products.addProduct.fields.price_usd.title')}
                  </FormLabel>
                  <InputGroup>
                    <InputLeftAddon>$</InputLeftAddon>
                    <NumberInput
                      precision={2}
                      step={0.2}
                      min={0.9}
                      max={10000}
                      w='100%'
                    >
                      <NumberInputField
                        {...register("price_usd", {
                          required: t('AdminPanel.products.addProduct.fields.price_usd.required')
                        })}
                        borderLeftRadius={0}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </InputGroup>
                  {errors.price_usd && (
                    <FormErrorMessage>{errors.price_usd.message}</FormErrorMessage>
                  )}
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isInvalid={!!errors.price_uah}>
                  <FormLabel htmlFor="price_uah">
                    {t('AdminPanel.products.addProduct.fields.price_uah.title')}
                  </FormLabel>
                  <InputGroup>
                    <InputLeftAddon>₴</InputLeftAddon>
                    <NumberInput
                      precision={2}
                      step={0.2}
                      min={0.9}
                      max={10000}
                      w='100%'
                    >
                      <NumberInputField
                        {...register("price_uah", {
                          required: t('AdminPanel.products.addProduct.fields.price_uah.required')
                        })}
                        borderLeftRadius={0}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </InputGroup>
                  {errors.price_uah && (
                    <FormErrorMessage>{errors.price_uah.message}</FormErrorMessage>
                  )}
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl isInvalid={!!errors.weight}>
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
              </GridItem>
              <GridItem>
                <FormControl isInvalid={!!errors.tag} variant="floatingLabel">
                  <FormLabel htmlFor="tag">
                    {t('AdminPanel.products.addProduct.fields.tag.title')}
                  </FormLabel>
                  <Select
                    variant='outline'
                    placeholder={t('AdminPanel.products.addProduct.fields.tag.placeholder')}
                  >
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
              </GridItem>

              <GridItem>
                <FormControl isInvalid={!!errors.images}>
                  <FormLabel>{t("AdminPanel.products.addProduct.fields.images.title")}</FormLabel>
                  <InputGroup >
                    <InputLeftElement pointerEvents="none">
                      <FiImage />
                    </InputLeftElement>
                    <Input
                      {...register("images")}
                      type='file'
                      accept=".jpg, .jpeg, .jfif, .png"
                      multiple
                      hidden
                      ref={inputRef}
                      onChange={handleImageUpload}
                    />
                    <Input
                      readOnly
                      placeholder={t("AdminPanel.products.addProduct.fields.images.placeholder")}
                      onClick={() => inputRef.current?.click()}
                      value={images.map((img) => img.file.name).join(", ")}
                      fontSize="sm"
                      color='rgba(255, 255, 255, 0.5)'
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.images && errors?.images.message}
                  </FormErrorMessage>
                </FormControl>
              </GridItem>
            </Grid>

            {/* Images array ... */}

          </ModalBody>
          <ModalFooter gap={3} pt={0}>
            <Button variant="primary" type="submit" isLoading={isSubmitting}>
              {t('AdminPanel.actions.save')}
            </Button>
            <Button onClick={onClose}>{t('AdminPanel.actions.cancel')}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddProduct

import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react"
import axios from "axios"
import { type Dispatch, type SetStateAction, useEffect } from "react"
import { useFormContext } from "react-hook-form"

export interface Branch {
  Ref: string
  Description: string
  CityDescription: string
}

interface BranchFormGroupProps {
  warehouses: Array<Branch>
  warehouseTypes: Array<string>
  setWarehouses: Dispatch<SetStateAction<any>>
  warehouseNumber: string
  setWarehouseNumber: Dispatch<SetStateAction<any>>

  label: string
  placeholder: string
  numberPlaceholder: string
}

const BranchFormGroup = ({
  warehouses,
  warehouseTypes,
  setWarehouses,
  warehouseNumber,
  setWarehouseNumber,
  label,
  placeholder,
  numberPlaceholder,
}: BranchFormGroupProps) => {
  const { register, getValues } = useFormContext()
  const city = getValues("delivery.city")

  useEffect(() => {
    const fetchWarehouses = async () => {
      if (city && warehouseNumber) {
        try {
          const fetchPromises = warehouseTypes.map(async (type) => {
          const response = await axios.post(
            "https://api.novaposhta.ua/v2.0/json/",
            {
              modelName: "Address",
              calledMethod: "getWarehouses",
              methodProperties: {
                CityName: city,
                FindByString: `№${warehouseNumber}`,
                TypeOfWarehouseRef: type,
              },
            },
          )
          return response.data.data || []
          })

          const results = await Promise.all(fetchPromises)
          setWarehouses(results.flat())
        } catch (error) {
          console.error("Error fetching branches:", error)
        }
      }
    }

    fetchWarehouses()
  }, [city, warehouseNumber, getValues("delivery.city")])

  return (
    <FormControl mt="16px">
      <FormLabel
        fontSize={["20px", "16px"]}
        fontWeight={["600", "700"]}
        mb="12px"
      >
        {label}
      </FormLabel>
      <Input
        isRequired
        type="number"
        onChange={(e) => {
          setWarehouseNumber(e.target.value)
        }}
        placeholder={numberPlaceholder}
        border="1px solid #A4A2A2"
        fontSize="14px"
        padding="12px"
        width="-webkit-fill-available"
      />

      <Select
        isRequired
        {...register("delivery.warehouse", {
          setValueAs: (value: string) => value.trim(),
        })}
        placeholder={placeholder}
        defaultValue={warehouses[0]?.Description}
        borderRadius={0}
        fontSize="14px"
        color="#3A3A3A"
        borderColor="#A4A2A2"
        display={warehouses.length > 0 ? "flex" : "none"}
      >
        {warehouses.map((branch, index) => (
          <option key={index} value={branch.Description}>
            {branch.CityDescription} - {branch.Description}
          </option>
        ))}
      </Select>
    </FormControl>
  )
}

export default BranchFormGroup

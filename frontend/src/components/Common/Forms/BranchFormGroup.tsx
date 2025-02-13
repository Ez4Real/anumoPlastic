import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react"
import { Dispatch, SetStateAction } from "react"
import { useTranslation } from "react-i18next";

export interface Branch {
    Ref: string;
    Description: string;
    CityDescription: string;
}

interface BranchFormGroupProps {
    branchOptions: Array<Branch>
    setBranchNumber: Dispatch<SetStateAction<string>>
}

const BranchFormGroup = ({ branchOptions, setBranchNumber }: BranchFormGroupProps) => {
    const { t } = useTranslation();


    return (
        <FormControl mt="16px">
            <FormLabel fontSize={["20px", "16px"]} fontWeight={["600", "700"]} mb="12px">
                {t("Checkout.delivery.Ukraine.select.branch.title")}
            </FormLabel>
            <Input
                type="number"
                onChange={(e) => {
                    setBranchNumber(e.target.value)
                }}
                placeholder={t('Checkout.delivery.Ukraine.select.branch.numberPlacehloder')}
                border="1px solid #A4A2A2"
                fontSize="14px"
                padding="12px"
                width="-webkit-fill-available"
            />
            {branchOptions.length > 0 &&
                <Select
                    placeholder={t("Checkout.delivery.Ukraine.select.branch.placeholder")}
                    defaultValue={branchOptions[0].Description}
                    borderRadius={0}
                    fontSize="14px"
                    color="#3A3A3A"
                    borderColor="#A4A2A2"
                    display="flex"
                >
                    {
                        branchOptions.map((branch, index) => (
                            <option
                                key={index}
                                value={branch.Description}
                            >{branch.CityDescription} - {branch.Description}
                            </option>
                        ))
                    }
                </Select>
            }
        </FormControl>
    )
}

export default BranchFormGroup
import { FormControl, FormLabel, Input } from "@chakra-ui/react"
import { useTranslation } from "react-i18next";

export interface Branch {
    Ref: string;
    Description: string;
    CityDescription: string;
}

interface PostOfficeFormGroupProps {
    titleLabel: string
    placeholder: string
    branchOptions: Array<Branch>
}

const PostOfficeFormGroup = ({ titleLabel, placeholder, branchOptions }: PostOfficeFormGroupProps) => {

    return (
        <FormControl mt="16px">
            <FormLabel fontSize={["20px", "16px"]} fontWeight={["600", "700"]} mb="12px">
                {titleLabel}
            </FormLabel>
            <Input
                placeholder={placeholder}
                border="1px solid #A4A2A2"
                fontSize="14px"
                padding="12px"
                width="-webkit-fill-available"
            />
        </FormControl>
    )
}

export default PostOfficeFormGroup
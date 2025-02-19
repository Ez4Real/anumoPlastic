import { FormControl, FormLabel, Input, Select } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface Branch {
    Ref: string;
    Description: string;
    CityDescription: string;
}

interface AddressFormGroupProps {
    apiEndpoint?: string
    regions?: Array<string>
    countryValue?: string
}

const AddressFormGroup = ({
    apiEndpoint = "/all",
    regions = [],
    countryValue = ""
}: AddressFormGroupProps) => {
    const { t } = useTranslation();
    const { register } = useFormContext();

    const [countries, setCountries] = useState<{ code: string; name: string }[]>([]);
    const [currentCountry, setCurrentCountry] = useState(countryValue);

    // !!!!!!!!!!
    useEffect(() => {
      const fetchCountries = async () => {
        try {
          if (countries.length > 0) return
    
          let countryList = [];
          if (regions.length > 0) {
            const responses = await Promise.all(
              regions.map(region =>
                axios.get(`https://restcountries.com/v3.1/region/${region}?fields=name,cca2`)
              )
            );
            countryList = responses.flatMap(res => res.data);
          } else {
            const response = await axios.get(`https://restcountries.com/v3.1${apiEndpoint}?fields=name,cca2`);
            countryList = response.data;
          }
    
          const countriesToExclude = ['RU', 'BY'];
          setCountries(
            countryList
              .filter((country: any) => !countriesToExclude.includes(country.cca2))
              .map((country: any) => ({
                code: country.cca2,
                name: country.name.common,
            })).sort((a: any, b: any) => a.name.localeCompare(b.name))
          );
          
    
        } catch (error) {
          console.error("Error fetching countries:", error);
        }
      };
    
      fetchCountries();
    }, [regions.length, apiEndpoint]);

    
    return (
        <>
          <FormControl mt="12px">
            <FormLabel
              fontSize={["20px", "16px"]}
              fontWeight={["600", "700"]}
              m={0}
            >
                {t("Checkout.delivery.europe.addressFormGroup.title")}
            </FormLabel>
            
          </FormControl>
          <FormControl mt="16px">
            <Select
              {...register("delivery.country", {
                setValueAs: (value: string) => value.trim(),
              })}
              value={currentCountry}
              isRequired
              onChange={(e) => {
                setCurrentCountry(e.target.value)
              }}
              isDisabled={!!countryValue}
              placeholder={t('Checkout.delivery.europe.addressFormGroup.placeholders.country')}
              borderRadius={0}
              fontSize="14px"
              borderColor="#A4A2A2"
              color="#3A3A3A"
              sx={{
                "option": {
                    maxHeight: "200px", 
                    overflowY: "auto",
                },
              }}
            >
                {countries.map((country, index) => (
                  <option key={index} value={country.name}>
                    {country.name}
                  </option>
                ))}
            </Select>
          </FormControl>
          <FormControl mt="12px">
            <Input
              isRequired
              {...register("delivery.city", {
                setValueAs: (value: string) => value.trim(),
              })}
              placeholder={t('Checkout.delivery.europe.addressFormGroup.placeholders.city')}
              border="1px solid #A4A2A2"
              color="#3A3A3A"
              fontSize="14px"
              padding="12px"
            />
          </FormControl>
          <FormControl mt="12px">
            <Input
              isRequired
              {...register("delivery.postalCode", {
                setValueAs: (value: string) => value.trim(),
              })}
              placeholder={t('Checkout.delivery.europe.addressFormGroup.placeholders.postalCode')}
              border="1px solid #A4A2A2"
              color="#3A3A3A"
              fontSize="14px"
              padding="12px"
            />
          </FormControl>
          <FormControl mt="12px">
            <Input
              isRequired
              {...register("delivery.streetAddress", {
                setValueAs: (value: string) => value.trim(),
              })}
              placeholder={t('Checkout.delivery.europe.addressFormGroup.placeholders.deliveryAddress')}
              border="1px solid #A4A2A2"
              color="#3A3A3A"
              fontSize="14px"
              padding="12px"
            />
          </FormControl>
        </>
    )
}

export default AddressFormGroup
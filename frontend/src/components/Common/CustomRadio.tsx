import { Radio } from "@chakra-ui/react";

interface ProductSizeFieldProps {
    value: string
    label: string
    mt?: string
  }

const CustomRadio = ({ value, label, mt = "0" }: ProductSizeFieldProps) => {
  return (
    <Radio
      value={value}
      spacing={[2, 10]}
      mt={mt}
      sx={{
        "&.chakra-radio__control": {
          boxSize: "16px",
          border: "1px solid #3A3A3A",
          borderRadius: "50%",
          position: "relative",
        },
        _checked: {
        _before: {
          content: '""',
          backgroundColor: "#3A3A3A",
          boxSize: "10px",
          borderRadius: "50%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
      },
    }}
    >{label}
    </Radio>
  );
};

export default CustomRadio;
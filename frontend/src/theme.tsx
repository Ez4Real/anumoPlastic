import { extendTheme } from "@chakra-ui/react"

const disabledStyles = {
  _disabled: {
    backgroundColor: "ui.main",
  },
}

const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "light",
  },
  colors: {
    ui: {
      main: "#009688",
      secondary: "#EDF2F7",
      success: "#48BB78",
      danger: "#E53E3E",
      light: "#FAFAFA",
      dark: "#1A202C",
      darkSlate: "#252D3D",
      dim: "#A0AEC0",
    },
    paymentStatus: {
      created: "yellow",
      processing: "#183f90", 
      hold: "#FF9800",    
      failure: "#E53E3E",    
      reversed: "#e1e1e1",   
      expired: "#E53E3E",
      success: "#48BB78",
    }
  },
  components: {
    Button: {
      variants: {
        primary: {
          backgroundColor: "ui.main",
          color: "ui.light",
          _hover: {
            backgroundColor: "#00766C",
          },
          _disabled: {
            ...disabledStyles,
            _hover: {
              ...disabledStyles,
            },
          },
        },
        danger: {
          backgroundColor: "ui.danger",
          color: "ui.light",
          _hover: {
            backgroundColor: "#E32727",
          },
        },
      },
    },
    Tabs: {
      variants: {
        enclosed: {
          tab: {
            _selected: {
              color: "ui.main",
            },
          },
        },
      },
    },
  },
})

const mainTheme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "light",
  },
  styles: {
    global: {
      "html, body": {
        fontSize: "16px",
        lineHeight: "normal",
        fontFamily: "Inter, sans-serif",
        bg: 'white',
        color: 'black',
      },
      ".chakra-modal__overlay": {
        bg: "transparent !important",
      },
      a: {
        textDecoration: "underline !important",
        textUnderlinePosition: "under",
      },
      "ul, ol": {
        my: "1em",
      },
      "input, textarea": {
        colorScheme: 'light',
        color: "black",
        borderRadius: "0 !important",
        _placeholder: {
          color: "black",
        },
        _hover: {
          borderColor: "black !important"
        }
      }
    }
  },
  components: {
    Container: {
      baseStyle: {
        maxW: "unset",
        px: ["24px", "46px"],
        overflow: "hidden"
      },
    },
    Heading: {
      baseStyle: {
        fontFamily: "Inter, sans-serif",
      },
    },
    Button: {
      baseStyle: {
        backgroundColor: "black",
        borderRadius: 0,
        color: "white",
        textUnderlinePosition: "under"
      },
      variants: {
        unstyled: {
          bg: "transparent",
          color: "inherit",
          border: "none",
          padding: "0",
          margin: "0",
          _hover: {
            bg: "transparent",
          },
          _active: {
            bg: "transparent",
          },
          _focus: {
            boxShadow: "none",
          },
        },
      },
    },
    Select: {
      baseStyle: {
        field: {
          "> option": {
            backgroundColor: "transparent"
          }
        },
      },
    },
  },
})

export { theme, mainTheme }

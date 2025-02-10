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
        // overflowX: "hidden"
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
    }
  },
})

export { theme, mainTheme }

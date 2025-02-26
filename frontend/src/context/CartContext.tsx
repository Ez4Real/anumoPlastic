import { useDisclosure } from "@chakra-ui/react"
import {
  type ReactNode,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react"
import type { CartProduct } from "../client"

interface CartState {
  cartItems: CartProduct[]
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: CartProduct }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_COUNT"; payload: { id: string; count: number } }
  | { type: "CLEAR_CART" }

const initialState: CartState = {
  cartItems: [],
}

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id,
      )

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, count: item.count + action.payload.count }
              : item,
          ),
        }
      }
      return { ...state, cartItems: [...state.cartItems, action.payload] }
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      }

    case "UPDATE_COUNT":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, count: action.payload.count }
            : item,
        ),
      }

    case "CLEAR_CART":
      return { ...state, cartItems: [] }

    default:
      return state
  }
}

interface CartContextType {
  state: CartState
  dispatch: React.Dispatch<CartAction>
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  children: ReactNode
}

// Provider component
export const CartProvider = ({ children }: CartProviderProps) => {
  const {
    isOpen: isCartOpen,
    onOpen: openCart,
    onClose: closeCart,
    onToggle: toggleCart,
  } = useDisclosure()
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const value = useMemo(
    () => ({
      state,
      dispatch,
      isCartOpen,
      openCart,
      closeCart,
      toggleCart,
    }),
    [state, dispatch, isCartOpen, openCart, closeCart, toggleCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// Hook to use cart
// export const useCart = () => useContext(CartContext);
export const useCart = (): CartContextType => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

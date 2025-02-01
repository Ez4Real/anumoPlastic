import './index.css'
import { useCart } from '../../context/CartContext';

interface ProductCounterProps {
  productId: string;
  count: number;
}
  
  const ProductCounter = ({ productId, count }: ProductCounterProps) => {
    const { dispatch } = useCart();
  
    const updateCount = (newCount: number) => {
      if (newCount === 0) {
        dispatch({ type: "REMOVE_FROM_CART", payload: productId });
      } else {
        dispatch({ type: "UPDATE_COUNT", payload: { id: productId, count: newCount } });
      }
    };
  
    return (
      <div className="productCounter-container">
        <div className="adjust" onClick={() => updateCount(count - 1)}>–</div>
        <div className="amount">{count}</div>
        <div className="adjust" onClick={() => count < 999 && updateCount(count + 1)}>+</div>
      </div>
    );
  };
  
  export default ProductCounter;
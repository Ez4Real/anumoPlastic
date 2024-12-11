import { useState } from 'react';
import './index.css'

const ProductCounter = () => {
    const [amount, setAmount] = useState(1);

  return (
    <div className='productCounter-container'>
        <div
            className='adjust'
            onClick={() => amount > 1 && setAmount(amount - 1)}
        >
            -
        </div>
        <div className='amount'>{amount}</div>
        <div
            className='adjust'
            onClick={() => amount < 999 && setAmount(amount + 1)}
        >
            +
        </div>
    </div>
  );
};

export default ProductCounter;
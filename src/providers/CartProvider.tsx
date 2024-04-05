import {
	PropsWithChildren,
	createContext,
	useContext,
	useState
} from 'react';

interface CartContextProps {
	items: CartItemProps[];
	addItem: (
		product: ProductProps,
		size: CartItemProps['size']
	) => void;
}

export const CartContext = createContext<CartContextProps>({
	items: [],
	addItem: () => {}
});

const CartProvider = ({ children }: PropsWithChildren) => {
	const [items, setItems] = useState<CartItemProps[]>([]);

	const addItem = (
		product: ProductProps,
		size: CartItemProps['size']
  ) => {
    

		const newCartItem: CartItemProps = {
			id: '1',
			product,
			product_id: product.id,
			size,
			quantity: 1
		};

		setItems([newCartItem, ...items]);
	};

	return (
		<CartContext.Provider value={{ items, addItem }}>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;

export const useCart = () => useContext(CartContext);

import { randomUUID } from 'expo-crypto';
import {
	PropsWithChildren,
	createContext,
	useContext,
	useState
} from 'react';

type Product = Tables<'products'>;

interface CartContextProps {
	items: CartItemProps[];
	addItem: (product: Product, size: CartItemProps['size']) => void;
	updateQuantity: (itemId: string, amount: -1 | 1) => void;
	total: number;
}

export const CartContext = createContext<CartContextProps>({
	items: [],
	addItem: () => {},
	updateQuantity: () => {},
	total: 0
});

const CartProvider = ({ children }: PropsWithChildren) => {
	const [items, setItems] = useState<CartItemProps[]>([]);

	const addItem = (product: Product, size: CartItemProps['size']) => {
		// if already in cart, increment quantity
		const existingItem = items.find(
			item => item.product === product && item.size == size
		);

		if (existingItem) {
			updateQuantity(existingItem.id, 1);
			return;
		}

		const newCartItem: CartItemProps = {
			id: randomUUID(),
			product,
			product_id: product.id,
			size,
			quantity: 1
		};

		setItems([newCartItem, ...items]);
	};

	// updateQuantity
	const updateQuantity = (itemId: string, amount: -1 | 1) => {
		setItems(
			items
				.map(item =>
					item.id !== itemId
						? item
						: { ...item, quantity: item.quantity + amount }
				)
				.filter(item => item.quantity > 0)
		);
	};

	const total = items.reduce(
		(sum, item) => (sum += item.product.price),
		0
	);

	return (
		<CartContext.Provider
			value={{ items, addItem, updateQuantity, total }}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;

export const useCart = () => useContext(CartContext);

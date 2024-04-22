import { useInsertOrderItems } from '@/api/order-items';
import { useInsertOrder } from '@/api/orders';
import { randomUUID } from 'expo-crypto';
import { useRouter } from 'expo-router';
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
	checkout: () => void;
}

export const CartContext = createContext<CartContextProps>({
	items: [],
	addItem: () => {},
	updateQuantity: () => {},
	total: 0,
	checkout: () => {}
});

const CartProvider = ({ children }: PropsWithChildren) => {
	const [items, setItems] = useState<CartItemProps[]>([]);

	const { mutate: insertOrder } = useInsertOrder();

	const { mutate: insertOrderItems } = useInsertOrderItems();

	const router = useRouter();

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

	const clearCart = () => {
		setItems([]);
	};

	const checkout = () => {
		insertOrder(
			{ total },
			{
				onSuccess: saveOrderItems
			}
		);
	};

	const saveOrderItems = (order: Tables<'orders'>) => {
		const orderItems = items.map(cartItem => ({
			order_id: order.id,
			product_id: cartItem.product_id,
			quantity: cartItem.quantity,
			size: cartItem.size
		}));
		insertOrderItems(orderItems, {
			onSuccess: () => {
				clearCart();
				router.push(`/(user)/orders/${order.id}`);
			}
		});
	};

	return (
		<CartContext.Provider
			value={{ items, addItem, updateQuantity, total, checkout }}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;

export const useCart = () => useContext(CartContext);

type Tables<T extends keyof Database['public']['Tables']> =
	Database['public']['Tables'][T]['Row'];

interface ProductProps {
	id: number;
	name: string;
	image: string;
	price: number;
}

type PizzaSizeProps = 'S' | 'M' | 'L' | 'XL';

interface CartItemProps {
	id: string;
	product: ProductProps;
	product_id: number;
	size: PizzaSizeProps;
	quantity: number;
}

interface OrderItemProps {
	id: number;
	order_id: number;
	size: string;
	quantity: number;
	product_id: number;
	products: ProductProps;
}

interface OrderProps {
	id: number;
	created_at: string;
	total: number;
	status: string;
	user_id: string;
	order_items: OrderItemProps[];
}


type AppSegments = '(admin)' | '(user)';
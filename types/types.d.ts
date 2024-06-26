type Tables<T extends keyof Database['public']['Tables']> =
	Database['public']['Tables'][T]['Row'];

type InsertTables<T extends keyof Database['public']['Tables']> =
	Database['public']['Tables'][T]['Insert'];

type UpdateTables<T extends keyof Database['public']['Tables']> =
	Database['public']['Tables'][T]['Update'];

type Enums<T extends keyof Database['public']['Enums']> =
	Database['public']['Enums'][T];

interface ProductProps {
	id: number;
	name: string;
	image: string | null;
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

type OrderStatus = 'New' | 'Cooking' | 'Delivering' | 'Delivered';

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
	quantity: number
}
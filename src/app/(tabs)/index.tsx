import ProductListItem from '@/components/ProductListItem';
import products from '@assets/data/products';

const MenuScreen = () => {
	return (
		<>
			{products.map(product => (
				<ProductListItem key={product.id} {...{ product }} />
			))}
		</>
	);
};

export default MenuScreen;

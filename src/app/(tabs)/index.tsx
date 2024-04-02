import products from '@/assets/data/products';
import ProductListItem from '@/src/components/ProductListItem';

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

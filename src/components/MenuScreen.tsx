import { useProductList } from '@/api/products';
import ProductListItem from '@/components/ProductListItem';
import { ActivityIndicator, FlatList, Text } from 'react-native';

const MenuScreen = () => {
	const { data: products, error, isLoading } = useProductList();

	if (isLoading) return <ActivityIndicator />;

	if (error) return <Text>Failed to fetch products</Text>;
	return (
		<>
			<FlatList
				data={products}
				renderItem={({ item }) => (
					<ProductListItem {...{ product: item }} />
				)}
				numColumns={2}
				contentContainerStyle={{ gap: 10, padding: 10 }}
				columnWrapperStyle={{ gap: 10 }}
			/>
		</>
	);
};

export default MenuScreen;

import { useUserOrderList } from '@/api/orders';
import OrderListItem from '@/components/OrderListItem';
import { ActivityIndicator, FlatList, Text } from 'react-native';

const MenuScreen = () => {
	const { data: orders, isLoading, error } = useUserOrderList();

	if (isLoading) return <ActivityIndicator />;

	if (error) return <Text>Failed to fetch</Text>;

	return (
		<FlatList
			data={orders}
			renderItem={({ item }) => (
				<OrderListItem {...{ order: item }} />
			)}
			contentContainerStyle={{ gap: 10, padding: 10 }}
		/>
	);
};

export default MenuScreen;

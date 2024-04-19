import { useAdminOrderList } from '@/api/orders';
import OrderListItem from '@/components/OrderListItem';
import { ActivityIndicator, FlatList, Text } from 'react-native';

const OrderScreen = () => {
	const {
		data: orders,
		isLoading,
		error
	} = useAdminOrderList({ archived: true });

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

export default OrderScreen;

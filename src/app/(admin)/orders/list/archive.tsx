import OrderListItem from '@/components/OrderListItem';
import orders from '@assets/data/orders';
import { FlatList, Text } from 'react-native';

const OrderScreen = () => {
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

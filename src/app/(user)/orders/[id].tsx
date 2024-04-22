import { useOrderDetails } from '@/api/orders';
import { useUpdateOrderSubscription } from '@/api/orders/subscriptions';
import OrderListItem from '@/components/OrderListItem';
import OrderListItemDetail from '@/components/OrderListItemDetail';
import { Stack } from 'expo-router';
import { useParsedId } from 'hooks/useParsedId';
import React from 'react';
import {
	ActivityIndicator,
	FlatList,
	Text,
	View
} from 'react-native';

const OrderDetailsScreen = () => {
	const id = useParsedId();

	const { data: order, isLoading, error } = useOrderDetails(id);

	useUpdateOrderSubscription(id)

	if (isLoading) return <ActivityIndicator />;

	if (error || !order) return <Text>Failed to fetch orders</Text>;

	return (
		<View style={{ padding: 10, gap: 20, flex: 1 }}>
			<Stack.Screen
				options={{
					title: `Order #${id}`,
					headerTitleAlign: 'center'
				}}
			/>

			<FlatList
				data={order.order_items}
				renderItem={({ item }) => <OrderListItemDetail item={item} />}
				contentContainerStyle={{ gap: 10 }}
				ListHeaderComponent={() => <OrderListItem {...{ order }} />}
			/>
		</View>
	);
};

export default OrderDetailsScreen;

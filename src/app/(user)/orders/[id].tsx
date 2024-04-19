import { useOrderDetails } from '@/api/orders';
import OrderListItem from '@/components/OrderListItem';
import OrderListItemDetail from '@/components/OrderListItemDetail';
import orders from '@assets/data/orders';
import { Stack, useLocalSearchParams } from 'expo-router';
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

	if (isLoading) return <ActivityIndicator />;

	if (error) return <Text>Failed to fetch products</Text>;

	return (
		<View style={{ padding: 10, gap: 20, flex: 1 }}>
			<Stack.Screen
				options={{
					title: `Order #${id}`,
					headerTitleAlign: 'center'
				}}
			/>

			{order && order?.order_items ? (
				<FlatList
					data={order.order_items}
					renderItem={({ item }) => (
						<OrderListItemDetail item={item} />
					)}
					contentContainerStyle={{ gap: 10 }}
					ListHeaderComponent={() => <OrderListItem {...{ order }} />}
				/>
			) : null}
		</View>
	);
};

export default OrderDetailsScreen;

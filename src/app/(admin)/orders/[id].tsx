import OrderListItem from '@/components/OrderListItem';
import OrderListItemDetail from '@/components/OrderListItemDetail';
import orders from '@assets/data/orders';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { FlatList, Text, View } from 'react-native';

const OrderDetailsScreen = () => {
	const { id } = useLocalSearchParams();

	const order = orders.find(o => o.id.toString() === id);

	if (!order) {
		<Text>Not found</Text>;
	}

	return (
		<View style={{ padding: 10, gap: 20 }}>
			<Stack.Screen
				options={{
					title: `Order #${id}`,
					headerTitleAlign: 'center'
				}}
      />

      {/* {order ? <OrderListItem {...{ order }} /> : null} */}

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

import { useOrderDetails, useUpdateOrder } from '@/api/orders';
import OrderListItem from '@/components/OrderListItem';
import OrderListItemDetail from '@/components/OrderListItemDetail';
import Colors from '@/constants/Colors';
import { Stack } from 'expo-router';
import { useParsedId } from 'hooks/useParsedId';
import React from 'react';
import {
	ActivityIndicator,
	FlatList,
	Pressable,
	Text,
	View
} from 'react-native';

const OrderDetailsScreen = () => {
	const id = useParsedId();

	const { data: order, isLoading, error } = useOrderDetails(id);
	const { mutate: updateOrder } = useUpdateOrder();

	const updateStatus =  (status: string) => {
		 updateOrder({ id: id, updatedFields: { status } });
	};

	if (isLoading) return <ActivityIndicator />;

	if (error || !order) return <Text>Failed to fetch orders</Text>;

	const orderStatusList: OrderStatus[] = [
		'New',
		'Cooking',
		'Delivering',
		'Delivered'
	];

	if (!order) {
		<Text>Not found</Text>;
	}

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
				ListHeaderComponent={() => <OrderListItem order={order} />}
				ListFooterComponent={() => (
					<>
						<Text style={{ fontWeight: 'bold' }}>Status</Text>
						<View style={{ flexDirection: 'row', gap: 5 }}>
							{orderStatusList.map(status => (
								<Pressable
									key={status}
									onPress={() => updateStatus(status)}
									style={{
										borderColor: Colors.light.tint,
										borderWidth: 1,
										padding: 10,
										borderRadius: 5,
										marginVertical: 10,
										backgroundColor:
											order.status === status
												? Colors.light.tint
												: 'transparent'
									}}
								>
									<Text
										style={{
											color:
												order.status === status
													? 'white'
													: Colors.light.tint
										}}
									>
										{status}
									</Text>
								</Pressable>
							))}
						</View>
					</>
				)}
			/>
		</View>
	);
};

export default OrderDetailsScreen;

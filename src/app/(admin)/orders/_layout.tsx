import { Stack } from 'expo-router';
import React from 'react';

const OrderStack = () => {
	return (
		<Stack>
			<Stack.Screen
				name='list'
				options={{
					title: 'Orders',
					headerShown: true,
					headerTitleAlign: 'center'
				}}
			/>
		</Stack>
	);
};

export default OrderStack;

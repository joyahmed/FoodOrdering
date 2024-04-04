import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const ProductDetailScreen = () => {
	const { id } = useLocalSearchParams();
	return (
		<View>
			<Stack.Screen
				options={{
					title: 'Details' + id,
					headerTitleAlign: 'center'
				}}
			/>
			<Text>ProductDetailScreen: {id}</Text>
		</View>
	);
};

export default ProductDetailScreen;

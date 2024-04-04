import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const ProductDetailScreen = () => {
	const { id } = useLocalSearchParams();
	return (
		<View>
			<Text>ProductDetailScreen: {id}</Text>
		</View>
	);
};

export default ProductDetailScreen;

import Button from '@/components/Button';
import { defaultPizzaImage } from '@/components/ProductListItem';
import { useCart } from '@/providers/CartProvider';
import products from '@assets/data/products';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
	Image,
	Pressable,
	StyleSheet,
	Text,
	View
} from 'react-native';

const sizes: PizzaSizeProps[] = ['S', 'M', 'L', 'XL'];

const ProductDetailScreen = () => {
	const { id } = useLocalSearchParams();
	const { addItem } = useCart();

	const router = useRouter();

	const [selectedSize, setSelectedSize] =
		useState<PizzaSizeProps>('M');

	const product = products.find(p => p.id.toString() === id);

	const addToCart = () => {
		if (!product) return;
		addItem(product, selectedSize);
		router.push('/cart');
	};

	if (!product) return <Text>Product not found</Text>;

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					title: product.name,
					headerTitleAlign: 'center'
				}}
			/>
			<Image
				source={{ uri: product.image || defaultPizzaImage }}
				style={styles.image}
			/>

			<Text style={styles.title}>Title: {product.name}</Text>
			<Text style={styles.price}>Price: ${product.price}</Text>


		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1,
		padding: 10
	},
	image: { width: '100%', aspectRatio: 1 },
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	price: {
		fontSize: 18,
		fontWeight: 'bold',
	},

});

export default ProductDetailScreen;

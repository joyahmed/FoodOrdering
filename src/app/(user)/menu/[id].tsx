import { useProductById } from '@/api/products';
import Button from '@/components/Button';
import { defaultPizzaImage } from '@/components/ProductListItem';
import { useCart } from '@/providers/CartProvider';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
	ActivityIndicator,
	Image,
	Pressable,
	StyleSheet,
	Text,
	View
} from 'react-native';

const sizes: PizzaSizeProps[] = ['S', 'M', 'L', 'XL'];

const ProductDetailScreen = () => {
	const { id: idString } = useLocalSearchParams();

	const id = parseFloat(
		typeof idString === 'string' ? idString : idString[0]
	);

	const { data: product, error, isLoading } = useProductById(id);

	const { addItem } = useCart();

	const router = useRouter();

	const [selectedSize, setSelectedSize] =
		useState<PizzaSizeProps>('M');

	const addToCart = () => {
		if (!product) return;
		addItem(product, selectedSize);
		router.push('/cart');
	};

	if (isLoading) return <ActivityIndicator />;

	if (error) return <Text>Failed to fetch products</Text>;

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					title: product?.name,
					headerTitleAlign: 'center'
				}}
			/>
			<Image
				source={{ uri: product?.image || defaultPizzaImage }}
				style={styles.image}
			/>

			<Text>Select Size</Text>
			<View style={styles.sizes}>
				{sizes.map(size => (
					<Pressable
						key={size}
						onPress={() => {
							setSelectedSize(size);
						}}
						style={[
							styles.size,
							{
								backgroundColor:
									selectedSize === size ? 'gainsboro' : 'white'
							}
						]}
					>
						<Text
							style={[
								styles.sizeText,
								{ color: selectedSize === size ? 'black' : 'gray' }
							]}
						>
							{size}
						</Text>
					</Pressable>
				))}
			</View>

			<Text style={styles.price}>Price: ${product?.price}</Text>

			<Button onPress={addToCart} text='Add to Cart' />
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
	price: {
		fontSize: 18,
		fontWeight: 'bold',
		marginTop: 'auto'
	},
	sizes: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginVertical: 10
	},
	size: {
		backgroundColor: 'gainsboro',
		width: 50,
		aspectRatio: 1,
		borderRadius: 25,
		alignItems: 'center',
		justifyContent: 'center'
	},
	sizeText: {
		fontSize: 20,
		fontWeight: '500'
	}
});

export default ProductDetailScreen;

import products from '@/assets/data/products';
import Colors from '@/src/constants/Colors';
import { Image, StyleSheet, Text, View } from 'react-native';

const product = products[0];

const TabOneScreen = () => {
	return (
		<View style={styles.container}>
			<Image source={{ uri: product.image }} style={styles.image} />
			<Text style={styles.title}>{product.name}</Text>
			<Text style={styles.price}>${product.price}</Text>
		</View>
	);
};

export default TabOneScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		padding: 10,
		borderRadius: 20
	},
	image: {
		width: `100%`,
		aspectRatio: 1
	},

	title: { fontSize: 18, fontWeight: '700', marginVertical: 10 },
	price: {
		color: Colors.light.tint,
		fontWeight: 'bold'
	}
});

import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import 'react-native-url-polyfill/auto';

const ExpoSecureStoreAdapter = {
	getItem: (key: string) => {
		return SecureStore.getItemAsync(key);
	},
	setItem: (key: string, value: string) => {
		SecureStore.setItemAsync(key, value);
	},
	removeItem: (key: string) => {
		SecureStore.deleteItemAsync(key);
	}
};

const supabaseUrl = 'https://qigeitgwbjrragzkgtli.supabase.co' || '';
const supabaseAnonKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpZ2VpdGd3YmpycmFnemtndGxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyODkxNzEsImV4cCI6MjAyODg2NTE3MX0.apCmwe8seuy6GcIMoXARXwWXqMH1SCI-mO7NohptutE' ||
	'';

console.log(supabaseUrl, supabaseAnonKey);

export const supabase = createClient<Database>(
	supabaseUrl,
	supabaseAnonKey,
	{
		auth: {
			storage: ExpoSecureStoreAdapter as any,
			autoRefreshToken: true,
			persistSession: true,
			detectSessionInUrl: false
		}
	}
);

import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState
} from 'react';

interface AuthContextProps {
	session: Session | null;
	profile: any;
	loading: boolean;
	isAdmin: boolean;
}

const AuthContext = createContext<AuthContextProps>({
	session: null,
	profile: null,
	loading: true,
	isAdmin: false
});

const AuthProvider = ({ children }: PropsWithChildren) => {
	const [session, setSession] = useState<Session | null>(null);
	const [profile, setProfile] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchSession = async () => {
			const {
				data: { session }
			} = await supabase.auth.getSession();
			setSession(session);

			if (session) {
				const { data } = await supabase
					.from('profiles')
					.select('*')
					.eq('id', session.user.id)
					.single();
				//eslint-disable-next-line
				setProfile(data || null);
			}
			setLoading(false);
		};
		fetchSession();
		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);


	return (
		<AuthContext.Provider
			value={{
				session,
				profile,
				loading,
				isAdmin: profile?.group === 'ADMIN'
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);

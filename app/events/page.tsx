"use client"
import { useAuth } from '@/context/AuthContext';

export default function events() {
	const { user } = useAuth();

	if (!user) return <p>Loading...</p>;

	return (
		<div>
			{user.isAdmin ? (
				<p>Welcome, Admin! Here is the admin panel.</p>
			) : (
				<p>Welcome, User! Here is the standard user content.</p>
			)}
		</div>
	);
}
'use client';

import { Login } from '@/app/Login';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';

export default function Home() {

	const session = useSession();
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			{
				session.status === 'unauthenticated' ? <Login/> : (<div>

					<pre>{JSON.stringify(session.data, null, 2)}</pre>
					<Button onClick={() => signOut()}>Sign out</Button>
				</div>)
			}
		</main>
	);
}

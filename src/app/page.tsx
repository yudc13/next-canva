import { protectServer } from '@/features/auth/utils';

export default async function Home() {

	await protectServer();

	return (
		<main>
			您已登陆
		</main>
	);
}

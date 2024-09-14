import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@/db/drizzle';


export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!
		})
	],
	pages: {
		signIn: '/sign-in'
	},
	adapter: DrizzleAdapter(db),
})
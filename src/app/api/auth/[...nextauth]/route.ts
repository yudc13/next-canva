import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github'

export const authOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID!,
			clientSecret: process.env.GITHUB_CLIENT_SECRET!
		}),
	],
	secret: process.env.JWT_SECRET,
	timeout: 60000,
	callbacks: {
		async jwt() {
			return { accessToken: 'accessToken' }
		},
		async session(session: any) {
			// Send properties to the client, like an access_token from a provider.
			return session
		}
	}
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
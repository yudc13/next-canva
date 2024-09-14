'use client'

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

export const SignInCard = () => {
	const onProviderSignIn = async (provider: 'github' | 'google') => {
		await signIn(provider, {callbackUrl: '/'});
	};
	return (
		<Card>
			<CardHeader>
				<CardTitle>登录</CardTitle>
				<CardDescription>
					使用 Github/Google 登录
				</CardDescription>
			</CardHeader>
			<CardContent className={'space-y-2.5'}>
				<div className={'space-y-2.5'}>
					<Button variant={'outline'} className={'w-full relative'} onClick={() => onProviderSignIn('github')}>
						<FaGithub className={'absolute top-2.5 left-2.5 size-5'}/>
						<span>使用 Github 登录</span>
					</Button>
					<Button variant={'outline'} className={'w-full relative'} onClick={() => onProviderSignIn('google')}>
						<FcGoogle className={'absolute top-2.5 left-2.5 size-5'}/>
						<span>使用 Google 登录</span>
					</Button>
				</div>
				<p className={'text-xs text-muted-foreground space-x-2'}>
					<span>没有账号?</span>
					<Link href={'/sign-up'}>
						<span className={'text-blue-600 hover:underline'}>注册</span>
					</Link>
				</p>
			</CardContent>
		</Card>
	);
};
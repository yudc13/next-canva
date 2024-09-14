'use client'

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

export const SignUpCard = () => {
	const onProviderSignUp = async (provider: 'github' | 'google') => {
		await signIn(provider, {callbackUrl: '/'});
	};
	return (
		<Card>
			<CardHeader>
				<CardTitle>注册账号</CardTitle>
				<CardDescription>
					使用 Github/Google 注册
				</CardDescription>
			</CardHeader>
			<CardContent className={'space-y-2.5'}>
				<div className={'space-y-2.5'}>
					<Button variant={'outline'} className={'w-full relative'} onClick={() => onProviderSignUp('github')}>
						<FaGithub className={'absolute top-2.5 left-2.5 size-5'}/>
						<span>使用 Github 注册</span>
					</Button>
					<Button variant={'outline'} className={'w-full relative'} onClick={() => onProviderSignUp('google')}>
						<FcGoogle className={'absolute top-2.5 left-2.5 size-5'}/>
						<span>使用 Google 注册</span>
					</Button>
				</div>
				<p className={'text-xs text-muted-foreground space-x-2'}>
					<span>已有账号?</span>
					<Link href={'/sign-in'}>
						<span className={'text-blue-600 hover:underline'}>登录</span>
					</Link>
				</p>
			</CardContent>
		</Card>
	);
};
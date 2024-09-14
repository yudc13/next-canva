import { PropsWithChildren } from 'react';

const AuthLayout = ({ children }: PropsWithChildren) => {
	return (
		<div className={'bg-[url(/bg.jpg)] bg-top bg-cover h-full flex flex-col items-center justify-center'}>
			<div className={'z-[4] h-full flex flex-col items-center justify-center'}>
				{children}
			</div>
			<div className={'fixed inset-0 z-[1]'} style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.8), rgba(0,0,0,0.4),rgba(0,0,0,0.8))' }} />
		</div>
	)
}

export default AuthLayout
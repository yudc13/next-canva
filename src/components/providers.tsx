'use client'

import { ReactNode } from 'react';
import QueryProvider from '@/components/query-provider';

export const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<QueryProvider>
			{children}
		</QueryProvider>
	)
}
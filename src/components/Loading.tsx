import { Loader } from 'lucide-react';
import { ReactNode } from 'react';

interface Props {
	children?: ReactNode;
	isLoading?: boolean;
}

export const Loading = ({children, isLoading}: Props) => isLoading ? (
	<div className={'w-full h-full flex items-center justify-center'}>
		<Loader className={'size-4 text-muted-foreground animate-spin'}/>
	</div>
) : <>{children}</>;
import { AlertTriangle } from 'lucide-react';

export const Error = ({error}: { error: string }) => (
	<div className={'w-full h-full flex items-center justify-center'}>
		<div className={'flex flex-col items-center space-y-2'}>
			<AlertTriangle className={'size-4 text-muted-foreground'}/>
			<p className={'text-muted-foreground text-xs'}>{error}</p>
		</div>
	</div>
)
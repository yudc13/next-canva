import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ReactNode } from 'react';

interface Props {
	label: string;
	children: ReactNode;
	side?: 'top' | 'bottom' | 'left' | 'right';
	align?: 'start' | 'center' | 'end';
	sideOffset?: number;
	alignOffset?: number;
}

export const Hint = (props: Props) => {
	const {label, children, side, align, sideOffset, alignOffset} = props;

	return (
		<TooltipProvider>
			<Tooltip delayDuration={100}>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent
					className={'text-white bg-slate-800 border-slate-800'}
					side={side} align={align}
					sideOffset={sideOffset} alignOffset={alignOffset}
				>
					<p className={'font-semibold capitalize'}>{label}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
import { Button } from '@/components/ui/button';
import type { LucideIcon } from 'lucide-react';

interface Props {
	icon: LucideIcon;
	label: string;
	isActive?: boolean;
	onClick?: () => void;
}

export const SidebarItem = (props: Props) => {
	const { icon: Icon, label, isActive, onClick } = props
	return (
		<Button
			variant={'ghost'} onClick={onClick}
			className={`w-full h-full aspect-video p-3 py-4 flex flex-col rounded-none ${isActive && `bg-gray-100 text-primary`}`}
		>
			<Icon className={'size-5 stroke-2 shrink-0'}/>
			<span className={'mt-2 text-xs'}>{label}</span>
		</Button>
	)
};

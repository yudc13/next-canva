import { ToolSidebarClose } from '@/features/editor/components/ToolSidebarClose';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface Props {
	open: boolean;
	onClose?: () => void
	children: ReactNode;
}

export const ToolSidebar = ({open, children, onClose}: Props) => {
	return (
		<aside
			className={
				cn(
					`bg-white relative border-r z-[40] w-[360px] h-full flex flex-col`,
					open ? 'visible' : 'hidden',
				)}
		>
			{children}
			<ToolSidebarClose onClick={onClose}/>
		</aside>
	);
};
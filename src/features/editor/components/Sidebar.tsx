'use client';

import { SidebarItem } from '@/features/editor/components/SidebarItem';
import { ActiveTool } from '@/features/editor/types';
import { LayoutTemplate, Image as ImageIcon, Type, Shapes, Sparkles, Settings } from 'lucide-react';

interface Props {
	activeTool: ActiveTool;
	onChangeActiveTool: (activeTool: ActiveTool) => void;
}

export const Sidebar = (props: Props) => {
	const {activeTool, onChangeActiveTool} = props;
	return (
		<aside className={'bg-white flex flex-col w-[100px] h-full overflow-y-auto border-r'}>
			<ul className={'flex flex-col'}>
				<SidebarItem
					icon={LayoutTemplate}
					label={'Design'}
					isActive={activeTool === 'templates'}
					onClick={() => onChangeActiveTool('templates')}
				/>
				<SidebarItem
					icon={ImageIcon}
					label={'Image'}
					isActive={activeTool === 'images'}
					onClick={() => onChangeActiveTool('images')}
				/>
				<SidebarItem
					icon={Type}
					label={'Text'}
					isActive={activeTool === 'text'}
					onClick={() => onChangeActiveTool('text')}
				/>
				<SidebarItem
					icon={Shapes}
					label={'Shapes'}
					isActive={activeTool === 'shapes'}
					onClick={() => onChangeActiveTool('shapes')}
				/>
				<SidebarItem
					icon={Sparkles}
					label={'AI'}
					isActive={activeTool === 'ai'}
					onClick={() => onChangeActiveTool('ai')}
				/>
				<SidebarItem
					icon={Settings}
					label={'Settings'}
					isActive={activeTool === 'settings'}
					onClick={() => onChangeActiveTool('settings')}
				/>
			</ul>
		</aside>
	);
};
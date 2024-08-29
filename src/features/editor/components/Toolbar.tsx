'use client';

import { Hint } from '@/components/Hint';
import { Button } from '@/components/ui/button';
import { ActiveTool, Editor } from '@/features/editor/types';
import { cn } from '@/lib/utils';
import { fabric } from 'fabric';

interface Props {
	editor: Editor | undefined;
	activeTool: ActiveTool;
	onChangeActiveTool: (activeTool: ActiveTool) => void;
}

export const Toolbar = (props: Props) => {
	const {editor, activeTool, onChangeActiveTool} = props;

	const fileColor = editor?.fillColor

	if (editor?.selectedObjects.length === 0) {
		return <div className={'shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2'} />
	}

	return (
		<div className={'shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2'}>
			<div className={'flex items-center justify-center h-full'}>
				<Hint label={'Color'} side={'bottom'} sideOffset={5}>
					<Button
						variant={'ghost'} size={'icon'}
						className={cn(activeTool === 'fill' && 'bg-gray-100')}
						onClick={() => onChangeActiveTool('fill')}
					>
						<div className={'rounded-sm size-4 border'} style={{backgroundColor: fileColor}}/>
					</Button>
				</Hint>
			</div>
		</div>
	);
};
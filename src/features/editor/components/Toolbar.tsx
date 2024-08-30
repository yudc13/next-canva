'use client';

import { RxBorderWidth } from 'react-icons/rx';
import { Hint } from '@/components/Hint';
import { Button } from '@/components/ui/button';
import { ActiveTool, Editor, FILL_COLOR, STROKE_COLOR } from '@/features/editor/types';
import { cn } from '@/lib/utils';
import { BsLayerBackward, BsLayerForward } from 'react-icons/bs';

interface Props {
	editor: Editor | undefined;
	activeTool: ActiveTool;
	onChangeActiveTool: (activeTool: ActiveTool) => void;
}

export const Toolbar = (props: Props) => {
	const {editor, activeTool, onChangeActiveTool} = props;

	const fileColor = editor?.getFillColor() || FILL_COLOR;
	const strokeColor = editor?.getStrokeColor() || STROKE_COLOR;

	if (editor?.selectedObjects.length === 0) {
		return <div
			className={'shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2'}/>;
	}

	return (
		<div className={'shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2'}>
			<div className={'flex items-center justify-center h-full gap-2'}>
				<Hint label={'颜色'} side={'bottom'} sideOffset={5}>
					<Button
						variant={'ghost'} size={'icon'}
						className={cn(activeTool === 'fill' && 'bg-gray-100')}
						onClick={() => onChangeActiveTool('fill')}
					>
						<div className={'rounded-sm size-4 border'} style={{backgroundColor: fileColor}}/>
					</Button>
				</Hint>
				<Hint label={'边框颜色'} side={'bottom'} sideOffset={5}>
					<Button
						variant={'ghost'} size={'icon'}
						className={cn(activeTool === 'stroke-color' && 'bg-gray-100')}
						onClick={() => onChangeActiveTool('stroke-color')}
					>
						<div className={'rounded-sm size-4 border-2 bg-white'} style={{borderColor: strokeColor}}/>
					</Button>
				</Hint>
				<Hint label={'边框样式'} side={'bottom'} sideOffset={5}>
					<Button
						variant={'ghost'} size={'icon'}
						className={cn(activeTool === 'stroke-width' && 'bg-gray-100')}
						onClick={() => onChangeActiveTool('stroke-width')}
					>
						<RxBorderWidth className={'size-4'}/>
					</Button>
				</Hint>
				<Hint label={'涂层上移'} side={'bottom'} sideOffset={5}>
					<Button size={'icon'} variant={'ghost'} onClick={() => editor?.bringForward()}>
						<BsLayerForward className={'size-4'}/>
					</Button>
				</Hint>
				<Hint label={'涂层下移'} side={'bottom'} sideOffset={5}>
					<Button size={'icon'} variant={'ghost'} onClick={() => editor?.sendBackwards()}>
						<BsLayerBackward className={'size-4'}/>
					</Button>
				</Hint>
			</div>
		</div>
	);
};
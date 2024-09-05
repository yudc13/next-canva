'use client';

import { isTextType } from '@/features/editor/utils';
import { ChevronDown } from 'lucide-react';
import { MdDelete } from 'react-icons/md';
import { RxBorderWidth, RxTransparencyGrid } from 'react-icons/rx';
import { Hint } from '@/components/Hint';
import { Button } from '@/components/ui/button';
import { ActiveTool, Editor, FILL_COLOR, STROKE_COLOR } from '@/features/editor/types';
import { cn } from '@/lib/utils';
import { BsLayerBackward, BsLayerForward } from 'react-icons/bs';
import { FaBold, FaUnderline } from 'react-icons/fa6';

interface Props {
	editor: Editor | undefined;
	activeTool: ActiveTool;
	onChangeActiveTool: (activeTool: ActiveTool) => void;
}

export const Toolbar = (props: Props) => {
	const {editor, activeTool, onChangeActiveTool} = props;

	const fileColor = editor?.getActiveFillColor() || FILL_COLOR;
	const strokeColor = editor?.getActiveStrokeColor() || STROKE_COLOR;
	const currentFontWeight = editor?.getActiveFontWeight();
	const currentUnderline = editor?.getActiveUnderline();
	const currentFontFamily = editor?.getActiveFontFamily();

	const selectedObjectType = editor?.selectedObjects[0]?.type
	const isText = isTextType(selectedObjectType)

	const onClickFontWeight = () => {
		let newFontWeight: number | 'normal' = currentFontWeight === 'normal' ? 700 : 'normal';
		editor?.changeFontWeight(newFontWeight);
		onChangeActiveTool('fontWeight');
	}

	const onClickUnderline = () => {
		let newUnderline = !currentUnderline;
		editor?.changeUnderline(newUnderline);
		onChangeActiveTool('underline');
	}

	const onClickFontFamily = () => {
		onChangeActiveTool('fontFamily')
	}

	if (!editor || editor.selectedObjects.length === 0) {
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
				{
					!isText && (
						<Hint label={'边框颜色'} side={'bottom'} sideOffset={5}>
							<Button
								variant={'ghost'} size={'icon'}
								className={cn(activeTool === 'stroke-color' && 'bg-gray-100')}
								onClick={() => onChangeActiveTool('stroke-color')}
							>
								<div className={'rounded-sm size-4 border-2 bg-white'} style={{borderColor: strokeColor}}/>
							</Button>
						</Hint>
					)
				}
				{
					!isText && (
						<Hint label={'边框样式'} side={'bottom'} sideOffset={5}>
							<Button
								variant={'ghost'} size={'icon'}
								className={cn(activeTool === 'stroke-width' && 'bg-gray-100')}
								onClick={() => onChangeActiveTool('stroke-width')}
							>
								<RxBorderWidth className={'size-4'}/>
							</Button>
						</Hint>
					)
				}
				{
					isText && (
						<Hint label={'字体样式'} side={'bottom'} sideOffset={5}>
							<Button
								variant={'ghost'} size={'icon'}
								className={cn('w-auto px-2', activeTool === 'fontFamily' && 'bg-gray-100')}
								onClick={onClickFontFamily}
							>
								<div className={'max-w-[100px] truncate'}>{currentFontFamily}</div>
								<ChevronDown className={'size-4 ml-2 shrink-0'} />
							</Button>
						</Hint>
					)
				}
				{
					isText && (
						<Hint label={'加粗'} side={'bottom'} sideOffset={5}>
							<Button
								variant={'ghost'} size={'icon'}
								className={cn(activeTool === 'fontWeight' && 'bg-gray-100')}
								onClick={onClickFontWeight}
							>
								<FaBold className={'size-4'}/>
							</Button>
						</Hint>
					)
				}
				{
					isText && (
						<Hint label={'下划线'} side={'bottom'} sideOffset={5}>
							<Button
								variant={'ghost'} size={'icon'}
								className={cn(activeTool === 'underline' && 'bg-gray-100')}
								onClick={onClickUnderline}
							>
								<FaUnderline className={'size-4'}/>
							</Button>
						</Hint>
					)
				}
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
				<Hint label={'透明度'} side={'bottom'} sideOffset={5}>
					<Button size={'icon'} variant={'ghost'} onClick={() => onChangeActiveTool('opacity')}>
						<RxTransparencyGrid className={'size-4'}/>
					</Button>
				</Hint>
				<Hint label={'删除'} side={'bottom'} sideOffset={5}>
					<Button size={'icon'} variant={'ghost'} onClick={() => editor?.delete()}>
						<MdDelete className={'size-4'} />
					</Button>
				</Hint>
			</div>
		</div>
	);
};
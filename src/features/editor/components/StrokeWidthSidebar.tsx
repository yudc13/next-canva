import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { ToolSidebar } from '@/features/editor/components/ToolSidebar';
import { ToolSidebarClose } from '@/features/editor/components/ToolSidebarClose';
import { ToolSidebarHeader } from '@/features/editor/components/ToolSidebarHeader';
import { ActiveTool, Editor, RADIUS, STROKE_DASH_ARRAY, STROKE_WIDTH } from '@/features/editor/types';
import { cn } from '@/lib/utils';
import { AiOutlineDash, AiOutlineSmallDash } from 'react-icons/ai';
import { GoCircleSlash, GoDash } from 'react-icons/go';

interface Props {
	editor: Editor | undefined;
	activeTool: ActiveTool;
	onChangeActiveTool: (activeTool: ActiveTool) => void;
}

const defaultStrokeDashArray = [
	[],
	[12, 2],
	[6, 2],
];

const dashClassName = 'w-14 h-10 rounded-md border border-gray-300 bg-white hover:bg-white hover:border-gray-600';

export const StrokeWidthSidebar = (props: Props) => {
	const {editor, activeTool, onChangeActiveTool} = props;
	const strokeWidth = editor?.getStrokeWidth() || 0;
	const strokeDashArray = editor?.getStrokeDashArray() || STROKE_DASH_ARRAY;
	const radius = editor?.getRadius() || RADIUS;
	const onStrokeWidthChange = (width: number) => {
		editor?.changeStrokeWidth(width);
	};

	const onStrokeDashArrayChange = (dashArray: number[]) => {
		editor?.changeStrokeDashArray(dashArray);
	};

	const onRadiusChange = (radius: number) => {
		editor?.changeRadius(radius);
	};

	return (
		<ToolSidebar open={activeTool === 'stroke-width'}>
			<ToolSidebarHeader title={'边框样式'} description={'设置元素的边框样式'}/>
			<ScrollArea>
				<div className={'space-y-6 p-4'}>
					<div className={'flex items-center gap-4'}>
						<Button
							variant={'ghost'}
							className={cn(dashClassName, strokeDashArray?.join(',') === defaultStrokeDashArray[0].join(',') && 'border-2 border-blue-500 hover:border-blue-500')}
							onClick={() => onStrokeDashArrayChange(defaultStrokeDashArray[0])}
						>
							<GoDash className={'size-8'}/>
						</Button>
						<Button
							variant={'ghost'}
							className={cn(dashClassName, strokeDashArray?.join(',') === defaultStrokeDashArray[1].join(',') && 'border-2 border-blue-500 hover:border-blue-500')}
							onClick={() => onStrokeDashArrayChange(defaultStrokeDashArray[1])}
						>
							<AiOutlineDash className={'size-8'}/>
						</Button>
						<Button
							variant={'ghost'}
							className={cn(dashClassName, strokeDashArray?.join(',') === defaultStrokeDashArray[2].join(',') && 'border-2 border-blue-500 hover:border-blue-500')}
							onClick={() => onStrokeDashArrayChange(defaultStrokeDashArray[2])}
						>
							<AiOutlineSmallDash className={'size-8'}/>
						</Button>
					</div>
					<div className={'space-y-2'}>
						<Label className={'text-sm'}>边框粗细</Label>
						<div className={'flex items-center gap-4'}>
							<Slider min={0} max={100} step={1} value={[strokeWidth]} onValueChange={v => onStrokeWidthChange(v[0])}/>
							<Input value={strokeWidth} className={'w-10 shrink-0 p-0 text-center'} onChange={v => onStrokeWidthChange(Number(v.target.value))}/>
						</div>
					</div>
					<div className={'space-y-2'}>
						<Label className={'text-sm'}>圆角</Label>
						<div className={'flex items-center gap-4'}>
							<Slider min={0} max={100} step={1} value={[radius]} onValueChange={v => onRadiusChange(v[0])}/>
							<Input value={radius} className={'w-10 shrink-0 p-0 text-center'} onChange={v => onRadiusChange(Number(v.target.value))}/>
						</div>
					</div>
				</div>
			</ScrollArea>
			<ToolSidebarClose onClick={() => onChangeActiveTool('select')}/>
		</ToolSidebar>
	);
};
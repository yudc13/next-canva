import { ColorPicker } from '@/features/editor/components/ColorPicker';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ToolSidebar } from '@/features/editor/components/ToolSidebar';
import { ToolSidebarClose } from '@/features/editor/components/ToolSidebarClose';
import { ToolSidebarHeader } from '@/features/editor/components/ToolSidebarHeader';
import { ActiveTool, Editor, STROKE_COLOR } from '@/features/editor/types';

interface Props {
	editor: Editor | undefined;
	activeTool: ActiveTool;
	onChangeActiveTool: (activeTool: ActiveTool) => void;
}

export const StrokeColorSidebar = (props: Props) => {
	const {editor, activeTool, onChangeActiveTool} = props;
	const strokeColor = editor?.getStrokeColor() || STROKE_COLOR
	const onStrokeColorChange = (color: string) => {
		editor?.changeStrokeColor(color)
	}

	return (
		<ToolSidebar open={activeTool === 'stroke-color'}>
			<ToolSidebarHeader title={'边框颜色'} description={'设置元素的边框颜色'} />
			<ScrollArea>
				<div className={'gap-4 p-4'}>
					<ColorPicker value={strokeColor} onChange={onStrokeColorChange} />
				</div>
			</ScrollArea>
			<ToolSidebarClose onClick={() => onChangeActiveTool('select')} />
		</ToolSidebar>
	);
};
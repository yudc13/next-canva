import { ColorPicker } from '@/features/editor/components/ColorPicker';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ToolSidebar } from '@/features/editor/components/ToolSidebar';
import { ToolSidebarClose } from '@/features/editor/components/ToolSidebarClose';
import { ToolSidebarHeader } from '@/features/editor/components/ToolSidebarHeader';
import { ActiveTool, Editor, FILL_COLOR } from '@/features/editor/types';

interface Props {
	editor: Editor | undefined;
	activeTool: ActiveTool;
	onChangeActiveTool: (activeTool: ActiveTool) => void;
}

export const FillColorSidebar = (props: Props) => {
	const {editor, activeTool, onChangeActiveTool} = props;
	const fillColor = editor?.getActiveFillColor() || FILL_COLOR
	const onFillColorChange = (color: string) => {
		editor?.changeFillColor(color)
	}

	return (
		<ToolSidebar open={activeTool === 'fill'} onClose={() => onChangeActiveTool('select')}>
			<ToolSidebarHeader title={'颜色'} description={'设置元素的填充颜色'} />
			<ScrollArea>
				<div className={'gap-4 p-4'}>
					<ColorPicker value={fillColor} onChange={onFillColorChange} />
				</div>
			</ScrollArea>
		</ToolSidebar>
	);
};
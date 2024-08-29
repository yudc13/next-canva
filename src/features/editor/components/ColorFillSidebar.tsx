import { ColorPicker } from '@/features/editor/components/ColorPicker';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ToolSidebarClose } from '@/features/editor/components/ToolSidebarClose';
import { ToolSidebarHeader } from '@/features/editor/components/ToolSidebarHeader';
import { ActiveTool, Editor, FILL_COLOR } from '@/features/editor/types';
import { cn } from '@/lib/utils';

interface Props {
	editor: Editor | undefined;
	activeTool: ActiveTool;
	onChangeActiveTool: (activeTool: ActiveTool) => void;
}

export const ColorFillSidebar = (props: Props) => {
	const {editor, activeTool, onChangeActiveTool} = props;
	const fillColor = editor?.fillColor || FILL_COLOR
	const onFillColorChange = (color: string) => {
		editor?.changeFillColor(color)
	}

	return (
		<aside
			className={cn(`bg-white relative border-r z-[40] w-[360px] h-full flex flex-col`, activeTool === 'fill' ? 'visible' : 'hidden')}
		>
			<ToolSidebarHeader title={'Color'} description={'Select a color to your canvas'} />
			<ScrollArea>
				<div className={'gap-4 p-4'}>
					<ColorPicker value={fillColor} onChange={onFillColorChange} />
				</div>
			</ScrollArea>
			<ToolSidebarClose onClick={() => onChangeActiveTool('select')} />
		</aside>
	);
};
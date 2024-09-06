import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { ToolSidebar } from '@/features/editor/components/ToolSidebar';
import { ToolSidebarClose } from '@/features/editor/components/ToolSidebarClose';
import { ToolSidebarHeader } from '@/features/editor/components/ToolSidebarHeader';
import { ActiveTool, Editor, OPACITY } from '@/features/editor/types';

interface Props {
	editor: Editor | undefined;
	activeTool: ActiveTool;
	onChangeActiveTool: (activeTool: ActiveTool) => void;
}


export const OpacitySidebar = (props: Props) => {
	const {editor, activeTool, onChangeActiveTool} = props;
	const opacity = editor ? editor?.getActiveOpacity() : OPACITY;
	const onOpacityChange = (value: number) => {
		editor?.changeOpacity(value);
	};

	return (
		<ToolSidebar open={activeTool === 'opacity'} onClose={() => onChangeActiveTool('select')}>
			<ToolSidebarHeader title={'透明度'} description={'设置元素的透明度'}/>
			<ScrollArea>
				<div className={'p-4'}>
					<div className={'space-y-2'}>
						<Label className={'text-sm'}>透明度</Label>
						<div className={'flex items-center gap-4'}>
							<Slider min={0} max={1} step={0.01} value={[opacity]} onValueChange={v => onOpacityChange(v[0])}/>
							<Input value={opacity} min={0} step={0.01} max={1} className={'w-10 shrink-0 p-0 text-center'}
							       onChange={v => onOpacityChange(Number(v.target.value))}/>
						</div>
					</div>

				</div>
			</ScrollArea>
		</ToolSidebar>
	);
};
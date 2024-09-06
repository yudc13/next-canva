import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { ToolSidebar } from '@/features/editor/components/ToolSidebar';
import { ToolSidebarClose } from '@/features/editor/components/ToolSidebarClose';
import { ToolSidebarHeader } from '@/features/editor/components/ToolSidebarHeader';
import { ActiveTool, Editor, FONT_FAMILY, fonts, OPACITY } from '@/features/editor/types';
import { cn } from '@/lib/utils';

interface Props {
	editor: Editor | undefined;
	activeTool: ActiveTool;
	onChangeActiveTool: (activeTool: ActiveTool) => void;
}


export const FontFamilySidebar = (props: Props) => {
	const {editor, activeTool, onChangeActiveTool} = props;
	const fontFamily = editor ? editor?.getActiveFontFamily() : FONT_FAMILY;
	const onFontFamilyChange = (value: string) => {
		editor?.changeFontFamily(value);
	};

	return (
		<ToolSidebar open={activeTool === 'fontFamily'}  onClose={() => onChangeActiveTool('select')}>
			<ToolSidebarHeader title={'字体'} description={'设置文字字体'}/>
			<ScrollArea>
				<div className={'p-4 space-y-4'}>
					{
						fonts.map(font => (
							<Button
								key={font}
								variant={'secondary'}
								size={'lg'}
								className={cn('w-full h-16 justify-start text-left', fontFamily === font && 'border-2 border-blue-500')}
								style={{
									fontFamily: font,
									fontSize: 16,
								}}
								onClick={() => onFontFamilyChange(font)}
							>
								{font}
							</Button>
						))
					}
				</div>
			</ScrollArea>
		</ToolSidebar>
	);
};
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ToolSidebar } from '@/features/editor/components/ToolSidebar';
import { ToolSidebarClose } from '@/features/editor/components/ToolSidebarClose';
import { ToolSidebarHeader } from '@/features/editor/components/ToolSidebarHeader';
import { ActiveTool, Editor, FONT_FAMILY, FONT_SIZE } from '@/features/editor/types';

interface Props {
	editor: Editor | undefined;
	activeTool: ActiveTool;
	onChangeActiveTool: (activeTool: ActiveTool) => void;
}

export const TextSidebar = (props: Props) => {
	const {editor, activeTool, onChangeActiveTool} = props;
	return (
		<ToolSidebar open={activeTool === 'text'} onClose={() => onChangeActiveTool('select')}>
			<ToolSidebarHeader title={'文字'} description={'添加默认文字'}/>
			<ScrollArea>
				<div className={'p-4 space-y-4'}>
					<Button
						className={'w-full'}
						onClick={() => editor?.addText('你的段落文字', {fontSize: FONT_SIZE, fontWeight: 'normal', fontFamily: FONT_FAMILY})}
					>
						添加文本框
					</Button>
					<Separator/>
					<Button
						className={'w-full h-16'}
						variant={'secondary'}
						onClick={() => editor?.addText('添加标题', {fontSize: 80, fontWeight: 700})}
					>
						<span className={'text-3xl font-bold'}>添加标题</span>
					</Button>
					<Button
						className={'w-full h-16'}
						variant={'secondary'}
						onClick={() => editor?.addText('添加副标题', {fontSize: 44, fontWeight: 600})}
					>
						<span className={'text-2xl font-semibold'}>添加副标题</span>
					</Button>
					<Button
						className={'w-full h-16'}
						variant={'secondary'}
						onClick={() => editor?.addText('添加一小段正文文字', {fontSize: 32})}
					>
						添加一小段正文文字
					</Button>
				</div>
			</ScrollArea>
		</ToolSidebar>
	);
};
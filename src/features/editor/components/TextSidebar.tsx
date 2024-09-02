import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ToolSidebar } from '@/features/editor/components/ToolSidebar';
import { ToolSidebarClose } from '@/features/editor/components/ToolSidebarClose';
import { ToolSidebarHeader } from '@/features/editor/components/ToolSidebarHeader';
import { ActiveTool, Editor } from '@/features/editor/types';

interface Props {
	editor: Editor | undefined;
	activeTool: ActiveTool;
	onChangeActiveTool: (activeTool: ActiveTool) => void;
}

export const TextSidebar = (props: Props) => {
	const {editor, activeTool, onChangeActiveTool} = props;
	return (
		<ToolSidebar open={activeTool === 'text'}>
			<ToolSidebarHeader title={'文字'} description={'添加默认文字'}/>
			<ScrollArea>
				<div className={'p-4 space-y-4'}>
					<Button
						className={'w-full'}
						onClick={() => editor?.addText('你的段落文字', {fontSize: 16})}
					>
						添加文本框
					</Button>
					<Separator/>
					<Button
						className={'w-full'}
						variant={'outline'}
						onClick={() => editor?.addText('添加标题', {fontSize: 60})}
					>
						添加标题
					</Button>
					<Button
						className={'w-full'}
						variant={'outline'}
						onClick={() => editor?.addText('添加副标题', {fontSize: 35})}
					>
						添加副标题
					</Button>
					<Button
						className={'w-full'}
						variant={'outline'}
						onClick={() => editor?.addText('添加一小段正文文字', {fontSize: 20})}
					>
						添加一小段正文文字
					</Button>
				</div>
			</ScrollArea>
			<ToolSidebarClose onClick={() => onChangeActiveTool('select')}/>
		</ToolSidebar>
	);
};
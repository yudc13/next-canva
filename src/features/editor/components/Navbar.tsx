'use client';
import { Hint } from '@/components/Hint';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Logo } from '@/features/editor/components/Logo';
import { ActiveTool, Editor } from '@/features/editor/types';
import { cn } from '@/lib/utils';
import { ChevronDown, Download, MousePointerClick, Redo2, Undo2 } from 'lucide-react';
import { BsCloudCheck } from 'react-icons/bs';
import { CiFileOn } from 'react-icons/ci';
import { useFilePicker } from 'use-file-picker';

interface Props {
	editor: Editor | undefined;
	activeTool: ActiveTool;
	onChangeActiveTool: (activeTool: ActiveTool) => void;
}

export const Navbar = (props: Props) => {
	const {editor, activeTool, onChangeActiveTool} = props;

	const {openFilePicker} = useFilePicker({
		accept: '.json',
		onFilesSuccessfullySelected: ({plainFiles}: any) => {
			if (plainFiles && plainFiles.length > 0) {
				const file = plainFiles[0];
				const render = new FileReader();
				render.readAsText(file, 'UTF-8');
				render.onload = () => {
					editor?.loadFromJson(render.result as string)
				}
			}
		},
	});

	return (
		<nav className={'w-full flex items-center p-4 h-[68px] gap-x-8 border-b lg:pl-[34px]'}>
			<Logo/>
			<div className={'w-full h-full flex items-center gap-x-1'}>
				<DropdownMenu modal={false}>
					<DropdownMenuTrigger asChild>
						<Button size={'sm'} variant={'ghost'}>
							文件
							<ChevronDown className={'size-4 ml-2'}/>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align={'start'} className={'min-w-60'}>
						<DropdownMenuItem className={'flex items-center gap-x-2'} onClick={openFilePicker}>
							<CiFileOn className={'size-8'}/>
							<div>
								<p>选择</p>
								<p className={'text-xs text-muted-foreground'}>选择一个JSON文件</p>
							</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<Separator orientation={'vertical'} className={'mx-2'}/>
				<Hint label={'选择'}>
					<Button
						size={'icon'}
						variant={'ghost'}
						className={cn(activeTool === 'select' && 'bg-gray-100')}
						onClick={() => onChangeActiveTool('select')}
					>
						<MousePointerClick className={'size-4'}/>
					</Button>
				</Hint>
				<Hint label={'撤销'}>
					<Button size={'icon'} variant={'ghost'} disabled={!editor?.canUndo()} onClick={() => editor?.undo()}>
						<Undo2 className={'size-4'}/>
					</Button>
				</Hint>
				<Hint label={'重做'}>
					<Button size={'icon'} variant={'ghost'} disabled={!editor?.canRedo()} onClick={() => editor?.redo()}>
						<Redo2 className={'size-4'}/>
					</Button>
				</Hint>
				<Separator orientation={'vertical'} className={'mx-2'}/>
				<div className={'flex items-center gap-x-2'}>
					<BsCloudCheck className={'size-[20px] text-muted-foreground'}/>
					<div className={'text-xs text-muted-foreground'}>保存</div>
				</div>
				<div className={'flex items-center gap-x-4 ml-auto'}>
					<DropdownMenu modal={false}>
						<DropdownMenuTrigger asChild>
							<Button variant={'ghost'} size={'sm'}>
								导出
								<Download className={'size-4 ml-4'}/>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align={'end'} className={'min-w-60'}>
							<DropdownMenuItem className={'flex items-center gap-x-2'} onClick={() => editor?.saveJson()}>
								<CiFileOn className={'size-8'}/>
								<div>
									<p>JSON</p>
									<p className={'text-xs text-muted-foreground'}>Save for later editing</p>
								</div>
							</DropdownMenuItem>
							<DropdownMenuItem className={'flex items-center gap-x-2'} onClick={() => editor?.savePng()}>
								<CiFileOn className={'size-8'}/>
								<div>
									<p>PNG</p>
									<p className={'text-xs text-muted-foreground'}>Best for sharing on the web</p>
								</div>
							</DropdownMenuItem>
							<DropdownMenuItem className={'flex items-center gap-x-2'} onClick={() => editor?.saveJpg()}>
								<CiFileOn className={'size-8'}/>
								<div>
									<p>JPG</p>
									<p className={'text-xs text-muted-foreground'}>Best for printing</p>
								</div>
							</DropdownMenuItem>
							<DropdownMenuItem className={'flex items-center gap-x-2'} onClick={() => editor?.saveSvg()}>
								<CiFileOn className={'size-8'}/>
								<div>
									<p>SVG</p>
									<p className={'text-xs text-muted-foreground'}>Best for editing in vector software</p>
								</div>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</nav>
	);
};
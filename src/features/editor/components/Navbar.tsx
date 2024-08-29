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
import { ActiveTool } from '@/features/editor/types';
import { cn } from '@/lib/utils';
import { ChevronDown, Download, MousePointerClick, Redo2, Undo2 } from 'lucide-react';
import { BsCloudCheck } from 'react-icons/bs';
import { CiFileOn } from 'react-icons/ci';

interface Props {
	activeTool: ActiveTool;
	onChangeActiveTool: (activeTool: ActiveTool) => void;
}

export const Navbar = (props: Props) => {
	const {activeTool, onChangeActiveTool} = props
	return (
		<nav className={'w-full flex items-center p-4 h-[68px] gap-x-8 border-b lg:pl-[34px]'}>
			<Logo/>
			<div className={'w-full h-full flex items-center gap-x-1'}>
				<DropdownMenu modal={false}>
					<DropdownMenuTrigger asChild>
						<Button size={'sm'} variant={'ghost'}>
							File
							<ChevronDown className={'size-4 ml-2'}/>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align={'start'} className={'min-w-60'}>
						<DropdownMenuItem className={'flex items-center gap-x-2'}>
							<CiFileOn className={'size-8'}/>
							<div>
								<p>Open</p>
								<p className={'text-xs text-muted-foreground'}>Open a JSON file</p>
							</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<Separator orientation={'vertical'} className={'mx-2'}/>
				<Hint label={'Select'}>
					<Button
						size={'icon'}
						variant={'ghost'}
						className={cn(activeTool === 'select' && 'bg-gray-100')}
						onClick={() => onChangeActiveTool('select')}
					>
						<MousePointerClick className={'size-4'}/>
					</Button>
				</Hint>
				<Hint label={'Undo'}>
					<Button size={'icon'} variant={'ghost'}>
						<Undo2 className={'size-4'}/>
					</Button>
				</Hint>
				<Hint label={'Redo'}>
					<Button size={'icon'} variant={'ghost'}>
						<Redo2 className={'size-4'}/>
					</Button>
				</Hint>
				<Separator orientation={'vertical'} className={'mx-2'}/>
				<div className={'flex items-center gap-x-2'}>
					<BsCloudCheck className={'size-[20px] text-muted-foreground'} />
					<div className={'text-xs text-muted-foreground'}>Saved</div>
				</div>
				<div className={'flex items-center gap-x-4 ml-auto'}>
					<DropdownMenu modal={false}>
						<DropdownMenuTrigger asChild>
							<Button variant={'ghost'} size={'sm'}>
								Export
								<Download className={'size-4 ml-4'} />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align={'end'} className={'min-w-60'}>
							<DropdownMenuItem className={'flex items-center gap-x-2'}>
								<CiFileOn className={'size-8'} />
								<div>
									<p>JSON</p>
									<p className={'text-xs text-muted-foreground'}>Save for later editing</p>
								</div>
							</DropdownMenuItem>
							<DropdownMenuItem className={'flex items-center gap-x-2'}>
								<CiFileOn className={'size-8'} />
								<div>
									<p>PNG</p>
									<p className={'text-xs text-muted-foreground'}>Best for sharing on the web</p>
								</div>
							</DropdownMenuItem>
							<DropdownMenuItem className={'flex items-center gap-x-2'}>
								<CiFileOn className={'size-8'} />
								<div>
									<p>JPG</p>
									<p className={'text-xs text-muted-foreground'}>Best for printing</p>
								</div>
							</DropdownMenuItem>
							<DropdownMenuItem className={'flex items-center gap-x-2'}>
								<CiFileOn className={'size-8'} />
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
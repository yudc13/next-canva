import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger,
	MenubarTrigger,
} from '@/components/ui/menubar';
import { Copy, CopyPlus, Trash } from 'lucide-react';
import { IoIosMore } from 'react-icons/io';
import { Editor } from '@/features/editor/types';
import { Hint } from '@/components/Hint';
import {
	LuAlignCenterHorizontal,
	LuAlignCenterVertical, LuAlignEndHorizontal,
	LuAlignEndVertical,
	LuAlignStartHorizontal,
	LuAlignStartVertical,
} from 'react-icons/lu';
import { MdOutlineContentPaste } from 'react-icons/md';


interface Props {
	editor: Editor | undefined;
}

export const ControlsMenubar = ({editor}: Props) => {
	return (
		<Menubar id="controls-menubar" className={'fixed top-0 left-0 hidden'}>
			<MenubarMenu>
				<MenubarTrigger onClick={() => editor?.clone()}>
					<Hint label={'创建副本'} side={'bottom'} sideOffset={5}>
						<CopyPlus className={'size-4'}/>
					</Hint>
				</MenubarTrigger>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger onClick={() => editor?.delete()}>
					<Hint label={'删除'} side={'bottom'} sideOffset={5}>
						<Trash className={'size-4'}/>
					</Hint>
				</MenubarTrigger>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger>
					<Hint label={'更多'} side={'bottom'} sideOffset={5}>
						<IoIosMore className={'size-4'}/>
					</Hint>
				</MenubarTrigger>
				<MenubarContent>
					<MenubarItem onClick={() => editor?.copy()}>
						<Copy className={'size-4 text-popover-foreground mr-2'}/>
						复制 <MenubarShortcut>⌘C</MenubarShortcut>
					</MenubarItem>
					<MenubarItem onClick={() => editor?.paste()}>
						<MdOutlineContentPaste className={'size-4 text-popover-foreground mr-2'}/>
						粘贴 <MenubarShortcut>⌘V</MenubarShortcut>
					</MenubarItem>
					<MenubarSeparator/>
					<MenubarItem onClick={() => editor?.clone()}>
						<CopyPlus className={'size-4 text-popover-foreground mr-2'}/>
						创建副本 <MenubarShortcut>⌘D</MenubarShortcut>
					</MenubarItem>
					<MenubarItem onClick={() => editor?.delete()}>
						<Trash className={'size-4 text-popover-foreground mr-2'}/>
						删除 <MenubarShortcut>DELETE</MenubarShortcut>
					</MenubarItem>
					<MenubarSeparator/>
					<MenubarSub>
						<MenubarSubTrigger>
							<LuAlignStartVertical className={'size-4 text-popover-foreground mr-2'} />
							页面对齐
						</MenubarSubTrigger>
						<MenubarSubContent>
							<MenubarItem onClick={() => editor?.alignStartVertical()}>
								<LuAlignStartVertical className={'size-4 text-popover-foreground mr-2'}/>
								左对齐
							</MenubarItem>
							<MenubarItem onClick={() => editor?.alignCenterVertical()}>
								<LuAlignCenterVertical className={'size-4 text-popover-foreground mr-2'}/>
								居中
							</MenubarItem>
							<MenubarItem>
								<LuAlignEndVertical className={'size-4 text-popover-foreground mr-2'} />
								右对齐
							</MenubarItem>
							<MenubarSeparator/>
							<MenubarItem>
								<LuAlignStartHorizontal className={'size-4 text-popover-foreground mr-2'} />
								顶部对齐
							</MenubarItem>
							<MenubarItem>
								<LuAlignCenterHorizontal className={'size-4 text-popover-foreground mr-2'} />
								居中对齐
							</MenubarItem>
							<MenubarItem>
								<LuAlignEndHorizontal className={'size-4 text-popover-foreground mr-2'} />
								地部对齐
							</MenubarItem>
						</MenubarSubContent>
					</MenubarSub>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	);
};
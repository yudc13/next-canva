import { ScrollArea } from '@/components/ui/scroll-area';
import { ShapeTool } from '@/features/editor/components/ShapeTool';
import { ToolSidebarClose } from '@/features/editor/components/ToolSidebarClose';
import { ToolSidebarHeader } from '@/features/editor/components/ToolSidebarHeader';
import { ActiveTool, Editor } from '@/features/editor/types';
import { cn } from '@/lib/utils';
import { FaCircle, FaSquare, FaSquareFull } from 'react-icons/fa';
import { FaDiamond } from 'react-icons/fa6';
import { IoTriangle } from 'react-icons/io5';

interface Props {
	editor: Editor | undefined;
	activeTool: ActiveTool;
	onChangeActiveTool: (activeTool: ActiveTool) => void;
}

export const ShapesSidebar = (props: Props) => {
	const {editor, activeTool, onChangeActiveTool} = props;
	return (
		<aside
			className={cn(`bg-white relative border-r z-[40] w-[360px] h-full flex flex-col`, activeTool === 'shapes' ? 'visible' : 'hidden')}
		>
			<ToolSidebarHeader title={'Shapes'} description={'Add shapes to your canvas'} />
			<ScrollArea>
				<div className={'grid grid-cols-3 gap-4 p-4'}>
					<ShapeTool icon={FaCircle} onClick={() => editor?.addCircle()} />
					<ShapeTool icon={FaSquare} onClick={() => editor?.addSoftRectangle()} />
					<ShapeTool icon={FaSquareFull} onClick={() => editor?.addRectangle()} />
					<ShapeTool icon={IoTriangle} onClick={() => editor?.addTriangle()} />
					<ShapeTool icon={IoTriangle} iconClassname={'rotate-180'} onClick={() => editor?.addInverseTriangle()} />
					<ShapeTool icon={FaDiamond} onClick={() => editor?.addDiamond()} />
				</div>
			</ScrollArea>
			<ToolSidebarClose onClick={() => onChangeActiveTool('select')} />
		</aside>
	);
};
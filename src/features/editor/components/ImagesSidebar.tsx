import { Error } from '@/components/Error';
import { Loading } from '@/components/Loading';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ToolSidebar } from '@/features/editor/components/ToolSidebar';
import { ToolSidebarHeader } from '@/features/editor/components/ToolSidebarHeader';
import { ActiveTool, Editor } from '@/features/editor/types';
import { useImages } from '@/features/images/api/useImages';
import { UploadButton } from '@/lib/uploadthing';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
	editor: Editor | undefined;
	activeTool: ActiveTool;
	onChangeActiveTool: (activeTool: ActiveTool) => void;
}


export const ImagesSidebar = (props: Props) => {
	const {editor, activeTool, onChangeActiveTool} = props;

	const {data, isLoading, isError} = useImages();

	return (
		<ToolSidebar open={activeTool === 'images'} onClose={() => onChangeActiveTool('select')}>
			<ToolSidebarHeader title={'图片'} description={'选择图片素材'}/>
			{
				isError && <Error error={'加载图片失败'}/>
			}
			<div className={'p-4 border-b'}>
				<UploadButton
					appearance={{
						button: 'w-full text-sm font-medium',
						allowedContent: 'hidden'
					}}
					content={{
						button: '上传图片'
					}}
					endpoint={'imageUploader'}
					onClientUploadComplete={(res) => {
						editor?.addImage(res[0].url)
					}}
				/>
			</div>
			<Loading isLoading={isLoading}>
				<ScrollArea>
					<div className={'p-4 grid grid-cols-2 gap-4'}>
						{
							data?.images.map(image => (
								<button
									key={image.id}
									className={'relative w-full h-[100px] group group-hover:opacity-75 transition bg-muted-foreground rounded-sm overflow-hidden border'}
									onClick={() => editor?.addImage(image.urls.regular)}
								>
									<Image
										fill
										sizes="100%, 100px"
										src={image.urls.small}
										alt={image.alt_description || ''}
										className={'object-cover'}/>
									<Link
										href={image.links.html} target={'_blank'}
										className={'opacity-0 group-hover:opacity-100 absolute left-0 bottom-0 truncate w-full text-[10px] text-white bg-black/50 p-1 hover:underline text-left'}>
										{image.user.name}
									</Link>
								</button>
							))
						}
					</div>
				</ScrollArea>
			</Loading>
		</ToolSidebar>
	);
};
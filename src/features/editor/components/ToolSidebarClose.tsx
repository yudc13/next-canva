import { ChevronsLeft } from 'lucide-react';

interface Props {
	onClick: () => void
}

export const ToolSidebarClose = ({ onClick }: Props) => {
	return (
		<button
			className={'absolute -right-[1.8rem] h-[70px] bg-white top-1/2 transform -translate-y-1/2 flex items-center justify-center rounded-r-xl px-1 pr-2 border-y border-r group'}
			onClick={onClick}
		>
			<ChevronsLeft className={'size-4 text-black group-hover:opacity-75 transition'} />
		</button>
	)
}
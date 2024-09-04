
interface Props {
	title: string;
	description?: string
}

export const ToolSidebarHeader = ({ title, description }: Props) => {
	return (
		<div className={'px-4 border-b h-[56px] flex flex-col justify-center space-y-1 shrink-0'}>
			<p className={'text-sm font-medium'}>{title}</p>
			{description && <div className={'text-xs text-muted-foreground'}>{description}</div>}
		</div>
	)
}
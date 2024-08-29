import { LucideIcon } from 'lucide-react';
import { IconType } from 'react-icons';

interface Props {
	icon: LucideIcon | IconType
	iconClassname?: string
	onClick?: () => void
}

export const ShapeTool = ({ icon: Icon, iconClassname, onClick }: Props) => {
	return (
		<button onClick={onClick} className={'aspect-square border rounded-md p-5'}>
			<Icon className={`w-full h-full ${iconClassname}`} />
		</button>
	)
}
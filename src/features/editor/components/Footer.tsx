'use client';

import { Hint } from '@/components/Hint';
import { Button } from '@/components/ui/button';
import { Editor } from '@/features/editor/types';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface Props {
	editor: Editor | undefined
}

export const Footer = ({editor}: Props) => {
	return (
		<footer className={'bg-white flex items-center p-2 overflow-x-auto justify-end'}>
			<Hint label={'放大'}>
				<Button variant={'ghost'} size={'icon'} onClick={() => editor?.zoomIn()}>
					<ZoomIn className={'size-4'}/>
				</Button>
			</Hint>
			<Hint label={'缩小'}>
				<Button variant={'ghost'} size={'icon'} onClick={() => editor?.zoomOut()}>
					<ZoomOut className={'size-4'}/>
				</Button>
			</Hint>
		</footer>
	);
};
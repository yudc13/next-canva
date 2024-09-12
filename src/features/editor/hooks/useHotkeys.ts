import { fabric } from 'fabric';
import { useEvent } from 'react-use';

interface Props {
	canvas: fabric.Canvas | null
	save: (skip?: boolean) => void
	undo: () => void
	redo: () => void
	copy: () => void
	paste: () => void
}
export const useHotkeys = ({canvas, save, undo, redo, copy, paste}: Props) => {
	useEvent('keydown', event => {
		console.log(event);
		const isCtrlKey = event.ctrlKey || event.metaKey;
		const isBackspace = event.key === 'Backspace';
		const isInput = ['INPUT', 'TEXTAREA'].includes((event.target as HTMLElement).tagName)

		if (isInput) {
			return
		}

		if (isBackspace) {
			canvas?.remove(...canvas?.getActiveObjects())
			canvas?.discardActiveObject()
		}

		if (isCtrlKey && event.key === 'z') {
			event.preventDefault()
			undo()
		}

		if (isCtrlKey && event.key === 'y') {
			event.preventDefault()
			redo()
		}

		if (isCtrlKey && event.key === 'c') {
			event.preventDefault()
			copy()
		}

		if (isCtrlKey && event.key === 'v') {
			event.preventDefault()
			paste()
		}

		if (isCtrlKey && event.key === 's') {
			event.preventDefault()
			save(true)
		}
	})
}
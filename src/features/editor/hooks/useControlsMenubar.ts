import { fabric } from 'fabric';
import { useCallback } from 'react';

interface Props {
	canvas: fabric.Canvas | null;
}

export const useControlsMenubar = ({ canvas }: Props) => {
	const showMenubar = useCallback(() => {
		const controlsMenubarDom = document.getElementById('controls-menubar');
		if (controlsMenubarDom && canvas) {
			const object = canvas?.getActiveObject()

			if (!object) {
				controlsMenubarDom.style.display = 'none';
				return
			}

			const offset = canvas.calcOffset()
			const rect = object?.getBoundingRect()

			controlsMenubarDom.style.display = 'flex';
			// @ts-ignore
			controlsMenubarDom.style.top = offset._offset.top + rect?.top +  rect?.height + 24 + 'px';
			// @ts-ignore
			controlsMenubarDom.style.left = offset._offset.left + rect?.left - (controlsMenubarDom.offsetWidth - rect?.width) / 2 + 'px';
		}
	}, [canvas])
	const hiddenMenubar = useCallback(() => {
		const controlsMenubarDom = document.getElementById('controls-menubar');
		if (controlsMenubarDom) {
			controlsMenubarDom.style.display = 'none';
		}
	}, [])
	return {
		showMenubar,
		hiddenMenubar,
	}
}
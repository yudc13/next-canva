import { fabric } from 'fabric';
import { useEffect } from 'react';

interface Props {
	canvas: fabric.Canvas | null
	setSelectedObjects: (objects: fabric.Object[]) => void
}

export const useCanvasEvents = ({canvas, setSelectedObjects}: Props) => {
	useEffect(() => {
		if (canvas) {
			canvas.on('selection:created', (e) => {
				setSelectedObjects(e.selected || [])
			})
			canvas.on('selection:updated', (e) => {
				setSelectedObjects(e.selected || [])
			})
			canvas.on('selection:cleared', () => {
				setSelectedObjects([])
			})
		}
		return () => {
			if (canvas) {
				canvas.off('selection:created')
				canvas.off('selection:updated')
				canvas.off('selection:cleared')
			}
		}
	} ,[canvas])
};
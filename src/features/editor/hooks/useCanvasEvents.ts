import { fabric } from 'fabric';
import { useEffect } from 'react';

interface Props {
	canvas: fabric.Canvas | null
	setSelectedObjects: (objects: fabric.Object[]) => void
	clearDependenciesTools?: () => void
}

export const useCanvasEvents = ({canvas, setSelectedObjects, clearDependenciesTools}: Props) => {
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
				// 清除选中的时候, 关闭指定的 Sidebar
				clearDependenciesTools?.()
			})
		}
		return () => {
			if (canvas) {
				canvas.off('selection:created')
				canvas.off('selection:updated')
				canvas.off('selection:cleared')
			}
		}
	} ,[canvas, clearDependenciesTools, setSelectedObjects])
};
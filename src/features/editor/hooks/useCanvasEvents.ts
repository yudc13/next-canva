import { useControlsMenubar } from '@/features/editor/hooks/useControlsMenubar';
import { fabric } from 'fabric';
import { useEffect } from 'react';

interface Props {
	canvas: fabric.Canvas | null
	setSelectedObjects: (objects: fabric.Object[]) => void
	clearDependenciesTools?: () => void
}


export const useCanvasEvents = ({canvas, setSelectedObjects, clearDependenciesTools}: Props) => {
	const { showMenubar, hiddenMenubar } = useControlsMenubar({ canvas })
	useEffect(() => {
		if (canvas) {
			canvas.on('selection:created', (e) => {
				setSelectedObjects(e.selected || [])
				showMenubar()
			})
			canvas.on('selection:updated', (e) => {
				setSelectedObjects(e.selected || [])
				showMenubar()
			})
			canvas.on('selection:cleared', () => {
				setSelectedObjects([])
				// 清除选中的时候, 关闭指定的 Sidebar
				clearDependenciesTools?.()
				hiddenMenubar()
			})
			canvas.on('object:moving', (e) => {
				hiddenMenubar()
			})
			canvas.on('object:scaling', (e) => {
				hiddenMenubar()
			})
			canvas.on('object:rotating', (e) => {
				hiddenMenubar()
			})
			canvas.on('object:modified', (e) => {
				showMenubar()
			})
		}
		return () => {
			if (canvas) {
				canvas.off('selection:created')
				canvas.off('selection:updated')
				canvas.off('selection:cleared')
				canvas.off('object:scaling')
				canvas.off('object:rotating')
				canvas.off('object:modified')
			}
		}
	} ,[canvas, clearDependenciesTools, hiddenMenubar, setSelectedObjects, showMenubar])
};
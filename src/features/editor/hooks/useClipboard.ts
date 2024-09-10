import { fabric } from 'fabric';
import { useCallback, useRef } from 'react';

export const useClipboard = ({ canvas }: { canvas: fabric.Canvas | null }) => {
	const clipboardRef = useRef<fabric.Object | null>(null);

	const copy = useCallback(() => {
		canvas?.getActiveObject()?.clone((cloned: any) => {
			clipboardRef.current = cloned
		})

	}, [canvas])
	const paste = useCallback(() => {
		if (!clipboardRef.current) {
			return
		}
		clipboardRef.current.clone((cloned: any) => {
			canvas?.discardActiveObject()
			cloned.set({
				left: cloned.left! + 10,
				top: cloned.top! + 10,
				evented: true
			})
			if (cloned.type === 'activeSelection') {
				cloned.canvas = canvas
				cloned.forEachObject(function(obj: any) {
					canvas?.add(obj);
				})
				cloned.setCoords();
			} else {
				canvas?.add(cloned)
			}
			//@ts-ignore
			clipboardRef.current.top += 10
			//@ts-ignore
			clipboardRef.current.left += 10
			canvas?.setActiveObject(cloned)
			canvas?.requestRenderAll()
		})
	}, [canvas])

	return {
		copy,
		paste
	}
}
import { useControlsMenubar } from '@/features/editor/hooks/useControlsMenubar';
import { WORKSPACE_NAME } from '@/features/editor/types';
import { fabric } from 'fabric';
import { useCallback, useEffect } from 'react';

interface AutoResizeProps {
	canvas: fabric.Canvas | null;
	container: HTMLDivElement | null;
}

export const useAutoResize = (props: AutoResizeProps) => {
	const {canvas, container} = props;

	const { showMenubar } = useControlsMenubar({ canvas })

	const autoZoom = useCallback(() => {
		if (!canvas || !container) {
			return;
		}
		const width = container.offsetWidth;
		const height = container.offsetHeight;
		canvas.setWidth(width);
		canvas.setHeight(height);

		const center = canvas.getCenter();

		const zoomRatio = 0.85;
		const localWorkspace = canvas.getObjects().find(obj => obj.name === WORKSPACE_NAME);

		//@ts-ignore
		const scale = fabric.util.findScaleToFit(localWorkspace, {width, height});

		const zoom = zoomRatio * scale;

		canvas.setViewportTransform(fabric.iMatrix.concat());

		// 等比缩放
		canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoom);

		if (!localWorkspace) {
			return;
		}


		const workspaceCenter = localWorkspace.getCenterPoint();
		const viewportTransform = canvas.viewportTransform;


		if (
			canvas.width === undefined ||
			canvas.height === undefined ||
			!viewportTransform
		) {
			return;
		}

		/**
		 * viewportTransform
		 * // [scaleX, skewX, skewY, scaleY, translateX, translateY]
		 * // [0,      1,     2,     3,      4,          5]
		 */

		viewportTransform[4] = canvas.width / 2 - workspaceCenter.x * viewportTransform[0];
		viewportTransform[5] = canvas.height / 2 - workspaceCenter.y * viewportTransform[3];

		canvas.setViewportTransform(viewportTransform);
		localWorkspace.clone((cloned: fabric.Rect) => {
			canvas.clipPath = cloned;
			canvas.requestRenderAll();
		});

	}, [canvas, container]);

	useEffect(() => {
		let resizeObserver: ResizeObserver | null = null;

		if (canvas && container) {
			resizeObserver = new ResizeObserver(() => {
				autoZoom();
				showMenubar()
			});
			resizeObserver.observe(container);
		}

		return () => {
			resizeObserver?.disconnect();
		};

	}, [autoZoom, canvas, container, showMenubar]);

	return {
		autoZoom,
	};
};
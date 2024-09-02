import { useAutoResize } from '@/features/editor/hooks/useAutoResize';
import { useCanvasEvents } from '@/features/editor/hooks/useCanvasEvents';
import {
	BuilderEditorProps,
	CIRCLE_OPTION,
	DIAMOND_OPTION,
	Editor,
	FILL_COLOR,
	HEIGHT, OPACITY,
	RADIUS,
	RECTANGLE_OPTION,
	STROKE_COLOR,
	STROKE_DASH_ARRAY,
	STROKE_WIDTH,
	TRIANGLE_OPTION,
	UseEditorProps,
	WIDTH,
	WORKSPACE_NAME,
} from '@/features/editor/types';
import { isTextType } from '@/features/editor/utils';
import { fabric } from 'fabric';
import { useCallback, useMemo, useState } from 'react';

interface InitProps {
	initialCanvas: fabric.Canvas;
	initialContainer: HTMLDivElement;
}

const buildEditor = (props: BuilderEditorProps): Editor => {
	const {
		canvas,
		fillColor,
		strokeColor,
		strokeWidth,
		strokeDashArray,
		radius,
		opacity,
		setFillColor,
		setStrokeColor,
		setStrokeWidth,
		setStrokeDashArray,
		setRadius,
		setOpacity,
		selectedObjects,
	} = props;
	const getWorkspace = () => canvas.getObjects().find((object) => object.name === WORKSPACE_NAME);
	const center = (object: fabric.Object) => {
		const workspace = getWorkspace();
		const center = workspace?.getCenterPoint();
		if (!center) {
			return;
		}
		// @ts-ignore
		canvas._centerObject(object, center);
	};
	const addToCenter = (object: fabric.Object) => {
		center(object);
		canvas.add(object);
		canvas.setActiveObject(object);
	};

	return {
		changeFillColor: (color) => {
			setFillColor(color);
			canvas.getActiveObjects().forEach((object) => {
				object.set({fill: color});
			});
			canvas.renderAll();
		},
		getActiveFillColor: () => {
			const selectedObject = canvas.getActiveObjects()[0];
			if (!selectedObject) {
				return fillColor;
			}
			const value = selectedObject.get('fill') || fillColor;
			return value as string;
		},
		changeStrokeColor: (color) => {
			setStrokeColor(color);
			canvas.getActiveObjects().forEach((object) => {
				// 文本类型没有stroke
				if (isTextType(object.type)) {
					object.set({fill: color});
				} else {
					object.set({stroke: color});
				}
			});
			canvas.renderAll();
		},
		getActiveStrokeColor: () => {
			const selectedObject = canvas.getActiveObjects()[0];
			if (!selectedObject) {
				return strokeColor;
			}
			const value = selectedObject.get('stroke') || strokeColor;
			return value as string;
		},
		changeStrokeWidth: (width) => {
			setStrokeWidth(width);
			canvas.getActiveObjects().forEach((object) => {
				object.set({strokeWidth: width});
			});
			canvas.renderAll();
		},
		getActiveStrokeWidth: () => {
			const selectedObject = canvas.getActiveObjects()[0];
			if (!selectedObject) {
				return strokeWidth;
			}
			return selectedObject.get('strokeWidth') || 0;
		},
		changeStrokeDashArray: (dashArray) => {
			setStrokeDashArray(dashArray);
			canvas.getActiveObjects().forEach((object) => {
				object.set({strokeDashArray: dashArray});
			});
			canvas.renderAll();
		},
		getActiveStrokeDashArray: () => {
			const selectedObject = canvas.getActiveObjects()[0];
			if (!selectedObject) {
				return strokeDashArray;
			}
			return selectedObject.get('strokeDashArray') || strokeDashArray;
		},
		changeRadius: (radius) => {
			setRadius(radius);
			canvas.getActiveObjects().forEach((object) => {
				if (object instanceof fabric.Rect) {
					object.set({rx: radius, ry: radius});
				}
			});
			canvas.renderAll();
		},
		getActiveRadius: () => {
			const selectedObject = canvas.getActiveObjects()[0];
			if (selectedObject instanceof fabric.Rect) {
				return selectedObject.get('rx') || radius;
			}
			return radius;
		},
		changeOpacity: (opacity) => {
			setOpacity(opacity);
			canvas.getActiveObjects().forEach((object) => {
				object.set({opacity: opacity});
			});
			canvas.renderAll();
		},
		getActiveOpacity: () => {
			const selectedObject = canvas.getActiveObjects()[0];
			if (!selectedObject) {
				return opacity;
			}
			const selectedOpacity = selectedObject.get('opacity');

			return selectedOpacity === undefined ? opacity : selectedOpacity;
		},
		bringForward: () => {
			const objects = canvas.getActiveObjects();
			objects.forEach((object) => {
				object.bringForward();
			});
			canvas.renderAll();
		},
		sendBackwards: () => {
			const objects = canvas.getActiveObjects();
			objects.forEach((object) => {
				object.sendBackwards();
			});
			canvas.renderAll();
		},

		// 文本
		addText: (text, options) => {
			const object = new fabric.Textbox(text, { ...options, editable: true, selectable: true })
			addToCenter(object)
		},
		// 圆
		addCircle: () => {
			const object = new fabric.Circle({
				...CIRCLE_OPTION,
				fill: fillColor,
				stroke: strokeColor,
				strokeWidth: strokeWidth,
				strokeDashArray: strokeDashArray,
				opacity: opacity,
			});
			addToCenter(object);
		},
		// 圆角正方形
		addSoftRectangle: () => {
			const object = new fabric.Rect({
				...RECTANGLE_OPTION,
				rx: radius,
				ry: radius,
				fill: fillColor,
				stroke: strokeColor,
				strokeWidth: strokeWidth,
				strokeDashArray: strokeDashArray,
				opacity: opacity,
			});
			addToCenter(object);
		},
		// 正方形
		// addRectangle: () => {
		// 	const object = new fabric.Rect({
		// 		...RECTANGLE_OPTION,
		// 		fill: fillColor,
		// 		stroke: strokeColor,
		// 		strokeWidth: strokeWidth,
		// 		strokeDashArray: strokeDashArray,
		// 		rx: radius,
		// 		ry: radius,
		// 	});
		// 	addToCenter(object);
		// },
		// 三角形
		addTriangle: () => {
			const object = new fabric.Triangle({
				...TRIANGLE_OPTION,
				fill: fillColor,
				stroke: strokeColor,
				strokeWidth: strokeWidth,
				strokeDashArray: strokeDashArray,
				opacity: opacity,
			});
			addToCenter(object);
		},
		// 倒三角形
		addInverseTriangle: () => {
			const object = new fabric.Polygon(
				[
					{x: 0, y: 0},
					{x: WIDTH, y: 0},
					{x: WIDTH / 2, y: HEIGHT},
				],
				{
					...TRIANGLE_OPTION,
					fill: fillColor,
					stroke: strokeColor,
					strokeWidth: strokeWidth,
					strokeDashArray: strokeDashArray,
					opacity: opacity,
				});
			addToCenter(object);
		},
		// 菱形
		addDiamond: () => {
			const object = new fabric.Polygon(
				[
					{x: 0, y: HEIGHT / 2},
					{x: WIDTH / 2, y: 0},
					{x: WIDTH, y: HEIGHT / 2},
					{x: WIDTH / 2, y: HEIGHT},
				],
				{
					...DIAMOND_OPTION,
					fill: fillColor,
					stroke: strokeColor,
					strokeWidth: strokeWidth,
					strokeDashArray: strokeDashArray,
					opacity: opacity,
				});
			addToCenter(object);
		},
		canvas,
		selectedObjects,
	};
};

export const useEditor = ({clearDependenciesTools}: UseEditorProps) => {

	const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
	const [container, setContainer] = useState<HTMLDivElement | null>(null);
	const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);
	const [fillColor, setFillColor] = useState(FILL_COLOR);
	const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);
	const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);
	const [strokeDashArray, setStrokeDashArray] = useState<number[]>(STROKE_DASH_ARRAY);
	const [radius, setRadius] = useState(RADIUS);
	const [opacity, setOpacity] = useState(OPACITY);

	useAutoResize({canvas, container});
	useCanvasEvents({canvas, setSelectedObjects, clearDependenciesTools});

	const editor = useMemo(() => {
		if (canvas) {
			return buildEditor({
				canvas,
				fillColor,
				strokeColor,
				strokeWidth,
				strokeDashArray,
				radius,
				opacity,
				setFillColor,
				setStrokeColor,
				setStrokeWidth,
				setStrokeDashArray,
				setRadius,
				setOpacity,
				selectedObjects,
			});
		}
		return undefined;
	}, [canvas, fillColor, strokeColor, strokeWidth, strokeDashArray, radius, opacity, selectedObjects]);

	const init = useCallback((options: InitProps) => {
		const {initialCanvas, initialContainer} = options;

		fabric.Object.prototype.set({
			cornerColor: '#FFF',
			cornerStyle: 'circle',
			borderColor: '#3b82f6',
			borderScaleFactor: 1.5,
			transparentCorners: false,
			borderOpacityWhenMoving: 1,
			cornerStrokeColor: '#3b82f6',
			hoverCursor: 'pointer',
			moveCursor: 'move'
		});

		const initialWorkspace = new fabric.Rect({
			width: 900,
			height: 1200,
			name: WORKSPACE_NAME,
			fill: 'white',
			selectable: false,
			hasControls: false,
			shadow: new fabric.Shadow({
				color: 'rgba(0, 0, 0, 0.8)',
				blur: 5,
			}),
		});

		initialCanvas.add(initialWorkspace);
		initialCanvas.centerObject(initialWorkspace);
		initialCanvas.clipPath = initialWorkspace;

		setCanvas(initialCanvas);
		setContainer(initialContainer);

	}, []);
	return {
		init,
		editor,
	};
};

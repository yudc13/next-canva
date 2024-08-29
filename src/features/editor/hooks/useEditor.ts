import { useAutoResize } from '@/features/editor/hooks/useAutoResize';
import { useCanvasEvents } from '@/features/editor/hooks/useCanvasEvents';
import {
	BuilderEditorProps,
	CIRCLE_OPTION, DIAMOND_OPTION,
	Editor, FILL_COLOR, HEIGHT,
	RECTANGLE_OPTION, STROKE_COLOR, STROKE_WIDTH,
	TRIANGLE_OPTION, WIDTH,
	WORKSPACE_NAME,
} from '@/features/editor/types';
import { isTextType } from '@/features/editor/utils';
import { fabric } from 'fabric';
import { useCallback, useMemo, useState } from 'react';

interface InitProps {
	initialCanvas: fabric.Canvas;
	initialContainer: HTMLDivElement;
}

const buildEditor = ({
	canvas,
	fillColor,
	strokeColor,
	strokeWidth,
	setFillColor,
	setStrokeColor,
	setStrokeWidth,
	selectedObjects
}: BuilderEditorProps): Editor => {
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
		changeFillColor: (color  ) => {
			setFillColor(color)
			canvas.getActiveObjects().forEach((object) => {
				object.set({ fill: color })
			})
			canvas.renderAll()
		},
		changeStrokeColor: (color  ) => {
			setStrokeColor(color)
			canvas.getActiveObjects().forEach((object) => {
				// 文本类型没有stroke
				if (isTextType(object.type)) {
					object.set({ fill: color })
				} else {
					object.set({ stroke: color })
				}
			})
			canvas.renderAll()
		},
		changeStrokeWidth: (width  ) => {
			setStrokeWidth(width)
			canvas.getActiveObjects().forEach((object) => {
				object.set({ strokeWidth: width })
			})
			canvas.renderAll()
		},
		// 圆
		addCircle: () => {
			const object = new fabric.Circle({
				...CIRCLE_OPTION,
				fill: fillColor,
				stroke: strokeColor,
				strokeWidth: strokeWidth,
			});
			addToCenter(object);
		},
		// 圆角正方形
		addSoftRectangle: () => {
			const object = new fabric.Rect({
				...RECTANGLE_OPTION,
				rx: 10,
				ry: 10,
				fill: fillColor,
				stroke: strokeColor,
				strokeWidth: strokeWidth,
			});
			addToCenter(object);
		},
		// 正方形
		addRectangle: () => {
			const object = new fabric.Rect({
				...RECTANGLE_OPTION,
				fill: fillColor,
				stroke: strokeColor,
				strokeWidth: strokeWidth,
			});
			addToCenter(object);
		},
		// 三角形
		addTriangle: () => {
			const object = new fabric.Triangle({
				...TRIANGLE_OPTION,
				fill: fillColor,
				stroke: strokeColor,
				strokeWidth: strokeWidth,
			});
			addToCenter(object);
		},
		// 倒三角形
		addInverseTriangle: () => {
			const object = new fabric.Polygon(
				[
					{ x: 0, y: 0 },
					{ x: WIDTH, y: 0 },
					{ x: WIDTH / 2, y: HEIGHT },
				],
				{
					...TRIANGLE_OPTION,
					fill: fillColor,
					stroke: strokeColor,
					strokeWidth: strokeWidth,
				});
			addToCenter(object);
		},
		// 菱形
		addDiamond: () => {
			const object = new fabric.Polygon(
				[
					{ x: 0, y: HEIGHT / 2 },
					{ x: WIDTH / 2, y: 0 },
					{ x: WIDTH, y: HEIGHT / 2 },
					{ x: WIDTH / 2, y: HEIGHT },
				],
				{
					...DIAMOND_OPTION,
					fill: fillColor,
					stroke: strokeColor,
					strokeWidth: strokeWidth,
				});
			addToCenter(object);
		},
		canvas,
		fillColor,
		strokeColor,
		strokeWidth,
		selectedObjects
	};
};

export const useEditor = () => {

	const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
	const [container, setContainer] = useState<HTMLDivElement | null>(null);
	const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([])
	const [fillColor, setFillColor] = useState(FILL_COLOR)
	const [strokeColor, setStrokeColor] = useState(STROKE_COLOR)
	const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH)


	useAutoResize({canvas, container});
	useCanvasEvents({ canvas, setSelectedObjects })

	const editor = useMemo(() => {
		if (canvas) {
			return buildEditor({
				canvas,
				fillColor,
				strokeColor,
				strokeWidth,
				setFillColor,
				setStrokeColor,
				setStrokeWidth,
				selectedObjects
			});
		}
		return undefined;
	}, [canvas, fillColor, strokeColor, strokeWidth, selectedObjects]);

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

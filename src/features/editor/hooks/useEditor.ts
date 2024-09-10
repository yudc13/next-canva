import { buildControls } from '@/features/editor/core/buildControls';
import { buildEditor } from '@/features/editor/core/buildEditor';
import { useAutoResize } from '@/features/editor/hooks/useAutoResize';
import { useCanvasEvents } from '@/features/editor/hooks/useCanvasEvents';
import { useClipboard } from '@/features/editor/hooks/useClipboard';
import {
	FILL_COLOR, FONT_FAMILY,
	FONT_WEIGHT,
	OPACITY,
	RADIUS,
	STROKE_COLOR,
	STROKE_DASH_ARRAY,
	STROKE_WIDTH,
	UseEditorProps,
	WORKSPACE_NAME,
} from '@/features/editor/types';
import { fabric } from 'fabric';
import { useCallback, useMemo, useState } from 'react';

interface InitProps {
	initialCanvas: fabric.Canvas;
	initialContainer: HTMLDivElement;
}


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
	const [fontWeight, setFontWeight] = useState(FONT_WEIGHT);
	const [underline, setUnderline] = useState(false);
	const [fontFamily, setFontFamily] = useState(FONT_FAMILY)

	useAutoResize({canvas, container});
	useCanvasEvents({canvas, setSelectedObjects, clearDependenciesTools});
	const { copy, paste } = useClipboard({ canvas })

	const editor = useMemo(() => {
		if (canvas) {
			return buildEditor({
				canvas,
				selectedObjects,
				fillColor,
				strokeColor,
				strokeWidth,
				strokeDashArray,
				radius,
				opacity,
				fontFamily,
				fontWeight,
				underline,
				setFillColor,
				setStrokeColor,
				setStrokeWidth,
				setStrokeDashArray,
				setRadius,
				setOpacity,
				setFontFamily,
				setFontWeight,
				setUnderline,
				copy,
				paste
			});
		}
		return undefined;
	}, [canvas, selectedObjects, fillColor, strokeColor, strokeWidth, strokeDashArray, radius, opacity, fontFamily, fontWeight, underline, copy, paste]);

	const init = useCallback((options: InitProps) => {
		const {initialCanvas, initialContainer} = options;

		buildControls()

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

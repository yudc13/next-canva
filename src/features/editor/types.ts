import { fabric } from 'fabric';
import * as material from 'material-colors';

export const WORKSPACE_NAME = 'container';


export const COLORS = [
	material.red['500'],
	material.pink['500'],
	material.purple['500'],
	material.deepPurple['500'],
	material.indigo['500'],
	material.blue['500'],
	material.lightBlue['500'],
	material.cyan['500'],
	material.teal['500'],
	material.green['500'],
	material.lightGreen['500'],
	material.lime['500'],
	material.yellow['500'],
	material.amber['500'],
	material.orange['500'],
	material.deepOrange['500'],
	material.brown['500'],
	material.blueGrey['500'],
	'transparent',
];

export type ActiveTool =
	| 'select'
	| 'shapes'
	| 'text'
	| 'images'
	| 'draw'
	| 'fill'
	| 'stroke-color'
	| 'stroke-width'
	| 'font'
	| 'opacity'
	| 'filter'
	| 'settings'
	| 'ai'
	| 'remove-bg'
	| 'templates'

export const fonts = [
	'Arial',
	'Helvetica',
	'Times New Roman',
	'Georgia',
	'Garamond',
	'Courier New',
	'Brush Script MT',
	'Verdana',
	'Tahoma',
	'Palatino Linotype',
	'Book Antiqua',
	'Comic Sans MS',
	'Courier New',
	'Lucida Console',
	'Lucida Sans Unicode',
	'Arial Black',
	'Impact',
	'Trebuchet MS',
	'Lucida Sans Typewriter',
	'Lucida Fax',
	'Century Gothic',
	'Optima',
	'Segoe UI',
];

export const SELECT_DEPENDENCIES_TOOLS = [
	'fill', 'stroke-color', 'stroke-width',
];

export const FILL_COLOR = 'rgba(0, 0, 0, 1)';
export const STROKE_COLOR = 'rgba(0, 0, 0, 1)';
export const STROKE_WIDTH = 2;
export const RADIUS = 10;
export const OPACITY = 1;
export const STROKE_DASH_ARRAY = [];

export const WIDTH = 100;
export const HEIGHT = 100;

export const CIRCLE_OPTION = {
	radius: WIDTH / 2,
	fill: FILL_COLOR,
	stroke: STROKE_COLOR,
	stroke_width: STROKE_WIDTH,
};

export const RECTANGLE_OPTION = {
	width: WIDTH,
	height: HEIGHT,
	fill: FILL_COLOR,
	stroke: STROKE_COLOR,
	stroke_width: STROKE_WIDTH,
};

export const TRIANGLE_OPTION = {
	width: WIDTH,
	height: HEIGHT,
	fill: FILL_COLOR,
	stroke: STROKE_COLOR,
	stroke_width: STROKE_WIDTH,
};

export const DIAMOND_OPTION = {
	width: WIDTH,
	height: HEIGHT,
	fill: FILL_COLOR,
	stroke: STROKE_COLOR,
	stroke_width: STROKE_WIDTH,
};

export type BuilderEditorProps = {
	canvas: fabric.Canvas
	fillColor: string
	strokeColor: string
	strokeWidth: number
	strokeDashArray: number[]
	radius: number
	opacity: number
	selectedObjects: fabric.Object[]
	setFillColor: (color: string) => void
	setStrokeColor: (color: string) => void
	setStrokeWidth: (width: number) => void
	setStrokeDashArray: (dashArray: number[]) => void
	setRadius: (radius: number) => void
	setOpacity: (opacity: number) => void
}

export interface UseEditorProps {
	clearDependenciesTools?: () => void
}

export type Editor = {
	canvas: fabric.Canvas,
	selectedObjects: fabric.Object[]
	addText: (text: string, options?: fabric.ITextOptions) => void
	addCircle: () => void
	addSoftRectangle: () => void
	addTriangle: () => void
	addInverseTriangle: () => void
	addDiamond: () => void
	changeFillColor: (color: string) => void
	getActiveFillColor: () => string
	changeStrokeColor: (color: string) => void
	getActiveStrokeColor: () => string
	changeStrokeWidth: (width: number) => void
	getActiveStrokeWidth: () => number
	changeOpacity: (opacity: number) => void
	getActiveOpacity: () => number
	changeStrokeDashArray: (dashArray: number[]) => void
	getActiveStrokeDashArray: () => number[]
	changeRadius: (radius: number) => void
	getActiveRadius: () => number
	bringForward: () => void
	sendBackwards: () => void
}
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
	| 'fontFamily'
	| 'fontWeight'
	| 'underline'

export const fonts = [
	"Arial",
	"Arial Black",
	"Verdana",
	"Helvetica",
	"Tahoma",
	"Trebuchet MS",
	"Times New Roman",
	"Georgia",
	"Garamond",
	"Courier New",
	"Brush Script MT",
	"Palatino",
	"Bookman",
	"Comic Sans MS",
	"Impact",
	"Lucida Sans Unicode",
	"Geneva",
	"Lucida Console",
];

export const SELECT_DEPENDENCIES_TOOLS = [
	'fill', 'stroke-color', 'stroke-width', 'fontFamily'
];

export const FILL_COLOR = 'rgba(0, 0, 0, 1)';
export const STROKE_COLOR = 'rgba(0, 0, 0, 1)';
export const STROKE_WIDTH = 2;
export const RADIUS = 10;
export const OPACITY = 1;
export const STROKE_DASH_ARRAY = [];
export const FONT_WEIGHT: 'normal' | number = 'normal'
export const FONT_SIZE = 32;
export const FONT_FAMILY = 'Arial';

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

export const TEXT_OPTION = {
	type: 'textbox',
	fill: FILL_COLOR,
	angle: 0,
	fontSize: FONT_SIZE,
	fontFamily: FONT_FAMILY
}

export type BuilderEditorProps = {
	canvas: fabric.Canvas
	selectedObjects: fabric.Object[]
	fillColor: string
	setFillColor: (color: string) => void
	strokeColor: string
	setStrokeColor: (color: string) => void
	strokeWidth: number
	setStrokeWidth: (width: number) => void
	strokeDashArray: number[]
	setStrokeDashArray: (dashArray: number[]) => void
	radius: number
	setRadius: (radius: number) => void
	opacity: number
	setOpacity: (opacity: number) => void
	fontFamily: string
	setFontFamily: (fontFamily: string) => void
	fontWeight: number | 'normal'
	setFontWeight: (fontWeight: number | 'normal') => void
	underline: boolean
	setUnderline: (underline: boolean) => void
}

export interface UseEditorProps {
	clearDependenciesTools?: () => void
}

export type Editor = {
	canvas: fabric.Canvas,
	selectedObjects: fabric.Object[]
	addImage: (url: string) => void
	addText: (text: string, options?: fabric.ITextboxOptions) => void
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
	changeFontWeight: (fontWeight: number | 'normal') => void
	getActiveFontWeight: () => number | 'normal'
	changeUnderline: (underline: boolean) => void
	getActiveUnderline: () => boolean
	changeFontFamily: (fontFamily: string) => void
	getActiveFontFamily: () => string
}
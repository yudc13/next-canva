import { fabric } from 'fabric';

export const WORKSPACE_NAME = 'container'

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

export const FILL_COLOR = 'rgba(0, 0, 0, 1)'
export const STROKE_COLOR = 'rgba(0, 0, 0, 1)'
export const STROKE_WIDTH = 2

export const WIDTH = 100
export const HEIGHT = 100

export const CIRCLE_OPTION = {
	radius: WIDTH / 2,
	fill: FILL_COLOR,
	stroke: STROKE_COLOR,
	stroke_width: STROKE_WIDTH
}

export const RECTANGLE_OPTION = {
	width: WIDTH,
	height: HEIGHT,
	fill: FILL_COLOR,
	stroke: STROKE_COLOR,
	stroke_width: STROKE_WIDTH
}

export const TRIANGLE_OPTION = {
	width: WIDTH,
	height: HEIGHT,
	fill: FILL_COLOR,
	stroke: STROKE_COLOR,
	stroke_width: STROKE_WIDTH
}

export const DIAMOND_OPTION = {
	width: WIDTH,
	height: HEIGHT,
	fill: FILL_COLOR,
	stroke: STROKE_COLOR,
	stroke_width: STROKE_WIDTH
}

export type BuilderEditorProps = {
	canvas: fabric.Canvas
}

export type Editor = {
	addCircle: () => void
	addSoftRectangle: () => void
	addRectangle: () => void
	addTriangle: () => void
	addInverseTriangle: () => void
	addDiamond: () => void
}
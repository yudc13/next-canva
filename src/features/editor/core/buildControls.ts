import { fabric } from 'fabric';


const circleIcon = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOSAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPgo8Y2lyY2xlIGN4PSI5Ljk5NjA5IiBjeT0iOSIgcj0iNSIgZmlsbD0id2hpdGUiLz4KPGNpcmNsZSBjeD0iOS45OTYwOSIgY3k9IjkiIHI9IjQuNzUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS1vcGFjaXR5PSIwLjMiIHN0cm9rZS13aWR0aD0iMC41Ii8+CjwvZz4KPGRlZnM+CjxmaWx0ZXIgaWQ9ImZpbHRlcjBfZCIgeD0iMC45OTYwOTQiIHk9IjAiIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgo8ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPgo8ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIvPgo8ZmVPZmZzZXQvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIi8+CjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAuMTM3Njc0IDAgMCAwIDAgMC4xOTA5MzcgMCAwIDAgMCAwLjI3MDgzMyAwIDAgMCAwLjE1IDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3ciLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3ciIHJlc3VsdD0ic2hhcGUiLz4KPC9maWx0ZXI+CjwvZGVmcz4KPC9zdmc+Cg==`;
const horizontalIcon = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAyNCAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPgo8cmVjdCB4PSIyMCIgeT0iNCIgd2lkdGg9IjQiIGhlaWdodD0iMTYiIHJ4PSIyIiB0cmFuc2Zvcm09InJvdGF0ZSg5MCAyMCA0KSIgZmlsbD0id2hpdGUiLz4KPHJlY3QgeD0iMTkuNzUiIHk9IjQuMjUiIHdpZHRoPSIzLjUiIGhlaWdodD0iMTUuNSIgcng9IjEuNzUiIHRyYW5zZm9ybT0icm90YXRlKDkwIDE5Ljc1IDQuMjUpIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utb3BhY2l0eT0iMC4zIiBzdHJva2Utd2lkdGg9IjAuNSIvPgo8L2c+CjxkZWZzPgo8ZmlsdGVyIGlkPSJmaWx0ZXIwX2QiIHg9IjAiIHk9IjAiIHdpZHRoPSIyNCIgaGVpZ2h0PSIxMiIgZmlsdGVyVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgo8ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiByZXN1bHQ9IkJhY2tncm91bmRJbWFnZUZpeCIvPgo8ZmVDb2xvck1hdHJpeCBpbj0iU291cmNlQWxwaGEiIHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAxMjcgMCIvPgo8ZmVPZmZzZXQvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIi8+CjxmZUNvbG9yTWF0cml4IHR5cGU9Im1hdHJpeCIgdmFsdWVzPSIwIDAgMCAwIDAuMTM3Njc0IDAgMCAwIDAgMC4xOTA5MzcgMCAwIDAgMCAwLjI3MDgzMyAwIDAgMCAwLjE1IDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3ciLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJlZmZlY3QxX2Ryb3BTaGFkb3ciIHJlc3VsdD0ic2hhcGUiLz4KPC9maWx0ZXI+CjwvZGVmcz4KPC9zdmc+Cg==`
const verticalIcon = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAxMiAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPgo8cmVjdCB4PSI0IiB5PSI0IiB3aWR0aD0iNCIgaGVpZ2h0PSIxNiIgcng9IjIiIGZpbGw9IndoaXRlIi8+CjxyZWN0IHg9IjQuMjUiIHk9IjQuMjUiIHdpZHRoPSIzLjUiIGhlaWdodD0iMTUuNSIgcng9IjEuNzUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS1vcGFjaXR5PSIwLjMiIHN0cm9rZS13aWR0aD0iMC41Ii8+CjwvZz4KPGRlZnM+CjxmaWx0ZXIgaWQ9ImZpbHRlcjBfZCIgeD0iMCIgeT0iMCIgd2lkdGg9IjEyIiBoZWlnaHQ9IjI0IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIi8+CjxmZU9mZnNldC8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMC4xMzc2NzQgMCAwIDAgMCAwLjE5MDkzNyAwIDAgMCAwIDAuMjcwODMzIDAgMCAwIDAuMTUgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvdyIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvdyIgcmVzdWx0PSJzaGFwZSIvPgo8L2ZpbHRlcj4KPC9kZWZzPgo8L3N2Zz4K`
const rotateIcon = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZCkiPgo8Y2lyY2xlIGN4PSI5IiBjeT0iOSIgcj0iNSIgZmlsbD0id2hpdGUiLz4KPGNpcmNsZSBjeD0iOSIgY3k9IjkiIHI9IjQuNzUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS1vcGFjaXR5PSIwLjMiIHN0cm9rZS13aWR0aD0iMC41Ii8+CjwvZz4KPHBhdGggZD0iTTEwLjgwNDcgMTEuMTI0Mkw5LjQ5OTM0IDExLjEyNDJMOS40OTkzNCA5LjgxODg1IiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik02Ljk0ODU2IDYuNzI2MDdMOC4yNTM5MSA2LjcyNjA3TDguMjUzOTEgOC4wMzE0MiIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNOS42OTUxNyA2LjkyMjY3QzEwLjAwNyA3LjAzMzAxIDEwLjI4NTggNy4yMjA1NCAxMC41MDU1IDcuNDY3NzZDMTAuNzI1MiA3LjcxNDk3IDEwLjg3ODcgOC4wMTM4MiAxMC45NTE3IDguMzM2NDJDMTEuMDI0NyA4LjY1OTAyIDExLjAxNDggOC45OTQ4NSAxMC45MjI5IDkuMzEyNThDMTAuODMxIDkuNjMwMzEgMTAuNjYwMSA5LjkxOTU4IDEwLjQyNjIgMTAuMTUzNEw5LjQ5NzAxIDExLjA0MjFNOC4yNTc5MiA2LjcyNjA3TDcuMzA5MzcgNy43MzU1NEM3LjA3NTQzIDcuOTY5MzYgNi45MDQ1NCA4LjI1ODYzIDYuODEyNjQgOC41NzYzNkM2LjcyMDczIDguODk0MDggNi43MTA4MSA5LjIyOTkyIDYuNzgzODEgOS41NTI1MUM2Ljg1NjggOS44NzUxMSA3LjAxMDMyIDEwLjE3NCA3LjIzMDA1IDEwLjQyMTJDNy40NDk3OCAxMC42Njg0IDcuNzI4NTUgMTAuODU1OSA4LjA0MDM2IDEwLjk2NjMiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPGRlZnM+CjxmaWx0ZXIgaWQ9ImZpbHRlcjBfZCIgeD0iMCIgeT0iMCIgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIi8+CjxmZU9mZnNldC8+CjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMC4xMzc2NzQgMCAwIDAgMCAwLjE5MDkzNyAwIDAgMCAwIDAuMjcwODMzIDAgMCAwIDAuMTUgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvdyIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvdyIgcmVzdWx0PSJzaGFwZSIvPgo8L2ZpbHRlcj4KPC9kZWZzPgo8L3N2Zz4K`
const drawImg = (
	ctx: CanvasRenderingContext2D,
	left: number,
	top: number,
	img: HTMLImageElement,
	width: number,
	height: number,
	angle: number | undefined,
) => {
	if (angle === undefined) {
		return;
	}

	ctx.save();
	ctx.translate(left, top);
	ctx.rotate(fabric.util.degreesToRadians(angle));
	ctx.drawImage(img, -width / 2, -height / 2, width, height);
	ctx.restore();
};


// 四个顶点
const renderPeakControls = () => {
	const img = document.createElement('img');
	img.src = circleIcon;

	const renderCircleIcon = (
		ctx: CanvasRenderingContext2D,
		left: number,
		top: number,
		styleOverride: any,
		fabricObject: fabric.Object,
	) => {
		drawImg(ctx, left, top, img, 25, 25, fabricObject.angle);
	};

	// 左上
	fabric.Object.prototype.controls.tl = new fabric.Control({
		x: -0.5,
		y: -0.5,
		// @ts-ignore
		cursorStyleHandler: fabric.controlsUtils.scaleCursorStyleHandler,
		// @ts-ignore
		actionHandler: fabric.controlsUtils.scalingEqually,
		actionName: 'scale',
		render: renderCircleIcon,
	});

	// 左下
	fabric.Object.prototype.controls.bl = new fabric.Control({
		x: -0.5,
		y: 0.5,
		// @ts-ignore
		cursorStyleHandler: fabric.controlsUtils.scaleCursorStyleHandler,
		// @ts-ignore
		actionHandler: fabric.controlsUtils.scalingEqually,
		actionName: 'scale',
		render: renderCircleIcon,
	});

	// 右上
	fabric.Object.prototype.controls.tr = new fabric.Control({
		x: 0.5,
		y: -0.5,
		// @ts-ignore
		cursorStyleHandler: fabric.controlsUtils.scaleCursorStyleHandler,
		// @ts-ignore
		actionHandler: fabric.controlsUtils.scalingEqually,
		actionName: 'scale',
		render: renderCircleIcon,
	});

	//右下
	fabric.Object.prototype.controls.br = new fabric.Control({
		x: 0.5,
		y: 0.5,
		// @ts-ignore
		cursorStyleHandler: fabric.controlsUtils.scaleCursorStyleHandler,
		// @ts-ignore
		actionHandler: fabric.controlsUtils.scalingEqually,
		actionName: 'scale',
		render: renderCircleIcon,
	});

};

// 中间横杠
const renderIntervalControl = () => {
	const horizontal = document.createElement('img');
	horizontal.src = horizontalIcon;
	const vertical = document.createElement('img');
	vertical.src = verticalIcon;

	const renderHorizontalIcon = (
		ctx: CanvasRenderingContext2D,
		left: number,
		top: number,
		styleOverride: any,
		fabricObject: fabric.Object,
	) => {
		drawImg(ctx, left, top, horizontal, 25, 20, fabricObject.angle);
	};

	const renderVerticalIcon = (
		ctx: CanvasRenderingContext2D,
		left: number,
		top: number,
		styleOverride: any,
		fabricObject: fabric.Object,
	) => {
		drawImg(ctx, left, top, vertical, 20, 25, fabricObject.angle);
	};

	// 中间横杠
	// 中左
	fabric.Object.prototype.controls.ml = new fabric.Control({
		x: -0.5,
		y: 0,
		offsetX: -1,
		// @ts-ignore
		cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
		// @ts-ignore
		actionHandler: fabric.controlsUtils.scalingXOrSkewingY,
		// @ts-ignore
		getActionName: fabric.controlsUtils.scaleOrSkewActionName,
		render: renderVerticalIcon,
	});

	// 中右
	fabric.Object.prototype.controls.mr = new fabric.Control({
		x: 0.5,
		y: 0,
		offsetX: 1,
		// @ts-ignore
		cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
		// @ts-ignore
		actionHandler: fabric.controlsUtils.scalingXOrSkewingY,
		// @ts-ignore
		getActionName: fabric.controlsUtils.scaleOrSkewActionName,
		render: renderVerticalIcon,
	});

	// 中上
	fabric.Object.prototype.controls.mt = new fabric.Control({
		x: 0,
		y: -0.5,
		offsetY: -1,
		// @ts-ignore
		cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
		// @ts-ignore
		actionHandler: fabric.controlsUtils.scalingYOrSkewingX,
		// @ts-ignore
		getActionName: fabric.controlsUtils.scaleOrSkewActionName,
		render: renderHorizontalIcon,
	});

	// 中下
	fabric.Object.prototype.controls.mb = new fabric.Control({
		x: 0,
		y: 0.5,
		offsetY: 1,
		// @ts-ignore
		cursorStyleHandler: fabric.controlsUtils.scaleSkewCursorStyleHandler,
		// @ts-ignore
		actionHandler: fabric.controlsUtils.scalingYOrSkewingX,
		// @ts-ignore
		getActionName: fabric.controlsUtils.scaleOrSkewActionName,
		render: renderHorizontalIcon,
	});

};

const renderRotationControl = () => {
	const img = document.createElement('img');
	img.src = rotateIcon;

	const renderRotateIcon = (
		ctx: CanvasRenderingContext2D,
		left: number,
		top: number,
		styleOverride: any,
		fabricObject: fabric.Object,
	) => {
		drawImg(ctx, left, top, img, 40, 40, fabricObject.angle);
	};

	// 旋转
	// fabric.Object.prototype.controls.mtr = new fabric.Control({
	// 	visible: false,
	// 	withConnection: false
	// });
	fabric.Object.prototype.controls.mtr = new fabric.Control({
		x: 0,
		y: -0.5,
		offsetY: -30,
		//@ts-ignore
		cursorStyleHandler: fabric.controlsUtils.rotationStyleHandler,
		//@ts-ignore
		actionHandler: fabric.controlsUtils.rotationWithSnapping,
		actionName: "rotate",
		withConnection: true,
		cursorStyle: 'crosshair',
		render: renderRotateIcon,
	})
};

export const buildControls = () => {
	renderPeakControls();
	renderIntervalControl();
	renderRotationControl();

	fabric.Object.prototype.set({
		cornerColor: '#FFF',
		cornerStyle: 'circle',
		borderColor: '#3b82f6',
		borderScaleFactor: 1.5,
		transparentCorners: false,
		borderOpacityWhenMoving: 1,
		cornerStrokeColor: '#3b82f6',
		hoverCursor: 'pointer',
		moveCursor: 'move',
	});

	// textbox保持一致
	fabric.Textbox.prototype.controls = fabric.Object.prototype.controls;
};
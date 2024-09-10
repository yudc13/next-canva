import {
	BuilderEditorProps,
	CIRCLE_OPTION, DIAMOND_OPTION,
	Editor,
	FONT_WEIGHT, HEIGHT, RECTANGLE_OPTION,
	TEXT_OPTION, TRIANGLE_OPTION, WIDTH,
	WORKSPACE_NAME,
} from '@/features/editor/types';
import { isTextType } from '@/features/editor/utils';
import { fabric } from 'fabric';

export const buildEditor = (props: BuilderEditorProps): Editor => {
	const {
		canvas,
		fillColor,
		strokeColor,
		strokeWidth,
		strokeDashArray,
		radius,
		opacity,
		underline,
		fontWeight,
		fontFamily,
		setFillColor,
		setStrokeColor,
		setStrokeWidth,
		setStrokeDashArray,
		setRadius,
		setOpacity,
		setUnderline,
		setFontWeight,
		setFontFamily,
		selectedObjects,
		copy,
		paste
	} = props;
	const getWorkspace = () => canvas.getObjects().find((object) => object.name === WORKSPACE_NAME);

	// 水平垂直居中
	const center = (object: fabric.Object) => {
		const workspace = getWorkspace();
		const center = workspace?.getCenterPoint();
		if (!center) {
			return;
		}
		// @ts-ignore
		canvas._centerObject(object, center);
	};

	// 水平居中
	const centerH = (object: fabric.Object) => {
		const workspace = getWorkspace();
		const center = workspace?.getCenterPoint();
		if (!center) {
			return
		}
		//@ts-ignore
		canvas._centerObject(object, new fabric.Point(center.x, object.getCenterPoint().y));
	}

	// 垂直居中
	const centerV = (object: fabric.Object) => {
		const workspace = getWorkspace();
		const center = workspace?.getCenterPoint();
		if (!center) {
			return
		}
		//@ts-ignore
		canvas._centerObject(object, new fabric.Point(object.getCenterPoint().x, center.y));
	}

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
		changeFontFamily: (value) => {
			setFontFamily(value);
			canvas.getActiveObjects().forEach((object) => {
				if (isTextType(object.type)) {
					// @ts-ignore
					object.set({fontFamily: value});
				}
			});
			canvas.renderAll();
		},
		getActiveFontFamily: () => {
			const selectedObject = canvas.getActiveObjects()[0];
			if (!selectedObject) {
				return fontFamily;
			}
			// @ts-ignore
			return selectedObject.get('fontFamily');
		},
		changeFontWeight: (weight) => {
			setFontWeight(weight);
			const objects = canvas.getActiveObjects();
			objects.forEach((object) => {
				// @ts-ignore
				object.set({fontWeight: weight});
			});
			canvas.renderAll();
		},
		getActiveFontWeight: () => {
			const selectedObject = canvas.getActiveObjects()[0];
			if (!selectedObject) {
				return fontWeight;
			}
			// @ts-ignore
			const selectedFontWeight = selectedObject.get('fontWeight');

			return selectedFontWeight === undefined ? FONT_WEIGHT : selectedFontWeight;
		},
		changeUnderline: (underline) => {
			setUnderline(underline);
			const objects = canvas.getActiveObjects();
			objects.forEach((object) => {
				if (isTextType(object.type)) {
					// @ts-ignore
					object.set({underline: underline});
				}
			});
			canvas.renderAll();
		},
		getActiveUnderline: () => {
			const selectedObject = canvas.getActiveObjects()[0];
			if (!selectedObject) {
				return underline;
			}
			// @ts-ignore
			return selectedObject.get('underline');
		},
		// 图片
		addImage: (url: string) => {
			fabric.Image.fromURL(url, (img) => {
				img.scale(0.5)
					addToCenter(img);
				},
				{
					crossOrigin: 'anonymous',
				});
		},

		// 文本
		addText: (text, options) => {
			const object = new fabric.Textbox(text, {
				...TEXT_OPTION,
				fill: fillColor,
				...options,
				editable: true,
				selectable: true,
			});
			addToCenter(object);
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
		delete: () => {
			const objects = canvas.getActiveObjects();
			canvas.remove(...objects);
			canvas.discardActiveObject()
			canvas.renderAll();
		},
		copy,
		paste,
		clone: () => {
			copy()
			paste()
		},
		// 居左对齐
		alignStartVertical: () => {
			const objects = canvas.getActiveObject();
			if (objects) {
				//@ts-ignore
				objects?.forEachObject(object => {
					const left = objects.width! / 2 - objects.width!
					object.set({ left })
				})
				canvas.renderAll();
			}
		},
		alignCenterVertical: () => {

		},
		canvas,
		selectedObjects,
	};
};
import { fabric } from 'fabric';
import { RGBColor } from 'react-color';
import { v4 } from 'uuid';

export const isTextType = (type: string | undefined) => type === 'text' || type === 'i-text' || type === 'textbox';

export const rgbaToString = (rgba: RGBColor | 'transparent') => {
	if (rgba === 'transparent') {
		return 'rgba(0, 0, 0, 0)'
	}
	const alpha = rgba.a  === undefined ? 0 : rgba.a;

	return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${alpha})`
}

export const downloadFile = (url: string, type: string) => {
	const anchorElement = document.createElement('a')
	anchorElement.href = url
	anchorElement.download = `${v4()}.${type}`
	document.body.appendChild(anchorElement)
	anchorElement.click()
	anchorElement.remove()
};

export const transformText = async (objects: fabric.Object[]) => {
	if (!objects) {
		return
	}
	objects.forEach((item: any) => {
		if (item.objects) {
			transformText(item.objects)
		} else {
			item.type === 'text' && (item.type === 'textbox')
		}
	})
}

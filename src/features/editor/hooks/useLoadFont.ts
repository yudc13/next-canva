import { useCallback, useState } from 'react';
import FontFaceObserver from 'fontfaceobserver'

export const useLoadFont = () => {
	const [isLoading, setLoading] = useState(false)
	const loadFont = useCallback(async (value: string) => {
		return new Promise<boolean>(resolve => {
			setLoading(true)
			const observer = new FontFaceObserver(value)
			observer.load(undefined, 6000).then(() => {
				setLoading(false)
				resolve(true)
			}).catch(e => {
				setLoading(false)
				resolve(false)
			})
		})
	}, [])

	return {
		loadFont,
		isLoading
	}
}
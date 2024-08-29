import { COLORS } from '@/features/editor/types';
import { rgbaToString } from '@/features/editor/utils';
import { ChromePicker, CirclePicker } from 'react-color';

interface Props {
	value: string;
	onChange: (color: string) => void;
}

export const ColorPicker = ({value, onChange}: Props) => {
	return (
		<div className={'space-y-4'}>
			<ChromePicker color={value} onChange={(color) => {
				const formatedColor = rgbaToString(color.rgb);
				onChange(formatedColor);
			}} className={'border rounded-lg'}/>
			<CirclePicker color={value} colors={COLORS} onChangeComplete={(color) => {
				const formatedColor = rgbaToString(color.rgb);
				onChange(formatedColor);
			}}/>
		</div>
	);
};
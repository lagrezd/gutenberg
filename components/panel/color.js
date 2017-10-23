/**
 * Internal dependencies
 */
import './style.scss';
import PanelBody from './body';

function PanelColor( { colorValue, ...props } ) {
	return (
		<PanelBody
			{ ...props }
			customTitleArea={
				colorValue &&
				<span
					className="components-panel__color-span"
					style={ { background: colorValue } } />
			}
		/>
	);
}

export default PanelColor;

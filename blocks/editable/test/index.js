/**
 * External dependencies
 */
import { shallow } from 'enzyme';

/**
 * Internal dependencies
 */
import Editable from '../';

describe( 'Editable', () => {
	describe( '.propTypes', () => {
		/* eslint-disable no-console */
		let consoleError;
		beforeEach( () => {
			consoleError = console.error;
			console.error = jest.fn();
		} );

		afterEach( () => {
			console.error = consoleError;
		} );

		it( 'should warn when rendered with string value', () => {
			shallow( <Editable value="Uh oh!" /> );

			expect( console.error ).toHaveBeenCalled();
		} );

		it( 'should not warn when rendered with undefined value', () => {
			shallow( <Editable /> );

			expect( console.error ).not.toHaveBeenCalled();
		} );

		it( 'should not warn when rendered with array value', () => {
			shallow( <Editable value={ [ 'Oh, good' ] } /> );

			expect( console.error ).not.toHaveBeenCalled();
		} );
		/* eslint-enable no-console */
	} );

	describe( 'Editable.Value', () => {
		const Component = ( { value } ) => (
			<div>
				<Editable.Value value={ value } />
			</div>
		);

		it( 'should render value containing string', () => {
			const value = [ 'Hello, Dolly!' ];
			const wrapper = shallow( <Component value={ value } /> );

			expect( wrapper.html() ).toBe( '<div>Hello, Dolly!</div>' );
		} );

		it( 'should render value containing a single DOM node', () => {
			const value = [
				[ 'h1', {}, 'This is a header' ],
			];
			const wrapper = shallow( <Component value={ value } /> );

			expect( wrapper.html() ).toBe( '<div><h1>This is a header</h1></div>' );
		} );

		it( 'should render value with deeply nested DOM nodes', () => {
			const value = [
				'This is a ',
				[ 'strong', {}, 'paragraph' ],
				' with a ',
				[ 'a', { href: 'https://w.org/' }, 'link with ', [
					'b', {}, 'bold ', [
						'i', {}, 'and italics',
					],
				] ],
				'.',
			];
			const wrapper = shallow( <Component value={ value } /> );

			expect( wrapper.html() ).toBe(
				'<div>This is a <strong>paragraph</strong> with a <a href=\"https://w.org/\">link with <b>bold <i>and italics</i></b></a>.</div>'
			);
		} );
	} );
} );

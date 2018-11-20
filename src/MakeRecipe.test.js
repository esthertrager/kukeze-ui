import React from 'react';
import MakeRecipe from './MakeRecipe.jsx';
//import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const updateInput = (wrapper, instance, newValue) => {
    const input = wrapper.find(instance)
    input.simulate('change', {
        target: {value: newValue}
    })
    return wrapper.find(instance)
}

describe('MakeRecipe', () => {
	it('maintains the overall amount after being scaled but allows a user to change the units used to measure an ingredient', () => {
		const recipe = {
		  "name": "Ice Cream",
	      "ingredients": [
	      {
	        "amount": "400",
	        "unit": "g",
	        "name": "peanut butter"
	      },
	      {
	        "amount": "400",
	        "unit": "g",
	        "name": "dark chocolate"
	      }],
	      "total": {
	      	"unit": "g",
	      	"quantity": "800"
	      },
	      "id": 2
		};

		const wrapper = shallow(<MakeRecipe recipe={recipe} />);

		expect(wrapper.find('[id="ingredient_amount_0"]').props().value).toBe('400');

		const amountInput = updateInput(wrapper, '[id="ingredient_unit_0"]', 'kg');
		
		expect(wrapper.find('[id="ingredient_amount_0"]').props().value).toBe('0.4');
	});
});
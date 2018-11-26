import React from 'react';
import AddEditRecipe from './AddEditRecipe.jsx';
//import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const updateInput = (wrapper, instance, newValue) => {
  const input = wrapper.find(instance);
  input.simulate('change', {
    target: { value: newValue }
  });
  return wrapper.find(instance);
};

describe('AddEditRecipe', () => {
  it('displays the proper heading for edit recipe', () => {
    const recipe = {
      ingredients: [],
      id: 2
    };

    const wrapper = shallow(
      <AddEditRecipe recipe={recipe} onClickSaveRecipe={() => {}} />
    );

    expect(wrapper.contains('Edit Recipe')).toBe(true);
  });
  it('displays the proper heading for edit recipe', () => {
    const recipe = {
      ingredients: []
    };

    const wrapper = shallow(
      <AddEditRecipe recipe={recipe} onClickSaveRecipe={() => {}} />
    );

    expect(wrapper.contains('Add Recipe')).toBe(true);
  });
});

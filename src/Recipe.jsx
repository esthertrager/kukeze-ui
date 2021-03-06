import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AddEditRecipe from './AddEditRecipe.jsx';
import moment from 'moment';

class Recipe extends React.Component {
  constructor(props) {
    super(props);

    const isEditing = !props.recipe.id;

    this.state = { isEditing };

    this.onClickAddEditRecipe = this.onClickAddEditRecipe.bind(this);
    this.onClickSaveRecipe = this.onClickSaveRecipe.bind(this);
  }

  onClickAddEditRecipe() {
    this.setState({
      isEditing: true
    });
  }

  onClickSaveRecipe(e, recipe) {
    e.preventDefault();
    this.props.onClickSaveRecipe(e, recipe).then(_recipe => {
      window.location.assign(`/recipes/${_recipe.owner.name}/${_recipe.url}`);
    });
  }

  render() {
    if (this.state.isEditing && this.props.user !== null) {
      return (
        <AddEditRecipe
          recipe={this.props.recipe}
          onClickSaveRecipe={this.onClickSaveRecipe}
        />
      );
    }

    const recipe = this.props.recipe;
    const ingredients = recipe.ingredients.map((ingredient, index) => {
      if (ingredient) {
        return (
          <li key={index}>
            {' '}
            {ingredient.amount} {ingredient.unit || ''} {ingredient.name}
          </li>
        );
      }

      return null;
    });
    const total = recipe.total || {};

    return (
      <div>
        <h3>{recipe.name}</h3>
        <span>Updated {moment(recipe.updatedDate).fromNow()}</span>
        <ul>{ingredients}</ul>
        <div>
          {total.quantity} {total.unit}
        </div>
        <div>{recipe.directions}</div>
        {this.props.user &&
        this.props.user._id === this.props.recipe.owner._id ? (
          <button className="btn" onClick={this.onClickAddEditRecipe}>
            Edit Recipe
          </button>
        ) : (
          ''
        )}
        <Link to={`${this.props.match.url}/scale`}>Scale Recipe</Link>
      </div>
    );
  }
}

Recipe.propTypes = {
  match: PropTypes.object.isRequired,
  onClickSaveRecipe: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired,
  user: PropTypes.object
};

export default Recipe;

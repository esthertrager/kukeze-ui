import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class RecipeList extends React.Component {
  renderDeleteButton(userOwnsRecipe, recipe) {
    if (userOwnsRecipe) {
      return (
        <button
          className="btn btn-sm"
          onClick={() => this.props.onClickDeleteRecipe(recipe.id)}
        >
          -
        </button>
      );
    }

    return null;
  }

  render() {
    const recipes = this.props.recipes.map(recipe => {
      const userOwnsRecipe =
        this.props.user && this.props.user._id === recipe.owner._id;

      return (
        <li key={recipe.id}>
          <Link to={`/recipes/${recipe.id}`}>{recipe.name} </Link>by{' '}
          {recipe.owner.name}
          {this.renderDeleteButton(userOwnsRecipe, recipe)}
        </li>
      );
    });

    return (
      <div>
        <h3> Recipes </h3>
        <ul>{recipes}</ul>
      </div>
    );
  }
}

RecipeList.propTypes = {
  onClickDeleteRecipe: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  recipes: PropTypes.array.isRequired
};

export default RecipeList;

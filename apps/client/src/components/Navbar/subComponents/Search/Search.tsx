import React from 'react';
import Input from '../../../common/Inputs/Input';
import css from './Search.module.css';

const Search = () => {
  return (
    <Input
      className={css.container}
      type="search"
      placeholder="what are you searching for today ?"
    />
  );
};

export default Search;

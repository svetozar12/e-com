import React, { useState } from 'react';
import css from './Dropdown.module.css';

interface IDropdown {
  label: React.ReactNode;
  children: React.ReactNode;
}

const Dropdown = ({ label, children }: IDropdown) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={css.container} tabIndex={0}>
      <div onClick={() => setIsOpen(!isOpen)}>{label}</div>
      <div className={css.dropdownContent}>{children}</div>
    </div>
  );
};

export default Dropdown;

import React, { useState } from 'react';
import css from './Dropdown.module.css';

interface IDropdown {
  label: React.ReactNode; // Text for the dropdown button
  children: React.ReactNode; // Content inside the dropdown
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

import React, { useState } from 'react';
import css from './Dropdown.module.css';

interface IDropdown {
  label: React.ReactNode;
  children: React.ReactNode;
}

const Dropdown = ({ label, children }: IDropdown) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={`${isOpen && css.container}`} tabIndex={0}>
      <div className="hover-effect" onClick={() => setIsOpen((prev) => !prev)}>
        {label}
      </div>
      <div className={css.dropdownContent}>{children}</div>
    </div>
  );
};

export default Dropdown;

import React from 'react';
import PropTypes from 'prop-types';

export default function InputField({
  children,
  type,
  placeholder,
  value = '',
  disabled = false,
  onChange,
  size = 'input-md',
  color = 'input-primary',
  ...rest
}) {
  return (
    <label className={`input ${size} ${color} w-full lg:w-2/3 mb-3`}>
      {children}
      <input
        type={type}
        className="grow"
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
        {...rest}
      />
    </label>
  );
}

InputField.propTypes = {
  children: PropTypes.element.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
};

import React from 'react';
import PropTypes from 'prop-types';

export default function InputField({
  children,
  type,
  placeholder,
  value = '',
  disabled = false,
  onChange,
}) {
  return (
    <label className="input input-md input-primary w-full lg:w-2/3 mb-3">
      {children}
      <input
        type={type}
        className="grow"
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
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
};

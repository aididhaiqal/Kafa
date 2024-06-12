import React from 'react';

export default function SelectInput({ id, name, value, className, onChange, required, children }) {
    return (
        <select
            id={id}
            name={name}
            value={value}
            className={`form-select block w-full mt-1 ${className}`}
            onChange={onChange}
            required={required}
        >
            {children}
        </select>
    );
}

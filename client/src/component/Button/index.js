import React from 'react';

const Button = ({
    label = 'Button',
    type = 'button',  // corrected default value to 'button'
    className = '',
    disabled = false, // corrected default value to false
}) => {
    return (
        <button 
            type={type} 
            className={`text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center ${className}`} 
            disabled={disabled}
        >
            {label}
        </button>
    )
}

export default Button
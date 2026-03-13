import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    loading = false,
    ...props
}) => {
    const variants = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        accent: 'btn-accent',
        outline: 'btn-outline',
        ghost: 'btn-ghost',
        danger: 'btn-error',
        success: 'btn-success',
    };

    const sizes = {
        xs: 'btn-xs',
        sm: 'btn-sm',
        md: 'btn-md',
        lg: 'btn-lg',
    };

    const baseClass = `btn transition-all duration-300 rounded-lg hover:shadow-lg ${variants[variant]} ${sizes[size]} ${className}`;

    return (
        <button className={baseClass} disabled={loading} {...props}>
            {loading && <span className="loading loading-spinner"></span>}
            {children}
        </button>
    );
};

export default Button;

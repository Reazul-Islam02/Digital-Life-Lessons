import React from 'react';

const Badge = ({ children, variant = 'primary', className = '' }) => {
    const variants = {
        primary: 'badge-primary',
        secondary: 'badge-secondary',
        accent: 'badge-accent',
        ghost: 'badge-ghost',
        outline: 'badge-outline',
        info: 'badge-info',
        success: 'badge-success',
        warning: 'badge-warning',
        error: 'badge-error',
    };

    return (
        <div className={`badge ${variants[variant]} p-3 font-medium ${className}`}>
            {children}
        </div>
    );
};

export default Badge;

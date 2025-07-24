import React, { forwardRef } from 'react';
import type { InputProps, InputSize, InputVariant } from '../../Types/types';


const Input = forwardRef<HTMLInputElement, InputProps>(({
    label,
    variant = 'default',
    size = 'md',
    error,
    helperText,
    leftIcon,
    rightIcon,
    fullWidth = true,
    containerClassName = '',
    labelClassName = '',
    inputClassName = '',
    errorClassName = '',
    helperClassName = '',
    disabled,
    ...props
}, ref) => {
    const getInputStyles = (): React.CSSProperties => {
        const baseStyles: React.CSSProperties = {
            fontFamily: 'inherit',
            outline: 'none',
            transition: 'all 0.2s ease-in-out',
            width: fullWidth ? '100%' : 'auto',
            borderRadius: '10px',
            fontSize: '14px',
            lineHeight: '1.4',
        };

        // Size styles
        const sizeStyles: Record<InputSize, React.CSSProperties> = {
            sm: { padding: '0.375rem 0.75rem', fontSize: '13px' },
            md: { padding: '0.5rem 0.875rem', fontSize: '14px' },
            lg: { padding: '0.75rem 1rem', fontSize: '16px' },
        };

        // Variant styles
        const variantStyles: Record<InputVariant, React.CSSProperties> = {
            default: {
                border: '1px solid #d1d5db',
                backgroundColor: '#ffffff',
                color: '#374151',
            },
            outlined: {
                border: '2px solid #e5e7eb',
                backgroundColor: 'transparent',
                color: '#374151',
            },
            filled: {
                border: '1px solid transparent',
                backgroundColor: '#f3f4f6',
                color: '#374151',
            },
            ghost: {
                border: '1px solid transparent',
                backgroundColor: 'transparent',
                color: '#374151',
            },
        };

        const errorStyles: React.CSSProperties = error
            ? { borderColor: '#ef4444' }
            : {};

        const disabledStyles: React.CSSProperties = disabled
            ? {
                backgroundColor: '#f9fafb',
                borderColor: '#e5e7eb',
                color: '#9ca3af',
                cursor: 'not-allowed',
            }
            : {};

        return {
            ...baseStyles,
            ...sizeStyles[size],
            ...variantStyles[variant],
            ...errorStyles,
            ...disabledStyles,
            paddingLeft: leftIcon ? '2.5rem' : sizeStyles[size].paddingLeft,
            paddingRight: rightIcon ? '2.5rem' : sizeStyles[size].paddingRight,
        };
    };

    const containerStyles: React.CSSProperties = {
        position: 'relative',
        // marginBottom: '1rem',
        width: fullWidth ? '100%' : 'auto',
    };

    const labelStyles: React.CSSProperties = {
        display: 'block',
        fontSize: '14px',
        fontWeight: '500',
        color: error ? '#ef4444' : '#374151',
        marginBottom: '0.5rem',
    };

    const iconStyles: React.CSSProperties = {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        color: disabled ? '#9ca3af' : '#6b7280',
        fontSize: '16px',
        zIndex: 10,
    };

    const leftIconStyles: React.CSSProperties = {
        ...iconStyles,
        left: '0.75rem',
    };

    const rightIconStyles: React.CSSProperties = {
        ...iconStyles,
        right: '0.75rem',
    };

    const errorStyles: React.CSSProperties = {
        color: '#ef4444',
        fontSize: '12px',
        marginTop: '0.25rem',
        display: 'block',
    };

    const helperStyles: React.CSSProperties = {
        color: '#6b7280',
        fontSize: '12px',
        marginTop: '0.25rem',
        display: 'block',
    };

    return (
        <div style={containerStyles} className={containerClassName}>
            {label && (
                <label style={labelStyles} className={labelClassName}>
                    {label}
                </label>
            )}
            <div style={{ position: 'relative' }}>
                {leftIcon && (
                    <span style={leftIconStyles}>
                        {leftIcon}
                    </span>
                )}
                <input
                    ref={ref}
                    style={getInputStyles()}
                    className={inputClassName}
                    disabled={disabled}
                    {...props}
                />
                {rightIcon && (
                    <span style={rightIconStyles}>
                        {rightIcon}
                    </span>
                )}
            </div>
            {error && (
                <span style={errorStyles} className={errorClassName}>
                    {error}
                </span>
            )}
            {helperText && !error && (
                <span style={helperStyles} className={helperClassName}>
                    {helperText}
                </span>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
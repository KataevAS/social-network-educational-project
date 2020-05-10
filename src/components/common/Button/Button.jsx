import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Button.module.css';

const Button = ({
    children = 'Button',
    onClick = () => { },
    className,
    addClassName = '',
    disabled,
    active = false,
    ...attrs }) => {

    const classes = classNames(
        className || styles.btn,
        addClassName,
        { active }
    );

    return (
        <button
            className={classes}
            disabled={disabled}
            onClick={onClick}
            {...attrs}
        >{children}</button>
    );
};

Button.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    active: PropTypes.bool
}

export default Button;
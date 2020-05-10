import React from 'react';
import { useField } from "formik";
import s from './Checkbox.module.css';

export const Checkbox = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
      <>
        <label className={s.label}>
          <input type="checkbox" className={s.checkbox} {...field} {...props} />
          {children}
        </label>
        {meta.touched && meta.error ? (
          <div className={s.error}>{meta.error}</div>
        ) : null}
      </>
    );
  };
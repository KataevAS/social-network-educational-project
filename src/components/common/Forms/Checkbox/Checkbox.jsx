import React from 'react';
import { useField } from "formik";
import s from './Checkbox.module.css';

export const Checkbox = ({ children, className, labelClassName, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <>
      {
        className
          ? <input type="checkbox" className={className} {...field} {...props} />
          : <input type="checkbox" className={s.checkbox} {...field} {...props} />
      }
      {
        labelClassName
          ? <label className={labelClassName}>{children}</label>
          : <label className={s.label}>{children}</label>
      }
      {meta.touched && meta.error ? (
        <div className={s.error}>{meta.error}</div>
      ) : null}
    </>
  );
};
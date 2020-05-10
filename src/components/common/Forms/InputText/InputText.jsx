import React from 'react';
import { useField } from "formik";
import s from './InputText.module.css';


export const InputText = ({ label, errorClassName, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <div>
                {meta.touched && meta.error ? (
                    <div className={errorClassName ? errorClassName : s.error}>{meta.error}</div>
                ) : null}
                <input className={meta.touched && meta.error ? s.textInput + ' ' + s.textInputerror : s.textInput} {...field} {...props} />
            </div>
        </>
    );
};
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { InputText } from "../common/Forms/InputText/InputText";
import Button from "../common/Button";
import { Checkbox } from "../common/Forms/Checkbox/Checkbox";
import s from './Login.module.css';
import { loginIn } from "../../redux/reducers/auth-reducer";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";


const Login = () => {
    const dispatch = useDispatch();
    const invalidLogin = useSelector(state => state.auth.invalidLogin);
    const isAuth = useSelector(state => state.auth.isAuth);


    const loginInForm = (value) => {
        dispatch(loginIn(value));
    }

    return (
        isAuth
            ? <Redirect to={'/profile'} />
            : <>
                <div className={invalidLogin ? s.pageLogin + ' ' + s.invalid : s.pageLogin}>
                    <LoginForm loginIn={loginInForm} />
                </div>
                {invalidLogin && <div class={s.invalidLogin}>Введен неправильный Email или пароль, попробуйте еще раз.</div>}
            </>
    )
}


const LoginForm = ({ loginIn }) => (
    <Formik
        initialValues={{ email: "", password: "", rememberMe: false }}
        onSubmit={(value) => { loginIn(value); }}
        validationSchema={Yup.object({
            email: Yup.string()
                .required("Обязательное поле")
                .max(100),
            password: Yup.string()
                .required("Обязательное поле")
                .min(6, 'Пароль должен состоять минимум из 6 символов')
                .max(100),
        })}
    >
        <Form className={s.loginForm}>

            <InputText
                label="Email: "
                name="email"
                type="email"
                placeholder="Введите email..."
            />

            <InputText
                label="Пароль: "
                name="password"
                type="password"
                placeholder="Введите пароль..."
            />

            <Checkbox name="rememberMe">Запомнить меня</Checkbox>

            <Button addClassName={s.loginBtn} type="submit">Подтвердить</Button>

        </Form>
    </Formik >
)




export default Login;
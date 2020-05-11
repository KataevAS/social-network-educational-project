import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from "yup";
import { InputText } from '../common/Forms/InputText/InputText';
import Button from '../common/Button';
import { Checkbox } from '../common/Forms/Checkbox/Checkbox';
import style from './EditProfile.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { editProfileData } from '../../redux/reducers/auth-reducer';




const EditProfile = () => {
    const profile = useSelector(state => state.auth.authUser);
    const contacts = profile.contacts;
    const dispatch = useDispatch();
    const [saveStatus, setSaveStatus] = useState(false);
    const [layer, setLayer] = useState(false);
    const [disBtn, setDisBtn] = useState(false);

    const editProfile = (profile) => {
        dispatch(editProfileData(profile));
        setDisBtn(true)
        setTimeout(() => setDisBtn(false), 1000)
        setLayer(false);
        setSaveStatus(true)
    }

    const handleClickEdit = () => {
        setDisBtn(true)
        setLayer(true);
        setTimeout(() => {
            setDisBtn(false);
            setSaveStatus(false);
        }, 1000)
    }

    return (
        <Formik
            initialValues={{
                aboutMe: profile.aboutMe || "",
                contacts: {
                    facebook: contacts.facebook || "",
                    github: contacts.github || "",
                    instagram: contacts.instagram || "",
                    mainLink: contacts.mainLink || "",
                    twitter: contacts.twitter || "",
                    vk: contacts.vk || "",
                    website: contacts.website || "",
                    youtube: contacts.youtube || "",
                },
                rememberMe: profile.rememberMe || "",
                lookingForAJob: profile.lookingForAJob || false,
                lookingForAJobDescription: profile.lookingForAJobDescription || "",
                fullName: profile.login || ""
            }}
            onSubmit={editProfile}
            validationSchema={Yup.object({
                fullName: Yup.string()
                    .max(100),
                aboutMe: Yup.string()
                    .max(100),
            })}
        >
            <Form className={style.form}>
                <div className={style.formItems}>
                    {saveStatus && <div className={layer ? style.layerCloseMenu + ' ' + style.deactive : style.layerCloseMenu}></div>}
                    <h4 className={style.formTitles}>Пользователь</h4>
                    <div className={style.inputBlock}>
                        <InputText
                            label="Логин: "
                            name="fullName"
                            type="text"
                            labelClassName={style.labeles}
                        />
                    </div>
                    <div className={style.inputBlock}>
                        <InputText
                            label="О себе: "
                            name="aboutMe"
                            type="text"
                            labelClassName={style.labeles}
                        />
                    </div>
                </div>
                <div className={style.formItems}>
                    {saveStatus && <div className={layer ? style.layerCloseMenu + ' ' + style.deactive : style.layerCloseMenu}></div>}
                    <h4 className={style.formTitles}>Работа</h4>
                    <div>
                        <Checkbox name="lookingForAJob" className={style.checkbox} labelClassName={style.checkboxLabel}>Ищу работу</Checkbox>
                    </div>
                    <div className={style.inputBlock + ' ' + style.commentJob}>
                        <InputText
                            label="Комментраии к вакансии: "
                            name="lookingForAJobDescription"
                            type="text"
                            labelClassName={style.labeles}
                        />
                    </div>
                </div>
                <div className={style.formItems}>
                    {saveStatus && <div className={layer ? style.layerCloseMenu + ' ' + style.deactive : style.layerCloseMenu}></div>}
                    <h4 className={style.formTitles}>Контакты</h4>
                    <div className={style.inputBlock}>
                        <InputText
                            label="Facebook:"
                            name="contacts.facebook"
                            type="text"
                            labelClassName={style.labeles}
                        />
                    </div>
                    <div className={style.inputBlock}>
                        <InputText
                            label="GitHub:"
                            name="contacts.github"
                            type="text"
                            labelClassName={style.labeles}
                        />
                    </div>
                    <div className={style.inputBlock}>
                        <InputText
                            label="Instagram:"
                            name="contacts.instagram"
                            type="text"
                            labelClassName={style.labeles}
                        />
                    </div>
                    <div className={style.inputBlock}>
                        <InputText
                            label="MainLink:"
                            name="contacts.mainLink"
                            type="text"
                            labelClassName={style.labeles}
                        />
                    </div>
                    <div className={style.inputBlock}>
                        <InputText
                            label="Twitter:"
                            name="contacts.twitter"
                            type="text"
                            labelClassName={style.labeles}
                        />
                    </div>
                    <div className={style.inputBlock}>
                        <InputText
                            label="Vkontakte:"
                            name="contacts.vk"
                            type="text"
                            labelClassName={style.labeles}
                        />
                    </div>
                    <div className={style.inputBlock}>
                        <InputText
                            label="Website:"
                            name="contacts.website"
                            type="text"
                            labelClassName={style.labeles}
                        />
                    </div>
                    <div className={style.inputBlock}>
                        <InputText
                            label="Youtube:"
                            name="contacts.youtube"
                            type="text"
                            labelClassName={style.labeles}
                        />
                    </div>
                </div>
                {
                    !saveStatus
                        ? <Button type="submit" addClassName={style.button} disabled={disBtn}>Сохранить</Button>
                        : <Button type="button" addClassName={style.button} onClick={handleClickEdit} disabled={disBtn}>Редактировать</Button>
                }
            </Form>
        </Formik >
    )
}


export default EditProfile;
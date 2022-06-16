import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { db } from '../../firebase';
import { collection, addDoc, Timestamp, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import {
    CButton,
    CCol,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CModal,
    CForm,
    CFormInput,
    CFormLabel,
    CInputGroup,
    CInputGroupText,
} from '@coreui/react'
import PropTypes from 'prop-types'

const AddUserEditUser = ({ visible, setVisible, dataToUpdate, clearData }) => {

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        if (dataToUpdate)
            Object.keys(dataToUpdate.data).map((key) => setValue(key, dataToUpdate.data[key]));
    }, []);

    const onSubmit = async (data) => {
        try {
            if (dataToUpdate && dataToUpdate?.id) {
                const taskDocRef = doc(db, 'tasks', dataToUpdate.id)
                await updateDoc(taskDocRef, {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    address: data.address,
                })
                clearData()
                reset()
            }
            else {
                await addDoc(collection(db, 'tasks'), {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    address: data.address,
                    completed: false,
                    created: Timestamp.now()
                })
                reset()
            }
            setVisible(false)
        } catch (err) {
            alert(err)
        }
    };

    return (
        <CModal visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader>
                <CModalTitle>Contact</CModalTitle>
            </CModalHeader>
            <CForm onSubmit={handleSubmit(onSubmit)}>
                <CModalBody>
                    <CCol xs={12}>
                        <CFormLabel htmlFor="validationCustom01">First Name</CFormLabel>
                        <CFormInput
                            type="text"
                            {...register("firstName", { required: true })}
                        />
                        {errors.firstName && <p>This field is required</p>}
                    </CCol>
                    <CCol xs={12}>
                        <CFormLabel htmlFor="validationCustom01">Last Name</CFormLabel>
                        <CFormInput
                            type="text"
                            {...register("lastName", { required: true })}
                        />
                        {errors.lastName && <p>This field is required</p>}
                    </CCol>
                    <CCol xs={12}>
                        <CFormLabel htmlFor="validationCustomUsername">Email</CFormLabel>
                        <CInputGroup className="has-validation">
                            <CInputGroupText id="inputGroupPrepend">@</CInputGroupText>
                            <CFormInput
                                type="email"
                                id="validationCustomUsername"
                                aria-describedby="inputGroupPrepend"
                                {...register("email", { required: true })}

                            />
                        </CInputGroup>
                        {errors.email && <p>This field is required</p>}
                    </CCol>
                    <CCol xs={12}>
                        <CFormLabel htmlFor="validationCustom03">Phone Number</CFormLabel>
                        <CFormInput
                            type="text"
                            id="validationCustom03"
                            {...register("phoneNumber", { required: true })}
                        />
                        {errors.phoneNumber && <p>This field is required</p>}
                    </CCol>
                    <CCol xs={12}>
                        <CFormLabel htmlFor="validationCustom01">Address</CFormLabel>
                        <CFormInput
                            type="text"
                            {...register("address", { required: true })}
                        />
                        {errors.address && <p>This field is required</p>}
                    </CCol>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Close
                    </CButton>
                    <CCol xs={3}>
                        <CButton color="primary" type="submit">
                            Submit form
                        </CButton>
                    </CCol>
                </CModalFooter>
            </CForm>
        </CModal>
    );
}
AddUserEditUser.propTypes = {
    visible: PropTypes.bool,
    setVisible: PropTypes.func,
    clearData: PropTypes.func,
    dataToUpdate: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ])
}
export default AddUserEditUser;

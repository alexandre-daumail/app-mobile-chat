import React, { useState } from 'react';
import SCLogo from "../assets/images/simplechat.png";
import { Link } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        // Vérifiez les informations de connexion ici
        console.log(email, password)

        // Envoyer une requête à l'API pour vérifier les informations d'identification
        fetch('http://localhost:3000/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    // Si la connexion a échoué, afficher un message d'erreur
                    setError(data.error)
                } else {
                    // Si la connexion a réussi, enregistrer l'utilisateur et rediriger vers la page d'accueil
                    localStorage.setItem('user', JSON.stringify(data.user))

                    window.location.href = '/panel-admin'
                }
            })
            .catch((error) => {
                // Gérer les erreurs de requête
                setError("Une erreur s'est produite lors de la connexion.")
            })
    }

    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>

                <CRow className="justify-content-center">
                    <CCol md={4}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <div className="justify-content-center d-flex">
                                    <img src={SCLogo} width={'50%'}  alt='SimpleChat'/>
                                </div>

                                <CCardBody>
                                    <CForm onSubmit={handleSubmit}>
                                        <h5>Login Admin </h5>
                                        <p className="text-medium-emphasis">Connectez vous à votre compte</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput
                                                placeholder="@Email"
                                                autoComplete="username"
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type="password"
                                                placeholder="Password"
                                                autoComplete="current-password"
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </CInputGroup>
                                        <CRow>
                                            <CButton type="submit" color="success" className="px-4">
                                                Login
                                            </CButton>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                                  <span className="text-danger text-center"> {error}</span>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Login
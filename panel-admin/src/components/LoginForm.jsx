import React, { useState } from 'react';
import SCLogo from "../assets/images/simplechat.png";
import { Link } from 'react-router-dom'
import {
    CButton, CCard, CCardBody, CCardGroup, CCol, CContainer,
    CForm, CFormInput, CInputGroup, CInputGroupText, CRow,} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        // Vérifiez les informations de connexion ici
        console.log(email, password);

        // Envoyer une requête à l'API pour vérifier les informations d'identification
        fetch('http://localhost:3000/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    // Si la connexion a échoué, afficher un message d'erreur
                    setError(data.error);
                } else {
                    // Si la connexion a réussi, enregistrer l'utilisateur et rediriger vers la page d'accueil
                    localStorage.setItem('user', JSON.stringify(data.user));

                    window.location.href = '/admin/panel';

                }
            })
            .catch(error => {
                // Gérer les erreurs de requête
                setError('Une erreur s\'est produite lors de la connexion.');
            });
    }
    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={4}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm onSubmit={handleSubmit}>
                                        <CContainer className="text-center">
                                            <img src={SCLogo}   alt='SimpleChat'/>
                                        </CContainer>

                                        <h1>Login</h1>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput type="email" placeholder="@Email" autoComplete="username" onChange={e => setEmail(e.target.value)} />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type="password"
                                                placeholder="Password"
                                                autoComplete="current-password"
                                                onChange={e => setPassword(e.target.value)}
                                            />
                                        </CInputGroup>
                                        <CRow className="d-flex">

                                            <CCol xs={6}>
                                                <CButton type="submit" className="w-100" color="success" >
                                                  Connexion
                                                </CButton>
                                            </CCol>
                                            <CCol xs={6} className="text-right">
                                                <CButton color="link" className="px-0">
                                                    Forgot password?
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>



    );
    }

    export default LoginForm
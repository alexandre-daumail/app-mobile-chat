import React from 'react';
import { CNavbar,CContainer,CNavbarBrand,CButton,CForm} from "@coreui/react";

function Navbar () {

            return (

                <CNavbar colorScheme="light" className="bg-light d-flex">
                    <CContainer>
                        <div className=" d-flex w-100">
                            <CNavbarBrand href="#">Nom Prenom </CNavbarBrand>
                            <CForm>
                                <CButton className='w-25 ' type="submit" color="danger" variant="outline">
                                    Déconnexion
                                </CButton>
                            </CForm></div>
                    </CContainer>
                </CNavbar>
            )
};

export default Navbar;
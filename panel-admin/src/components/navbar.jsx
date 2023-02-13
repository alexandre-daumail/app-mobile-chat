import React from 'react';
import {useState} from "react";
import { CNavbar,CContainer,CNavbarNav,CNavItem,CCollapse,CNavbarBrand,CNavbarToggler,CNavLink} from "@coreui/react";

const Navbar = () => {
            const [visible, setVisible] = useState(false)
            return (
            <>
                <CNavbar expand="lg" colorScheme="light" className="bg-light">
                    <CContainer fluid className='w-100'>
                        <CNavbarBrand href="#">Navbar</CNavbarBrand>
                        <CNavbarToggler onClick={() => setVisible(!visible)} />
                        <CCollapse className="navbar-collapse" visible={visible}>
                            <CNavbarNav>
                                <CNavItem>
                                    <CNavLink href="#" active>
                                        Home
                                    </CNavLink>
                                </CNavItem>
                                <CNavItem>
                                    <CNavLink href="#">Link</CNavLink>
                                </CNavItem>

                                <CNavItem>
                                    <CNavLink href="#" disabled>
                                        Disabled
                                    </CNavLink>
                                </CNavItem>
                            </CNavbarNav>

                        </CCollapse>
                    </CContainer>
                </CNavbar>
            </>
            )
};

export default Navbar;
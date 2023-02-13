import React from 'react';
import { CSidebar } from '@coreui/react';
import { CSidebarBrand,CSidebarToggler,CNavItem,CSidebarNav,CNavTitle,CNavGroup, CBadge } from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
const Sidebar = () => {
    return (
        <div className="sidebar">
            <CSidebar>
                <CSidebarBrand>Sidebar Brand</CSidebarBrand>
                <CSidebarNav>
                    <CNavTitle>Nav Title</CNavTitle>
                    <CNavItem href="#">
                        <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
                        Nav item
                    </CNavItem>
                    <CNavItem href="#">
                        <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
                        With badge
                        <CBadge color="primary ms-auto">NEW</CBadge>
                    </CNavItem>
                    <CNavGroup toggler="Nav dropdown">
                        <CNavItem href="#">
                            <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav dropdown item
                        </CNavItem>
                        <CNavItem href="#">
                            <CIcon customClassName="nav-icon" icon={cilPuzzle} /> Nav dropdown item
                        </CNavItem>
                    </CNavGroup>
                </CSidebarNav>
                <CSidebarToggler />
            </CSidebar>

        </div>
    );
};

export default Sidebar;
import React, {useState} from 'react';
import { CSidebar } from '@coreui/react';
import { CSidebarBrand,CNavItem,CSidebarNav,CSidebarToggler,CNavTitle, CBadge, CNavGroup } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSpeedometer,cilPuzzle } from '@coreui/icons';

const Sidebar = () => {

    const [sidebarShow, setSidebarShow] = useState(true);

    const onToggleClick = () => {
        console.log(sidebarShow)
            setSidebarShow(!sidebarShow)

    };
    return (
            <aside>
                <CSidebar> <CSidebarToggler  onClick={onToggleClick} /> </CSidebar>
                <CSidebar visible={sidebarShow}>
                    <CSidebarToggler  onClick={onToggleClick} />
                    <CSidebarBrand>Sidebar Brand</CSidebarBrand>
                    <CSidebarNav >
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
                </CSidebar>
            </aside>

    );
};

export default Sidebar;
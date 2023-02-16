import React from "react";
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'


const Sidebar = () => {

    const dispatch = useDispatch()
    const unfoldable = useSelector((state) => state.sidebarUnfoldable)
    const sidebarShow = useSelector((state) => state.sidebarShow)


    return (
            <aside>
                <CSidebar
                    position="fixed"
                    unfoldable={unfoldable}
                    visible={sidebarShow}
                    onVisibleChange={(visible) => {
                        dispatch({ type: 'set', sidebarShow: visible })
                    }}
                >
                    <CSidebarBrand className="d-none d-md-flex" to="/">
                        <CIcon className="sidebar-brand-full"  height={35} />
                        <CIcon className="sidebar-brand-narrow"  height={35} />
                    </CSidebarBrand>
                    <CSidebarNav>

                    </CSidebarNav>
                    <CSidebarToggler
                        className="d-none d-lg-flex"
                        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
                    />
                </CSidebar>
            </aside>

    );
};

export default Sidebar;
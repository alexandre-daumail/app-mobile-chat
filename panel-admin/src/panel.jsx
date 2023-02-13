import React from 'react';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Navbar>
                <Nav vertical>
                    <NavItem>
                        <NavLink href="#">Accueil</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Profil</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Paramètres</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    );
};

export default Sidebar;

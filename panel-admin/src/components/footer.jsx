import React from 'react';

import {CFooter,CLink} from "@coreui/react";

const Footer = () => {
    return (
        <div>
            <CFooter className={'vw-100'}>
                <div>
                    <CLink href="https://coreui.io">CoreUI</CLink>
                    <span>&copy; 2023 creativeLabs.</span>
                </div>
                <div>
                    <span>Powered by</span>
                    <CLink href="https://coreui.io">CoreUI</CLink>
                </div>
            </CFooter>
        </div>
    );
};

export default Footer;
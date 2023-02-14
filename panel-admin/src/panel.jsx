import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";
import AppHeader from "./components/navbar";

export default function Panel () {
    return (
        <div className="container-fluid d-flex p-0 m-0 h-100 w-100">
            <div className="row-cols-md-2">
                <Sidebar className="flex-grow-1" />
            </div>
            <div className="row-col-md-9 p-0 m-0 d-flex  flex-column">
                <AppHeader/>
                <div className="container mt-3 flex-grow-1">
                    {/* Votre contenu ici */}
                </div>
                <footer className="text-center  mt-3">
                    <Footer  />
                </footer>
            </div>
        </div>
    );
}

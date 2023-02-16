import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import AppContent from "./components/AppContent";
import { Provider } from 'react-redux';
import store from './store'
export default function Panel () {

    return (
        <div>

            <Sidebar />

            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <Navbar />
                <div className="body flex-grow-1 px-3">
                    <AppContent/>
                </div>
                <Footer />
            </div>
        </div>
    );
}

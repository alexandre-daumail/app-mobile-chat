import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";

export default function Panel () {
    return (
        <div className="container-fluid w-100 p-0 m-0">
            <div className="row">
                <div className="col-md-2 p-0 m-0">
                    <Sidebar />
                </div>
                <div className="col-md-9 p-0 m-0 ">
                    <Navbar />
                </div>
            </div>
        </div>
    );
}

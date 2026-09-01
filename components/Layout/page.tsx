'use client';

import React from 'react'
import NavbarFlowDemo from '../Header/page';
import Footer from '../Footer/Footer';
import VenomBeam from '../ui/venom-beam';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className=''>
            <VenomBeam className="md:pl-30 md:pr-30 scroll-container ">
                <NavbarFlowDemo />
                {children}
                <div className='p-2'>
                    <Footer />
                </div>
            </VenomBeam>
        </div>
    )
}

export default Layout

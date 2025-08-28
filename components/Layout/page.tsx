'use client';

import React from 'react'
import { ThemeProvider } from '../theme-provider'
import NavbarFlowDemo from '../Header/page';
import Footer from '../Footer/Footer';
import VenomBeam from '../ui/venom-beam';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [showThankYou, setShowThankYou] = React.useState(false);
    return (
        <div className='' >
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <VenomBeam className="md:pl-30 md:pr-30 scroll-container ">
                    <NavbarFlowDemo />
                    {children}
                    <div className='p-2'>
                        <Footer />
                    </div>
                </VenomBeam>

                {/* <ThankYou
                    onButtonClick={() => setShowThankYou(false)}
                    autoDismiss={true}
                    dismissTime={2000}
                    title="Thank You For Visiting!"
                    message="I appreciate you taking the time to explore my portfolio. Feel free to reach out if you'd like to connect!"
                /> */}
            </ThemeProvider>
        </div>
    )
}

export default Layout

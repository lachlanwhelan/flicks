import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, signInUser, isAuthenticated, signOutUser }) => {
  return (
    <>
      <Navbar
        signInUser={signInUser}
        isAuthenticated={isAuthenticated}
        signOutUser={signOutUser}
      />
      {children}
      <div className='user_action_popup'></div>
      <Footer />
    </>
  );
};

export default Layout;

import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer
      style={{
        textAlign: 'center',
        padding: '20px 0',
        backgroundColor: '#333',
        color: '#fff',
        position: 'fixed',
        bottom: 0,
        width: '100%',
      }}
    >
      <p>© {currentYear} MyApp. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

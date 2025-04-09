import React from 'react';

const Spinner = () => {
  const loaderContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', 
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  };

  const loaderStyle = {
    border: '8px solid #f3f3f3',  
    borderTop: '8px solid #3498db', 
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 1s linear infinite',
  };

  const keyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <div style={loaderContainerStyle}>
      <style>{keyframes}</style>  
      <div style={loaderStyle}></div>
    </div>
  );
};

export default Spinner;

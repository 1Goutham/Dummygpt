import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="mainbg" style={{
  backgroundImage: "url('/assets/websitebg.jpg')",
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 100%",
  backgroundPosition: "center",
  minHeight: "100vh",  
  height: "auto",    
  minWidth: "100vw", 
  padding: "0.5rem 0"
}}>
  <div className="flex-container2">
  <div>
  <img className="mainlogo" alt="mainlogo" src="/assets/mainlogo.png" />
  </div>
  <div className='btncontainer' style={{ paddingRight: '1rem' }}>
  <button className='contactbtn'  onClick={() => window.location.href = 'https://www.linkedin.com/in/goutham-g-98a0ba253/'}
  >Contact<span><img className="arrow" alt='arrow' src='/assets/ArrowUpRight.png'/></span></button>
  </div>
  </div>
  <div style={{ display: "flex",
  justifyContent: "center",
  alignItems: "center"
}}>
  <div style={{
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minWidth: "1000px",    
  minHeight: "400px"    
}}>
  
    <App />
    </div>
    </div>
    </div>

  </React.StrictMode>
);

reportWebVitals();

import Header from "./Header";

import '../styles/layout.css'

const Layout = ({ children } : any) => {
  return (
    <div className="layout">
      <Header/>
      {children}
   
    </div>
  );
};

export default Layout;

import Footer from "./Footer";
import Header from "./Header";


import '../styles/layout.css'

const Layout = ({ children } : any) => {
  return (
    <div className="layout">
      <Header/>
      {children}
      <Footer />
    </div>
  );
};

export default Layout;

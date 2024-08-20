import Sidebar from "@/Components/Common/Sidebar";
import { wrapper } from "@/redux";
import { useAuthSelector } from "@/redux/selector/auth";
import "@/styles/auth.css";
import "@/styles/dashboard.css";
import "@/styles/responsive.css";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = ({ Component, pageProps }) => {
  var authSelector = useAuthSelector();
  const [isClient , setIsClient] = useState()
  const [loading , setLoading] = useState()
  useEffect(() => {
    setIsClient(true);
  }, [])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  useEffect(() => {
    // Simulate an asynchronous delay (replace with actual authentication data fetching)
    const delay = setTimeout(() => {
      setLoading(false);
    }, 100); // Adjust the delay time as needed

    return () => clearTimeout(delay); // Clear the timeout if the component unmounts
  }, []);

if(loading){
  return <></>
}
return (
    <>
      {isClient && authSelector?.isLoggedIn && Cookies.get("authToken") ? (
        <>
          <div className={`mainOuter ${sidebarOpen ? "sidebarClose": ""}`}>
          <Sidebar setSidebarOpen={setSidebarOpen} /> <div className='contentMain'>
          <Component {...pageProps} isClient={isClient}/>
          </div> 
          </div> 
        </>
      ) : (
        <Component {...pageProps} isClient={isClient} />  
      )}

      
      <ToastContainer />
    </>
  );

};

export default wrapper.withRedux(App);

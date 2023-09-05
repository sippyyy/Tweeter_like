import React from "react";
import { DefaultLayout, SecondLayout } from "./Layout";
import { NormalPopup } from "./components/Popup";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBaseInfo } from "./features/user/userInfoSlice";

function App({ children, typeLayout }) {
  const Layout = typeLayout ? SecondLayout : DefaultLayout;
  const dispatch = useDispatch()

  useEffect(() =>{
    const accessToken = localStorage.getItem('access_token')
    if(accessToken) {
      dispatch(getBaseInfo(accessToken))
    }
  },[])


  return (
    <>
      <Layout>{children}</Layout>
      <NormalPopup />
    </>
  )
    ;
}

export default App;
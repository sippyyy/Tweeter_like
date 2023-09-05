import {Navigate} from 'react-router-dom'
function PrivateRoutes({children,...rest}) {
    const accessTokenValid = localStorage.getItem('access_token')

    return ( 
        accessTokenValid ?
        <>
            {children}
        </>
        :
        <Navigate to="/login" />
     );
}

export {PrivateRoutes};
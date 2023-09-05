export const waitData = (request,dataInput,method,endpoint,params,setData,dispatch,accessToken)=>{
    request(dataInput, method, endpoint, params,dispatch,accessToken)
    .then(result => {
      if(result){
        setData(result)
      }
    })
    .catch(error => {
      console.error(error);
    });
}

export function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}
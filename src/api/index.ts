import axios from 'axios';

const getToken = (token: string, addBearer: boolean) => {
  const tokens = localStorage.getItem('tokens');
  const tokenValue = JSON.parse(tokens || '')[token];
  debugger;
  console.log("get tokenValue ", `Bearer ${tokenValue}`)
  return addBearer ? `Bearer ${tokenValue}` : tokenValue;
}

const BASE_URL = process.env.REACT_APP_BASE_URL || 'https://hydra.transcendstreet.com:8768';

export const getItems = (data: any) => {
    debugger;
    console.log("data ", data);
    return axios({
      url: `${BASE_URL}/request-service/query_request`,
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getToken('accessToken', true)
      }
    })
  }

const nonAuthorizedHeader = {
    'Content-Type': 'application/json'
   }
  
export const login = (userId: string, password: string) => {
const data = {
    userId,
    password
}

return axios.post(
    `${BASE_URL}/auth-service/v3/valid_user`, data, {
    headers: nonAuthorizedHeader
    })
}

export const getQueryId = (queryName: string) => {
    const data = {
      queryName,
      "filter": {
        "simpleExpressions": [
          {
            "columnName": "BusinessDate",
            "operator": "EQUALS",
            "values": ["1590192000000"]
          }   
        ]
      }
    }
    debugger;
    return axios({
      url: `${BASE_URL}/realtime-svc/create-query`,
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

export const getMetadata = (queryName: string) => {
    const requestBody = {
        data: {
        queryName,
        metadataType: 'UI'
        }
    }
    debugger;
    return axios ({
        url: `${BASE_URL}/metadata_service/ui_metadata`,
        method: 'post',
        data: JSON.stringify(requestBody),
        headers: {
        'Content-Type': 'application/json'
        }
    })
}
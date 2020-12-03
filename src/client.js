/*
function myCustomFetch(url, params) {
    return fetch('https://myapi.myurl.com/getToken')
      .then(response => response.json())
      .then((responseToken) => {
        // First API -- Always need to request it to get Token
        return fetch(url, {
          ...params,
          headers: { Authorization: responseToken.token },
        }).then(response => response.json());
      });
  }
*/

import {accessToken, siteId, apiUrl } from './config';

export  async function clientConnect(url, ids , params) {
        
        var requestUrl = ""; 

        if(ids != null)
        {
            requestUrl = apiUrl + url + "/" + ids
        }
        else
        {
            requestUrl = apiUrl + url;
        }   

        const response = await fetch(requestUrl, {
          ...params,
          headers: { 'X-BBCMS-TOKEN': accessToken, 'X-BBCMS-SITE': siteId },
        });
        const data = await response.json();

        /*
        return fetch(requestUrl, {
          ...params,
          headers: { 'X-BBCMS-TOKEN': accessToken, 'X-BBCMS-SITE': siteId },
        }).then(response => response.json());
        */
        return data;
  }
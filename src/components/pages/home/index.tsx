'use client';
//import { useEffect } from 'react';

export default function Home() {
  /*
        useEffect(() => {
            const endpoint = process.env.NEXT_PUBLIC_OER_CMS_ENDPOINT_POSTS;
            const username = process.env.NEXT_PUBLIC_OER_CMS_BA_USER;
            const password = process.env.NEXT_PUBLIC_OER_CMS_BA_PASS;
            const headers = new Headers();
            headers.append('Authorization', 'Basic' + window.btoa(username + ':' + password));
            const request = new Request(new URL(endpoint), {
            headers,
            method: 'GET',
            mode: 'cors',
            });
            fetch(request)
            .then((response) => {
                console.log(response?.ok);
                return response.json();
            })
      .catch((e) => {
        console.warn(e);
      });
  }, []);
*/
  return null;
}

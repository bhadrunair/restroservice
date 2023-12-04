"use client";

import { useEffect, useState } from 'react';

const PayPage = ({ params }: { params: { id: string }}) => {
  const [clientSecret, setClientSecret] = useState("");
  const {id} = params;

  useEffect(() => {
    const makeRequest = async () => {
      try{
        const res = await fetch(`http://localhost:3000/api/create-intent/${id}`,{
          method:"POST"
        });
        const data = await res.json();
        setClientSecret(data.clientSecret);
      }catch(err){
        console.log(err);
      }
    };

    makeRequest();
  }, [id]);
  

  return (
    <div>PayPage</div>
  )
}

export default PayPage
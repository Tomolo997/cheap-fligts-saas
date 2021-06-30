import axios from 'axios';
import { useParams } from 'react-router';
import React, { useEffect } from 'react';

export default function SuccessfullyUpgraded() {
  const { id, priceId } = useParams();
  useEffect(() => {
    upgareMe();
  }, []);

  const upgareMe = async () => {
    const res = await axios.post('/api/v1/users/successUpgrade', {
      id: id,
      priceId: priceId,
    });
    console.log(res);
  };

  return <div>You have succesuflly upgraded </div>;
}

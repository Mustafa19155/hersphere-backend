import React, {useEffect, useState} from 'react';
import {useAsyncStorage} from '../hooks/useAsyncStorage.js';

export const RequestContext = React.createContext();

function RequestProvider({children}) {
  const [category, setcategory] = useState('');
  const [description, setdescription] = useState('');
  const [likes, setlikes] = useState('25');
  const [comments, setcomments] = useState('25');
  const [days, setdays] = useState('2');
  const [allowInfluencerToAddData, setallowInfluencerToAddData] =
    useState(false);
  const [data, setdata] = useState([]);
  const [platforms, setplatforms] = useState([]);
  const [payment, setpayment] = useState(0);
  const [paymentMethod, setpaymentMethod] = useState('wallet');

  const value = {
    category,
    setcategory,
    description,
    setdescription,
    likes,
    setlikes,
    comments,
    setcomments,
    days,
    setdays,
    allowInfluencerToAddData,
    setallowInfluencerToAddData,
    data,
    setdata,
    platforms,
    setplatforms,
    payment,
    setpayment,
    paymentMethod,
    setpaymentMethod,
  };

  return (
    <RequestContext.Provider value={value}>{children}</RequestContext.Provider>
  );
}
export default RequestProvider;

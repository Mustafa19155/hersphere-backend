import React, {useEffect, useState} from 'react';
import {useAsyncStorage} from '../hooks/useAsyncStorage.js';

export const PostCreatorContext = React.createContext();

function PostCreatorProvider({children}) {
  const [description, setdescription] = useState('');
  const [imageUrl, setimageUrl] = useState('');

  const value = {
    description,
    setdescription,
    imageUrl,
    setimageUrl,
  };

  return (
    <PostCreatorContext.Provider value={value}>
      {children}
    </PostCreatorContext.Provider>
  );
}
export default PostCreatorProvider;
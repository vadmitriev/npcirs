import React from 'react';

interface NotFoundProps {
  text: string;
}

const NotFound: React.FC<NotFoundProps> = ({ text = '' }) => {
  return <div>{text}</div>;
};

export default NotFound;

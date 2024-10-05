'use client';
import { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }: PropsWithChildren) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    window.document.body.style.overflow = 'hidden';
    return () => {
      setMounted(false);
      window.document.body.style.overflow = 'unset';
    };
  }, []);
  return (
    mounted &&
    createPortal(
      children,
      document.querySelector('#modal-portal') as unknown as DocumentFragment,
    )
  );
};

export default Portal;

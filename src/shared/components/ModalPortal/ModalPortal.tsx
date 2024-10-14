'use client';
import { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface IPortalProps extends PropsWithChildren {
  overflowHidden?: boolean;
}

const Portal = ({ children, overflowHidden = true }: IPortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!overflowHidden) return;
    window.document.body.style.overflow = 'hidden';
    return () => {
      setMounted(false);
      if (!overflowHidden) return;
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

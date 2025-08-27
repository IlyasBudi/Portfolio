'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ThemeModal from './ThemeModal';

interface ThemeModalPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThemeModalPortal({ isOpen, onClose }: ThemeModalPortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <ThemeModal isOpen={isOpen} onClose={onClose} />,
    document.body
  );
}
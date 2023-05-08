import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import io from 'socket.io-client';

export default function App({ Component, pageProps }: AppProps) {
  const [socket, setSocket] = useState<any>();

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return <Component {...pageProps} socket={socket} />;
}

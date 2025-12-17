import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function OurWork() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/initiatives');
  }, [router]);

  return null;
}

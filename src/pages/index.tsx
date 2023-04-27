import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div>
      <div>Public</div>
      <div>
        <a href="/private">Go to Private</a>
      </div>
    </div>
  );
}

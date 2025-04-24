"use client"; // Mark this as a client-side component
import Image from 'next/image';

import { useRouter } from "next/navigation"; // Use useNavigate from next/navigation

export default function Home() {
  const router = useRouter(); // Initialize the navigate function

  const handleNavigate = () => {
    router.push('/patterns'); // Navigate to /patterns when the button is clicked
  };

  const social_icon_len = 60;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8">
  {/* <h1 className="text-9xl font-extrabold text-black tracking-wide uppercase text-center">
    EK<br />UA
  </h1> */}
  <Image
      src="/ekua-logo.png"
      width={200}
      height={200}
      alt={"EKUA Logo"}
      />

  <p className="text-m text-black text-center mx-12">
    Thank you for creating a pattern. Enjoy the show!
  </p>
  
  <div className="flex flex-row">
    <a href="https://www.instagram.com/ekua.mp4/" 
      target="_blank" 
      className="inline-block mx-1">
    <Image
      src="/Instagram.png"
      width={social_icon_len}
      height={social_icon_len}
      alt={"Ekua's Instagram"}
      className="inline-block"
      />
    </a>
    <a href="https://music.apple.com/us/artist/ekua/1684387190" 
      target="_blank" 
      className="inline-block mx-1">
        <Image
          src="/Apple_Music.png"
          width={social_icon_len}
          height={social_icon_len}
          alt={"Ekua's Apple Music"}
          className="inline-block"
          />
        </a>
    <a href="https://open.spotify.com/artist/55sSJcc45798d40qFJXVuc?si=D8IIms7eR5yuMgwjQNJJ1g" 
      target="_blank" 
      className="inline-block mx-1">
    <Image
      src="/Spotify.png"
      width={social_icon_len}
      height={social_icon_len}
      alt={"Ekua's Spotify"}
      className="inline-block"
      />
    </a>

    <button
      onClick={handleNavigate}
      className="fixed bottom-0 left-0 w-full bg-black text-white py-4 text-center text-lg font-bold"
    >
      CREATE ANOTHER PATTERN
    </button>
  </div>

</div>

  );
}

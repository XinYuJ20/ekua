"use client"; // Mark this as a client-side component

import { useRouter } from "next/navigation"; // Use useNavigate from next/navigation

export default function Home() {
  const router = useRouter(); // Initialize the navigate function

  const handleNavigate = () => {
    router.push('/patterns'); // Navigate to /patterns when the button is clicked
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
  <h1 className="text-9xl font-extrabold text-black tracking-wide uppercase text-center">
    EK<br />UA
  </h1>

  <div className="flex flex-col items-center justify-center text-lg text-black text-center mt-4 w-full max-w-md">
    <p>To get to the Other Side</p>
    <p className="mt-2 text-sm">
      This is an interactive live performance. Create your own patterns that will help shape the show.
    </p>
  </div>

  
  <button
    onClick={handleNavigate}
    className="fixed bottom-0 left-0 w-full bg-black text-white py-4 text-center text-lg font-bold"
  >
    START!
  </button>
</div>

  );
}

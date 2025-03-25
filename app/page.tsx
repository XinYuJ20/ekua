"use client"; // Mark this as a client-side component

import { useRouter } from "next/navigation"; // Use useNavigate from next/navigation

export default function Home() {
  const router = useRouter(); // Initialize the navigate function

  const handleNavigate = () => {
    router.push('/patterns'); // Navigate to /patterns when the button is clicked
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-5xl font-bold mb-8 text-black">Welcome to Our Website!</h1>
      <p className="text-lg mb-4 text-black">We are excited to have you here.</p>
      <p className="text-lg mb-4 text-black">Explore the content and discover more.</p>
   
      <button
        onClick={handleNavigate}
        className="bg-blue-500 text-white py-2 px-6 rounded-full text-lg"
      >
        Continue!
      </button>
    </div>
  );
}

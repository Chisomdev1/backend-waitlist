import WaitlistForm from '@/components/WaitlistForm';
import { FaCanadianMapleLeaf } from "react-icons/fa";
import { ToastContainer } from 'react-toastify';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6 pb-9 animate-gradient">
      {/* <ToastContainer className="regular" /> */}
      {/* Header Section */}
      <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-full shadow-lg">
        <FaCanadianMapleLeaf className="text-red-500 text-xl" />
        <span className="text-sm font-medium tracking-wide regular-Cabinet">Learning Made Free</span>
      </div>

      {/* Title Section */}
      <h1 className="regular-Cabinet mt-8 text-4xl md:text-5xl lg:text-6xl font-extrabold text-center leading-tight tracking-tight">
        Get Smarter, Faster — <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
          Join the Free PDF Summarizer Waitlist
        </span>
      </h1>

      {/* Subtitle Section */}
      <p className="regular mt-4 text-center text-lg md:text-xl text-gray-400 max-w-2xl">
        Summarize lengthy PDFs in seconds. Save time, stay focused, and boost productivity — all for free. Be the first to get early access!
      </p>

      {/* Waitlist Form */}
      <div className="mt-8 w-full max-w-md">
        <WaitlistForm />
      </div>

      {/* Footer Section */}
      <footer className="mt-12 text-sm text-gray-500 regular">
        © {new Date().getFullYear()} Learning Made Free. All rights reserved.
      </footer>
    </main>
  );
}

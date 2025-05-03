"use client";
import { useState, useTransition } from "react";
import { addToWaitlist } from "@/app/api/waitlist/route";
import { ToastContainer, toast } from "react-toastify";
import { FaWhatsapp } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { FaXTwitter } from "react-icons/fa6";
import { FaCanadianMapleLeaf } from "react-icons/fa";
import Link from "next/link";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const [showAlert, setShowAlert] = useState(false);
  const notify = () => toast("Wow so easy!");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");

    startTransition(async () => {
      const result = await addToWaitlist(email);

      if (result?.success) {
        setStatus("success");
        setEmail("");
        setShowAlert(true); // Show the alert modal
      } else {
        setStatus("error");
        toast(result?.message || "Failed to join.");
      }
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-lg mx-auto bg-transparent p-6 rounded-xl shadow-lg"
      >
        <div className="md:inline-flex w-[100%]">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-[70%] regular-Cabinet p-3 text-white rounded-lg border-b-2 border-white border-none bg-transparent focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "loading" || isPending}
            className={`w-[30%] py-3 rounded-lg text-lg font-semibold transition-all regular-Cabinet ${
              isPending
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
            }`}
          >
            {isPending ? "Joining..." : "Join Waitlist"}
          </button>
        </div>
      </form>

      {/* Alert Modal */}
      {!showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <GiCancel />
            <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 w-[60%] m-auto mb-3 rounded-full shadow-lg">
              <FaCanadianMapleLeaf className="text-red-500 text-xl" />
              <span className="text-sm font-medium tracking-wide regular-Cabinet">
                Learning Made Free
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 regular-Cabinet">
              Welcome aboard, You&apos;re on the list! 🎉
            </h2>
            <p className="text-gray-600 mb-6 regular">
              You&apos;ll be the first to know when we launch, We&apos;ll keep you posted
              with early access updates.
            </p>
            <div className="">
              <p className="text-black text-center regular mb-3">
                Tell your friends about us
              </p>
              <div className="flex space-x-4 w-[100%]">
                <Link
                  href={"https://api.whatsapp.com/intent/text=Come and join us"}
                  target="_blank"
                  className="px-4 bg-blue-500 text-white rounded-lg regular-Cabinet w-[50%] justify-center py-2 text-center regular-Cabinet hover:bg-blue-600 inline-flex items-center space-x-2 "
                >
                  <FaWhatsapp />
                  Whatsapp
                </Link>
                <Link
                  href={
                    "https://twitter.com/intent/tweet?text=Come and join us"
                  }
                  target="_blank"
                  className="px-4 bg-blue-500 text-white rounded-lg w-[50%] py-2 justify-center regular-Cabinet hover:bg-blue-600 inline-flex items-center space-x-2"
                >
                  <FaXTwitter />
                  Twitter
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

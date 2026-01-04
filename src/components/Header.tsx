"use client";

import Link from "next/link";
import {useSession, signOut} from "next-auth/react";
import {Home, User} from "lucide-react";
import toast from "react-hot-toast";
export default function Header() {
  const {data: session} = useSession();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
    } catch {
      toast.error("Failed to sign out");
    }
  };

  return (
    <header className='flex justify-around items-center p-4'>
      <Link href='/'>
        <Home className='w-8 h-8 text-orange-500' />
      </Link>
      {session?.user ? (
        <div className='flex items-center gap-4'>
          <Link href='/profile'>
            <User className='w-8 h-8' />
          </Link>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      ) : (
        <div className='flex items-center gap-4'>
          <Link href='/login'>
            <button className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded '>
              Login
            </button>
          </Link>
          <Link href='/register'>
            <button className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded '>
              Register
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}

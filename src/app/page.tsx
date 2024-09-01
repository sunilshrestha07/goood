import Link from "next/link";
import React from "react";

export default function page() {
   return (
      <>
         <div className=" flex justify-center items-center h-screen">
            <Link href="/communitypost">
               <button className="bg-blue-500 px-16 py-3 rounded-xl text-black">
                  Make post
               </button>
            </Link>
         </div>
      </>
   );
}

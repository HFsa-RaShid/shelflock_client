// "use client";

// import React, { useState } from "react";

// export default function CenteredLoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Submitted Data:", { email, password, rememberMe });
//   };

//   return (
//     // 🎯 Dead-center layout on both axes with full screen height
//     <div className="flex min-h-screen items-center justify-center bg-[#FAFAFB] px-4 py-12">
      
//       {/* 📦 Compact Box Card (NOT full width, max-w-[420px] for perfect card sizing) */}
//       <div className="w-full max-w-[420px] rounded-2xl bg-white p-8 shadow-[0_12px_40px_rgba(14,32,56,0.03)] border border-slate-100 transition-all duration-300 hover:shadow-[0_12px_50px_rgba(14,32,56,0.06)]">
        
//         {/* 🏷️ Header */}
//         <div className="mb-8 text-center">
//           <div className="adsfixter-primary inline-flex h-12 w-12 items-center justify-center rounded-xl text-white font-bold text-xl tracking-wider mb-4 shadow-md shadow-[#f74608]/10">
//             SL
//           </div>
//           <h2 className="title-bold primary-text">Sign in to Admin</h2>
//           <p className="body-sm-regular subtext mt-1">
//             Enter your payrabd admin credentials below.
//           </p>
//         </div>

//         {/* 📝 Form Structure */}
//         <form onSubmit={handleSubmit} className="space-y-5">
          
//           {/* ✉️ Email Input */}
//           <div className="space-y-2 text-left">
//             <label className="block body-sm-medium primary-text">
//               Email Address
//             </label>
//             <input
//               type="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="admin@payrabd.com"
//               className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/40 body-sm-regular text-[#0e2038] placeholder-slate-400 focus:outline-none focus:border-[#f74608] focus:bg-white transition-all duration-200"
//             />
//           </div>

//           {/* 🔒 Password Input */}
//           <div className="space-y-2 text-left">
//             <div className="flex items-center justify-between">
//               <label className="block body-sm-medium primary-text">
//                 Password
//               </label>
//               <a href="#" className="body-sm-s adsfixter-primary-text hover:underline transition-colors">
//                 Forgot password?
//               </a>
//             </div>
//             <input
//               type="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="••••••••"
//               className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/40 body-sm-regular text-[#0e2038] placeholder-slate-400 focus:outline-none focus:border-[#f74608] focus:bg-white transition-all duration-200"
//             />
//           </div>

//           {/* 🔘 Remember Me Checkbox */}
//           <div className="flex items-center pt-1 text-left">
//             <input
//               id="remember-me"
//               type="checkbox"
//               checked={rememberMe}
//               onChange={(e) => setRememberMe(e.target.checked)}
//               className="h-4 w-4 rounded border-slate-300 accent-[#f74608] cursor-pointer focus:ring-[#f74608]"
//             />
//             <label htmlFor="remember-me" className="ml-2 block body-sm-regular subtext select-none cursor-pointer">
//               Remember me for 30 days
//             </label>
//           </div>

//           {/* 🚀 Action Button */}
//           <button
//             type="submit"
//             className="adsfixter-primary w-full h-12 text-white rounded-xl font-medium transition-all duration-200 hover:opacity-95 active:scale-[0.99] shadow-md shadow-[#f74608]/10 flex items-center justify-center body-medium cursor-pointer"
//           >
//             Sign In to Dashboard
//           </button>
//         </form>

//         {/* 🛡️ Footer Notice */}
//         <div className="mt-8 pt-5 border-t border-slate-100 text-center">
//           <p className="body-sm-s subtext">
//             Secured environment. © 2026 ShelfLock.
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// }



"use client";

import React, { useState } from "react";
import { useMerchantLogin } from "../../hooks/useAuth"; // Adjust the import path based on your setup

export default function CenteredLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Initialize your TanStack Query mutation hook
  const { mutate: loginMerchant, isPending } = useMerchantLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Trigger the backend API call via TanStack Query mutation
    loginMerchant({ email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAFB] px-4 py-12 sm:px-6 lg:px-8">
      
      {/* 📦 Compact Box Card */}
      <div className="w-full max-w-[420px] rounded-2xl bg-white p-8 md:p-10 shadow-[0_12px_40px_rgba(14,32,56,0.03)] border border-slate-100 transition-all duration-300 hover:shadow-[0_12px_50px_rgba(14,32,56,0.06)]">
        
        {/* 🏷️ Header */}
        <div className="mb-10 text-center">
          <div className="adsfixter-primary inline-flex h-12 w-12 items-center justify-center rounded-xl text-white font-bold text-xl tracking-wider mb-4 shadow-md shadow-[#f74608]/10">
            SL
          </div>
          <h2 className="title-bold primary-text">Sign in to Admin</h2>
          <p className="body-sm-regular subtext mt-2">
            Enter your payrabd admin credentials below.
          </p>
        </div>

        {/* 📝 Form Structure */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* ✉️ Email Input */}
          <div className="space-y-2 text-left">
            <label className="block body-sm-medium primary-text">
              Email Address
            </label>
            <input
              type="email"
              required
              disabled={isPending}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@payrabd.com"
              className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/40 body-sm-regular text-[#0e2038] placeholder-slate-400 focus:outline-none focus:border-[#f74608] focus:bg-white transition-all duration-200 disabled:opacity-50"
            />
          </div>

          {/* 🔒 Password Input */}
          <div className="space-y-2 text-left">
            <div className="flex items-center justify-between">
              <label className="block body-sm-medium primary-text">
                Password
              </label>
              <a href="#" className="body-sm-s adsfixter-primary-text hover:underline transition-colors">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              required
              disabled={isPending}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50/40 body-sm-regular text-[#0e2038] placeholder-slate-400 focus:outline-none focus:border-[#f74608] focus:bg-white transition-all duration-200 disabled:opacity-50"
            />
          </div>

          {/* 🔘 Remember Me Checkbox */}
          <div className="flex items-center pt-1 text-left">
            <input
              id="remember-me"
              type="checkbox"
              disabled={isPending}
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 accent-[#f74608] cursor-pointer focus:ring-[#f74608] disabled:opacity-50"
            />
            <label htmlFor="remember-me" className="ml-2 block body-sm-regular subtext select-none cursor-pointer">
              Remember me for 30 days
            </label>
          </div>

          {/* 🚀 Action Button */}
          <button
            type="submit"
            disabled={isPending}
            className="adsfixter-primary w-full h-12 text-white rounded-xl font-medium transition-all duration-200 hover:opacity-95 active:scale-[0.99] shadow-md shadow-[#f74608]/10 flex items-center justify-center body-medium cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? "Signing In..." : "Sign In to Dashboard"}
          </button>
        </form>

        {/* 🛡️ Footer Notice */}
        <div className="mt-10 pt-5 border-t border-slate-100 text-center">
          <p className="body-sm-s subtext">
            Secured environment. © 2026 ShelfLock.
          </p>
        </div>

      </div>
    </div>
  );
}
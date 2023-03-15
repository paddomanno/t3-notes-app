import { signIn, useSession } from "next-auth/react";
import React from "react";

export default function Header() {
  const { data: sessionData } = useSession();
  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="flex-1 justify-between pl-5">
        <h1 className="text-3xl font-bold">My Notes</h1>
        <div className="flex-none gap-2">
          <div className="dropdown-end dropdown">
            {sessionData?.user ? (
              <div className="flex flex-row items-center gap-3">
                <p>
                  {sessionData?.user?.name
                    ? `Welcome ${sessionData.user.name}`
                    : ""}
                </p>
                <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
                  <div className="w-10 rounded-full">
                    {
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={sessionData?.user?.image ?? ""}
                        alt={sessionData?.user?.name ?? ""}
                      />
                    }
                  </div>
                </label>
              </div>
            ) : (
              <button
                className="btn-ghost rounded-btn btn"
                onClick={() => void signIn()}
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

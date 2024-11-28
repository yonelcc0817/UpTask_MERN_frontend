import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto mt-5 md:mt-20 p-5 md:felx md:justify-center">
        <div className="md:w-2/3 lg:w-2/5 mx-auto">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AuthLayout;

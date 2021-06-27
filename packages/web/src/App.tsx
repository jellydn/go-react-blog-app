import React from "react";
import { Provider, useAtom } from "jotai";
import { Router, Link } from "@reach/router";

import { tokenAtom } from "./store";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const [token] = useAtom(tokenAtom);
  return (
    // @ts-expect-error Type '[PrimitiveAtom<string>][]' is not assignable to type 'Iterable<readonly [Atom<unknown>, unknown]>'.
    <Provider initialValues={[[tokenAtom]]}>
      <header className="text-gray-600 body-font">
        <div className="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
          <nav className="flex flex-wrap items-center text-base lg:w-2/5 md:ml-auto">
            <Link className="mr-5 hover:text-gray-900" to="/">
              Home
            </Link>
          </nav>
          <Link
            to="/"
            className="flex items-center order-first mb-4 font-medium text-gray-900 lg:order-none lg:w-1/5 title-font lg:items-center lg:justify-center md:mb-0"
          >
            <img
              src="/logo.png"
              alt="logo"
              className="w-10 h-10 p-2 text-white bg-blue-500 rounded-full"
            />
          </Link>
          <div className="inline-flex ml-5 lg:w-2/5 lg:justify-end lg:ml-0">
            {!token ? (
              <Link className="mr-5 hover:text-gray-900" to="login">
                Login
              </Link>
            ) : (
              <Link className="mr-5 hover:text-gray-900" to="post/new">
                <button
                  type="button"
                  className="flex-shrink-0 px-8 py-2 mt-10 text-lg text-white bg-blue-500 border-0 rounded focus:outline-none hover:bg-blue-600 sm:mt-0"
                >
                  New post
                </button>
              </Link>
            )}
          </div>
        </div>
      </header>
      <nav />
      <Router>
        <Home path="/" />
        {!token && <Login path="login" />}
      </Router>
    </Provider>
  );
}

export default App;

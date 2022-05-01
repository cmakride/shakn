import { useState } from 'react'
import { NavLink } from "react-router-dom";

const NavBar = ({ user, handleLogout }) => {

  const [isNavOpen, setIsNavOpen] = useState(false)

  return (
    <>

      {user ? (
        <div id="navbar" className="flex items-center justify-between border-b p-5 border-gray-400 py-8 bg-white shadow w-full">
          <nav>
            <section className="MOBILE-MENU flex lg:hidden">
              <div className="HAMBURGER-ICON space-y-2" onClick={() => setIsNavOpen((prev) => !prev)}>

                <div className='ml-4 flex flex-col gap-1 justify-center content-center'>
                  <ion-icon size="large" name="wine-outline" ></ion-icon>

                  <span className="block h-1 w-8 animate-pulse bg-gray-600"></span>
                  <span className="block h-1 w-8 animate-pulse bg-gray-600"></span>
                  <span className="block h-1 w-8 animate-pulse bg-gray-600"></span>
                </div>

              </div>

              <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
                <div
                  className="absolute top-0 right-0 px-8 py-8" onClick={() => setIsNavOpen(false)}
                >
                  <svg
                    className="h-8 w-8 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>

                <ul className="flex flex-col items-center justify-between min-h-[250px]">
                  <li className="border-b border-gray-400 my-8 uppercase">
                    <NavLink
                      onClick={() => setIsNavOpen(false)}
                      to="/add"
                      className="text-xl hover:text-orange-600 duration-300 "
                    >
                      Add Cocktail
                    </NavLink>
                  </li>
                  <li className="border-b border-gray-400 my-8 uppercase">
                    <NavLink
                      onClick={() => setIsNavOpen(false)}
                      to="/cocktails"
                      className="text-xl hover:text-orange-600 duration-300"
                    >
                      View Cocktails
                    </NavLink>
                  </li>
                  <li className="border-b border-gray-400 my-8 uppercase">
                    <NavLink
                      onClick={() => setIsNavOpen(false)}
                      to="/profiles"
                      className="text-xl hover:text-orange-600 duration-300"
                    >
                      Community
                    </NavLink>
                  </li>
                  <li className="border-b border-gray-400 my-8 uppercase">
                    <NavLink
                      onClick={() => setIsNavOpen(false)}
                      to="/favorites"
                      className="text-xl hover:text-orange-600 duration-300"
                    >
                      My Collection
                    </NavLink>
                  </li>
                  <li className="border-b border-gray-400 my-8 uppercase">
                    <NavLink
                      onClick={() => setIsNavOpen(false)}
                      to="/changePassword"
                      className="text-xl hover:text-orange-600 duration-300"
                    >
                      Change Password
                    </NavLink>
                  </li>
                  <li className="border-b border-gray-400 my-8 uppercase">
                    <NavLink
                      to=""
                      onClick={handleLogout}
                      className="text-xl hover:text-orange-600 duration-300"
                    >
                      LOG OUT
                    </NavLink>
                  </li>
                </ul>
              </div>
            </section>

            <ul className="DESKTOP-MENU hidden space-x-8 lg:flex items-center justify-center">

              <div className="flex flex-col items-center">
                <ion-icon size="large" name="wine-outline"></ion-icon>
                <NavLink className="font-cocktail-name" to='/'>Shakn</NavLink>
              </div>

              <li className="border-b border-gray-400 my-8 uppercase">

                <NavLink
                  to="/add"
                  className="text-xl hover:text-orange-600 duration-300"
                >
                  Add Cocktail
                </NavLink>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <NavLink
                  to="/cocktails"
                  className="text-xl hover:text-orange-600 duration-300"
                >
                  View Cocktails
                </NavLink>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <NavLink
                  to="/profiles"
                  className="text-xl hover:text-orange-600 duration-300"
                >
                  Community
                </NavLink>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <NavLink
                  to="/favorites"
                  className="text-xl hover:text-orange-600 duration-300"
                >
                  My Collection
                </NavLink>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <NavLink
                  to="/changePassword"
                  className="text-xl hover:text-orange-600 duration-300"
                >
                  Change Password
                </NavLink>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <NavLink
                  to=""
                  onClick={handleLogout}
                  className="text-xl hover:text-orange-600 duration-300"
                >
                  LOG OUT
                </NavLink>
              </li>
            </ul>
          </nav>
          <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
        </div>


      ) : (

        <div className="flex items-center justify-between border-b border-gray-400 py-8 bg-white shadow">
          <nav>
            <section className="MOBILE-MENU flex lg:hidden flex-col gap-2 ml-4">
              <div lassName="HAMBURGER-ICON space-y-2" onClick={() => setIsNavOpen((prev) => !prev)}>


                <div className='ml-4 flex flex-col gap-1 justify-center content-center'>
                  <ion-icon size="large" name="wine-outline" ></ion-icon>

                  <span className="block h-1 w-8 animate-pulse bg-gray-600"></span>
                  <span className="block h-1 w-8 animate-pulse bg-gray-600"></span>
                  <span className="block h-1 w-8 animate-pulse bg-gray-600"></span>
                </div>

              </div>

              <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
                <div
                  className="absolute top-0 right-0 px-8 py-8" onClick={() => setIsNavOpen(false)}
                >
                  <svg
                    className="h-8 w-8 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>



                <ul className="flex flex-col items-center justify-between min-h-[250px]">
                  <li className="border-b border-gray-400 my-8 uppercase">
                    <NavLink
                      to="/cocktails"
                      className="text-xl hover:text-orange-600 duration-300"
                    >
                      View Cocktails
                    </NavLink>
                  </li>
                  <li className="border-b border-gray-400 my-8 uppercase">
                    <NavLink
                      onClick={() => setIsNavOpen(false)}
                      to="/login"
                      className="text-xl hover:text-orange-600 duration-300">Log In</NavLink>
                  </li>
                  <li className="border-b border-gray-400 my-8 uppercase">
                    <NavLink
                      onClick={() => setIsNavOpen(false)} to="/signup" className="text-xl hover:text-orange-600 duration-300">Sign Up</NavLink>
                  </li>
                  <li className="border-b border-gray-400 my-8 uppercase">
                    <NavLink
                      onClick={() => setIsNavOpen(false)}
                      to="/profiles"
                      className="text-xl hover:text-orange-600 duration-300"
                    >
                      Community
                    </NavLink>
                  </li>
                </ul>
              </div>
            </section>

            <ul className="DESKTOP-MENU hidden space-x-8 lg:flex items-center justify-center">

              <div className="flex flex-col items-center">
                <ion-icon size="large" name="wine-outline"></ion-icon>
                <NavLink className="font-cocktail-name" to='/'>Shakn</NavLink>
              </div>

              <li className="border-b border-gray-400 my-8 uppercase">
                <NavLink
                  to="/cocktails"
                  className="text-xl hover:text-orange-600 duration-300"
                >
                  View Cocktails
                </NavLink>
              </li>

              <li className="border-b border-gray-400 my-8 uppercase">
                <NavLink
                  to="/login" className="text-xl hover:text-orange-600 duration-300">Log In</NavLink>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <NavLink
                  to="/signup" className="text-xl hover:text-orange-600 duration-300">Sign Up</NavLink>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <NavLink
                  to="/profiles"
                  className="text-xl hover:text-orange-600 duration-300"
                >
                  Community
                </NavLink>
              </li>
            </ul>
          </nav>
          <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
        </div>
      )}
    </>
  );
};

export default NavBar;
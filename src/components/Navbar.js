import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import { BsCart } from "react-icons/bs";
import { FaRegCircle } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { NavLink } from "react-router-dom";
import { MedicineContext } from './MedicineContext.js'
import { useDispatch, useSelector } from "react-redux";
import { logoutuser } from "../redux/actions/loginactions";

function Navbar() {
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const { cartItems } = useContext(MedicineContext)
  const getNumOfItems = () => {
    let count = 0
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        count++;
      }
    }
    return count
  }

  const isLoggedIn = useSelector(state => state.users.isLoggedIn)
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
          <div className="navbar-container container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              <FaRegCircle className="navbar-icon" />
              e-CommerceApp
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>

            {isLoggedIn ?
              <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-item">
                  <NavLink
                    to="/home"
                    className={({ isActive }) =>
                      "nav-links" + (isActive ? " activated" : "")
                    }
                    onClick={closeMobileMenu}
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/employees"
                    className={({ isActive }) =>
                      "nav-links" + (isActive ? " activated" : "")
                    }
                    onClick={closeMobileMenu}
                  >
                    Employees
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/medicines"
                    className={({ isActive }) =>
                      "nav-links" + (isActive ? " activated" : "")
                    }
                    onClick={closeMobileMenu}
                  >
                    Medicines
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                      "nav-links" + (isActive ? " activated" : "")
                    }
                    onClick={closeMobileMenu}
                  >
                    Cart
                    <BsCart size={32} /> {getNumOfItems()}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      "nav-links" + (isActive ? " activated" : "")
                    }
                    onClick={() => {dispatch(logoutuser())}}
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
              :
              <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      "nav-links" + (isActive ? " activated" : "")
                    }
                    onClick={closeMobileMenu}
                  >
                    Login
                  </NavLink>
                </li>
              </ul>}

          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
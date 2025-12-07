import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useCart } from "../../context/CartContext/useCart";
import { SmallCart } from "../SmallCart";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../../utils/types";

export const MyNavbar: FC = () => {
  const navigate = useNavigate();
  const imageUrl = "https://res.cloudinary.com/duzxokowe/image/upload/v1764603775/my-app-photos/cftpvqyw31vphn3x8uck.jpg";
  const { cartProducts } = useCart();
  const [hoverCart, setHoverCart] = useState(false);
  let navIcons = [];
  const token = localStorage.getItem('access_token');
  const decoded = token ? jwtDecode<DecodedToken>(token) : null;

  if(decoded?.isAdmin === true) {
      navIcons = [
    { icon: "cart2", route: "/checkout", hasPopup: true },
    { icon: "house", route: "/home", hasPopup: false },
    { icon: "person", route: "/admin", hasPopup: false }
  ];
  } else {
   navIcons = [
    { icon: "cart2", route: "/checkout", hasPopup: true },
    { icon: "house", route: "/home", hasPopup: false },
    { icon: "person", route: "/profile", hasPopup: false }
  ];
  }

  const handleClick = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('access_token');
    navigate('/');
  }

  return (
    <>
      <Navbar bg="light" expand="md" className="py-0">
        <div className="container-fluid d-flex align-items-center">
          <div className="d-flex flex-row align-items-center">
            <p style={{marginLeft: "12px"}}><a className="link-opacity-100" onClick={handleClick} href="#">Sign out</a></p>
            {navIcons.map(({ icon, route, hasPopup }) =>
              hasPopup ? (
                <div
                  key={icon}
                  className="position-relative"
                  onMouseEnter={() => setHoverCart(true)}
                  onMouseLeave={() => setHoverCart(false)}
                  onClick={() => navigate(route)}
                  style={{ marginLeft: "12px", display: "inline-block", cursor: "pointer" }}
                >
                  <i className="bi bi-cart2" style={{ fontSize: "24px" }} />

                  <span
                    className="badge rounded-circle bg-danger"
                    style={{
                      width: "15px",
                      height: "15px",
                      fontSize: "10px",
                      position: "absolute",
                      bottom: "0px",
                      right: "0px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {cartProducts?.length || 0}
                  </span>

                  {hoverCart && (
                    <div
                      className="position-absolute bg-light border rounded p-2"
                      style={{ top: "30px", left: "-50px", minWidth: "150px", zIndex: 10 }}
                    >
                      {cartProducts && cartProducts.length > 0 ? (
                        <div className="position-absolute bg-light border rounded p-2 shadow"
                          style={{
                            transform: "translateX(-20%)",
                            minWidth: "180px",
                            zIndex: 10,
                            maxWidth: "90vw"
                          }}>
                          <SmallCart productProps={cartProducts} />
                        </div>
                      ) : (
                        <div className="position-absolute bg-light border rounded p-2 shadow"
                          style={{
                            transform: "translateX(-20%)",
                            minWidth: "180px",
                            zIndex: 10,
                            maxWidth: "90vw"
                          }}>Your cart is empty</div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <i
                  key={icon}
                  className={`bi bi-${icon} position-relative`}
                  onClick={() => navigate(route)}
                  style={{
                    fontSize: "24px",
                    marginLeft: "12px",
                    color: "#1E3D5A",
                    cursor: "pointer",
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#F39C42")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#1E3D5A")}
                ></i>
              )
            )}

            <form className="d-flex ms-4">
              <button
                className="btn btn-outline-secondary btn-sm"
                type="submit"
                style={{ borderColor: "#F39C42", color: "#1E3D5A" }}
              >
                <i className="bi bi-search"></i>
              </button>
              <Form.Control
                size="sm"
                type="text"
                style={{ textAlign: "left", borderColor: "#F39C42" }}
                placeholder="Search"
                className="me-4"
              />
            </form>
          </div>

          <ul className="navbar-nav ms-auto d-flex flex-row align-items-center gap-4">
            <div className="ml-4">
              <Navbar.Text
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  transition: "color 0.3s"
                }}
              >
                <span style={{ color: "#F39C42", cursor: "default" }}>
                  Hello{" "}
                </span>

                <a href="#login"
                  style={{
                    color: "#1E3D5A",
                    textDecoration: "none",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#F39C42")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#1E3D5A")}
                  onClick={() => navigate('/profile')}
                >
                  {localStorage.getItem('username')}
                </a>
              </Navbar.Text>
            </div>
            <img
              src={imageUrl}
              alt="logo"
              width="160"
              height="40"
            />
          </ul>
        </div>
      </Navbar>
    </>
  );
};
import { FC } from "react";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useUser } from "../../context/userContext/useUser";

export const MyNavbar: FC = () => {
  const { username } = useUser();
  const imageUrl = "https://res.cloudinary.com/duzxokowe/image/upload/v1764603775/my-app-photos/cftpvqyw31vphn3x8uck.jpg";

  return (
    <>
      <Navbar
        bg="light"
        expand="md"
        className="py-0"
      >
        <div className="container-fluid d-flex align-items-center">

          <div className="d-flex flex-row align-items-center">
            {["cart2", "house", "person"].map((icon) => (
              <i
                key={icon}
                className={`bi bi-${icon}`}
                style={{
                  fontSize: "18px",
                  marginLeft: "12px",
                  color: "#1E3D5A",
                  cursor: "pointer",
                  transition: "color 0.3s"
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#F39C42")}
                onMouseLeave={e => (e.currentTarget.style.color = "#1E3D5A")}
              ></i>
            ))}

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
                <span
                  style={{ color: "#F39C42", cursor: "default" }}
                >
                  Hello{" "}
                </span>
                <a
                  href="#login"
                  style={{
                    color: "#1E3D5A",
                    textDecoration: "none",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#F39C42")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#1E3D5A")}
                >
                  {username}
                </a>
              </Navbar.Text>
            </div>
            <img
              src= {imageUrl}
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

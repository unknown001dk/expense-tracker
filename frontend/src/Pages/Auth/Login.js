import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginAPI } from "../../utils/ApiRequest";
import "./LoginPage.css";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ email: "", password: "" });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = values;
    setLoading(true);

    const { data } = await axios.post(loginAPI, { email, password });

    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
      toast.success(data.message, toastOptions);
    } else {
      toast.error(data.message, toastOptions);
    }

    setLoading(false);
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="login-page">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "#1a1a1a" } },
          fpsLimit: 60,
          particles: {
            number: { value: 100, density: { enable: true, value_area: 800 } },
            color: { value: "#FFD700" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            move: { enable: true, speed: 2 },
          },
        }}
      />
      <Container className="login-container">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <div className="login-box">
              <h1 className="text-center icon-header">
                <AccountBalanceWalletIcon sx={{ fontSize: 50 }} />
              </h1>
              <h2 className="text-center text-light mb-4">Login</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label className="text-light">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label className="text-light">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                </Form.Group>
                <div className="text-center">
                  <Link to="/forgotPassword" className="forgot-link">
                    Forgot Password?
                  </Link>
                </div>
                <Button
                  type="submit"
                  className="w-100 mt-3 login-btn"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Login"}
                </Button>
                <p className="text-center mt-3 text-light">
                  Don’t have an account?{" "}
                  <Link to="/register" className="register-link">
                    Register
                  </Link>
                </p>
              </Form>
            </div>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default Login;

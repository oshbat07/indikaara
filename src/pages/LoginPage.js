import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import loginBackground from "../assets/hero-vintage-1.png";
import { Button, Divider } from "@mui/material";
import Backdrop from "../components/Backdrop";

const GOOGLE_PROFILE_CLEAR_DELAY = 2000;

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [googleUserProfile, setGoogleUserProfile] = useState(null);
  const { login, register, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleSuccess = useCallback(
    async (response) => {
      setLoading(true);
      setError("");

      try {
        const googleUser = jwtDecode(response.credential);
        const userProfile = {
          googleId: googleUser.sub,
          userName: googleUser.name,
          email: googleUser.email,
          picture: googleUser.picture,
          emailVerified: googleUser.email_verified,
        };
        setGoogleUserProfile(userProfile);

        const result = await googleLogin(response.credential, userProfile);
        if (result.success) {
          setTimeout(
            () => setGoogleUserProfile(null),
            GOOGLE_PROFILE_CLEAR_DELAY,
          );
          // Check for redirect path after login
          const redirectPath = localStorage.getItem("redirect_after_login");
          if (redirectPath) {
            localStorage.removeItem("redirect_after_login");
            navigate(redirectPath);
          } else {
            navigate("/dashboard");
          }
        } else {
          setError(result.error);
        }
      } catch (decodeError) {
        console.error("Error decoding Google JWT:", decodeError);
        setError("Failed to process Google authentication data");
      } finally {
        setLoading(false);
      }
    },
    [googleLogin, navigate],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const result = isLogin
      ? await login(email, password)
      : await register(userName, email, password);

    if (result.success) {
      // Check for redirect path after login
      const redirectPath = localStorage.getItem("redirect_after_login");
      if (redirectPath) {
        localStorage.removeItem("redirect_after_login");
        navigate(redirectPath);
      } else {
        navigate("/dashboard");
      }
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (location.pathname === "/register") {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }

    if (window.google && process.env.REACT_APP_GOOGLE_CLIENT_ID) {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogleSuccess,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        {
          theme: "outline",
          size: "large",
          text: "signin_with",
          shape: "rectangular",
        },
      );
    }
  }, [location.pathname, handleGoogleSuccess]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-inter">
      {/* Left Section - Image */}
      <div className="w-full md:w-1/2">
        <img
          src={loginBackground}
          alt="Craft Background"
          className="w-full h-[250px] md:h-screen object-cover"
        />
      </div>

      {/* Right Section - Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white px-6 md:px-12 py-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-8">
            {isLogin ? "Welcome Back" : "Register Here"}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-gray-700 text-sm mb-2">Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ac1f23]"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-gray-700 text-sm mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ac1f23]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ac1f23]"
                required
              />
              {!isLogin && (
                <div className="mt-5">
                  <label className="block text-gray-700 text-sm mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ac1f23]"
                    required
                  />
                </div>
              )}
              {isLogin && (
                <div className="flex justify-between items-center mt-2">
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="mr-2 accent-[#ac1f23]"
                    />
                    Remember me
                  </label>
                  {/* <a
                    href="#"
                    className="text-sm text-orange-600 hover:underline"
                  >
                    Forgot Password?
                  </a> */}
                </div>
              )}
            </div>

            {error && (
              <div className="text-red-500 text-sm font-medium">{error}</div>
            )}

            <button
              type="submit"
              className="w-full bg-[#ac1f23] hover:bg-orange-700 text-white font-semibold py-3 rounded-xl transition duration-200"
              disabled={loading}
            >
              {loading ? "Loading..." : isLogin ? "Log In" : "Register"}
            </button>
          </form>

          <div className="flex items-center my-8">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">Or continue with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div
            id="google-signin-button"
            className="flex justify-center mb-4"
          ></div>

          <p className="text-center text-sm text-gray-700">
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(false);
                    setEmail("");
                    setPassword("");
                    setError("");
                  }}
                  className="text-[#ac1f23] font-semibold hover:underline"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(true);
                    setEmail("");
                    setPassword("");
                    setError("");
                  }}
                  className="text-[#ac1f23] font-semibold hover:underline"
                >
                  Log In
                </button>
              </>
            )}
          </p>
        </div>
      </div>

      {loading && <Backdrop loading={loading} />}
    </div>
  );
};

export default LoginPage;

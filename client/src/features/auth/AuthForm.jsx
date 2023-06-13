import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "./authSlice";

/**
 * AuthForm allows a user to either login or register for an account.
 */
function AuthForm({ isLogin }) {
  const navigate = useNavigate();

  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const authType = isLogin ? "Login" : "Register";

  /**
   * Send the credentials to the server for authentication
   */
  async function attemptAuth(event) {
    event.preventDefault();

    setError(null);

    const authMethod = isLogin ? login : register;
    const username = event.target.username.value;
    const password = event.target.password.value;
    const credentials = { username, password };

    try {
      setLoading(true);
      await authMethod(credentials).unwrap();
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.data);
    }
  }

  return (
    <main>
      <h1>{authType}</h1>
      <form onSubmit={attemptAuth} name={authType}>
        <label>
          Username
          <input type="text" name="username" />
        </label>
        <label>
          Password
          <input type="password" name="password" />
        </label>
        <button type="submit">{authType}</button>
      </form>
      {loading && <p>Logging in...</p>}
      {error && <p>{error}</p>}
    </main>
  );
}

export default AuthForm;

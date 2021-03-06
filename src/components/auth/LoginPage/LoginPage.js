import React from "react";
import LoginForm from "./LoginForm";
import { login } from "../../../api/auth";

import "./LoginPage.css";

import AuthContext from "../context";

function LoginPage({ history, location }) {
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const { isLogged, onLogin } = React.useContext(AuthContext);


  const resetError = () => setError(null);

    React.useEffect(() => {
    if (isLogged) {
      // onLogin();
      setIsLoading(false);
 
      const { from } = location.state || { from: { pathname: "/" } };
      history.replace(from);
    }
  }, [isLogged, isLoading, location, history]);

  const handleSubmit = async (credentials, saveSession) => {

    resetError();
    setIsLoading(true);

    try {
      await login(credentials, saveSession);
      onLogin();
    } catch (error) {
      setIsLoading(false);

      setError(error);
    } finally {
      // setIsLoading(false);
    }
  };
  return (
    <div className="loginPage">
      <h1 className="loginPage-title">Accede a Nodepop</h1>
      {error && (
        <div onClick={resetError} className="loginPage-error">
          {error.message}
        </div>
      )}
      <LoginForm isLoading={isLoading} onSubmit={handleSubmit} />
    </div>
  );
}

export default LoginPage;

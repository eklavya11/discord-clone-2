import { FC, FormEvent, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../lib/actions/auth";
import State from "../../interfaces/State";
import "./auth.styles.scss";
import Loader from "../../components/loader";
import ErrorMessage from "../../components/error-message";

interface Props {
  error: string | null;
  loading: boolean;
  login: (data: unknown) => void;
}

const LoginPage: FC<Props> = ({ login, error, loading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    login({ email, password });
  }

  return (
    <div className="auth_container">
      <form onSubmit={onSubmit} className="auth_content">
        <div className="auth_title">
          <h1> Welcome Back!</h1>
          <p>We&apos;re so exited to see you again!</p>
        </div>
        {error ? <ErrorMessage message={error} type="warning" /> : null}
        <div className="form_group">
          <label htmlFor="email">EMAIL</label>
          <input
            type="email"
            className="form_input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
          />
        </div>
        <div className="form_group">
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            className="form_input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
          />
        </div>
        <div className="form_group">
          <button className="btn blue" type="submit">
            {loading ? <Loader /> : "Login"}
          </button>
          <small>
            Need an account? <Link to="/register">Register</Link>
          </small>
        </div>
      </form>
    </div>
  );
};

const mapToProps = (state: State) => ({
  error: state.auth.error,
  loading: state.auth.loading,
});

export default connect(mapToProps, { login })(LoginPage);

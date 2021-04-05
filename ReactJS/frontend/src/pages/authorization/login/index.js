import '../styles/auth.css';
import { Link, Redirect } from 'react-router-dom';
import { useStore } from '../../../store/store';
import { observer } from 'mobx-react';
import { loginFields } from '../constants';
import { FieldsObservable } from '../../../utils/utils';
import FormField from '../../../components/elements/FormField';
import { networkCodes } from '../../../utils/constants';
import { useEffect } from 'react';

export default observer(() => {
  const { user, auth } = useStore();
  const fieldsObs = FieldsObservable(loginFields);
  useEffect(() => (document.title = `Sign In - Webby`), []);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!fieldsObs.validateFields()) {
      const response = await auth.signIn(fieldsObs.getBody());
      if (response.error) {
        fieldsObs.setError(response.error);
      }
    }
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="auth-form-wrapper login">
      <form onSubmit={onSubmit} className="auth-form" autoComplete="new-password">
        {fieldsObs.fields.map((field, i) => (
          <FormField key={`input-wrapper-${i}`} {...{ field, fieldsObs }} />
        ))}
        <button className="auth-btn" type="submit">
          Sign in
        </button>
      </form>
      <div className="auth-error-network-wrap">
        <span className="auth-error-network" style={{ display: fieldsObs.error ? 'block' : 'none' }}>
          {networkCodes[fieldsObs.error]}
        </span>
      </div>
      <div className="auth-info">
        Not a member yet? <Link to="/register">Sign up</Link>
      </div>
    </div>
  );
});

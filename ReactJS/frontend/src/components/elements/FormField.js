import { observer } from 'mobx-react';

export default observer(({ field, fieldsObs }) => {
  const { el, error, errorMsg, highlight, icon, component } = field;
  const [errorClass, setInput] = [error || highlight?.includes(fieldsObs.error) ? 'error' : '', fieldsObs.setInput];
  return (
    <div>
      {icon({ size: 'medium', className: `auth-input-icon ${errorClass}` })}
      <div style={{ display: 'inline-block' }}>
        <div className="auth-error-wrap">
          <span className="auth-error" style={{ display: error ? 'block' : 'none' }}>
            {errorMsg}
          </span>
        </div>
        <div className={`auth-input-wrap ${errorClass}`}>
          {component({ className: `auth-input ${el} ${errorClass}`, ...field, setInput })}
        </div>
      </div>
    </div>
  );
});

const Input = ({ className, value, name, type, placeholder, setInput, autoFocus }) => (
  <input
    autoComplete="new-password"
    className={className}
    name={name}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={(e) => setInput(name, e.target.value)}
    autoFocus={autoFocus || false}
  />
);

export default Input;

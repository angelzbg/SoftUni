const Select = ({ className, value, values, name, placeholder, setInput }) => (
  <select className={className} value={value} onChange={(e) => setInput(name, e.target.value)}>
    <option value="" disabled>
      {placeholder}
    </option>
    {values.map((val, i) => (
      <option key={`${value}-${i}`} value={val}>
        {val}
      </option>
    ))}
  </select>
);

export default Select;

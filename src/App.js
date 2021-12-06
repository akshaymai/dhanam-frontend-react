import { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [data, setData] = useState();
  const [seleceValue, setSelectValue] = useState("");
  const [selecetDate, setSelectDate] = useState("");
  const [result, setResult] = useState([]);
  const [showResult, setShowresult] = useState(false);
  useEffect(() => {
    fetch("https://www.gov.uk/bank-holidays.json")
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      });
  }, []);

  const handleChange = (e) => {
    setSelectValue(e.target.value);
  };

  let arr = [];
  for (let key in data) {
    arr.push({
      key: key,
      value: data[key],
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const filterCounty = arr.filter((item) => item.key === seleceValue);
    const filterDate = filterCounty.map((items) => {
      return items.value.events.filter((item) => {
        return item.date === selecetDate;
      });
    });
    setResult(filterDate);
    setSelectDate("");
    setSelectValue("");
    setShowresult(true);
  };

  return (
    <div className="App">
      <h1>Date filter</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Country
          <select value={seleceValue} onChange={handleChange}>
            <option value="">Selecet Value</option>
            <option value="england-and-wales">england-and-wale</option>
            <option value="scotland">scotland</option>
            <option value="northern-ireland">northern-ireland</option>
          </select>
        </label>
        <br />
        <label>
          Enter Date
          <input
            type="date"
            value={selecetDate}
            min="2015-01-01"
            max="2040-12-31"
            onChange={(e) => setSelectDate(e.target.value)}
          />
          <br />
        </label>
        <button disabled={!selecetDate || !seleceValue} type="submit">
          Submit
        </button>
      </form>
      {showResult &&
        (result[0].length > 0 ? (
          <p style={{ color: "green" }}>Result: {result[0][0].title}</p>
        ) : (
          <p style={{ color: "red" }}>No Data Found</p>
        ))}
    </div>
  );
}

export default App;

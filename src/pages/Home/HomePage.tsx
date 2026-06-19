import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHomeInputs } from "../../hooks/useHomeInputs";
import "./HomePage.css";

const HomePage = () => {
  const { date, idea, isSaving, items, saveData, setDate, setIdea, statusMessage } =
    useHomeInputs();

  return (
    <div className="home app-page">
      <h1>Welcome to My Mapper!</h1>
      <p>Explore the world with our interactive maps and tools.</p>
      <div className="input-container">
        <DatePicker selected={date} onChange={(nextDate: Date | null) => setDate(nextDate ?? new Date())} />
        <input
          id="date-input"
          type="text"
          value={idea}
          onChange={(event) => setIdea(event.target.value)}
          placeholder="Enter the ideas"
        />
        <button
          className="app-button app-button--primary"
          type="button"
          onClick={saveData}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Submit"}
        </button>
      </div>

      {statusMessage ? (
        <p className="home__status" role="status">{statusMessage}</p>
      ) : null}

      <ul className="home__input-list" aria-label="Saved ideas">
        {items.map((item, index) => (
          <li className="home__input-item" key={`${item.date}-${item.input}-${index}`}>
            <time dateTime={item.date}>{item.date ? new Date(item.date).toLocaleDateString() : "No date"}</time>
            <span>{item.input || "No idea entered"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;

import { useState } from "react";
import "./ToolsPage.css";

interface DateEntry {
  id: string;
  content: string;
  date: string;
  colorClass: string;
};

interface DateObject {
  label: string;
  DateEntries: DateEntry[];
}

type DateRangeInput = {
  label?: string;
  startDate: string;
  endDate: string;
};

const ENTRY_COLOR_CLASSES = [
  "tools-entry--violet",
  "tools-entry--green",
  "tools-entry--amber",
  "tools-entry--blue",
  "tools-entry--rose",
];

const createEntryId = (date: string, index = 0) => `${date}-${Date.now()}-${index}`;

const createLocalDate = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const createDateEntries = ({ startDate, endDate, label }: DateRangeInput): DateObject => {
  const entries: DateEntry[] = [];
  const currentDate = createLocalDate(startDate);
  const lastDate = createLocalDate(endDate);
  while (currentDate <= lastDate) {
    const date = formatDate(currentDate);
    entries.push({
      id: createEntryId(date, entries.length),
      content: '',
      date,
      colorClass: ENTRY_COLOR_CLASSES[entries.length % ENTRY_COLOR_CLASSES.length],
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  const entryObject: DateObject = {
    label: label || '',
    DateEntries: entries,
  };
  return entryObject;
};



const ToolsPage = () => {
  const [label, setLabel] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [entries, setEntries] = useState<DateObject>({
    label: "",
    DateEntries: [],
  });
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");


  const resetForm = () => {
    setStartDate("");
    setEndDate("");
    setEditingEntryId(null);
  };
  const saveData = () => {
    const nextEndDate = editingEntryId ? startDate : endDate;

    if (!label.trim() || !startDate || !nextEndDate) {
      setErrorMessage(
        editingEntryId ? "Enter a label and date." : "Enter a label, start date, and end date.",
      );
      setStatusMessage("");
      return;
    }

    if (startDate > nextEndDate) {
      setErrorMessage("Start date must be before or equal to end date.");
      setStatusMessage("");
      return;
    }

    setErrorMessage("");
    const nextEntries = createDateEntries({ startDate, endDate: nextEndDate, label });
    setEntries(nextEntries);
  };



  return (
    <main className="tools app-page">
      <section className="tools__content" aria-labelledby="tools-title">
        <h1 id="tools-title">Tools</h1>

        <div className="tools__form" aria-label={editingEntryId ? "Edit date object" : "Create date objects"}>
          <label className="app-form-field">
            Label
            <input
              type="text"
              value={label}
              onChange={(event) => setLabel(event.target.value)}
              placeholder="Enter a string..."
            />
          </label>

          <label className="app-form-field">
            {editingEntryId ? "Date" : "Start date"}
            <input
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
          </label>

          {!editingEntryId ? (
            <label className="app-form-field">
              End date
              <input
                type="date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </label>
          ) : null}

          <div className="tools__form-actions">
            <button className="app-button app-button--primary" type="button" onClick={saveData}>
              {editingEntryId ? "Update" : "Save"}
            </button>

            {editingEntryId ? (
              <button className="app-button" type="button" onClick={resetForm}>
                Cancel
              </button>
            ) : null}
          </div>
        </div>

        {errorMessage ? (
          <p className="app-alert app-alert--error" role="alert">
            {errorMessage}
          </p>
        ) : null}

        {statusMessage ? (
          <p className="tools__status" role="status">
            {statusMessage}
          </p>
        ) : null}
        <EntryBox entries={entries} />
      </section>
    </main>
  );
};

export default ToolsPage;


const EntryBox = ({ entries }: { entries: DateObject }) => {
  const editEntry = (entryId: string) => {
    const entry = entries.DateEntries.find(({ id }) => id === entryId);
    if (!entry) {
      return;
    }
    // setStartDate(entry.date);
    // setEndDate(entry.date);
    // setEditingEntryId(entry.id);
    // setErrorMessage("");
    // setStatusMessage("Editing object. Save to apply changes.");
  };



  const deleteEntry = (entryId: string) => {
    // setEntries((currentEntries) => currentEntries.filter((entry) => entry.id !== entryId));

    // if (editingEntryId === entryId) {
    //   resetForm();
    // }

    // setErrorMessage("");
    // setStatusMessage("Object deleted.");
  };
  return (
    <div className="tools__entries" aria-label="Saved date objects">
      <div className="tools__entries-header">
        {entries.label ? (
          <h2 className="tools__entries-label">{entries.label}</h2>
        ) : (
          <h2 className="tools__entries-label">No label</h2>
        )}
      </div>
      {entries.DateEntries.map((entry) => (
        <article className={`tools-entry ${entry.colorClass}`} key={entry.id}>
          <div>
            <span>{entry.content}</span>
            <time dateTime={entry.date}>{entry.date}</time>
          </div>

          <div className="tools-entry__actions">
            <button className="app-button" type="button" onClick={() => editEntry(entry.id)}>
              Edit
            </button>
            <button
              className="app-button tools-entry__delete"
              type="button"
              onClick={() => deleteEntry(entry.id)}
            >
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>)
}
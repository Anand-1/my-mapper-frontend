import React from "react";
import {
  appendInputData,
  getInputData,
  type MapperInput,
} from "../services/inputService";

export const useHomeInputs = () => {
  const [date, setDate] = React.useState(new Date());
  const [idea, setIdea] = React.useState("");
  const [items, setItems] = React.useState<MapperInput[]>([]);
  const [statusMessage, setStatusMessage] = React.useState("");
  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    const loadInputData = async () => {
      try {
        setItems(await getInputData());
        setStatusMessage("");
      } catch {
        setStatusMessage("Saved ideas could not be loaded.");
      }
    };

    loadInputData();
  }, []);

  const saveData = async () => {
    const trimmedIdea = idea.trim();

    if (!trimmedIdea) {
      return;
    }

    const data = {
      date: date.toISOString(),
      input: trimmedIdea,
    };

    setIsSaving(true);

    try {
      setItems(await appendInputData(data));
      setIdea("");
      setStatusMessage("Idea saved.");
    } catch {
      setStatusMessage("Idea could not be saved.");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    date,
    idea,
    isSaving,
    items,
    saveData,
    setDate,
    setIdea,
    statusMessage,
  };
};

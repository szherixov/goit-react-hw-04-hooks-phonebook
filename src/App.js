import { useState } from "react";
import { nanoid } from "nanoid";
import useLocalStorage from "./hooks/useLocalStorage";
import ContactForm from "./components/ContactForm";
import Filter from "./components/Filter";
import ContactList from "./components/ContactList";
import "./App.css";

const App = () => {
  const [filter, setFilter] = useState("");
  const [contacts, setContacts] = useLocalStorage("contacts", [
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ]);

  const searchName = (value) => {
    return contacts.find(
      (item) => item.name.toUpperCase() === value.toUpperCase()
    );
  };
  const formSubmitHandler = (data) => {
    const { name } = data;

    if (searchName(name)) {
      alert(`${name} is already in contacts`);
    } else {
      const contact = { ...data, id: nanoid() };
      setContacts((state) => [...state, contact]);
    }
  };

  const changeFilter = (e) => {
    setFilter(e.target.value);
  };
  const getVisibleContacts = () => {
    if (!filter) {
      return contacts;
    }
    return contacts.filter((contacts) =>
      contacts.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const removeContact = (contactId) => {
    setContacts((state) => [
      ...state.filter((contact) => contact.id !== contactId),
    ]);
    setFilter("");
  };

  const visibleContacts = getVisibleContacts();

  return (
    <div className="section">
      <h1 className="title">Phonebook</h1>
      <ContactForm onSubmitContact={formSubmitHandler} />

      <h2 className="title">Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={visibleContacts} onRemoveContact={removeContact} />
    </div>
  );
};

export default App;

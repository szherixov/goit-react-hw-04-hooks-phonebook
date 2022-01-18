import { useState } from 'react';
import styles from './ContactForm.module.css';
import PropTypes from 'prop-types';

const initialState = {
  name: '',
  number: '',
};
const ContactForm = props => {
  const [data, setData] = useState(initialState);

  const onHandleSubmit = e => {
    e.preventDefault();
    props.onSubmitContact(data);
    setData(initialState);
  };
  const onHandleChange = ({ target }) => {
    const { name, value } = target;
    setData({ ...data, [name]: value });
  };

  const { name, number } = data;

  return (
    <form onSubmit={onHandleSubmit} className={styles.form}>
      <label className={styles.label}>
        <span className={styles.message}>Name</span>
        <input
          type="text"
          onChange={onHandleChange}
          name="name"
          value={name}
          className={styles.input}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

      <label className={styles.label}>
        <span className={styles.message}>Number</span>
        <input
          type="tel"
          value={number}
          onChange={onHandleChange}
          name="number"
          className={styles.input}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>

      <button type="submit" className={styles.button}>
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onSubmitContact: PropTypes.func.isRequired,
};
export default ContactForm;

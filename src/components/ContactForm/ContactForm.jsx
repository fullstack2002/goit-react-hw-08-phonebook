import { useState } from "react";
import { addContact } from "redux/contacts/operations";
import { getContacts } from '../../redux/contacts/contactsSlice';
import { useSelector, useDispatch } from 'react-redux'
import { Loader } from "components/Loader/Loader";
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import { PhoneForm, PhoneField, PhoneInput, PhoneButton } from './ContactForm.styled';

export const ContactForm = () => {
   const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        switch (name) {
            case 'contactName':
                setName(value)
                break;
            case 'contactNumber':
                setNumber(value)
                break;
            default:
                setName('')
                setNumber('')
        }
  }
  
  const dispatch = useDispatch();
    const {items, addingLoader} = useSelector(getContacts);

    const contactAlreadyExists = (name, number) => {
        return items.find((item) => item.name.toLocaleLowerCase() === name.toLocaleLowerCase() || item.number === number);
  }
  
    const handleSubmit = (e) => {
        e.preventDefault();

        if (contactAlreadyExists(name, number)) {
            return toast.error(`${name} ${number} is already in Phonebook`)
        }

        dispatch(addContact({name, number}));

        setName('')
        setNumber('')
    }

  const nameId = nanoid();
  const numberId = nanoid();
  
  return (
      <PhoneForm onSubmit={handleSubmit}>
      <PhoneField htmlFor={nameId}>Name</PhoneField>
      <PhoneInput
          id={nameId}
          type="text"
          name="contactName"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          placeholder='Input name'  
          required />
      <PhoneField htmlFor={numberId}>Number</PhoneField>
      <PhoneInput
          id={numberId}
          type="tel"
          name="contactNumber"
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          placeholder='Input name'  
          required />
        {addingLoader ?
            <Loader /> :
            <PhoneButton type='submit'>Add contact</PhoneButton>
        }
    </PhoneForm>
  );
};
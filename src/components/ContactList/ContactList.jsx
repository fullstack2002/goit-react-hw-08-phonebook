import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ContactListItem } from '../ContactListItem/ContactListItem';
import { fetchContacts } from 'redux/contacts/operations';
import { getContacts } from 'redux/contacts/contactsSlice';
import { getFilter } from 'redux/filter/filterSlice';

export const ContactList = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    const { items, error, isLoading } = useSelector(getContacts);
    const filter = useSelector(getFilter);

   const getFilteredContacts = () => {
        if (!filter) {
            return items;
        }
        
        return items.filter(({name}) => name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
    }

    const contactsToRender = getFilteredContacts()
    
    return (
        <ul>
          {isLoading ? <div>Loading...</div> : 
        contactsToRender.map(item =>
            <ContactListItem key={item.id} data={item} />)}
        {error && <div>Something went wrong...</div>}
        </ul>
    );
};

export default ContactList;
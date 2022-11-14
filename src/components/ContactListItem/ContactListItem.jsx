import React from 'react';
import PropTypes from "prop-types";
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contacts/operations';
import { ContactListElement, ContactListButton } from './ContactListItem.styled';

export const ContactListItem = ({ data }) => {
  const dispatch = useDispatch();

  const { id, name, number } = data;

  const onDeleteClick = (e, id) => {
    if (id === e.target.id) {
      e.target.textContent = 'Deleting...';
      e.target.setAttribute('disabled', 'true');
    }

    dispatch(deleteContact(id))
  }
  return <ContactListElement>
        <p>{name}: {number}</p>
            <ContactListButton type='button' id={id} onClick={(e) => onDeleteClick(e, id)}>Delete
            </ContactListButton>
    </ContactListElement>
};

ContactListItem.propTypes = {
    data: PropTypes.objectOf(PropTypes.string.isRequired,),
}
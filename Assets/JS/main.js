import * as api from './api.js';
import * as ui from './ui.js';

let contacts = [];

const form = document.getElementById('contact-form');

window.addEventListener('DOMContentLoaded', async () => {
  try {
    contacts = await api.loadContacts();
    ui.updateContactList(contacts, { onEdit, onDelete });
  } catch (err) {
    console.error('Error loading contacts:', err);
  }
});

form.addEventListener('submit', async e => {
  e.preventDefault();
  const name  = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();

  if (!name || !phone) {
    alert('Please enter both name and phone.');
    return;
  }

  try {
    const result = await api.addContact({ name, phone });
    contacts.push({ name, phone, id: result.id });
    ui.updateContactList(contacts, { onEdit, onDelete });
    form.reset();
  } catch (err) {
    alert('Error adding contact: ' + err.message);
  }
});

function onDelete(index) {
  const contact = contacts[index];
  api.deleteContact(contact.id)
    .then(() => {
      contacts.splice(index, 1);
      ui.updateContactList(contacts, { onEdit, onDelete });
    })
    .catch(err => alert('Error deleting contact: ' + err.message));
}

function onEdit(index) {
  ui.setRowEditing(index, contacts[index], {
    onSave: saveContact,
    onCancel: cancelEdit
  });
}

function saveContact(index) {
  const newName  = document.getElementById(`edit-name-${index}`).value.trim();
  const newPhone = document.getElementById(`edit-phone-${index}`).value.trim();

  if (!newName || !newPhone) {
    alert('Please enter both name and phone.');
    return;
  }

  const contact = contacts[index];
  api.editContact({ id: contact.id, name: newName, phone: newPhone })
    .then(() => {
      contacts[index] = { id: contact.id, name: newName, phone: newPhone };
      ui.updateContactList(contacts, { onEdit, onDelete });
    })
    .catch(err => alert('Error updating contact: ' + err.message));
}

function cancelEdit(index) {
  ui.updateContactList(contacts, { onEdit, onDelete });
}
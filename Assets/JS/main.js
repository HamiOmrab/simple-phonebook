let contacts = [];

const form = document.getElementById('contact-form');
const contactList = document.getElementById('contact-list');

window.addEventListener('DOMContentLoaded', () => {
  fetch('Assets/PHP/load.php')
    .then(res => res.json())
    .then(data => {
      contacts = data;
      updateContactList();
      console.log('Contacts loaded:', contacts);
console.log('Type of contacts:', typeof contacts);
console.log('Is array?', Array.isArray(contacts));

    })
    .catch(err => {
      console.error('Error loading contacts:', err);
    });
});

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name  = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();

  if (name && phone) {
    const contact = { name, phone };
    addContact(contact);
  } else {
    alert('Please enter both name and phone.');
  }
});

function addContact(contact) {
  fetch('Assets/PHP/add_contact.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      contacts.push({ ...contact, id: data.id });
      updateContactList();
      form.reset();
    } else {
      alert('Error adding contact: ' + (data.error || 'Unknown error'));
    }
  })
  .catch(error => {
    console.error('Error adding contact:', error);
    alert('Error adding contact.');
  });
}

function updateContactList() {
  contactList.innerHTML = '';
  contacts.forEach((contact, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${contact.name}</td>
      <td>${contact.phone}</td>
      <td>
        <button onclick="editContact(${index})">Edit</button>
        <button onclick="deleteContact(${index})">Delete</button>
      </td>
    `;
    contactList.appendChild(row);
  });
}

function deleteContact(index) {
  const contact = contacts[index];
  fetch('Assets/PHP/delete_contact.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: contact.id })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      contacts.splice(index, 1);
      updateContactList();
    } else {
      alert('Error deleting contact: ' + (data.error || 'Unknown error'));
    }
  })
  .catch(err => {
    console.error('Error deleting contact:', err);
    alert('Error deleting contact.');
  });
}

function editContact(index) {
  const row = contactList.children[index];
  const contact = contacts[index];

  row.innerHTML = `
    <td><input type="text" id="edit-name-${index}" value="${contact.name}" /></td>
    <td><input type="text" id="edit-phone-${index}" value="${contact.phone}" /></td>
    <td>
      <button onclick="saveContact(${index})">Save</button>
      <button onclick="cancelEdit(${index})">Cancel</button>
    </td>
  `;
}

function saveContact(index) {
  const newName = document.getElementById(`edit-name-${index}`).value.trim();
  const newPhone = document.getElementById(`edit-phone-${index}`).value.trim();
  const contact = contacts[index];

  if (newName && newPhone) {
    fetch('Assets/PHP/edit_contact.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: contact.id,
        name: newName,
        phone: newPhone
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        contacts[index] = { id: contact.id, name: newName, phone: newPhone };
        updateContactList();
      } else {
        alert('Error updating contact: ' + (data.error || 'Unknown error'));
      }
    })
    .catch(err => {
      console.error('Error updating contact:', err);
      alert('Error updating contact.');
    });
  } else {
    alert('Please enter both name and phone.');
  }
}

function cancelEdit(index) {
  updateContactList();
}
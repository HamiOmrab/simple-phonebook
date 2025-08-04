let contacts = [];

window.addEventListener('DOMContentLoaded', () => {
  fetch('Assets/PHP/load.php')
    .then(res => res.json())
    .then(data => {
      contacts = data;
      updateContactList();
    });
});

const form = document.getElementById('contact-form');
const contactList = document.getElementById('contact-list');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name  = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();

  if (name && phone) {
    const contact = { name, phone };
    contacts.push(contact);
    updateContactList();
    saveContacts();
    form.reset();
  }
});

function updateContactList() {
  contactList.innerHTML = '';
  contacts.forEach((contact, index) => {
    const row = document.createElement('tr');

    row.innerHTML = 
    `
      <td>${contact.name}</td>
      <td>${contact.phone}</td>
      <td>
        <button onclick="editContact(${index})">Edit</button>
        <button onclick="deleteContact(${index})">Delete</button>
      </td>
    `
    ;

    contactList.appendChild(row);
  });
}

function deleteContact(index) {
  contacts.splice(index, 1);
  updateContactList();
  saveContacts();
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

  if (newName && newPhone) {
    contacts[index] = { name: newName, phone: newPhone };
    updateContactList();
    saveContacts();
  } else {
    alert('Please enter both name and phone.');
  }
}

function cancelEdit(index) {
  updateContactList();
}

function saveContacts() {
  fetch('Assets/PHP/save.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contacts)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Save response:', data);
  })
  .catch(error => {
    console.error('Error saving contacts:', error);
  });
}


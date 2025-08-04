const form = document.getElementById('contact-form');
const contactList = document.getElementById('contact-list');
let contacts = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();

  if (name && phone) {
    const contact = { name, phone };
    contacts.push(contact);
    updateContactList();
    form.reset();
  }
});

function updateContactList() {
  contactList.innerHTML = '';
  contacts.forEach((contact, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${contact.name}</td>
      <td>${contact.phone}</td>
      <td><button onclick="deleteContact(${index})">Delete</button></td>
    `;

    contactList.appendChild(row);
  });
}

function deleteContact(index) {
  contacts.splice(index, 1);
  updateContactList();
}
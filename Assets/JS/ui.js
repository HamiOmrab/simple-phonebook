export function updateContactList(contacts, handlers) {
  // handlers: { onEdit, onDelete }
  const contactList = document.getElementById('contact-list');
  contactList.innerHTML = '';
  contacts.forEach((contact, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${contact.name}</td>
      <td>${contact.phone}</td>
      <td>
        <button data-index="${index}" class="edit-btn">Edit</button>
        <button data-index="${index}" class="delete-btn">Delete</button>
      </td>
    `;
    contactList.appendChild(row);
  });

  // event delegation for buttons
  contactList.querySelectorAll('.edit-btn').forEach(btn => {
    btn.onclick = e => {
      const idx = Number(e.target.dataset.index);
      handlers.onEdit(idx);
    };
  });
  contactList.querySelectorAll('.delete-btn').forEach(btn => {
    btn.onclick = e => {
      const idx = Number(e.target.dataset.index);
      handlers.onDelete(idx);
    };
  });
}

export function setRowEditing(index, contact, handlers) {
  const contactList = document.getElementById('contact-list');
  const row = contactList.children[index];
  row.innerHTML = `
    <td><input type="text" id="edit-name-${index}" value="${contact.name}" /></td>
    <td><input type="text" id="edit-phone-${index}" value="${contact.phone}" /></td>
    <td>
      <button id="save-btn-${index}">Save</button>
      <button id="cancel-btn-${index}">Cancel</button>
    </td>
  `;

  document.getElementById(`save-btn-${index}`).onclick = () => handlers.onSave(index);
  document.getElementById(`cancel-btn-${index}`).onclick = () => handlers.onCancel(index);
}

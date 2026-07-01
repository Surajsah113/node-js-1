const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let items = [{ id: 1, name: 'Item One' }];

// GET
app.get('/api/items', (req, res) => {
  res.status(200).json({ message: 'GET successful', items });
});

// POST
app.post('/api/items', (req, res) => {
  const newItem = { id: items.length + 1, ...req.body };
  items.push(newItem);
  res.status(201).json({ message: 'POST successful - item created', item: newItem });
});

// PUT
app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const index = items.findIndex(i => i.id == id);
  if (index === -1) return res.status(404).json({ message: 'Item not found' });

  items[index] = { id: Number(id), ...req.body };
  res.status(200).json({ message: 'PUT successful - item replaced', item: items[index] });
});

// PATCH
app.patch('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const item = items.find(i => i.id == id);
  if (!item) return res.status(404).json({ message: 'Item not found' });

  Object.assign(item, req.body);
  res.status(206).json({ message: 'PATCH successful - item updated', item });
});

// DELETE
app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const index = items.findIndex(i => i.id == id);
  if (index === -1) return res.status(404).json({ message: 'Item not found' });

  items.splice(index, 1);
  res.status(202).json({ message: 'DELETE successful - item deleted' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

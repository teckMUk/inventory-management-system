"use client"

import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Button, Modal, TextField, MenuItem, Container } from '@mui/material'
import { InventoryItemModel, addItemToInventory, getInventoryItems } from "./firebase/manageItems"
import InventoryList from './components/InventoryList';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%', // Make width dynamic
  maxWidth: 400,
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
}

export default function Home() {
  const [itemData, setItemData] = useState({
    item_name: '',
    category: '',
    quantity: 1,
    unit_type: 'pcs',
    purchase_date: '',
    expiry_date: '',
    location: '',
    notes: '',
  });
  const [items, setItems] = useState<InventoryItemModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('');
  const [filteredItems, setFilteredItems] = useState<InventoryItemModel[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItemData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterCategory(e.target.value);
  };

  const fetchItems = async () => {
    try {
      const data = await getInventoryItems();
      setItems(data);
      setFilteredItems(data);
      setFilterCategory('');
    } catch (error) {
      console.error("Error fetching inventory items: ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    const filtered = filterCategory 
      ? items.filter(item => item.category === filterCategory) 
      : items;
    setFilteredItems(filtered);
  }, [filterCategory, items]);

  const handleItemUpdate = () => {
    fetchItems();
  };

  const handleAddItem = async () => {
    await addItemToInventory({ ...itemData });
    handleItemUpdate();
    handleClose();
  };

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mb={2}>
        <Typography variant="h4">Inventory Management</Typography>
        <Button variant="contained" onClick={handleOpen}>
          Add New Item
        </Button>
      </Box>
      <Box>
        <TextField
          id="filter_category"
          name="filter_category"
          label="Filter by Category"
          variant="outlined"
          fullWidth
          select
          value={filterCategory}
          onChange={handleFilterChange}
          sx={{ mb: 2 }}
        >
          <MenuItem value="">All Categories</MenuItem>
          <MenuItem value="spices_and_seasonings">Spices and Seasonings</MenuItem>
          <MenuItem value="condiments_and_sauces">Condiments and Sauces</MenuItem>
          <MenuItem value="beverages">Beverages</MenuItem>
          <MenuItem value="frozen_foods">Frozen Foods</MenuItem>
          <MenuItem value="produce">Produce</MenuItem>
          <MenuItem value="dairy_products">Dairy Products</MenuItem>
          <MenuItem value="meat_and_seafood">Meat and Seafood</MenuItem>
          <MenuItem value="canned_goods">Canned Goods</MenuItem>
          <MenuItem value="miscellaneous">Miscellaneous</MenuItem>
        </TextField>
        <Box border={'1px solid #333'} borderRadius={1} overflow="hidden">
          <Box
            bgcolor={'#ADD8E6'}
            p={2}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Typography variant={'h6'} color={'#333'} textAlign={'center'}>
              Inventory Items
            </Typography>
          </Box>
          <InventoryList items={filteredItems} onHandleChange={handleItemUpdate} loading={loading} />
        </Box>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">Add Item</Typography>
          <Stack spacing={2}>
            <TextField
              id="item_name"
              name="item_name"
              label="Item Name"
              variant="outlined"
              fullWidth
              value={itemData.item_name}
              onChange={handleInputChange}
            />
            <TextField
              id="category"
              name="category"
              label="Category"
              variant="outlined"
              fullWidth
              select
              value={itemData.category}
              onChange={handleInputChange}
            >
              <MenuItem value="spices_and_seasonings">Spices and Seasonings</MenuItem>
              <MenuItem value="condiments_and_sauces">Condiments and Sauces</MenuItem>
              <MenuItem value="beverages">Beverages</MenuItem>
              <MenuItem value="frozen_foods">Frozen Foods</MenuItem>
              <MenuItem value="produce">Produce</MenuItem>
              <MenuItem value="dairy_products">Dairy Products</MenuItem>
              <MenuItem value="meat_and_seafood">Meat and Seafood</MenuItem>
              <MenuItem value="canned_goods">Canned Goods</MenuItem>
              <MenuItem value="miscellaneous">Miscellaneous</MenuItem>
            </TextField>
            <TextField
              id="quantity"
              name="quantity"
              label="Quantity"
              variant="outlined"
              fullWidth
              type="number"
              value={itemData.quantity}
              onChange={handleInputChange}
            />
            <TextField
              id="unit_type"
              name="unit_type"
              label="Unit Type"
              variant="outlined"
              fullWidth
              select
              value={itemData.unit_type}
              onChange={handleInputChange}
            >
              <MenuItem value="pcs">Pieces</MenuItem>
              <MenuItem value="kg">Kilograms</MenuItem>
              <MenuItem value="liters">Liters</MenuItem>
            </TextField>
            <TextField
              id="purchase_date"
              name="purchase_date"
              label="Purchase Date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              fullWidth
              type="date"
              value={itemData.purchase_date}
              onChange={handleInputChange}
            />
            <TextField
              id="expiry_date"
              name="expiry_date"
              label="Expiry Date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              fullWidth
              type="date"
              value={itemData.expiry_date}
              onChange={handleInputChange}
            />
            <TextField
              id="location"
              name="location"
              label="Location"
              variant="outlined"
              fullWidth
              value={itemData.location}
              onChange={handleInputChange}
            />
            <TextField
              id="notes"
              name="notes"
              label="Notes"
              variant="outlined"
              fullWidth
              multiline
              value={itemData.notes}
              onChange={handleInputChange}
            />
            <Button variant="contained" onClick={handleAddItem}>
              Add Item to Inventory
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Container>
  )
}

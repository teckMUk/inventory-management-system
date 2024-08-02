"use client"

import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Button, Modal, TextField,MenuItem } from '@mui/material'
import  {InventoryItemModel, addItemToInventory,getInventoryItems} from "./firebase/manageItems"
import { CircularProgress, Container } from "@mui/material";
import InventoryList from './components/InventoryList';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItemData((prevData) => ({ ...prevData, [name]: value }));
  };
  async function fetchItems(){
    try {
      const data = await getInventoryItems();
      console.log(data)
      setItems(data);
    } catch (error) {
      console.error("Error fetching inventory items: ", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
   
    fetchItems();
  }, []);

  const handleItemUpdate = () => {
    // Refresh the inventory items after an item is updated
    fetchItems();
  };
  const handleAddItem = async () => {
    console.log(itemData)
    await addItemToInventory({
      ...itemData,
    });
    handleItemUpdate()
    handleClose(); // Close the modal after adding the item
  };
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  // We'll add our component logic here
  return (
    <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={2}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
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
          value={itemData.category}
          onChange={handleInputChange}
        />
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
        
        <Button
          variant="contained"
          onClick={handleAddItem}
        >
          Add Item to Inventory
        </Button>
      </Stack>
        </Box>
      </Modal>
      <Button variant="contained" onClick={handleOpen}>
        Add New Item
      </Button>
      <Box border={'1px solid #333'}>
        <Box
          width="800px"
          height="100px"
          bgcolor={'#ADD8E6'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography variant={'h2'} color={'#333'} textAlign={'center'}>
            Inventory Items
          </Typography>
        </Box>
        <Stack width="800px" height="300px" spacing={2} overflow={'auto'}>
        <InventoryList items={items} onHandleChange={handleItemUpdate}></InventoryList>
        </Stack>
      </Box>
    </Box>
  )
}
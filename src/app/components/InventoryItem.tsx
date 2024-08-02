import React, { useState } from 'react';
import {
  ListItem,
  ListItemText,
  Typography,
  Button,
  Modal,
  Box,
  Stack, 
  TextField
} from "@mui/material";
import { InventoryItemModel, updateItemInInventory, deleteItemFromInventory } from "../firebase/manageItems"

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%', // Make modal width dynamic for better responsiveness
  maxWidth: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

interface InventoryItemProps {
  item: InventoryItemModel;
  onHandleChange: () => void;
}

export default function InventoryItem({ item, onHandleChange }: InventoryItemProps) {
  const [open, setOpen] = useState(false);
  const [editableItem, setEditableItem] = useState({ ...item });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleRemove = async () => {
    if (item.id) {
      await deleteItemFromInventory(item.id);
      onHandleChange();
    } else {
      console.log("Cannot delete, no ID found");
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    await updateItemInInventory({ ...editableItem });
    onHandleChange();
    handleClose();
  };

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={`${item.item_name} (${item.category})`}
          secondary={
            <>
              <Typography component="span" variant="body2" color="text.primary">
                {item.quantity} {item.unit_type}
              </Typography>
              <br />
              Location: {item.location}
              {item.notes && (
                <Typography variant="body2" color="text.secondary">
                  Notes: {item.notes}
                </Typography>
              )}
            </>
          }
        />
        <Stack direction="column" spacing={1}>
          <Button variant="outlined" onClick={handleOpen}>
            View
          </Button>
          <Button variant="outlined" onClick={handleRemove} sx={{ borderColor: 'red', color: 'red' }}>
            Remove
          </Button>
        </Stack>
      </ListItem>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="item-details-modal-title"
        aria-describedby="item-details-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="item-details-modal-title" variant="h6" component="h2">
            View Item Details
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Item Name"
              name="item_name"
              value={editableItem.item_name}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
            <TextField
              label="Category"
              name="category"
              value={editableItem.category}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              value={editableItem.quantity}
              onChange={handleInputChange}
              fullWidth
              InputProps={{
                endAdornment: (
                  <Typography variant="body2" color="text.secondary">
                    {editableItem.unit_type}
                  </Typography>
                ),
              }}
            />
            <TextField
              label="Purchase Date"
              name="purchase_date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={editableItem.purchase_date}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Expiry Date"
              name="expiry_date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={editableItem.expiry_date}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Location"
              name="location"
              value={editableItem.location}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Notes"
              name="notes"
              value={editableItem.notes}
              onChange={handleInputChange}
              multiline
              fullWidth
            />
          </Stack>
          <Stack direction="row" spacing={2} mt={2}>
            <Button onClick={handleSaveChanges} variant="contained">
              Save
            </Button>
            <Button onClick={handleClose} variant="outlined" sx={{ borderColor: 'black', color: 'black' }}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

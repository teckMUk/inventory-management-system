import React, { useState } from 'react';
import {
  ListItem,
  ListItemText,
  Typography,
  Button,
  Modal,
  Box,
  Stack,TextField
} from "@mui/material";
import {InventoryItemModel, updateItemInInventory,deleteItemFromInventory} from "../firebase/manageItems"

const modalStyle = {
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
};
 
// export default function InventoryItem(item:InventoryItemModel){
//     // return(
//     //     <ListItem alignItems="flex-start">
//     //     <ListItemText
//     //             primary={`${item.item_name} (${item.category})`}
//     //             secondary={
//     //               <>
//     //                 <Typography
//     //                   component="span"
//     //                   variant="body2"
//     //                   color="text.primary"
//     //                 >
//     //                   {item.quantity} {item.unit_type}
//     //                 </Typography>
//     //                 <br />
//     //                 Location: {item.location}
                
//     //                 {item.notes && (
//     //                   <Typography variant="body2" color="text.secondary">
//     //                     Notes: {item.notes}
//     //                   </Typography>
//     //                 )}
//     //               </>
//     //             }
//     //           />
//     //         </ListItem>
//     // )
//     const [open, setOpen] = useState(false);

//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);
  
//     return (
//       <>
//         <ListItem alignItems="flex-start">
//           <ListItemText
//             primary={`${item.item_name} (${item.category})`}
//             secondary={
//               <>
//                 <Typography
//                   component="span"
//                   variant="body2"
//                   color="text.primary"
//                 >
//                   {item.quantity} {item.unit_type}
//                 </Typography>
//                 <br />
//                 Location: {item.location}
//                 {item.notes && (
//                   <Typography variant="body2" color="text.secondary">
//                     Notes: {item.notes}
//                   </Typography>
//                 )}
//               </>
//             }
//           />
//           <Button variant="outlined" onClick={handleOpen}>
//             View
//           </Button>
//         </ListItem>
  
//         <Modal
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="item-details-modal-title"
//           aria-describedby="item-details-modal-description"
//         >
//           <Box sx={modalStyle}>
//             <Typography id="item-details-modal-title" variant="h6" component="h2">
//              Item Deteails 
//             </Typography>
//             <Stack spacing={2}>
//             <Typography variant="body2">
//                 <strong>Item Name:</strong> {item.item_name}
//               </Typography>
//               <Typography variant="body2">
//                 <strong>Category:</strong> {item.category}
//               </Typography>
//               <Typography variant="body2">
//                 <strong>Quantity:</strong> {item.quantity} {item.unit_type}
//               </Typography>
//               <Typography variant="body2">
//                 <strong>Purchase Date:</strong> {item.purchase_date}
//               </Typography>
//               <Typography variant="body2">
//                 <strong>Expiry Date:</strong> {item.expiry_date}
//               </Typography>
//               <Typography variant="body2">
//                 <strong>Location:</strong> {item.location}
//               </Typography>
//               {item.notes && (
//                 <Typography variant="body2">
//                   <strong>Notes:</strong> {item.notes}
//                 </Typography>
//               )}
//             </Stack>
//             <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>
//               Close
//             </Button>
//           </Box>
//         </Modal>
//       </>
//     );
// }
interface InventoryItemProps {
  item: InventoryItemModel;
  onHandleChange: () => void;
}
export default function InventoryItem({ item, onHandleChange }:InventoryItemProps) {
  const [open, setOpen] = useState(false);
  const [editableItem, setEditableItem] = useState({ ...item });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleRemove = async () => {
    if (item.id){
      await deleteItemFromInventory(item.id);
      onHandleChange();
    }
    console.log("cannot delete no id found")
    
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    // Implement your save logic here, e.g., update the database
    await updateItemInInventory({
      ...editableItem
    })
    console.log('Saving updated item:', editableItem);
    onHandleChange()
    handleClose();
  };

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={`${item.item_name} (${item.category})`}
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                color="text.primary"
              >
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
        <Button variant="outlined" onClick={handleRemove}>
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
          <Typography variant="h6">
              <strong>Item Name:</strong> {editableItem.item_name}
            </Typography>
            <Typography variant="h6">
              <strong>Category:</strong> {editableItem.category}
            </Typography>
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
              value={editableItem.purchase_date}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Expiry Date"
              name="expiry_date"
              type="date"
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
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
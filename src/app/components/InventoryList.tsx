import React from "react";
import InventoryItem from "./InventoryItem";
import { InventoryItemModel } from "../firebase/manageItems";
import {
  List,
  Typography,
  Container,
  Divider,
  CircularProgress,
  Box,
} from "@mui/material";

interface InventoryListProps {
  items: InventoryItemModel[];
  loading: boolean;
  onHandleChange: () => void;
}

const InventoryList: React.FC<InventoryListProps> = ({
  items,
  loading,
  onHandleChange,
}) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (items.length === 0) {
    return (
      <Container>
        <Typography variant="h6">No items found in inventory.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ height: '80vh', overflow: 'hidden' }}>
      <List
        sx={{
          maxHeight: '100%',
          overflowY: 'scroll',
          scrollbarWidth: 'none', // For Firefox
          '&::-webkit-scrollbar': { display: 'none' }, // For WebKit-based browsers
        }}
      >
        <Divider />
        {items.map((item) => (
          <React.Fragment key={item.id}>
            <InventoryItem item={item} onHandleChange={onHandleChange} />
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
};

export default InventoryList;

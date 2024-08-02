// src/app/components/InventoryList.tsx

import React from "react";
import InventoryItem from "./InventoryItem"
import {InventoryItemModel} from "../firebase/manageItems"

import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
  Divider,
} from "@mui/material";

interface InventoryListProps {
  items: InventoryItemModel[];
  onHandleChange:() => void;
}

const InventoryList: React.FC<InventoryListProps> = ({ items ,onHandleChange}) => {
  if (items.length === 0) {
    return (
      <Container>
        <Typography variant="h6">No items found in inventory.</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <List>
      <Divider />
        {items.map((item) => (
          <React.Fragment key={item.id}>
            <InventoryItem item={item} onHandleChange={onHandleChange}></InventoryItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
};

export default InventoryList;

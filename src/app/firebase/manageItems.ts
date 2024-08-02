import { firestore } from "./firebaseConfig";
import { collection, getDocs, addDoc, updateDoc, doc , deleteDoc} from "firebase/firestore";

export interface InventoryItemModel {
  id?: string;
  item_name: string;
  category: string;
  quantity: number;
  unit_type: string;
  purchase_date: string;
  expiry_date: string;
  location: string;
  notes?: string;
  created_at?: Date;
  updated_at?: Date;
}

export const getInventoryItems = async (): Promise<InventoryItemModel[]> => {
  const querySnapshot = await getDocs(collection(firestore, "inventory"));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as InventoryItemModel[];
};

export const addItemToInventory = async (item: InventoryItemModel): Promise<void> => {
  try {
    await addDoc(collection(firestore, "inventory"), {
      ...item,
      created_at: new Date(),
      updated_at: new Date(),
    });
    console.log("Item added to inventory");
  } catch (error) {
    console.error("Error adding item to inventory: ", error);
  }
};

export const updateItemInInventory = async (updatedItem: Partial<InventoryItemModel>): Promise<void> => {
  try {
    const { id, created_at,...itemWithoutId } = updatedItem;
    if (id){
      const itemDocRef = doc(firestore, "inventory", id);
      await updateDoc(itemDocRef, {
        ...itemWithoutId,
        updated_at: new Date(),
      });
      console.log("Item updated in inventory");

    }else{
      console.error("Error updating item in inventory: ","No id found");

    }
  } catch (error) {
    console.error("Error updating item in inventory: ", error);
  }
};

export const deleteItemFromInventory = async (id: string): Promise<void> => {
  try {
    const itemDocRef = doc(firestore, "inventory", id);
    await deleteDoc(itemDocRef);
    console.log("Item deleted from inventory");
  } catch (error) {
    console.error("Error deleting item from inventory: ", error);
  }
};
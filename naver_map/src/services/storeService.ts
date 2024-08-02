import stores, { Store } from "../data/stores";

let storesData = [...stores];

export const getAllStores = (): Store[] => {
  return storesData;
};

export const getStoreById = (id: number): Store | undefined => {
  return storesData.find((store) => store.id === id);
};

export const addStore = (store: Omit<Store, "id">): Store => {
  const newStore = { ...store, id: storesData.length + 1 };
  storesData.push(newStore);
  return newStore;
};

export const updateStore = (
  id: number,
  updatedStore: Partial<Store>
): Store | null => {
  const index = storesData.findIndex((store) => store.id === id);
  if (index !== -1) {
    storesData[index] = { ...storesData[index], ...updatedStore };
    return storesData[index];
  }
  return null;
};

export const deleteStore = (id: number): boolean => {
  const initialLength = storesData.length;
  storesData = storesData.filter((store) => store.id !== id);
  return storesData.length !== initialLength;
};

// Utility functions for working with localStorage

// Get data from localStorage with fallback to initial data
export const getStorageData = (key, initialData) => {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : initialData;
  } catch (error) {
    console.error(`Error retrieving ${key} from localStorage:`, error);
    return initialData;
  }
};

// Save data to localStorage
export const setStorageData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
    return false;
  }
};

// Add a new item to a collection in localStorage
export const addStorageItem = (key, item, initialData = []) => {
  try {
    const currentData = getStorageData(key, initialData);
    
    // Generate a new ID if needed
    if (!item.id) {
      const maxId = currentData.reduce((max, current) => 
        current.id > max ? current.id : max, 0);
      item.id = maxId + 1;
    }
    
    const updatedData = [...currentData, item];
    setStorageData(key, updatedData);
    return item;
  } catch (error) {
    console.error(`Error adding item to ${key} in localStorage:`, error);
    return null;
  }
};

// Update an existing item in localStorage
export const updateStorageItem = (key, itemId, updates, initialData = []) => {
  try {
    const currentData = getStorageData(key, initialData);
    const updatedData = currentData.map(item => 
      item.id === itemId ? { ...item, ...updates } : item
    );
    
    setStorageData(key, updatedData);
    return updatedData.find(item => item.id === itemId);
  } catch (error) {
    console.error(`Error updating item in ${key} in localStorage:`, error);
    return null;
  }
};

// Remove an item from localStorage
export const removeStorageItem = (key, itemId, initialData = []) => {
  try {
    const currentData = getStorageData(key, initialData);
    const updatedData = currentData.filter(item => item.id !== itemId);
    
    setStorageData(key, updatedData);
    return true;
  } catch (error) {
    console.error(`Error removing item from ${key} in localStorage:`, error);
    return false;
  }
};
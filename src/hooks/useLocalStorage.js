import { useState } from "react";

/**
 * Hook personalizado para interactuar con el Local Storage.
 * @param {string} key - La clave bajo la cual se almacenará el valor en el Local Storage.
 * @param {any} initialValue - El valor inicial en caso de que el Local Storage no contenga nada para esa clave.
 * @returns {[any, Function]} - Retorna el valor actual y una función setter para actualizar el valor.
 */
function useLocalStorage(key, initialValue) {
  // Obtiene el valor del Local Storage al inicializar el estado
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  // Estado para almacenar el valor actual
  const [value, setValue] = useState(initial);

  // Actualiza el Local Storage cuando el estado cambia
  const setStoredValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue];
}

export default useLocalStorage;

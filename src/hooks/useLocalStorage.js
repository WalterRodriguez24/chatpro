import { useState,useEffect } from "react";

/**
 * Hook personalizado para interactuar con el Local Storage.
 * @param {string} key - La clave bajo la cual se almacenará el valor en el Local Storage.
 * @param {any} initialValue - El valor inicial en caso de que el Local Storage no contenga nada para esa clave.
 * @returns {[any, Function]} - Retorna el valor actual y una función setter para actualizar el valor.
 */
const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    let currentValue;

    try {
      currentValue = JSON.parse(
        localStorage.getItem(key) || String(defaultValue)
      );
    } catch (error) {
      currentValue = defaultValue;
    }

    return currentValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;

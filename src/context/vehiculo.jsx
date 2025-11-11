import { createContext, useState } from "react";

export const VehiculoContext = createContext({
  Id_Vehiculo: null,          
  setVehiculo: () => {}       
});

export const VehiculoProvider = ({ children }) => {
  const [Id_Vehiculo, setVehiculo] = useState(null); 

  const value = { Id_Vehiculo, setVehiculo };

  return (
    <VehiculoContext.Provider value={value}>
      {children}
    </VehiculoContext.Provider>
  );
}
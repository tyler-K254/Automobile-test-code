import { useEffect, useState } from "react";
import NewCarForm from "./NewCarForm";
import CarList from "./CarList";
import Search from "./Search";

function CarPage() {
    const [cars, setCars] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
  
    useEffect(() => {
      fetch("/cars")
        .then((r) => r.json())
        .then((carsArray) => {
          setCars(carsArray);
        });
    }, []);
  
    function handleAddCar(newCar) {
      const updatedCarsArray = [...cars, newCar];
      setCars(updatedCarsArray);
    }
    
    const displayedCars = cars.filter((car) => {
        return car.name.toLowerCase().includes(searchTerm.toLowerCase());
      });

      if(!cars) return <h1>...loading</h1>

  return (
    <main>
      <NewCarForm onAddCar={handleAddCar} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <CarList cars={displayedCars} />
    </main>
  );
}

export default CarPage;

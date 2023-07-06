import CarCard from "./CarCard";

function CarList({ cars }) {
  
  return (
    <ul className="cards">
      {cars.map((car) => {
        return <CarCard key={car.id} car={car} />;
      })}
    </ul>
  );
}

export default CarList;

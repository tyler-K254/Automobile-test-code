import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CarDetail() {
    let { id } = useParams();
    const [car, setCar] = useState({});

    useEffect(() => {
        fetch(`/cars/${id}`)
          .then((r) => r.json())
          .then((car) => setCar(car));
    
        return () => setCar({});
      }, [id]);
      
      const { name, model, image } = car;

    const [isInStock, setIsInStock] = useState(true);

    function handleToggleStock() {
        setIsInStock((isInStock) => !isInStock);
    }

    return (
        <div className="details">
          <img src={image} alt={name} />
    
          <h4>{name}</h4>
          <p>Model: {model}</p>
          {isInStock ? (
            <button className="primary" onClick={handleToggleStock}>
              Available for shows
            </button>
          ) : (
            <button onClick={handleToggleStock}>Fully Booked</button>
          )}
        </div>
      );
    }

    export default CarDetail;
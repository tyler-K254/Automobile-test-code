import { Link } from "react-router-dom";

function CarCard({ car }) {
  const { id, name, image } = car;

  return (
    <li className="card">
      <Link to={`/${id}`}>
      <img src={image} alt={name} />
      </Link>
      <h4>{name}</h4>
    </li>
  );
}

export default CarCard;

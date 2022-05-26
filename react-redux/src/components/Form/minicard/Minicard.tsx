import { IFormData, miniCardProps } from '../Form-interfaces';
import './Minicard.scss';

export default function Minicard({ key, cardData, testid }: miniCardProps) {
  const { file, name, date, location, gender } = cardData;

  return (
    <div className="minicard" data-testid={testid}>
      <img src={file} alt="Image" />
      <p>Name: {name}</p>
      <p>Birthday: {date.split('-').reverse().join('.')}</p>
      <p>Origin: {location}</p>
      <p>Gender: {gender}</p>
      <div>Character created!</div>
    </div>
  );
}

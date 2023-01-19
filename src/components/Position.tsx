import { IFromData } from "../types/formData";

interface Props {
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, type: string) => void;
  id: number;
  formData: IFromData;
}

export const Position: React.FC<Props> = ({
  name,
  id,
  handleChange,
  formData,
}) => {
  return (
    <div className="radio">
      <input
        id={`${id}`}
        type="radio"
        name="position_id"
        value={id}
        onChange={(e) => {
          handleChange(e, "radio");
        }}
        checked={id === formData.position_id}
      />
      <label htmlFor={`${id}`} className="radio-label">
        {name}
      </label>
    </div>
  );
};

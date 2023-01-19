import { IUser } from "../types/user";

interface Props {
  user: IUser;
}

export const User: React.FC<Props> = ({ user }) => {
  const { name, position, email, phone, photo } = user;
  return (
    <div className="card">
      <img src={photo} alt="userIMG" className="card_photo" loading="lazy"/>

      <h2 className="card_name">{name}</h2>

      <div className="card_info">
        <p className="card_position">{position}</p>
        <p className="card_gmail">
          {email.length > 30 ? `${email.slice(0, 30)}...` : email}
        </p>

        <p className="card_phone">{phone}</p>
      </div>
    </div>
  );
};

interface Props {
  text: string;
  downloadUsers?: () => void;
  disabledButton?: boolean;
}

export const Button: React.FC<Props> = ({
  text,
  downloadUsers,
  disabledButton,
}) => {
  return (
    <button
      className="button"
      onClick={downloadUsers}
      disabled={disabledButton}
    >
      {text}
    </button>
  );
};

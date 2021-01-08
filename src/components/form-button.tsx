interface IProps {
  label: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}
export const FormButton = ({ label, disabled, loading, onClick }: IProps) => {
  return (
    <button className="button-green mt-3" disabled={disabled} onClick={onClick}>
      {loading ? 'loading...' : label}
    </button>
  );
};

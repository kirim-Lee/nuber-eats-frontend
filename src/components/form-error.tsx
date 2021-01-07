type FromError = {
  errorMessage: string;
};
export const FormError: React.FC<FromError> = ({ errorMessage }) => {
  return (
    <span className="font-medium text-red-500 text-sm">{errorMessage}</span>
  );
};

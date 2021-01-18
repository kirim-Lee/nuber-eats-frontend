type Props = {
  className?: string;
};
export const Logo = ({ className }: Props) => {
  return (
    <h3
      className={`text-3xl scale-125 text-center mb-10 font-medium ${
        className || ''
      }`}
    >
      <span>Nuber</span> <span className=" text-lime-400">Eats</span>
    </h3>
  );
};

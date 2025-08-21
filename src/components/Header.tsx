interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  return (
    <div className="flex items-center w-full h-[33vh] max-h-[800px] bg-gray-100 p-4 rounded-lg shadow-md">
      <h1 className="text-3xl ml-4 font-bold text-gray-800">{title}</h1>
    </div>
  );
};

export default Header;

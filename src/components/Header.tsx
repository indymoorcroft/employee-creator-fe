import { Link } from "react-router-dom";

interface Props {
  title: string;
  backButton?: boolean;
}

const Header = ({ title, backButton }: Props) => {
  return (
    <div className="flex items-center justify-between w-full h-[33vh] max-h-[800px] bg-gray-100 p-[5vw] rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      {backButton ? (
        <>
          <Link
            to={"/"}
            className="px-3 py-1 text-white text-sm font-medium rounded bg-gray-500 hover:bg-gray-600"
          >
            back
          </Link>
        </>
      ) : null}
    </div>
  );
};

export default Header;

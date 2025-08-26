interface Props<T extends Record<string, any>> {
  info: T | null;
  fields: (keyof T)[];
  onClick?: () => void;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormDetails = <T extends Record<string, any>>({
  info,
  fields,
  onClick,
  setIsEditing,
}: Props<T>) => {
  if (!info) return <p>No details available</p>;

  return (
    <div
      className={`space-y-4 p-6 border border-gray-400 rounded-lg shadow-md w-[95vw] max-w-[950px] ${
        "startDate" in info ? "bg-gray-200" : "bg-white"
      }`}
    >
      {fields.map((key) => (
        <div key={String(key)}>
          <p className="block text-sm font-semibold text-gray-700 capitalize">
            {String(key).replace(/([A-Z])/g, " $1")}
          </p>
          <p className="w-full border border-gray-400 p-2 rounded min-h-[40px] bg-gray-50">
            {info[key] === undefined ? "" : String(info[key])}
          </p>
        </div>
      ))}
      <div className="flex gap-2.5">
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Edit
        </button>
        {onClick && (
          <button
            onClick={onClick}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default FormDetails;

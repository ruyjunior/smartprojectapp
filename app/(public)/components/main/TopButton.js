import { FaArrowUp } from "react-icons/fa";

const TopButton = () => {
  return (
    <a
      href="/"
      target=""
      rel="noopener noreferrer"
      className="fixed bottom-16 left-5 bg-gray-500 hover:bg-gray-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
    >
      <FaArrowUp size={32} />
    </a>
  );
};

export default TopButton;

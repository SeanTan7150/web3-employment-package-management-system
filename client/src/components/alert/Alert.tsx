interface AlertProps {
  message: string;
  onClose: () => void;
}

export const Alert: React.FC<AlertProps> = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-between p-4 mb-4 text-sm text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400 z-50">
      <div>
        <span className="font-medium">Error: </span> {message}
      </div>
      <button
        onClick={onClose}
        className="text-red-500 hover:text-red-700 focus:outline-none"
      >
        Close
      </button>
    </div>
  );
};

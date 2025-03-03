import PropTypes from "prop-types";

export default function Cards({ title, icon, number, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-start transition-transform hover:scale-105">
      <div className="flex items-center space-x-4 w-full">
        {icon}
        <div className="text-right flex-1">
          <span className="text-3xl font-bold text-gray-800">{number}</span>
          <p className="text-gray-500">{description}</p>
        </div>
      </div>
      <div className="w-full mt-4 flex justify-between items-center">
        <span className="text-gray-600 font-medium">{title}</span>
      </div>
    </div>
  );
}

Cards.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired, 
  description: PropTypes.string.isRequired,
};
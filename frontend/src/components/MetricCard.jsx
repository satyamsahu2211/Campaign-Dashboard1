const MetricCard = ({ title, value }) => (
  <div className="bg-white p-4 rounded-lg shadow-xl outline outline-4 outline-blue-200">
    <p className="text-sm text-gray-500">{title}</p>
    <h2 className="text-2xl font-bold">{value}</h2>
  </div>
);

export default MetricCard;

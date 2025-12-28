const CampaignTable = ({ campaigns = [], onSelect }) => {
  if (!campaigns.length) {
    return <p className="text-gray-500 text-center">No campaigns found</p>;
  }

  return (
    <table className="w-full bg-white rounded shadow outline outline-2.5 outline-blue-200">
      <thead className="bg-green-100">
        <tr>
          <th className="p-2 text-left">Name</th>
          <th className="text-left">Status</th>
          <th className="text-left" >Budget</th>
        </tr>
      </thead>
      <tbody>
        {campaigns.map((c) => (
          <tr
            key={c.id}
            onClick={() => onSelect(c.id)}
            className="border-t hover:bg-green-50 cursor-pointer"
          >
            <td className="p-2">{c.name}</td>
            <td className="capitalize">{c.status}</td>
            <td>${c.budget}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CampaignTable;

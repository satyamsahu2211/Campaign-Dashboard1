import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCampaigns, getInsights } from "../api/campaigns";
import MetricCard from "../components/MetricCard";
import CampaignTable from "../components/CampaignTable";
import ErrorBanner from "../components/ErrorBanner";
import Loading from "../components/Loading";

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      const [cRes, iRes] = await Promise.allSettled([
        getCampaigns(),
        getInsights(),
      ]);

      if (!mounted) return;

      if (cRes.status === "fulfilled" && cRes.value.data) {
        setCampaigns(cRes.value.data.campaigns || []);
      }

      if (iRes.status === "fulfilled" && iRes.value.data) {
        setInsights(iRes.value.data.insights);
      }

      setLoading(false);
    };

    fetchData();
    return () => (mounted = false);
  }, []);

  if (loading) return <Loading />;

  const filtered = campaigns.filter((c) => {
    const matchName = c.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = status === "all" || c.status === status;
    return matchName && matchStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold outline w-80 h-10 p-2 outline-2.5 outline-blue-200 flex justify-center align-center text-center leading-4">Campaign Dashboard</h1>

      {!insights && <ErrorBanner />}

      {insights && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard title="Total Campaigns" value={insights.total_campaigns} />
          <MetricCard title="Total Spend" value={`$${insights.total_spend}`} />
          <MetricCard title="Total Clicks" value={insights.total_clicks} />
        </div>
      )}

      <div className="flex gap-4">
        <input
          className="outline-2.5 outline-blue-200 p-2 rounded w-64 shadow"
          placeholder="Search campaign"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="outline-2.5 outline-blue-200 p-2 rounded shadow"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <CampaignTable
        campaigns={filtered}
        onSelect={(id) => navigate(`/campaign/${id}`)}
      />
    </div>
  );
};

export default Dashboard;

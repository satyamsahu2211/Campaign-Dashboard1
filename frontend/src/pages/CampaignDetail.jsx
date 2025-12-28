import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCampaignById, getCampaignInsights } from "../api/campaigns";
import MetricCard from "../components/MetricCard";
import ErrorBanner from "../components/ErrorBanner";
import useCampaignStream from "../hooks/useCampaignStream";
import Loading from "../components/Loading";

const CampaignDetail = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [insights, setInsights] = useState(null);

  const { data: live, connected } = useCampaignStream(id);

  useEffect(() => {
    let mounted = true;

    const fetchDetail = async () => {
      const [cRes, iRes] = await Promise.allSettled([
        getCampaignById(id),
        getCampaignInsights(id),
      ]);

      if (!mounted) return;

      if (cRes.status === "fulfilled" && cRes.value.data) {
        setCampaign(cRes.value.data.campaign);
      } else {
        setCampaign({ name: id });
      }

      if (iRes.status === "fulfilled" && iRes.value.data) {
        setInsights(iRes.value.data.insights);
      }
    };

    fetchDetail();
    return () => (mounted = false);
  }, [id]);

  if (!campaign) return <Loading />;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">{campaign.name}</h1>

      {!insights && <ErrorBanner message="Campaign insights unavailable" />}

      {insights && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard title="Impressions" value={insights.impressions} />
          <MetricCard title="Clicks" value={insights.clicks} />
          <MetricCard title="Spend" value={`$${insights.spend}`} />
        </div>
      )}

      {live && (
        <div className="bg-green-50 p-4 rounded shadow">
          <div className="flex items-center gap-2 text-green-600 font-semibold">
            <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
            Live Metrics
          </div>
          <p>Clicks: {live.clicks}</p>
          <p>Spend: ${live.spend}</p>
          <p className="text-xs text-gray-500">
            Updated {new Date(live.timestamp).toLocaleTimeString()}
          </p>
        </div>
      )}

      {!connected && (
        <p className="text-gray-500">Live stream disconnected</p>
      )}
    </div>
  );
};

export default CampaignDetail;

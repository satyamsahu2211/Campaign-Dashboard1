import { useEffect, useState } from "react";

const useCampaignStream = (id) => {
  const [data, setData] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!id) return;

    const es = new EventSource(
      `https://mixo-fe-backend-task.vercel.app/campaigns/${id}/insights/stream`
    );

    es.onopen = () => setConnected(true);

    es.onmessage = (e) => {
      setData(JSON.parse(e.data));
    };

    es.onerror = () => {
      setConnected(false);
      es.close();
    };

    return () => es.close();
  }, [id]);

  return { data, connected };
};

export default useCampaignStream;

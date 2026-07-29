import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

export function useTestimonials(approvedOnly = false) {
  const [testimonials, setTestimonials] = useState([]);
  const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    try {
      const endpoint = approvedOnly ? "/testimonials/approved" : "/testimonials";
      const res = await api.get(endpoint);
      setTestimonials(res.data.data || []);

      if (!approvedOnly) {
        const statsRes = await api.get("/testimonials/stats");
        if (statsRes.data.data) {
          setStats(statsRes.data.data);
        }
      }
    } catch (error) {
      toast.error("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  }, [approvedOnly]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const approve = async (id) => {
    try {
      await api.patch(`/testimonials/${id}/approve`);
      toast.success("Testimonial approved!");
      await fetchTestimonials();
    } catch (error) {
      toast.error("Failed to approve testimonial");
    }
  };

  const reject = async (id) => {
    if (!window.confirm("Are you sure you want to reject this testimonial?")) {
      return;
    }
    try {
      await api.patch(`/testimonials/${id}/reject`);
      toast.success("Testimonial rejected");
      await fetchTestimonials();
    } catch (error) {
      toast.error("Failed to reject testimonial");
    }
  };

  return {
    testimonials,
    stats,
    loading,
    refetch: fetchTestimonials,
    approve,
    reject,
  };
}

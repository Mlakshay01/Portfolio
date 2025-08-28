import { useEffect } from "react";
import "../styles/styles.css";

export default function Loader({ setLoading }) {
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [setLoading]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="loader">
      <h1 className="loader-text">Loading...</h1>
    </div>
  );
}

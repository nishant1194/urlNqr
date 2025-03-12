import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Urll from "../../assets/Urll";

function Index() {
  const { shortUrl } = useParams();
  const [url, setUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleShorten = async () => {
      try {
         const res = await axios.get(Urll+`/api/url/${shortUrl}`);
        setUrl(res.data);
 
        // Redirect to original URL
        if (res.data.originalUrl) {
          window.location.href = res.data.originalUrl; // Using window.location for external redirects
        }
      } catch (error) {
 
        console.error("Invalid U RL:", error);
      }
    };

    handleShorten();
  }, [shortUrl]); //Add dependency to prevent infinite loop

  return (
    <div>
      {url ? (
        <p>Redirecting to: {url.originalUrl}</p>
      ) : (
        <p>Entered invalid link</p>
      )}
    </div>
  );
}

export default Index;

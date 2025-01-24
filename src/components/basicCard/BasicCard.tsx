import { Box } from "@mui/material";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { EachCardData } from "../home/Home";
import { globe } from "./../../assets/assets.ts";
import "./basicCard.css";
import LinkIcon from '@mui/icons-material/Link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
const BasicCard = ({
  info: { score, selfTextHtml, title, url },
}: {
  info: EachCardData;
}) => {
  const unescapeHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.documentElement.textContent || "";
  };

  const unescapedContent = unescapeHtml(selfTextHtml);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const [isSeeingMore, setIsSeeingMore] = useState(false);
  useEffect(() => {
    if (cardRef.current) {
      if (cardRef.current.clientHeight > 350) {
        setIsOverflow(true);
      } else {
        setIsOverflow(false);
      }
    }
  }, [isSeeingMore]);
  return (
    <div
      ref={cardRef}
      style={{
        padding: "10px 15px",
        backgroundColor: "#ac8968",
        borderRadius: "8px",
        overflow: "auto",
        boxShadow: "#FFF10030 0px 5px 15px",
        position: "relative",
        // maxHeight: isSeeingMore ? "none" : "401px",
        overflowY: "hidden",
        textOverflow: 'ellipsis',
        // transition: "0.5s",
        paddingBottom: isOverflow ? "50px" : "none",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 0
        }}
      >
      <h1 style={{ fontSize: "20px",  }}>{title ?? ""}</h1>
        <a href={url} target="_blank">
        
          <OpenInNewIcon style={{fontSize: 15, color: '#001002', marginTop: 20}}/>
        </a>
      </div>
      <p
          style={{
            color: "#964734",
            fontWeight: "bolder",
            lineHeight: 0.1
          }}
        >
          Score: {score}
        </p>
      {selfTextHtml !== null ? (
        <div
          style={{
            maxHeight: !isSeeingMore ? "251px" : "none",
            transition: " height 2s",
          }}
          dangerouslySetInnerHTML={{ __html: unescapedContent }}
        />
      ) : (
        ""
      )}
      {isOverflow && (
        <div
          onClick={() => {
            setIsSeeingMore((prev) => !prev);
          }}
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            height: "30px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: 'white',
            borderRadius: 10,
            padding: '0px 10px'
          }}
      id="main"

        >
          <p style={{ textAlign: "center", fontSize: 12, color: '#000' }}>
            {isSeeingMore ? "Show Less" : "Show More"}
          </p>
        </div>
      )}
    </div>
  );
};

export default BasicCard;

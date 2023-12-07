import React from "react";
import "../../styles/home.css";
import { SearchHistoryCard } from "../component/searchhistorycard";
import { Sidebar } from "../component/sidebar";

export const SearchHistory = () => {
  return (
    <div className="history">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="historylists">
        <SearchHistoryCard />
      </div>
    </div>
  );
};

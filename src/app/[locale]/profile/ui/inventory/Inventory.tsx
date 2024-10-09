"use client";
import React, { useState } from "react";
import ServerSelectionModal from "./ServerSelectionModal";
import { baseURL } from "@/api/instance/instance";
import { SettingsIcon } from "@/shared/assets/icons/SettingsIcon";
import { useTranslations } from "next-intl";
import { SearchIcon } from "@/shared/assets";
import ModalPortal from "@/shared/components/ModalPortal/ModalPortal";

export const Inventory = ({
  userGifts,
  allGiftsByLevel,
  userId,
}: {
  userGifts: any[];
  allGiftsByLevel: any[];
  userId: number;
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedGift, setSelectedGift] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const t = useTranslations("Profile");
  console.log(allGiftsByLevel);
  const handleButtonClick = (userGift: any) => {
    setSelectedGift(userGift);
    setModalOpen(true);
  };

  const filteredGifts = userGifts.filter((userGift) =>
    userGift.Gifts.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}>
        <div className="searchInputWrap">
          <SearchIcon />
          <input
            value={searchQuery}
            placeholder={t("Table.Inventory.input_placeholder")}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            className="searchInput"
          />
        </div>
        <button className="btn blackBtn filterBtn">
          <SettingsIcon />
          <span>{t("filter")}</span>
        </button>
      </div>

      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ color: "white" }}>
            <th style={{ padding: "12px" }}>{t("Table.Inventory.title")}</th>
            <th style={{ padding: "12px" }}>{t("Table.Inventory.amount")}</th>
            <th style={{ padding: "12px" }}>{t("Table.Inventory.id")}</th>
            <th style={{ padding: "12px" }}>{t("Table.Inventory.actions")}</th>
          </tr>
        </thead>
        <tbody>
          {filteredGifts.length > 0 &&
            filteredGifts.map((userGift) => {
              return (
                <tr key={userGift.giftId}>
                  <td
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}>
                    <img
                      src={
                        !userGift.product.isGift
                          ? userGift.product.image
                          : `${baseURL}${userGift.Gifts.iconUrl}`
                      }
                      alt={userGift.Gifts.name}
                      style={{
                        width: "60px",
                        height: "60px",
                        marginRight: "8px",
                      }}
                    />
                    {userGift.Gifts.name}
                  </td>
                  <td style={{ padding: "12px" }}>{userGift.amount}</td>
                  <td style={{ padding: "12px" }}>{userGift.Gifts.id}</td>
                  <td style={{ padding: "12px" }}>
                    {userGift.server ? (
                        <div>
                          <p className="inventory-table__row-title">
                            {t("server")}: {userGift.server.name}
                          </p>
                          <p className="inventory-table__row-description">
                            IP: {userGift.server.ip}
                          </p>
                        </div>
                    ) : (
                        <button
                            className="btn lightBtn wideBtn"
                            onClick={() => handleButtonClick(userGift)}>
                          {t("activate")}
                        </button>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {isModalOpen && selectedGift && (
        <ModalPortal>
          <ServerSelectionModal
            onClose={() => setModalOpen(false)}
            token={localStorage.getItem("accessToken")!}
            userId={userId}
            productId={selectedGift.giftId}
          />
        </ModalPortal>
      )}
    </div>
  );
};

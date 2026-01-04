"use client";

import Script from "next/script";

export default function PricingTable() {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md p-4 mt-4">

      <Script
        src="https://js.stripe.com/v3/pricing-table.js"
        strategy="afterInteractive"
      />

      <stripe-pricing-table
        pricing-table-id="prctbl_1Slz2WBTcFRiXn7vewNFnRE8"
        publishable-key="pk_live_51R3cMHBTcFRiXn7vAJqloLrBccGgxscB2q3LNIoK0i2FwB2CQLO1bqfIS5ztnXQlS1RLb8tiS2mXVU8UEprdrVsZ00pzAprfEJ"
        client-reference-id="user123"
        style={{ width: "100%" }}
      />
    </div>
  );
}

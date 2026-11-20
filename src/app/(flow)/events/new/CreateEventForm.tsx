"use client";

import { useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { SelectField } from "@/components/ui/SelectField";
import { Switch } from "@/components/ui/Switch";

// Event categories from the feature document, section 9.1.
const CATEGORIES = [
  "Conference",
  "Education",
  "Technology",
  "Business",
  "Workshop",
  "Training",
  "Community",
  "Entertainment",
  "Networking",
];

// Ticket types the organiser has set up (placeholders until the form for adding them exists).
const TICKET_TYPES = [
  { name: "Early bird", badge: "b-ver", detail: "[quantity] · ends [date]", price: "₦[price]" },
  { name: "Free", badge: "b-sub", detail: "[quantity] · [who qualifies]", price: "₦0" },
  { name: "Regular", badge: "b-sub", detail: "[quantity]", price: "₦[price]" },
  { name: "VIP", badge: "b-rev", detail: "[quantity]", price: "₦[price]" },
  { name: "Premium", badge: "b-off", detail: "[quantity]", price: "₦[price]" },
];

export function CreateEventForm() {
  const [bannerName, setBannerName] = useState<string | null>(null);
  const [promote, setPromote] = useState(false);
  const bannerInput = useRef<HTMLInputElement>(null);

  return (
    <>
      <button
        type="button"
        className="img"
        onClick={() => bannerInput.current?.click()}
        style={{ height: 120, border: "1.5px dashed #AEB7B0", flexDirection: "column", gap: 6, fontFamily: "inherit", width: "100%", cursor: "pointer" }}
      >
        <Icon name="upload" />
        {bannerName ?? "Upload banner or flyer · 1600×900"}
      </button>
      <input
        ref={bannerInput}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => setBannerName(e.target.files?.[0]?.name ?? null)}
      />

      <div className="field">
        <label htmlFor="title">Event title</label>
        <input className="inp" id="title" placeholder="Give your event a clear name" style={{ height: 44 }} />
      </div>

      <div className="grid2" style={{ gap: 10 }}>
        <SelectField id="category" label="Category" options={CATEGORIES} />
        <div className="field">
          <label htmlFor="startsAt">Date &amp; time</label>
          <input className="inp" id="startsAt" type="datetime-local" style={{ height: 44 }} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="venue">Venue</label>
        <input className="inp" id="venue" placeholder="Venue name and address" style={{ height: 44 }} />
      </div>

      <div className="between" style={{ marginTop: 4 }}>
        <p className="flabel">Ticket types</p>
        {/* TODO: form to add / edit a ticket type (name, quantity, price, sales end date) */}
        <button type="button" className="link" style={{ fontSize: 13, background: "none", border: 0, cursor: "pointer" }}>
          + Add type
        </button>
      </div>
      <div className="card" style={{ padding: "2px 14px" }}>
        {TICKET_TYPES.map((type) => (
          <div key={type.name} className="li" style={{ padding: "10px 0" }}>
            <span className={`badge ${type.badge}`} style={{ width: 74, justifyContent: "center" }}>{type.name}</span>
            <span className="grow sm">{type.detail}</span>
            <span className="h3" style={{ fontSize: 14 }}>{type.price}</span>
          </div>
        ))}
      </div>

      <div className="card row" style={{ padding: "12px 14px" }}>
        <span className="grow">
          <span className="h3" style={{ display: "block", fontSize: 14 }} id="promote-label">Promote after approval</span>
          <span className="sm">Featured placement in Events</span>
        </span>
        <Switch checked={promote} onChange={setPromote} labelledBy="promote-label" />
      </div>
    </>
  );
}

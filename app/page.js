'use client';

import { useState, useMemo } from "react";

const PRODUCTS = {
  taskChair: {
    opt1: { mfr: "COE", model: "OfficeSource Orion", desc: "Mesh Back Task Chair", specs: "Black Base · 275 lb capacity", warranty: "Limited Lifetime", price: 208, img: "/images/taskChair_opt1.jpg" },
    opt2: { mfr: "Sit On It", model: "Hexy Task Chair", desc: "Mesh Back, Swivel Tilt", specs: "Black Base · 300 lb capacity", warranty: "Limited Lifetime", price: 383, img: "/images/taskChair_opt2.jpg" },
  },
  taskStool: {
    opt1: { mfr: "COE", model: "OfficeSource Orion", desc: "Armless Task Stool, Mesh Back", specs: "Black Base · 275 lb capacity", warranty: "Limited Lifetime", price: 261, img: "/images/taskStool_opt1.jpg" },
    opt2: { mfr: "Sit On It", model: "Hexy Armless Task Stool", desc: "Mesh Back, Carpet Casters", specs: "Black Base · 300 lb capacity", warranty: "Limited Lifetime", price: 424, img: "/images/taskStool_opt2.jpg" },
  },
  waitRegular: {
    opt1: { mfr: "Sit On It", model: 'Aviera 24" Metal Guest', desc: "Upholstered Seat & Back, Grade 2 Vinyl", specs: "Black Base · Poly Caps · Multi-Surface Glides · 500 lb capacity", warranty: "Lifetime", price: 719.5, img: "/images/waitRegular_opt1.jpg" },
    opt2: { mfr: "All Seating", model: "Ruhe Side Chair", desc: "Upholstered Seat & Back", specs: "Silver Base · Poly Caps · Multi-Surface Glides · 400 lb capacity", warranty: "12 Year", price: 639, img: "/images/waitRegular_opt2.jpg" },
  },
  waitBariatric: {
    opt1: { mfr: "Sit On It", model: 'Aviera 30" Metal Guest', desc: "Upholstered Seat & Back, Grade 2 Vinyl", specs: "Black Base · Poly Caps · Multi-Surface Glides · 750 lb capacity", warranty: "Lifetime", price: 885, img: "/images/waitBariatric_opt1.jpg" },
    opt2: { mfr: "All Seating", model: "Ruhe Guest Plus Chair", desc: "Upholstered Seat & Back", specs: "Silver Base · Poly Caps · Multi-Surface Glides · 500 lb capacity", warranty: "12 Year", price: 802, img: "/images/waitBariatric_opt2.jpg" },
  },
  guestArms: {
    opt1: { mfr: "Sit On It", model: "Cora Guest Chair", desc: "Upholstered Seat & Back, Grade 3 Vinyl", specs: "Black or Silver Base · Multi-Surface Glides · 500 lb capacity", warranty: "12 Year", price: 352, img: "/images/guestArms_opt1.jpg" },
    opt2: { mfr: "COE", model: 'OfficeSource Big & Tall 22"', desc: "Guest Chair with Arms, Upholstered", specs: "Black or Gray Vinyl · Black Base · 300 lb capacity", warranty: "2 Year", price: 210, img: "/images/guestArms_opt2.jpg" },
  },
  guestNoArms: {
    opt1: { mfr: "Sit On It", model: "Cora Guest Chair", desc: "Armless, Upholstered Seat & Back, Grade 3 Vinyl", specs: "Black or Silver Base · Multi-Surface Glides · 500 lb capacity", warranty: "12 Year", price: 324, img: "/images/guestNoArms_opt1.jpg" },
    opt2: null,
  },
  kitchenChair: {
    opt1: { mfr: "COE", model: "OfficeSource Slash", desc: "Armless Guest Chair, Poly Seat & Back", specs: "Silver Legs", warranty: "Limited Lifetime", price: 91, img: "/images/kitchenChair_opt1.jpg" },
    opt2: { mfr: "Sit On It", model: "Rio Side Chair", desc: "Armless Guest Chair, Poly Seat & Back", specs: "Black or Silver Legs", warranty: "Limited Lifetime", price: 183, img: "/images/kitchenChair_opt2.jpg" },
  },
  hipChair: { opt1: null, opt2: null },
};

const SECTIONS = [
  { title: "CLINIC", groups: [
    { label: "Task Chairs", items: [
      { id: "c1", area: "Front Desk", qty: 3, productKey: "taskChair" },
      { id: "c2", area: "Surgery Scheduling", qty: 1, productKey: "taskChair" },
      { id: "c3", area: "Shared Office", qty: 4, productKey: "taskChair" },
      { id: "c4", area: "3 Back Offices", qty: 3, productKey: "taskChair" },
    ]},
    { label: "Waiting Room Chairs", items: [
      { id: "w1", area: "Waiting Room — Bariatric", qty: 1, productKey: "waitBariatric" },
      { id: "w2", area: "Waiting Room — Regular", qty: 9, productKey: "waitRegular" },
      { id: "w3", area: "Waiting Room — Hip Chair", qty: 1, productKey: "hipChair" },
      { id: "w4", area: "Waiting Room — Therapy Side Bariatric", qty: 1, productKey: "waitBariatric" },
      { id: "w5", area: "Waiting Room — Therapy Side Regular", qty: 1, productKey: "waitRegular" },
    ]},
    { label: "Guest Chairs", items: [
      { id: "g1", area: "Exam Room — With Armrests", qty: 8, productKey: "guestArms" },
      { id: "g2", area: "Exam Room — Without Armrests", qty: 8, productKey: "guestNoArms" },
      { id: "g3", area: "Surgery Scheduling", qty: 2, productKey: "guestArms" },
      { id: "g4", area: "Radiology", qty: 1, productKey: "guestArms" },
    ]},
    { label: "Counter Height Task Chairs", items: [
      { id: "s1", area: "Nurses Station", qty: 4, productKey: "taskStool" },
      { id: "s2", area: "Radiology", qty: 1, productKey: "taskStool" },
    ]},
    { label: "Kitchen Chairs", items: [
      { id: "k1", area: "Breakroom", qty: 8, productKey: "kitchenChair" },
    ]},
  ]},
  { title: "THERAPY", groups: [
    { label: "Task Chairs", items: [
      { id: "t1", area: "Shared PT Office", qty: 4, productKey: "taskChair" },
    ]},
    { label: "Guest Chairs", items: [
      { id: "t2", area: "Treatment Stations (Plinths)", qty: 6, productKey: "guestNoArms" },
      { id: "t3", area: "OT", qty: 1, productKey: "guestNoArms" },
    ]},
    { label: "Armless Guest Chair", items: [
      { id: "t4", area: "Therapy Pulley", qty: 1, productKey: "guestNoArms" },
    ]},
  ]},
];

const allItems = SECTIONS.flatMap(s => s.groups.flatMap(g => g.items));

function fmt(n) {
  if (n == null) return "—";
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function OptionPill({ label, selected, onClick, disabled }) {
  const colors = selected
    ? { background: "#1a3a6b", borderColor: "#1a3a6b", color: "#fff" }
    : { background: "#fff", borderColor: "#d0d7e2", color: "#3a4a5e" };
  return (
    <button style={{ padding: "6px 14px", borderRadius: 6, fontSize: 13, fontWeight: 600, border: "2px solid", cursor: disabled ? "not-allowed" : "pointer", transition: "all .15s", opacity: disabled ? 0.35 : 1, display: "inline-flex", alignItems: "center", gap: 6, whiteSpace: "nowrap", ...colors }} onClick={disabled ? undefined : onClick}>
      {label}
    </button>
  );
}

function NeedAnotherPill({ selected, onClick }) {
  const colors = selected
    ? { background: "#f59e0b", borderColor: "#d97706", color: "#fff" }
    : { background: "#fff", borderColor: "#d0d7e2", color: "#92400e" };
  return (
    <button onClick={onClick} style={{ padding: "6px 14px", borderRadius: 6, fontSize: 13, fontWeight: 600, border: "2px solid", cursor: "pointer", transition: "all .15s", display: "inline-flex", alignItems: "center", gap: 4, whiteSpace: "nowrap", ...colors }}>
      <span style={{ fontSize: 14 }}>⚑</span> Need Another Option
    </button>
  );
}

export default function Configurator() {
  const initState = {};
  allItems.forEach(item => {
    const p = PRODUCTS[item.productKey];
    const hasOpt1 = p.opt1 != null;
    const hasOpt2 = p.opt2 != null;
    let defaultChoice = "none";
    if (!hasOpt1 && !hasOpt2) defaultChoice = "another";
    initState[item.id] = { qty: item.qty, choice: defaultChoice, customPrice: "", note: "" };
  });

  const [state, setState] = useState(initState);
  const [expandedSpecs, setExpandedSpecs] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState(null);

  const update = (id, patch) => setState(s => ({ ...s, [id]: { ...s[id], ...patch } }));

  const summary = useMemo(() => {
    let total = 0, configured = 0, totalItems = allItems.length, flagged = 0, totalUnits = 0;
    allItems.forEach(item => {
      const s = state[item.id];
      const p = PRODUCTS[item.productKey];
      let unitPrice = 0;
      if (s.choice === "opt1" && p.opt1) unitPrice = p.opt1.price;
      else if (s.choice === "opt2" && p.opt2) unitPrice = p.opt2.price;
      else if (s.choice === "another" && s.customPrice) unitPrice = parseFloat(s.customPrice) || 0;
      if (s.choice === "another") flagged++;
      if (s.choice !== "none") configured++;
      total += unitPrice * s.qty;
      totalUnits += s.qty;
    });
    return { total, configured, totalItems, flagged, totalUnits };
  }, [state]);

  const getLineTotal = (item) => {
    const s = state[item.id]; const p = PRODUCTS[item.productKey];
    if (s.choice === "opt1" && p.opt1) return p.opt1.price * s.qty;
    if (s.choice === "opt2" && p.opt2) return p.opt2.price * s.qty;
    if (s.choice === "another" && s.customPrice) return (parseFloat(s.customPrice) || 0) * s.qty;
    return null;
  };

  const getSelectedProduct = (item) => {
    const s = state[item.id]; const p = PRODUCTS[item.productKey];
    if (s.choice === "opt1") return p.opt1;
    if (s.choice === "opt2") return p.opt2;
    return null;
  };

  const toggleSpecs = (id) => setExpandedSpecs(s => ({ ...s, [id]: !s[id] }));

  const handlePrint = () => window.print();

  const buildEmailBody = () => {
    let body = `Crystal Clinic Orthopedic — Solon\nPR# 16658 Furniture Selection Summary\n\nCombined Plan Total: ${fmt(summary.total)}\nConfigured: ${summary.configured}/${summary.totalItems} | Units: ${summary.totalUnits}${summary.flagged > 0 ? ` | Flagged: ${summary.flagged}` : ""}\n\n`;
    SECTIONS.forEach(section => {
      body += `--- ${section.title} ---\n`;
      section.groups.forEach(group => {
        body += `\n${group.label}:\n`;
        group.items.forEach(item => {
          const s = state[item.id];
          const sel = getSelectedProduct(item);
          const lt = getLineTotal(item);
          let pick = s.choice === "another" ? "NEEDS FOLLOW-UP" : s.choice === "none" ? "Not selected" : `${sel?.mfr} ${sel?.model}`;
          body += `  ${item.area} (qty ${s.qty}) — ${pick} — ${lt != null ? fmt(lt) : "—"}`;
          if (s.note) body += ` [Note: ${s.note}]`;
          body += "\n";
        });
      });
    });
    return body;
  };

  const handleEmail = async () => {
    setSending(true);
    setSendError(null);
    try {
      const res = await fetch("/api/send-selection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: "Crystal Clinic Orthopedic — Furniture Selection Summary",
          body: buildEmailBody(),
          summary: {
            total: fmt(summary.total),
            configured: summary.configured,
            totalItems: summary.totalItems,
            totalUnits: summary.totalUnits,
            flagged: summary.flagged,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");
      setSent(true);
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      setSendError(err.message);
      setTimeout(() => setSendError(null), 5000);
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0f2444 0%, #1a3a6b 100%)", padding: "28px 32px 22px", borderBottom: "4px solid #c2302e" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 700, letterSpacing: 2.5, color: "#7eb8f7", textTransform: "uppercase", marginBottom: 4 }}>Contract Source, Inc.</div>
            <h1 style={{ fontSize: 24, fontWeight: 400, color: "#fff", margin: 0, lineHeight: 1.3 }}>Crystal Clinic Orthopedic — Solon</h1>
            <div style={{ fontSize: 13, color: "#8aa4c8", marginTop: 4, fontFamily: "sans-serif" }}>PR# 16658 · Furniture Selection Configurator</div>
          </div>
          <div style={{ textAlign: "right", minWidth: 220 }}>
            <div style={{ fontSize: 11, fontFamily: "sans-serif", fontWeight: 700, letterSpacing: 1.5, color: "#7eb8f7", textTransform: "uppercase", marginBottom: 6 }}>Combined Plan Total</div>
            <div style={{ fontSize: 34, fontWeight: 700, color: "#fff", fontFamily: "'Georgia', serif", lineHeight: 1 }}>{fmt(summary.total)}</div>
            <div style={{ fontSize: 12, color: "#8aa4c8", marginTop: 6, fontFamily: "sans-serif" }}>
              {summary.configured}/{summary.totalItems} items configured · {summary.totalUnits} total units
              {summary.flagged > 0 && <span style={{ color: "#fbbf24", marginLeft: 8 }}>⚑ {summary.flagged} flagged</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px 120px" }}>
        {SECTIONS.map(section => (
          <div key={section.title} style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 13, fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 700, letterSpacing: 2.5, color: "#0f2444", textTransform: "uppercase", padding: "10px 0", borderBottom: "2px solid #0f2444", marginBottom: 16 }}>{section.title}</div>
            {section.groups.map(group => {
              const groupTotal = group.items.reduce((sum, item) => sum + (getLineTotal(item) || 0), 0);
              return (
                <div key={group.label} style={{ marginBottom: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "8px 12px", background: "#e2e8f0", borderRadius: 6, marginBottom: 2 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, fontFamily: "sans-serif", color: "#334155" }}>{group.label}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, fontFamily: "sans-serif", color: "#1a3a6b" }}>{fmt(groupTotal)}</span>
                  </div>
                  {group.items.map(item => {
                    const s = state[item.id];
                    const p = PRODUCTS[item.productKey];
                    const hasOpt1 = p.opt1 != null, hasOpt2 = p.opt2 != null;
                    const lineTotal = getLineTotal(item);
                    const selectedProduct = getSelectedProduct(item);
                    const specsOpen = expandedSpecs[item.id];
                    const isFlagged = s.choice === "another";
                    return (
                      <div key={item.id} style={{ background: isFlagged ? "#fffbeb" : "#fff", border: isFlagged ? "1px solid #f59e0b" : "1px solid #e8ecf1", borderRadius: 6, padding: "12px 16px", marginBottom: 2, transition: "background .2s" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                          <div style={{ flex: "1 1 180px", minWidth: 140 }}>
                            <span style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>{item.area}</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, flex: "0 0 auto" }} className="no-print">
                            <span style={{ fontSize: 11, fontFamily: "sans-serif", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: 1 }}>Qty</span>
                            <input type="number" min={0} value={s.qty} onChange={e => update(item.id, { qty: Math.max(0, parseInt(e.target.value) || 0) })} style={{ width: 52, padding: "5px 6px", border: "1.5px solid #cbd5e1", borderRadius: 5, fontSize: 14, fontWeight: 700, textAlign: "center", fontFamily: "Georgia, serif", background: "#f8fafc", color: "#1e293b" }} />
                          </div>
                          <div style={{ display: "flex", gap: 6, flex: "1 1 auto", flexWrap: "wrap", justifyContent: "center" }} className="no-print">
                            <OptionPill label={hasOpt1 ? `Opt 1 · ${fmt(p.opt1.price)}` : "Opt 1 · N/A"} selected={s.choice === "opt1"} disabled={!hasOpt1} onClick={() => update(item.id, { choice: s.choice === "opt1" ? "none" : "opt1" })} />
                            <OptionPill label={hasOpt2 ? `Opt 2 · ${fmt(p.opt2.price)}` : "Opt 2 · N/A"} selected={s.choice === "opt2"} disabled={!hasOpt2} onClick={() => update(item.id, { choice: s.choice === "opt2" ? "none" : "opt2" })} />
                            <NeedAnotherPill selected={isFlagged} onClick={() => update(item.id, { choice: s.choice === "another" ? "none" : "another" })} />
                          </div>
                          <div style={{ flex: "0 0 100px", textAlign: "right" }}>
                            <span style={{ fontSize: 15, fontWeight: 700, color: lineTotal != null ? "#0f2444" : "#94a3b8", fontFamily: "Georgia, serif" }}>{lineTotal != null ? fmt(lineTotal) : "—"}</span>
                          </div>
                        </div>

                        {/* Flagged row */}
                        {isFlagged && (
                          <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                            <span style={{ fontSize: 12, color: "#92400e", fontWeight: 600, fontFamily: "sans-serif" }}>⚑ Needs follow-up</span>
                            <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="no-print">
                              <span style={{ fontSize: 12, color: "#64748b", fontFamily: "sans-serif" }}>Temp unit price:</span>
                              <span style={{ fontSize: 14, fontWeight: 700, color: "#92400e" }}>$</span>
                              <input type="number" min={0} step="0.01" placeholder="0.00" value={s.customPrice} onChange={e => update(item.id, { customPrice: e.target.value })} style={{ width: 90, padding: "4px 8px", border: "1.5px solid #f59e0b", borderRadius: 5, fontSize: 14, fontWeight: 600, fontFamily: "Georgia, serif", background: "#fffef5", color: "#92400e" }} />
                            </div>
                          </div>
                        )}

                        {/* Specs expandable with image */}
                        {selectedProduct && (
                          <div style={{ marginTop: 8 }}>
                            <button onClick={() => toggleSpecs(item.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "#6683a3", fontFamily: "sans-serif", padding: 0, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }} className="no-print">
                              <span style={{ transform: specsOpen ? "rotate(90deg)" : "rotate(0)", transition: "transform .15s", display: "inline-block" }}>▸</span>
                              {selectedProduct.mfr} {selectedProduct.model}
                            </button>
                            {specsOpen && (
                              <div style={{ marginTop: 6, padding: "10px 14px", background: "#f0f4f8", borderRadius: 5, fontSize: 12, lineHeight: 1.7, fontFamily: "sans-serif", color: "#475569", display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
                                {selectedProduct.img && (
                                  <img
                                    src={selectedProduct.img}
                                    alt={selectedProduct.model}
                                    style={{ width: 120, height: 120, objectFit: "contain", borderRadius: 6, background: "#fff", border: "1px solid #e2e8f0", padding: 4, flexShrink: 0 }}
                                  />
                                )}
                                <div>
                                  <div><strong>{selectedProduct.mfr}</strong> — {selectedProduct.model}</div>
                                  <div>{selectedProduct.desc}</div>
                                  <div style={{ color: "#64748b" }}>{selectedProduct.specs}</div>
                                  <div style={{ color: "#059669" }}>Warranty: {selectedProduct.warranty}</div>
                                  <div style={{ marginTop: 4, fontWeight: 700, color: "#0f2444" }}>Unit Price: {fmt(selectedProduct.price)}</div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Notes */}
                        <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ fontSize: 11, color: "#94a3b8", fontFamily: "sans-serif", flexShrink: 0 }}>📝</span>
                          <input type="text" placeholder="Add a note..." value={s.note} onChange={e => update(item.id, { note: e.target.value })} style={{ flex: 1, padding: "4px 8px", border: "1px solid #e2e8f0", borderRadius: 4, fontSize: 12, fontFamily: "sans-serif", color: "#475569", background: "#fafbfc" }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Sticky footer */}
      <div className="no-print" style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "linear-gradient(135deg, #0f2444 0%, #1a3a6b 100%)", borderTop: "3px solid #c2302e", padding: "12px 24px", display: "flex", justifyContent: "center", alignItems: "center", gap: 32, flexWrap: "wrap", zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 10, fontFamily: "sans-serif", fontWeight: 700, letterSpacing: 1.5, color: "#7eb8f7", textTransform: "uppercase" }}>Configured</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", fontFamily: "Georgia" }}>{summary.configured} / {summary.totalItems}</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 10, fontFamily: "sans-serif", fontWeight: 700, letterSpacing: 1.5, color: "#7eb8f7", textTransform: "uppercase" }}>Total Units</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", fontFamily: "Georgia" }}>{summary.totalUnits}</div>
          </div>
          {summary.flagged > 0 && (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, fontFamily: "sans-serif", fontWeight: 700, letterSpacing: 1.5, color: "#fbbf24", textTransform: "uppercase" }}>Flagged</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#fbbf24", fontFamily: "Georgia" }}>⚑ {summary.flagged}</div>
            </div>
          )}
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 10, fontFamily: "sans-serif", fontWeight: 700, letterSpacing: 1.5, color: "#7eb8f7", textTransform: "uppercase" }}>Combined Plan Total</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#fff", fontFamily: "Georgia" }}>{fmt(summary.total)}</div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button onClick={handlePrint} style={{ padding: "8px 20px", borderRadius: 6, border: "2px solid #7eb8f7", background: "transparent", color: "#7eb8f7", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "sans-serif" }}>🖨 Print</button>
          <button
            onClick={handleEmail}
            disabled={sending}
            style={{ padding: "8px 20px", borderRadius: 6, border: "2px solid #7eb8f7", background: sent ? "#059669" : "transparent", color: sent ? "#fff" : "#7eb8f7", fontWeight: 700, fontSize: 13, cursor: sending ? "wait" : "pointer", fontFamily: "sans-serif", transition: "all .2s" }}
          >
            {sending ? "Sending…" : sent ? "✓ Sent!" : "✉ Submit Selections"}
          </button>
          {sendError && <span style={{ color: "#fca5a5", fontSize: 12, fontFamily: "sans-serif" }}>{sendError}</span>}
        </div>
      </div>
    </div>
  );
}

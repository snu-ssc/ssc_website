"use client";

import { useState } from "react";

type Area = { name: string; description: string };

export function AreaTabs({ items }: { items: Area[] }) {
  const [selected, setSelected] = useState(0);
  return <div className="area-tabs">
    <div role="tablist" aria-label="SSC Core Areas" className="area-tabs__list">
      {items.map((item, index) => <button key={item.name} role="tab" aria-selected={selected === index} aria-controls={`area-${index}`} id={`tab-${index}`} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={(event) => {
        if (event.key === "ArrowRight") setSelected((selected + 1) % items.length);
        if (event.key === "ArrowLeft") setSelected((selected - 1 + items.length) % items.length);
      }}>{item.name}</button>)}
    </div>
    <div className="area-tabs__panel" role="tabpanel" id={`area-${selected}`} aria-labelledby={`tab-${selected}`}><strong>{items[selected].name}</strong><p>{items[selected].description}</p></div>
  </div>;
}

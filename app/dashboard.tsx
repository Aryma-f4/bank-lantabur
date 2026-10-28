"use client";

import { useState } from "react";
import { ArrowUpRight, ArrowRight, LayoutDashboard, Layers, Workflow, ShieldCheck, ChevronRight, Search, Bell, SlidersHorizontal, Download, Sparkles, Check, CircleHelp, Activity } from "lucide-react";

const applicants = [
  { id: "LNT-0261", name: "Ahmad Fauzi", business: "Perdagangan bahan pokok", initials: "AF", amount: 45000000, term: 24, probability: 12.4, date: "28 Okt 2026" },
  { id: "LNT-0262", name: "Siti Rahmawati", business: "Usaha konveksi", initials: "SR", amount: 85000000, term: 36, probability: 38.6, date: "28 Okt 2026" },
  { id: "LNT-0263", name: "Budi Santoso", business: "Distribusi hasil pertanian", initials: "BS", amount: 150000000, term: 48, probability: 67.2, date: "27 Okt 2026" },
  { id: "LNT-0264", name: "Nur Aisyah", business: "Usaha kuliner", initials: "NA", amount: 25000000, term: 12, probability: 8.9, date: "27 Okt 2026" },
];
const currency = (n: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
function zone(p: number) { return p < 20 ? { label: "Risiko rendah", color: "green", action: "Verifikasi dokumen dasar" } : p <= 55 ? { label: "Tinjauan manual", color: "amber", action: "Lakukan analisis 5C & OTS" } : { label: "Risiko tinggi", color: "red", action: "Tinjau indikator risiko utama" }; }

export function LantaburDemo() {
  const [view, setView] = useState("Ringkasan");
  const [selected, setSelected] = useState(applicants[0]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(false);
  const [result, setResult] = useState(false);
  const [synced, setSynced] = useState(false);
  const [notice, setNotice] = useState(false);
  const risk = zone(selected.probability);
  const visible = applicants.filter(a => `${a.name} ${a.id} ${a.business}`.toLowerCase().includes(query.toLowerCase()) && (!filter || a.probability >= 20));
  function exportReport() {
    const csv = "ID,Nama dummy,Plafon,Tenor,Probabilitas simulasi\n" + applicants.map(a => `${a.id},${a.name},${a.amount},${a.term},${a.probability}%`).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = "lantabur-data-dummy.csv"; link.click(); URL.revokeObjectURL(url);
  }
  return <div className="lnt-app">
    <aside className="lnt-sidebar">
      <a href="https://amantech.id/" className="lnt-brand" aria-label="Kembali ke amantech.id"><img src="/partners/lantabur.webp" alt="BPRS Lantabur Tebuireng" width="165" height="48" /></a>
      <div className="lnt-workspace"><span className="lnt-bank-icon">L</span><div><strong>Financing Workspace</strong><small>Bank Lantabur · Sandbox</small></div><ChevronRight size={14}/></div>
      <p className="lnt-nav-label">WORKSPACE</p>
      <nav aria-label="Menu demo">{[["Ringkasan", LayoutDashboard],["Pengajuan", Layers],["Integrasi sistem", Workflow],["Model AI", Sparkles]].map(([label, Icon]) => { const I = Icon as typeof LayoutDashboard; return <button key={label as string} className={view === label ? "active" : ""} onClick={() => setView(label as string)}><I size={18}/>{label as string}{label === "Pengajuan" && <span>04</span>}</button>; })}</nav>
      <div className="lnt-sidebar-bottom"><div className="lnt-sandbox"><ShieldCheck size={23}/><strong>Ruang eksplorasi aman.</strong><p>Seluruh data dan hasil penilaian adalah simulasi.</p><a href="https://amantech.id/#portofolio">Dibuat oleh amantech.id <ArrowUpRight size={13}/></a></div><div className="lnt-user"><span>DA</span><div><strong>Demo Analyst</strong><small>Credit analyst</small></div><CircleHelp size={17}/></div></div>
    </aside>
    <main className="lnt-main">
      <header className="lnt-topbar"><div>Workspace <ChevronRight size={13}/> <strong>{view}</strong></div><div><span className="lnt-demo-tag">PROTOTIPE INTERAKTIF</span><button aria-label="Lihat notifikasi demo" onClick={() => setNotice(!notice)}><Bell size={18}/></button><span className="lnt-avatar">DA</span></div></header>
      {notice && <div className="lnt-notice" role="status">Tidak ada notifikasi baru. Ini adalah lingkungan demo dengan data fiktif.</div>}
      <div className="lnt-content">
        <div className="lnt-page-title"><div><p className="lnt-eyebrow">FINANCING INTELLIGENCE / 01</p><h1>{view === "Ringkasan" ? "Keputusan lebih jernih." : view}</h1><p>Sistem yang terhubung. Analisis yang lebih terarah.</p></div><button className="lnt-export" onClick={exportReport}><Download size={15}/> Ekspor data dummy</button></div>
        <div className="lnt-hero"><div><span className="lnt-live"><i/> DEMO SISTEM BANK × ARTIFICIAL INTELLIGENCE</span><h2>Data menjadi wawasan.<br/><em>Wawasan menjadi keyakinan.</em></h2><p>Pendamping analis untuk memahami risiko pembiayaan,<br className="lnt-desktop-br"/> dengan keputusan akhir tetap di tangan manusia.</p><button onClick={() => { setView("Pengajuan"); document.getElementById("lnt-applications")?.scrollIntoView({ behavior: "smooth", block: "center" }); }}>Jelajahi pengajuan <ArrowUpRight size={16}/></button></div><div className="lnt-orbit" aria-hidden="true"><span className="lnt-orbit-label label-one">BANKING SYSTEM</span><div className="lnt-ring ring-one"/><div className="lnt-ring ring-two"/><div className="lnt-ring ring-three"/><div className="lnt-orbit-core"><Sparkles size={33}/></div><span className="lnt-node node-one"/><span className="lnt-node node-two"/><span className="lnt-orbit-label label-two">INTELLIGENCE LAYER</span></div></div>
        <div className="lnt-stats">{[["Total pengajuan", "04", "Seluruh pengajuan dummy", "01"],["Plafon pembiayaan", `Rp${applicants.reduce((sum, a) => sum + a.amount, 0) / 1000000} jt`, "Akumulasi data simulasi", "02"],["Perlu tinjauan analis", "02", "Zona kuning & merah", "03"],["Status integrasi", synced ? "Tersinkron" : "Sandbox", synced ? "Sinkronisasi dummy selesai" : "Tidak terhubung ke bank", "04"]].map(([label, value, desc, num]) => <div className="lnt-stat" key={label}><span>{label}<small>{num}</small></span><strong>{value}</strong><p>{desc}</p></div>)}</div>
        {view === "Integrasi sistem" && <section className="lnt-panel lnt-detail-panel"><h2>Alur integrasi sistem bank</h2><div className="lnt-pipeline">{["Sistem bank (mock)", "Validasi & encoding", "CatBoost (simulasi)", "Tinjauan analis"].map((s,i) => <div key={s}><span>0{i+1}</span><strong>{s}</strong><small>{i === 2 ? "Model asli belum dimuat" : "Lingkungan sandbox"}</small></div>)}</div><button className="lnt-primary" onClick={() => setSynced(true)}><Workflow size={15}/>{synced ? "Data dummy tersinkron" : "Simulasikan sinkronisasi"}</button><p role="status">{synced ? "4 pengajuan dummy siap ditinjau. Tidak ada koneksi ke sistem bank nyata." : "Demo kontrak alur integrasi; tidak mengirim atau membaca data nasabah nyata."}</p></section>}
        {view === "Model AI" && <section className="lnt-panel lnt-detail-panel"><h2>Dari notebook ke ruang kerja analis</h2><p>Konsep mengikuti new_colab_script_v6.ipynb: capping outlier, one-hot encoding, StandardScaler, SMOTE, dan perbandingan delapan model. CatBoost dan XGBoost dituning untuk evaluasi lanjutan.</p><div className="lnt-model-tags">{["CatBoost", "Random Forest", "XGBoost", "LightGBM", "ANN", "DNN", "Logistic Regression", "Decision Tree"].map(m => <span key={m}>{m}</span>)}</div><p>Artefak model dan dataset tidak disertakan. Probabilitas dalam demo adalah nilai ilustratif yang telah ditentukan, bukan hasil inferensi atau metrik evaluasi.</p></section>}
        <div className="lnt-bottom-grid">
          <section className="lnt-panel" id="lnt-applications"><div className="lnt-panel-heading"><div><h2>Pengajuan pembiayaan <span>04</span></h2><p>Kenali profilnya. Pahami risikonya.</p></div><span className="lnt-dummy-label">DATA DUMMY</span></div><div className="lnt-table-tools"><label><Search size={16}/><input aria-label="Cari pengajuan" placeholder="Cari nama atau ID pengajuan…" value={query} onChange={e => setQuery(e.target.value)}/></label><button className={filter ? "is-filtered" : ""} onClick={() => setFilter(!filter)} aria-pressed={filter}><SlidersHorizontal size={14}/>{filter ? "Perlu tinjauan" : "Filter risiko"}</button></div><div className="lnt-table-scroll"><table><thead><tr><th>NASABAH / PENGAJUAN</th><th>PLAFON</th><th>ZONA RISIKO</th><th><span className="lnt-sr">Detail</span></th></tr></thead><tbody>{visible.map(a => <tr key={a.id} className={selected.id === a.id ? "selected" : ""}><td><button className="lnt-applicant" onClick={() => { setSelected(a); setResult(false); }} aria-label={`Analisis ${a.name}`}><span>{a.initials}</span><div><strong>{a.name}</strong><small>{a.id} · {a.business}</small></div></button></td><td><strong>{currency(a.amount)}</strong><small>{a.term} bulan</small></td><td><span className={`lnt-risk ${zone(a.probability).color}`}><i/>{zone(a.probability).label}</span></td><td><button className="lnt-row-arrow" aria-label={`Pilih ${a.name}`} onClick={() => { setSelected(a); setResult(false); }}><ArrowUpRight size={16}/></button></td></tr>)}</tbody></table>{visible.length === 0 && <p className="lnt-empty">Tidak ada pengajuan yang cocok.</p>}</div><div className="lnt-table-footer"><span>Menampilkan {visible.length} dari 4 pengajuan</span><span>Oktober 2026</span></div></section>
          <section className="lnt-panel lnt-ai-panel"><div className="lnt-ai-heading"><span><Sparkles size={16}/> AI RISK INSIGHT</span><span>SIMULASI</span></div><div className="lnt-ai-person"><span>{selected.initials}</span><div><h2>{selected.name}</h2><p>{selected.id} · {selected.term} bulan</p></div></div><div className={`lnt-gauge ${risk.color}`} style={{ "--risk": `${selected.probability}%` } as React.CSSProperties}><div><strong>{selected.probability}<small>%</small></strong><span>Probabilitas default ilustratif</span></div></div><div className="lnt-scale"><span>0% / Rendah</span><span>100% / Tinggi</span></div><div className="lnt-ai-verdict"><span className={`lnt-risk ${risk.color}`}><i/>{risk.label}</span><p>{result ? risk.action + ". Keputusan akhir memerlukan verifikasi analis." : "Pilih pengajuan dan jalankan simulasi untuk melihat panduan tinjauan."}</p></div><button className="lnt-primary" onClick={() => setResult(true)}>{result ? <Check size={16}/> : <Sparkles size={16}/>} {result ? "Simulasi selesai" : "Jalankan simulasi"}<ArrowRight size={15}/></button><p className="lnt-ai-note" role="status">{result ? "Hasil dummy • Bukan persetujuan atau penolakan otomatis." : "Nilai dummy • Model terlatih belum terhubung"}</p></section>
        </div>
        <footer className="lnt-footer"><span><Activity size={13}/> Sandbox aktif <i/> Seluruh data fiktif</span><a href="https://amantech.id/#portofolio">A concept by <strong>amantech.id</strong><ArrowUpRight size={13}/></a></footer>
      </div>
    </main>
  </div>;
}

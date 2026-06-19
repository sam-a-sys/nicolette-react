import { useState } from "react";

export default function NicoletteReact() {
  const [activeTab, setActiveTab] = useState("f");

  const tabs = [
    { id: "f", label: "1.WF Choice" },
    { id: "v", label: "2.Job Seeker Buffer" },
    { id: "a", label: "3.Output Data" },
    { id: "p", label: "4.WF Run Log" },
  ];

  const iframeSrc = {
    v: "https://cs-crossproject-test.preview.softr.app/nicolette-v2-question-buffer-pub?show-toolbar=true",
    a: "https://cs-crossproject-test.preview.softr.app/nicolette-v2-jobseeker-lastrun-result-pub?autoUser=true&show-toolbar=true",
    p: "https://cs-crossproject-test.preview.softr.app/nicolette-v2-jobseeker-run-log-pub?autoUser=true&show-toolbar=true&device=mobile",
  };

  const refreshAll = () => {
    setActiveTab((t) => t); // simple re-render trick; real iframe refresh handled by key prop below
    setRefreshKey((k) => k + 1);
  };

  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center bg-purple-700 py-10 px-4">
      <h1 className="text-white text-2xl font-bold mb-1 tracking-wide">⚛ REACT VERSION</h1>
      <p className="text-purple-200 text-xs mb-6">Same widget, rebuilt as a React component</p>

      <div className="w-[350px] h-[630px] bg-white rounded-xl shadow-xl flex flex-col overflow-hidden">
        <div className="bg-black text-white px-3 py-3 text-[11px] font-bold uppercase tracking-wide flex items-center justify-center relative">
          <span className="flex-1 text-center pr-10">Nicolette Almeida, reporting for duty, in high heels</span>
          <button
            onClick={refreshAll}
            className="absolute right-3 border border-white text-white text-[9px] font-bold uppercase px-2 py-1 rounded hover:bg-white hover:text-black transition"
          >
            ↻ Refresh
          </button>
        </div>

        <div className="flex bg-white border-b border-gray-100">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex-1 py-3 px-0.5 text-[10px] font-bold uppercase ${
                activeTab === t.id ? "text-black border-b-2 border-black" : "text-gray-400"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1 bg-white overflow-hidden relative">
          {activeTab === "f" && (
            <div className="h-full w-full flex items-center justify-center bg-gradient-to-b from-black/40 to-black/40 bg-purple-300">
              <div className="text-center text-white px-4">
                <p className="text-sm font-semibold mb-2">Fillout form embed</p>
                <p className="text-xs opacity-80">(placeholder — real embed script would load here)</p>
              </div>
            </div>
          )}
          {activeTab !== "f" && (
            <iframe
              key={activeTab + refreshKey}
              src={iframeSrc[activeTab]}
              className="w-full h-full border-0 block"
              title={activeTab}
            />
          )}
        </div>
      </div>
    </div>
  );
}

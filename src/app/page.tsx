"use client";

import { useState } from "react";
import { questions, categories, getScore, getColor, getQuickWins } from "@/lib/questions";

type Stage = "intro" | "quiz" | "email" | "results";
type WorkspaceType = "home" | "office" | null;

const colorMap = {
  red: { bg: "bg-[#fef3f2]", border: "border-[#c4654a]", text: "text-[#c4654a]", label: "Needs attention", dot: "●" },
  orange: { bg: "bg-[#fef8f0]", border: "border-[#c9953a]", text: "text-[#c9953a]", label: "Room to improve", dot: "●" },
  green: { bg: "bg-[#f6f8f4]", border: "border-[#6b7c5e]", text: "text-[#6b7c5e]", label: "Working well", dot: "●" },
};

export default function AuditPage() {
  const [stage, setStage] = useState<Stage>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [workspaceType, setWorkspaceType] = useState<WorkspaceType>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState<ReturnType<typeof getScore> | null>(null);

  const totalQ = questions.length;
  const progress = Math.round((currentQ / totalQ) * 100);

  const handleAnswer = (score: number) => {
    const q = questions[currentQ];
    const newAnswers = { ...answers, [q.id]: score };
    setAnswers(newAnswers);
    if (currentQ < totalQ - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setStage("email");
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const scores = getScore(answers);
    setResults(scores);
    try {
      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, organisation, workspaceType, subscribe, answers, scores }),
      });
    } catch (_) {}
    setSubmitting(false);
    setStage("results");
  };

  const currentCategory = stage === "quiz" ? questions[currentQ]?.category : null;
  const cat = categories.find((c) => c.id === currentCategory);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f6f2f0" }}>
      {/* Header */}
      <header className="border-b border-[#cbb8b2] py-6 px-6">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <p className="font-cormorant italic text-[#44242b] text-lg">Spatial Wellness</p>
          </div>
          {stage === "quiz" && (
            <div className="text-sm text-[#8a7a75]">
              {currentQ + 1} / {totalQ}
            </div>
          )}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        {/* INTRO */}
        {stage === "intro" && (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <p className="font-cormorant italic text-[#44242b] text-xl">Free Spatial Wellness Audit</p>
              <h1 className="text-4xl font-semibold text-[#44242b] leading-tight">
                Your workspace is already shaping you.
              </h1>
              <p className="text-lg text-[#8a7a75] leading-relaxed font-cormorant italic">
                The question is whether it's working for you, or against you.
              </p>
            </div>

            <p className="text-[#8a7a75] leading-relaxed">
              In 3 minutes, this audit will give you a clear picture of how your workspace is performing across three dimensions: lighting, acoustics, and layout. You'll get a colour-coded score for each, and three things you can change immediately.
            </p>

            <div className="flex justify-center gap-8 py-4">
              {categories.map((c) => (
                <div key={c.id} className="text-center">
                  <div className="text-3xl mb-2">{c.icon}</div>
                  <p className="text-sm text-[#8a7a75] font-medium">{c.label}</p>
                </div>
              ))}
            </div>

            {!workspaceType ? (
              <div className="space-y-4">
                <p className="text-[#44242b] font-medium">I work...</p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setWorkspaceType("home")}
                    className="px-8 py-4 bg-white border-2 border-[#cbb8b2] text-[#44242b] font-medium hover:border-[#6b7c5e] hover:bg-[#6b7c5e] hover:text-white transition-all"
                  >
                    from home
                  </button>
                  <button
                    onClick={() => setWorkspaceType("office")}
                    className="px-8 py-4 bg-white border-2 border-[#cbb8b2] text-[#44242b] font-medium hover:border-[#6b7c5e] hover:bg-[#6b7c5e] hover:text-white transition-all"
                  >
                    in an office
                  </button>
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setStage("quiz")}
                  className="px-10 py-4 rounded-none text-white font-medium tracking-wide transition-all hover:opacity-90"
                  style={{ backgroundColor: "#6b7c5e" }}
                >
                  Start the audit, it takes 3 minutes
                </button>
                <button
                  onClick={() => setWorkspaceType(null)}
                  className="block mx-auto text-sm text-[#cbb8b2] hover:text-[#8a7a75] underline"
                >
                  Change workspace type
                </button>
              </>
            )}

            {!workspaceType && (
              <p className="text-xs text-[#cbb8b2]">
                No account needed. Your results are sent directly to your inbox.
              </p>
            )}
          </div>
        )}

        {/* QUIZ */}
        {stage === "quiz" && (
          <div className="space-y-8">
            {/* Progress bar */}
            <div className="w-full bg-[#cbb8b2] rounded-full h-1">
              <div
                className="h-1 rounded-full transition-all duration-300"
                style={{ width: `${progress}%`, backgroundColor: "#6b7c5e" }}
              />
            </div>

            {/* Category label */}
            {cat && (
              <div className="flex items-center gap-2">
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-sm font-medium text-[#8a7a75] uppercase tracking-widest">{cat.label}</span>
              </div>
            )}

            {/* Question */}
            <h2 className="text-2xl text-[#44242b] leading-snug">
              {questions[currentQ]?.text}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {questions[currentQ]?.options.map((opt) => (
                <button
                  key={opt.score}
                  onClick={() => handleAnswer(opt.score)}
                  className="w-full text-left p-4 border border-[#cbb8b2] bg-white hover:border-[#6b7c5e] hover:bg-[#6b7c5e] hover:text-white transition-all duration-200 text-[#44242b] leading-relaxed"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* EMAIL COLLECTION */}
        {stage === "email" && (
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl text-[#44242b]">Almost there.</h2>
              <p className="text-[#8a7a75] leading-relaxed font-cormorant italic text-xl">
                Where should we send your results?
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#8a7a75] mb-1">Your name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  className="w-full border border-[#cbb8b2] p-3 bg-white text-[#44242b] focus:outline-none focus:border-[#6b7c5e]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#8a7a75] mb-1">Work email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@company.com"
                  className="w-full border border-[#cbb8b2] p-3 bg-white text-[#44242b] focus:outline-none focus:border-[#6b7c5e]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#8a7a75] mb-1">Organisation (optional)</label>
                <input
                  type="text"
                  value={organisation}
                  onChange={(e) => setOrganisation(e.target.value)}
                  placeholder="Acme Ltd"
                  className="w-full border border-[#cbb8b2] p-3 bg-white text-[#44242b] focus:outline-none focus:border-[#6b7c5e]"
                />
              </div>
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={subscribe}
                    onChange={(e) => setSubscribe(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-[#6b7c5e] cursor-pointer"
                  />
                  <span className="text-sm text-[#8a7a75] leading-relaxed">
                    Keep me posted. I write about spatial wellness, straight to your inbox.
                  </span>
                </label>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!email || !name || submitting}
              className="w-full py-4 text-white font-medium tracking-wide transition-all disabled:opacity-40 hover:opacity-90"
              style={{ backgroundColor: "#6b7c5e" }}
            >
              {submitting ? "Processing..." : "View my results"}
            </button>
            <p className="text-xs text-[#cbb8b2] text-center">
              Your data is never shared or sold.
            </p>
          </div>
        )}

        {/* RESULTS */}
        {stage === "results" && results && (
          <div className="space-y-10">
            <div className="text-center space-y-3">
              <h2 className="text-3xl text-[#44242b]">Your Spatial Wellness Score</h2>
              <p className="font-cormorant italic text-[#8a7a75] text-xl">Here's what your workspace is doing to you.</p>
            </div>

            {/* Category scores */}
            <div className="space-y-4">
              {categories.map((cat) => {
                const score = results[cat.id];
                const color = getColor(score);
                const meta = colorMap[color];
                return (
                  <div key={cat.id} className={`p-5 border ${meta.bg} ${meta.border}`}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        <span className="font-medium text-[#44242b]">{cat.label}</span>
                      </div>
                      <span className={`text-sm font-medium ${meta.text}`}>
                        {meta.dot} {meta.label}
                      </span>
                    </div>
                    <div className="w-full bg-white rounded-full h-1.5 mt-3">
                      <div
                        className="h-1.5 rounded-full"
                        style={{
                          width: `${((score - 1) / 3) * 100}%`,
                          backgroundColor: color === "red" ? "#c4654a" : color === "orange" ? "#c9953a" : "#6b7c5e",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick wins */}
            <div className="space-y-4">
              <h3 className="text-xl text-[#44242b]">Three things to change first</h3>
              <div className="space-y-3">
                {getQuickWins(results, workspaceType || "office").map((win, i) => (
                  <div key={i} className="flex gap-3 p-4 bg-white border border-[#cbb8b2]">
                    <span className="text-[#6b7c5e] font-semibold shrink-0">{i + 1}.</span>
                    <p className="text-[#44242b] leading-relaxed">{win}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Toolkit CTA */}
            <div className="p-6 bg-white border border-[#cbb8b2] text-center space-y-3">
              <p className="text-[#44242b] leading-relaxed">
                Curious about products that can help? I've put together a toolkit of things I'd actually recommend.
              </p>
              <a
                href="https://spatial-wellness.com/toolkit"
                className="inline-block text-[#6b7c5e] font-medium hover:underline"
              >
                Browse the toolkit →
              </a>
            </div>

            {/* Full audit CTA */}
            <div className="p-8 text-center space-y-4" style={{ backgroundColor: "#44242b" }}>
              <h3 className="text-2xl text-[#f6f2f0]">Want the complete picture?</h3>
              <p className="text-[#cbb8b2] leading-relaxed font-cormorant italic text-lg">
                The Full Spatial Wellness Audit goes deeper, with personalised recommendations, colour advice, and a prioritised action plan.
              </p>
              <a
                href="https://spatial-wellness.com/audit"
                className="inline-block px-8 py-3 font-medium tracking-wide transition-all hover:opacity-90"
                style={{ backgroundColor: "#6b7c5e", color: "white" }}
              >
                Get your full audit →
              </a>
              <p className="text-sm text-[#cbb8b2]">Use code LITE30 for €30 off within the next 7 days.</p>
            </div>

            <p className="text-center text-sm text-[#8a7a75]">
              A copy of your results has been sent to {email}.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#cbb8b2] py-6 px-6 mt-20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-cormorant italic text-[#44242b]">Spatial Wellness</p>
          <p className="text-xs text-[#8a7a75] mt-1">Spatial Wellness by Elianne Alblas</p>
        </div>
      </footer>
    </div>
  );
}

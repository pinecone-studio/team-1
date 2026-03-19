"use client";

import { useState } from "react";
import {
  Box,
  QrCode,
  ChevronLeft,
  ChevronRight,
  Plus,
  Square,
  MoreHorizontal,
  ArrowLeft,
} from "lucide-react";

type TestScreen = "home" | "inventory" | "scanner" | "results" | "detail";

export default function AssetHubMobile() {
  const [screen, setScreen] = useState<TestScreen>("home");

  return (
    // h-[100dvh] ашигласнаар утасны browser дээр дэлгэц эвдрэхгүй
    <div className="flex flex-col h-[100dvh] bg-[#f8f9fb] font-sans text-slate-900 overflow-hidden">
      {/* 1. FIXED HEADER */}
      <header className="shrink-0 bg-white border-b border-slate-100 px-5 h-16 flex items-center gap-3">
        {screen === "detail" || screen === "results" || screen === "scanner" ? (
          <button
            onClick={() => {
              if (screen === "detail") setScreen("results");
              else if (screen === "results") setScreen("scanner");
              else setScreen("inventory");
            }}
            className="p-1 -ml-1 active:bg-slate-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-slate-800" />
          </button>
        ) : (
          <Box className="w-6 h-6 text-slate-700" />
        )}
        <h1 className="font-bold text-[17px] text-slate-800 truncate">
          {screen === "scanner"
            ? "QR уншуулна уу"
            : screen === "detail"
              ? "Хөрөнгийн дэлгэрэнгүй"
              : "AssetHub"}
        </h1>
      </header>

      {/* 2. SCROLLABLE CONTENT */}
      <main className="flex-1 overflow-y-auto px-5 py-6">
        {/* HOME SCREEN */}
        {screen === "home" && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <button
              onClick={() => setScreen("inventory")}
              className="w-full bg-white rounded-2xl p-6 text-left border border-slate-200 shadow-sm flex justify-between items-center active:scale-[0.98] transition-transform"
            >
              <div>
                <p className="text-slate-500 text-[13px] mb-1 font-medium">
                  Нийт хөрөнгө
                </p>
                <p className="text-[19px] font-bold text-slate-900">
                  Тооллого эхлүүлэх
                </p>
              </div>
              <QrCode className="w-6 h-6 text-slate-400" />
            </button>
          </div>
        )}

        {/* INVENTORY SCREEN */}
        {screen === "inventory" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-[22px] font-bold">Хөрөнгийн тооллого</h2>
            <button
              onClick={() => setScreen("scanner")}
              className="h-14 w-full rounded-2xl bg-[#0b5f8a] font-bold text-white text-[16px] shadow-md active:bg-[#084a6b]"
            >
              QR уншуулах
            </button>
            <div className="bg-white p-5 rounded-2xl border border-slate-100">
              <p className="font-bold text-[16px]">1-р улирлын тооллого</p>
              <p className="text-slate-500 text-[14px] mt-2 font-medium">
                Байршил: Гурван гол оффис
              </p>
              <p className="text-slate-400 text-[13px]">Эхэлсэн: 03/01/2026</p>
            </div>
          </div>
        )}

        {/* SCANNER SCREEN */}
        {screen === "scanner" && (
          <div className="flex flex-col h-full animate-in fade-in duration-300">
            <div className="relative aspect-square w-full rounded-[40px] bg-[#c3e8f4] flex items-center justify-center overflow-hidden border border-sky-100 shadow-inner">
              <div className="absolute top-8 left-8 w-16 h-16 border-t-[10px] border-l-[10px] border-[#1da6dc] rounded-tl-[24px]" />
              <div className="absolute top-8 right-8 w-16 h-16 border-t-[10px] border-r-[10px] border-[#1da6dc] rounded-tr-[24px]" />
              <div className="absolute bottom-8 left-8 w-16 h-16 border-b-[10px] border-l-[10px] border-[#47c4bc] rounded-bl-[24px]" />
              <div className="absolute bottom-8 right-8 w-16 h-16 border-b-[10px] border-r-[10px] border-[#47c4bc] rounded-br-[24px]" />
              <div className="w-40 h-40 rounded-full border-[15px] border-[#25afd9] opacity-70" />
            </div>

            <div className="mt-8 space-y-3">
              <button
                onClick={() => setScreen("results")}
                className="h-14 w-full rounded-2xl bg-[#0c4f7e] font-bold text-white text-[15px] active:scale-[0.98] transition-transform"
              >
                Хөрөнгийн мэдээлэл харах
              </button>
              <button
                onClick={() => setScreen("inventory")}
                className="h-14 w-full rounded-2xl border border-slate-200 bg-white font-bold text-slate-600 text-[15px]"
              >
                Цуцлах
              </button>
            </div>
          </div>
        )}

        {/* RESULTS SCREEN */}
        {screen === "results" && (
          <div className="animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-[18px]">Скан хийсэн хөрөнгүүд</h3>
              <span className="bg-slate-200 px-3 py-1 rounded-full text-[12px] font-bold">
                2
              </span>
            </div>

            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-[20px] border border-slate-100 flex items-center justify-between shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                      <img
                        src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697308943815"
                        className="w-full h-full object-contain"
                        alt="item"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-[15px] text-slate-900">
                        AST-00100{i}
                      </p>
                      <p className="text-[13px] text-slate-400 font-medium">
                        Өнөөдөр, 03:29PM
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setScreen("detail")}
                    className="text-[14px] font-bold underline decoration-2 underline-offset-4 text-slate-800"
                  >
                    Дэлгэрэнгүй
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setScreen("scanner")}
              className="mt-6 w-full py-4 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 font-bold text-[14px] active:bg-slate-50"
            >
              + Дахин QR уншуулах
            </button>
          </div>
        )}

        {/* DETAIL PAGE */}
        {screen === "detail" && (
          <div className="animate-in slide-in-from-right duration-300">
            <div className="bg-white rounded-[28px] p-6 border border-slate-100 shadow-sm">
              <div className="flex gap-4 mb-6 border-b border-slate-50 pb-6">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-1">
                  <img
                    src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697308943815"
                    className="w-full h-full object-contain"
                    alt="product"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center gap-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Хөрөнгийн нэр
                  </p>
                  <p className="text-[17px] font-extrabold text-slate-900">
                    MacBook Pro-2026-01
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-6 w-6 rounded-full bg-slate-200 overflow-hidden border border-white shadow-sm">
                      <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                        alt="avatar"
                      />
                    </div>
                    <p className="text-[12px] font-semibold text-slate-600">
                      Эзэмшигчтэй
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[14px] text-slate-500 font-medium">
                    Төлөв
                  </span>
                  <span className="rounded-lg bg-sky-50 px-3 py-1 text-[11px] font-bold text-sky-600 border border-sky-100 uppercase">
                    Идэвхтэй
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[14px] text-slate-500 font-medium">
                    Серийн дугаар
                  </span>
                  <span className="text-[14px] font-bold">SN-DEMO-001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[14px] text-slate-500 font-medium">
                    Ангилал
                  </span>
                  <span className="text-[14px] font-bold">
                    IT тоног төхөөрөмж
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[14px] text-slate-500 font-medium">
                    Авсан үнэ
                  </span>
                  <span className="text-[14px] font-bold">4,000,000₮</span>
                </div>
                <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-50">
                  <span className="text-[14px] text-slate-500 font-medium">
                    Байршил
                  </span>
                  <span className="text-[14px] font-bold text-slate-800 leading-relaxed">
                    Гурван гол / оффис / заал / 4 давхрын заал
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 3. FIXED BOTTOM NAV */}
      <footer className="shrink-0 border-t border-slate-100 bg-white/95 backdrop-blur-md pb-8 pt-3 px-8 flex justify-between items-center text-slate-400">
        <ChevronLeft className="w-6 h-6" />
        <ChevronRight className="w-6 h-6" />
        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 text-slate-600 active:bg-slate-200 transition-colors">
          <Plus className="w-6 h-6" />
        </div>
        <Square className="w-5 h-5" />
        <MoreHorizontal className="w-6 h-6" />
      </footer>
    </div>
  );
}

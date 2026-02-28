/**
 * ImageLightbox - 共用燈箱元件
 *
 * 手勢支援：
 *   - 雙指捏合  → 縮放（以兩指中心為原點）
 *   - 單指拖移  → scale > 1 時平移圖片
 *   - 單指左右滑 → scale = 1 時切換上下張
 *   - 雙擊      → 重設縮放
 *   - 點擊背景  → 關閉
 *   - ESC 鍵   → 關閉
 *   - 左右方向鍵 → 切換（桌面）
 *
 * 手機特別處理：
 *   - touch-action: none 阻止系統縮放 / 頁面滾動
 *   - body scroll lock（開啟時鎖定、關閉時還原）
 *   - iOS safe area padding（env(safe-area-inset-*)）
 */

import { useEffect, useRef, useCallback, useState } from 'react';

interface ImageLightboxProps {
  images: string[];          // 圖片 URL 陣列
  initialIndex: number;      // 開啟時顯示的索引
  onClose: () => void;
  titles?: string[];         // 可選：每張圖的標題
  dates?: string[];          // 可選：每張圖的日期
}

// ─── 常數 ─────────────────────────────────────────
const MIN_SCALE = 1;
const MAX_SCALE = 5;
const SWIPE_THRESHOLD = 50;      // px，觸發換頁的最小水平位移
const DOUBLE_TAP_MS = 300;       // 雙擊判定時間
const ZOOM_IN_SCALE = 2.5;       // 雙擊放大目標倍率

// ─── 工具函式 ──────────────────────────────────────
function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function distance(t1: React.Touch, t2: React.Touch) {
  const dx = t1.clientX - t2.clientX;
  const dy = t1.clientY - t2.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

function midpoint(t1: React.Touch, t2: React.Touch) {
  return {
    x: (t1.clientX + t2.clientX) / 2,
    y: (t1.clientY + t2.clientY) / 2,
  };
}

// ─── 主元件 ───────────────────────────────────────
export default function ImageLightbox({
  images,
  initialIndex,
  onClose,
  titles,
  dates,
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Transform state
  const scaleRef = useRef(1);
  const translateRef = useRef({ x: 0, y: 0 });

  // Touch tracking
  const touchStateRef = useRef<{
    mode: 'none' | 'pinch' | 'pan' | 'swipe';
    // Pinch
    initDist: number;
    initScale: number;
    mid: { x: number; y: number };
    // Pan / Swipe
    startX: number;
    startY: number;
    lastTranslate: { x: number; y: number };
    swipeDelta: number;
    // Double tap
    lastTap: number;
  }>({
    mode: 'none',
    initDist: 0,
    initScale: 1,
    mid: { x: 0, y: 0 },
    startX: 0,
    startY: 0,
    lastTranslate: { x: 0, y: 0 },
    swipeDelta: 0,
    lastTap: 0,
  });

  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Transform 套用 ──────────────────────────────
  const applyTransform = useCallback((s: number, tx: number, ty: number, animate = false) => {
    if (!imgRef.current) return;
    imgRef.current.style.transition = animate ? 'transform 0.25s ease' : 'none';
    imgRef.current.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`;
  }, []);

  const resetTransform = useCallback((animate = true) => {
    scaleRef.current = 1;
    translateRef.current = { x: 0, y: 0 };
    applyTransform(1, 0, 0, animate);
  }, [applyTransform]);

  // ── 換張 ─────────────────────────────────────────
  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
    resetTransform(false);
  }, [resetTransform]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) goTo(currentIndex - 1);
  }, [currentIndex, goTo]);

  const goNext = useCallback(() => {
    if (currentIndex < images.length - 1) goTo(currentIndex + 1);
  }, [currentIndex, images.length, goTo]);

  // ── 拖移邊界計算 ────────────────────────────────
  const clampTranslate = useCallback((s: number, tx: number, ty: number) => {
    if (!containerRef.current || !imgRef.current) return { x: tx, y: ty };
    const cw = containerRef.current.clientWidth;
    const ch = containerRef.current.clientHeight;
    // 圖片渲染尺寸（contain 縮放後）
    const img = imgRef.current;
    const naturalRatio = img.naturalWidth / img.naturalHeight || 1;
    const containerRatio = cw / ch;
    let renderedW: number, renderedH: number;
    if (naturalRatio > containerRatio) {
      renderedW = cw;
      renderedH = cw / naturalRatio;
    } else {
      renderedH = ch;
      renderedW = ch * naturalRatio;
    }
    // 放大後可拖移範圍
    const maxTx = Math.max(0, (renderedW * s - cw) / 2);
    const maxTy = Math.max(0, (renderedH * s - ch) / 2);
    return {
      x: clamp(tx, -maxTx, maxTx),
      y: clamp(ty, -maxTy, maxTy),
    };
  }, []);

  // ── Touch Event Handlers ─────────────────────
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const ts = touchStateRef.current;
    const touches = e.touches;

    if (touches.length === 2) {
      // Pinch 開始
      ts.mode = 'pinch';
      ts.initDist = distance(touches[0], touches[1]);
      ts.initScale = scaleRef.current;
      ts.mid = midpoint(touches[0], touches[1]);
      ts.lastTranslate = { ...translateRef.current };
    } else if (touches.length === 1) {
      const t = touches[0];
      const now = Date.now();

      // 雙擊判定
      if (now - ts.lastTap < DOUBLE_TAP_MS) {
        ts.lastTap = 0;
        if (scaleRef.current > 1) {
          resetTransform(true);
        } else {
          // 以點擊位置為中心放大
          const rect = containerRef.current?.getBoundingClientRect();
          if (rect) {
            const cx = t.clientX - rect.left - rect.width / 2;
            const cy = t.clientY - rect.top - rect.height / 2;
            const ns = ZOOM_IN_SCALE;
            const clamped = clampTranslate(ns, -cx * (ns - 1), -cy * (ns - 1));
            scaleRef.current = ns;
            translateRef.current = clamped;
            applyTransform(ns, clamped.x, clamped.y, true);
          }
        }
        return;
      }
      ts.lastTap = now;

      ts.startX = t.clientX;
      ts.startY = t.clientY;
      ts.lastTranslate = { ...translateRef.current };
      ts.swipeDelta = 0;
      ts.mode = scaleRef.current > 1 ? 'pan' : 'swipe';
    }
  }, [applyTransform, clampTranslate, resetTransform]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    // 阻止頁面滾動 / 系統縮放
    e.preventDefault();
    const ts = touchStateRef.current;
    const touches = e.touches;

    if (ts.mode === 'pinch' && touches.length === 2) {
      const newDist = distance(touches[0], touches[1]);
      const ratio = newDist / ts.initDist;
      const ns = clamp(ts.initScale * ratio, MIN_SCALE, MAX_SCALE);
      scaleRef.current = ns;

      // 調整 translate，使縮放以初始兩指中心為原點
      const newMid = midpoint(touches[0], touches[1]);
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const cx = ts.mid.x - rect.left - rect.width / 2;
        const cy = ts.mid.y - rect.top - rect.height / 2;
        const dx = newMid.x - ts.mid.x;
        const dy = newMid.y - ts.mid.y;
        const tx = ts.lastTranslate.x - cx * (ns / ts.initScale - 1) + dx;
        const ty = ts.lastTranslate.y - cy * (ns / ts.initScale - 1) + dy;
        const clamped = clampTranslate(ns, tx, ty);
        translateRef.current = clamped;
        applyTransform(ns, clamped.x, clamped.y, false);
      }
    } else if (ts.mode === 'pan' && touches.length === 1) {
      const t = touches[0];
      const dx = t.clientX - ts.startX;
      const dy = t.clientY - ts.startY;
      const tx = ts.lastTranslate.x + dx;
      const ty = ts.lastTranslate.y + dy;
      const clamped = clampTranslate(scaleRef.current, tx, ty);
      translateRef.current = clamped;
      applyTransform(scaleRef.current, clamped.x, clamped.y, false);
    } else if (ts.mode === 'swipe' && touches.length === 1) {
      const t = touches[0];
      ts.swipeDelta = t.clientX - ts.startX;
      // 視覺拖曳回饋
      applyTransform(1, ts.swipeDelta * 0.3, 0, false);
    }
  }, [applyTransform, clampTranslate]);

  const onTouchEnd = useCallback(() => {
    const ts = touchStateRef.current;

    if (ts.mode === 'swipe') {
      const delta = ts.swipeDelta;
      if (delta < -SWIPE_THRESHOLD) {
        goNext();
      } else if (delta > SWIPE_THRESHOLD) {
        goPrev();
      } else {
        // 彈回
        applyTransform(scaleRef.current, translateRef.current.x, translateRef.current.y, true);
      }
    } else if (ts.mode === 'pinch') {
      // 如果縮放回到 <1.05，直接 reset
      if (scaleRef.current < 1.05) {
        resetTransform(true);
      }
    }

    ts.mode = 'none';
  }, [applyTransform, goNext, goPrev, resetTransform]);

  // ── 鍵盤 ─────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, goPrev, goNext]);

  // ── Body scroll lock ─────────────────────────────
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // iOS Safari 額外處理
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    return () => {
      document.body.style.overflow = prev;
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, []);

  // ── 切換時重設 transform ref ────────────────────
  useEffect(() => {
    scaleRef.current = 1;
    translateRef.current = { x: 0, y: 0 };
    if (imgRef.current) {
      imgRef.current.style.transition = 'none';
      imgRef.current.style.transform = 'translate(0px, 0px) scale(1)';
    }
  }, [currentIndex]);

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;
  const title = titles?.[currentIndex];
  const date = dates?.[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col"
      style={{
        background: 'rgba(0,0,0,0.96)',
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}
    >
      {/* ── 頂部控制列 ── */}
      <div className="flex items-center justify-between px-4 py-3 shrink-0">
        {/* 計數 */}
        <span className="text-white/60 text-sm font-mono select-none">
          {currentIndex + 1} / {images.length}
        </span>

        {/* 關閉按鈕 */}
        <button
          onClick={onClose}
          aria-label="關閉"
          className="w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white active:scale-95 transition-all"
          style={{ background: 'rgba(255,255,255,0.12)' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* ── 圖片區 ── */}
      <div
        ref={containerRef}
        className="flex-1 relative overflow-hidden select-none"
        style={{ touchAction: 'none' }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
      >
        {/* 背景點擊關閉（只在 scale=1 時有效）*/}
        <div
          className="absolute inset-0"
          onClick={() => { if (scaleRef.current <= 1.05) onClose(); }}
        />

        {/* 圖片本體（transform 直接操作 DOM）*/}
        <img
          ref={imgRef}
          src={images[currentIndex]}
          alt={title || `照片 ${currentIndex + 1}`}
          draggable={false}
          className="absolute inset-0 m-auto w-full h-full object-contain"
          style={{
            transformOrigin: 'center center',
            willChange: 'transform',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            pointerEvents: 'none',
          }}
          onLoad={() => resetTransform(false)}
        />

        {/* ── 左右切換箭頭（桌面） ── */}
        {hasPrev && (
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            aria-label="上一張"
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full items-center justify-center text-white/80 hover:text-white transition-all active:scale-95"
            style={{ background: 'rgba(255,255,255,0.15)' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}
        {hasNext && (
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            aria-label="下一張"
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full items-center justify-center text-white/80 hover:text-white transition-all active:scale-95"
            style={{ background: 'rgba(255,255,255,0.15)' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}

        {/* ── 手機底部點點導覽（≤10張）── */}
        {images.length > 1 && images.length <= 10 && (
          <div className="md:hidden absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
            {images.map((_, i) => (
              <span
                key={i}
                className="rounded-full transition-all duration-200"
                style={{
                  width: i === currentIndex ? 20 : 6,
                  height: 6,
                  background: i === currentIndex ? 'white' : 'rgba(255,255,255,0.35)',
                }}
              />
            ))}
          </div>
        )}

        {/* ── 縮放提示（初次顯示）── */}
        <ZoomHint />
      </div>

      {/* ── 底部資訊列 ── */}
      {(title || date) && (
        <div className="shrink-0 px-4 py-3 text-center">
          {title && (
            <p className="text-white font-semibold text-sm md:text-base leading-tight">
              {title}
            </p>
          )}
          {date && (
            <p className="text-white/50 text-xs mt-1">{date}</p>
          )}
        </div>
      )}
    </div>
  );
}

// ── 縮放操作提示（3 秒後淡出）────────────────────
function ZoomHint() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2800);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full text-white/70 text-xs select-none transition-opacity duration-500"
      style={{ background: 'rgba(255,255,255,0.1)', opacity: visible ? 1 : 0 }}
    >
      {/* 雙指圖示 */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M7 11V7a2 2 0 014 0v4M11 7V5a2 2 0 014 0v6M15 9a2 2 0 014 0v5a7 7 0 01-14 0v-3a2 2 0 014 0" />
      </svg>
      雙指縮放・左右滑動切換
    </div>
  );
}

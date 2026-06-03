"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import SecondaryBtn from "@/components/button/SecondaryBtn";
import type { OrderStatus } from "./types";

export type DateRangeFilter = "today" | "this_week" | "this_month";
export type DeliveryAreaFilter = "inside_dhaka" | "outside_dhaka";
export type PaymentFilter = "COD" | "Bkash" | "Nagad" | "Rocket";

export interface OrdersFilterState {
  orderStatus: OrderStatus[];
  paymentMethods: PaymentFilter[];
  dateRange: DateRangeFilter;
  deliveryAreas: DeliveryAreaFilter[];
}

const DEFAULT_FILTERS: OrdersFilterState = {
  orderStatus: ["Pending", "Processing"],
  paymentMethods: ["COD"],
  dateRange: "today",
  deliveryAreas: [],
};

const MOBILE_MEDIA_QUERY = "(max-width: 639px)";
const PANEL_WIDTH = 340;

const ORDER_STATUS_OPTIONS: {
  id: OrderStatus;
  label: string;
  count: number;
}[] = [
  { id: "Pending", label: "Pending", count: 18 },
  { id: "Processing", label: "Processing", count: 21 },
  { id: "Rejected", label: "Rejected", count: 26 },
  { id: "Done", label: "Done", count: 32 },
];

const PAYMENT_OPTIONS: {
  id: PaymentFilter;
  label: string;
  count: number;
}[] = [
  { id: "COD", label: "Cash on Delivery (COD)", count: 40 },
  { id: "Bkash", label: "Bkash", count: 5 },
  { id: "Nagad", label: "Nagad", count: 2 },
  { id: "Rocket", label: "Rocket", count: 1 },
];

const DATE_OPTIONS: { id: DateRangeFilter; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "this_week", label: "This week" },
  { id: "this_month", label: "This Month" },
];

const DELIVERY_OPTIONS: {
  id: DeliveryAreaFilter;
  label: string;
  count: number;
}[] = [
  { id: "inside_dhaka", label: "Inside Dhaka", count: 31 },
  { id: "outside_dhaka", label: "Outside Dhaka", count: 17 },
];

interface OrdersFilterDropdownProps {
  className?: string;
  onApply?: (filters: OrdersFilterState) => void;
}

interface PanelPosition {
  top: number;
  left: number;
  width: number;
}

function FilterCheckbox({
  checked,
  onChange,
  label,
  count,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  count?: number;
}) {
  return (
    <label className="flex min-h-[44px] cursor-pointer items-center gap-3 py-1 sm:min-h-0 sm:py-1.5">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={onChange}
        className={`flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-[4px] border transition-colors sm:h-[18px] sm:w-[18px] ${
          checked
            ? "border-[#0E2038] bg-[#0E2038]"
            : "border-[#D1D5DB] bg-white"
        }`}
      >
        {checked && (
          <svg
            width="10"
            height="8"
            viewBox="0 0 10 8"
            fill="none"
            aria-hidden
          >
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
      <span className="body-sm-medium min-w-0 flex-1 pr-2 primary-text sm:pr-0">
        {label}
      </span>
      {count !== undefined && (
        <span className="body-sm-regular shrink-0 subtext tabular-nums">
          {count}
        </span>
      )}
    </label>
  );
}

function FilterSectionTitle({ children }: { children: string }) {
  return (
    <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.06em] text-[#9CA3AF]">
      {children}
    </p>
  );
}

interface OrdersFilterPanelProps {
  draft: OrdersFilterState;
  isMobile: boolean;
  onClean: () => void;
  onReset: () => void;
  onApply: () => void;
  onClose: () => void;
  toggleOrderStatus: (status: OrderStatus) => void;
  togglePayment: (method: PaymentFilter) => void;
  setDateRange: (range: DateRangeFilter) => void;
  toggleDeliveryArea: (area: DeliveryAreaFilter) => void;
}

function OrdersFilterPanel({
  draft,
  isMobile,
  onClean,
  onReset,
  onApply,
  onClose,
  toggleOrderStatus,
  togglePayment,
  setDateRange,
  toggleDeliveryArea,
}: OrdersFilterPanelProps) {
  return (
    <>
      {isMobile && (
        <div className="flex shrink-0 justify-center pt-3 pb-1">
          <div className="h-1 w-10 rounded-full bg-[#D1D5DB]" aria-hidden />
        </div>
      )}

      <div
        className={`flex shrink-0 items-center justify-between border-b border-[#EEEFF2] ${
          isMobile ? "px-4 pb-3 pt-1" : "px-4 py-4"
        }`}
      >
        <h3 className="body-l-medium primary-text">Filter</h3>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClean}
            className="body-sm-medium min-h-[44px] px-1 text-[#E53E3E] transition hover:opacity-80 sm:min-h-0"
          >
            Clean
          </button>
          {isMobile && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close filter"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#0E2038] transition hover:bg-[#F7F8FA]"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div
        className={`min-h-0 flex-1 overflow-y-auto overscroll-contain ${
          isMobile ? "px-4 py-3" : "max-h-[min(70vh,520px)] px-4 py-4"
        }`}
      >
        <section className="pb-4">
          <FilterSectionTitle>Order Status</FilterSectionTitle>
          <div className="flex flex-col">
            {ORDER_STATUS_OPTIONS.map((option) => (
              <FilterCheckbox
                key={option.id}
                checked={draft.orderStatus.includes(option.id)}
                onChange={() => toggleOrderStatus(option.id)}
                label={option.label}
                count={option.count}
              />
            ))}
          </div>
        </section>

        <div className="mb-4 h-px bg-[#EEEFF2]" aria-hidden />

        <section className="pb-4">
          <FilterSectionTitle>Payment Method</FilterSectionTitle>
          <div className="flex flex-col">
            {PAYMENT_OPTIONS.map((option) => (
              <FilterCheckbox
                key={option.id}
                checked={draft.paymentMethods.includes(option.id)}
                onChange={() => togglePayment(option.id)}
                label={option.label}
                count={option.count}
              />
            ))}
          </div>
        </section>

        <div className="mb-4 h-px bg-[#EEEFF2]" aria-hidden />

        <section className="pb-4">
          <FilterSectionTitle>Date</FilterSectionTitle>
          <div className="flex flex-col">
            {DATE_OPTIONS.map((option) => (
              <FilterCheckbox
                key={option.id}
                checked={draft.dateRange === option.id}
                onChange={() => setDateRange(option.id)}
                label={option.label}
              />
            ))}
          </div>
        </section>

        <div className="mb-4 h-px bg-[#EEEFF2]" aria-hidden />

        <section>
          <FilterSectionTitle>Delivery Area</FilterSectionTitle>
          <div className="flex flex-col">
            {DELIVERY_OPTIONS.map((option) => (
              <FilterCheckbox
                key={option.id}
                checked={draft.deliveryAreas.includes(option.id)}
                onChange={() => toggleDeliveryArea(option.id)}
                label={option.label}
                count={option.count}
              />
            ))}
          </div>
        </section>
      </div>

      <div
        className={`flex shrink-0 gap-2.5 border-t border-[#EEEFF2] sm:gap-3 ${
          isMobile
            ? "px-4 py-3 pb-[max(12px,env(safe-area-inset-bottom))]"
            : "px-4 py-4"
        }`}
      >
        <button
          type="button"
          onClick={onReset}
          className="body-sm-medium flex h-11 min-w-0 flex-1 items-center justify-center rounded-[8px] border border-[#E9E9E9] bg-white px-3 primary-text transition hover:bg-[#F7F8FA] sm:h-[42px] sm:min-w-[96px] sm:flex-none sm:px-4"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={onApply}
          className="body-sm-medium flex h-11 min-w-0 flex-[1.35] items-center justify-center rounded-[8px] bg-[#0E2038] px-3 text-white transition hover:bg-[#1A3354] active:scale-[0.98] sm:h-[42px] sm:flex-1 sm:px-4"
        >
          Apply Filter
        </button>
      </div>
    </>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return isMobile;
}

export default function OrdersFilterDropdown({
  className = "",
  onApply,
}: OrdersFilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [applied, setApplied] = useState<OrdersFilterState>(DEFAULT_FILTERS);
  const [draft, setDraft] = useState<OrdersFilterState>(DEFAULT_FILTERS);
  const [panelPosition, setPanelPosition] = useState<PanelPosition>({
    top: 0,
    left: 0,
    width: PANEL_WIDTH,
  });

  const isMobile = useIsMobile();
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closePanel = useCallback(() => {
    setIsOpen(false);
    setDraft(applied);
  }, [applied]);

  const updatePanelPosition = useCallback(() => {
    if (!triggerRef.current || isMobile) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const viewportPadding = 16;
    const width = Math.min(PANEL_WIDTH, window.innerWidth - viewportPadding * 2);
    const left = Math.min(
      Math.max(viewportPadding, rect.right - width),
      window.innerWidth - width - viewportPadding,
    );

    setPanelPosition({
      top: rect.bottom + 8,
      left,
      width,
    });
  }, [isMobile]);

  useEffect(() => {
    if (!isOpen) return;

    updatePanelPosition();

    const handleReposition = () => updatePanelPosition();
    window.addEventListener("resize", handleReposition);
    window.addEventListener("scroll", handleReposition, true);

    return () => {
      window.removeEventListener("resize", handleReposition);
      window.removeEventListener("scroll", handleReposition, true);
    };
  }, [isOpen, isMobile, updatePanelPosition]);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        panelRef.current?.contains(target)
      ) {
        return;
      }
      closePanel();
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, closePanel]);

  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") closePanel();
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closePanel]);

  useEffect(() => {
    if (!isOpen || !isMobile) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, isMobile]);

  const openDropdown = () => {
    setDraft(applied);
    setIsOpen((prev) => {
      const next = !prev;
      if (!prev) updatePanelPosition();
      return next;
    });
  };

  const toggleOrderStatus = (status: OrderStatus) => {
    setDraft((prev) => ({
      ...prev,
      orderStatus: prev.orderStatus.includes(status)
        ? prev.orderStatus.filter((s) => s !== status)
        : [...prev.orderStatus, status],
    }));
  };

  const togglePayment = (method: PaymentFilter) => {
    setDraft((prev) => ({
      ...prev,
      paymentMethods: prev.paymentMethods.includes(method)
        ? prev.paymentMethods.filter((m) => m !== method)
        : [...prev.paymentMethods, method],
    }));
  };

  const setDateRange = (range: DateRangeFilter) => {
    setDraft((prev) => ({ ...prev, dateRange: range }));
  };

  const toggleDeliveryArea = (area: DeliveryAreaFilter) => {
    setDraft((prev) => ({
      ...prev,
      deliveryAreas: prev.deliveryAreas.includes(area)
        ? prev.deliveryAreas.filter((a) => a !== area)
        : [...prev.deliveryAreas, area],
    }));
  };

  const handleClean = () => {
    setDraft({
      orderStatus: [],
      paymentMethods: [],
      dateRange: "today",
      deliveryAreas: [],
    });
  };

  const handleReset = () => {
    setDraft(DEFAULT_FILTERS);
  };

  const handleApply = () => {
    setApplied(draft);
    onApply?.(draft);
    setIsOpen(false);
  };

  const panelProps: OrdersFilterPanelProps = {
    draft,
    isMobile,
    onClean: handleClean,
    onReset: handleReset,
    onApply: handleApply,
    onClose: closePanel,
    toggleOrderStatus,
    togglePayment,
    setDateRange,
    toggleDeliveryArea,
  };

  const panelShadow =
    "4px 4px 40px 0px rgba(0, 0, 0, 0.06), -4px -4px 40px 0px rgba(0, 0, 0, 0.06)";

  const filterPortal: ReactNode = (
    <AnimatePresence>
      {isOpen &&
        (isMobile ? (
          <>
            <motion.button
              key="filter-backdrop"
              type="button"
              aria-label="Close filter overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closePanel}
              className="fixed inset-0 z-100 bg-black/40"
            />
            <motion.div
              key="filter-panel"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Order filters"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              style={{ boxShadow: panelShadow }}
              className="fixed inset-x-0 bottom-0 z-101 flex max-h-[min(92dvh,720px)] flex-col rounded-t-[16px] border border-[#E9E9E9] bg-white"
            >
              <OrdersFilterPanel {...panelProps} />
            </motion.div>
          </>
        ) : (
          <motion.div
            key="filter-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Order filters"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              boxShadow: panelShadow,
              top: panelPosition.top,
              left: panelPosition.left,
              width: panelPosition.width,
            }}
            className="fixed z-100 flex max-h-[min(85vh,560px)] flex-col rounded-[10px] border border-[#E9E9E9] bg-white"
          >
            <OrdersFilterPanel {...panelProps} />
          </motion.div>
        ))}
    </AnimatePresence>
  );

  return (
    <div className={`relative ${className}`}>
      <div ref={triggerRef} className="w-full sm:w-auto">
        <SecondaryBtn
          icon={<SlidersHorizontal className="h-5 w-5 shrink-0" />}
          onClick={openDropdown}
          className="w-full sm:w-auto sm:min-w-[118px]"
        >
          Filter
        </SecondaryBtn>
      </div>

      {mounted ? createPortal(filterPortal, document.body) : null}
    </div>
  );
}

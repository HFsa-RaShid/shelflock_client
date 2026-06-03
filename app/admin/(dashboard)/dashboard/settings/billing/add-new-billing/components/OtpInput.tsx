"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";

export interface OtpInputHandle {
  focus: (index?: number) => void;
}

interface OtpInputProps {
  length?: number;
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
}

const OtpInput = forwardRef<OtpInputHandle, OtpInputProps>(function OtpInput(
  { length = 6, value, onChange, disabled = false },
  ref
) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useImperativeHandle(ref, () => ({
    focus: (index: number = 0) => {
      const target = inputsRef.current[Math.max(0, Math.min(index, length - 1))];
      if (target) {
        target.focus();
        target.select();
      }
    },
  }));

  const setDigit = (index: number, digit: string) => {
    const next = [...value];
    while (next.length < length) next.push("");
    next[index] = digit;
    onChange(next.slice(0, length));
  };

  const focusInput = (index: number) => {
    const target = inputsRef.current[index];
    if (target) {
      target.focus();
      target.select();
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const raw = event.target.value.replace(/\D/g, "");
    if (!raw) {
      setDigit(index, "");
      return;
    }

    if (raw.length > 1) {
      const next = [...value];
      while (next.length < length) next.push("");
      const chars = raw.slice(0, length - index).split("");
      chars.forEach((ch, i) => {
        next[index + i] = ch;
      });
      onChange(next.slice(0, length));
      const nextIndex = Math.min(index + chars.length, length - 1);
      focusInput(nextIndex);
      return;
    }

    setDigit(index, raw);
    if (index < length - 1) focusInput(index + 1);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace") {
      if (value[index]) {
        setDigit(index, "");
        return;
      }
      if (index > 0) focusInput(index - 1);
      return;
    }
    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      focusInput(index - 1);
    }
    if (event.key === "ArrowRight" && index < length - 1) {
      event.preventDefault();
      focusInput(index + 1);
    }
  };

  const handlePaste = (
    event: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;
    event.preventDefault();

    const next = [...value];
    while (next.length < length) next.push("");
    const chars = pasted.slice(0, length - index).split("");
    chars.forEach((ch, i) => {
      next[index + i] = ch;
    });
    onChange(next.slice(0, length));
    const nextIndex = Math.min(index + chars.length, length - 1);
    focusInput(nextIndex);
  };

  return (
    <div
      role="group"
      aria-label="Verification code"
      className="flex w-full items-center justify-center gap-2 sm:gap-3"
    >
      {Array.from({ length }).map((_, index) => {
        const digit = value[index] ?? "";
        return (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            value={digit}
            disabled={disabled}
            placeholder="-"
            onChange={(event) => handleChange(event, index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            onPaste={(event) => handlePaste(event, index)}
            onFocus={(event) => event.target.select()}
            aria-label={`Digit ${index + 1}`}
            className="h-[52px] w-[44px] rounded-[10px] border border-[#E9E9E9] bg-white text-center text-[18px] font-medium primary-text outline-none transition-colors duration-150 placeholder:text-[#B7BAB9] focus:border-[#F74608] disabled:bg-[#FAFAFA] sm:h-[56px] sm:w-[52px]"
          />
        );
      })}
    </div>
  );
});

export default OtpInput;

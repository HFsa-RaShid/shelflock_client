"use client";

import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface CustomPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CustomPhoneInput({
  value,
  onChange,
}: CustomPhoneInputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Label: Same as your existing style */}
      <label className="body-sm-medium primary-text">Phone Number</label>

      {/* Wrapper to hold everything together */}
      <div className="custom-input-functional-wrapper w-full">
        <PhoneInput
          country={"bd"}
          value={value}
          onChange={onChange}
          enableSearch={true}
          countryCodeEditable={false}
          placeholder="Enter phone number"
          // 1. Container: Tomar exact 'flex gap-2' layout apply kora hoyeche
          containerClass="!flex !gap-2 !w-full !relative"
          // 2. Input Field: Tomar 'flex-1 p-4 rounded-xl border border-gray-200 outline-none focus:border-orange-500 bg-white' input style
          inputClass="!flex-1 !h-[56px] !w-full !p-4 !rounded-xl !border !border-gray-200 !outline-none focus:!border-orange-500 !bg-white font-['Aeonik'] !text-[15px] !text-[#111827]"
          // 3. Left Dropdown Button: Tomar 'w-24 p-4 rounded-xl border border-gray-200 bg-white flex items-center gap-1' layout layout mapping
          buttonClass="!static !w-24 !h-[56px] !p-4 !rounded-xl !border !border-gray-200 !bg-white !flex !items-center !justify-center"
          // Dropdown Panel List
          dropdownClass="!rounded-xl !border !border-gray-200 !mt-2"
        />
      </div>

      {/* Injecting CSS overrides so it looks exactly like your original layout structure */}
      <style jsx global>{`
        /* Library absolute default components dropdown controller reset */
        .custom-input-functional-wrapper .react-tel-input .flag-dropdown {
          position: static !important;
          background-color: transparent !important;
          border: none !important;
        }

        /* Organizing inner alignment of the left flag button box [Flag -> Code -> Arrow] */
        .custom-input-functional-wrapper .react-tel-input .selected-flag {
          width: 100% !important;
          height: 100% !important;
          padding: 0 !important;
          display: flex !important;
          flex-direction: row !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 6px !important;
          border-radius: 12px !important;
        }

        /* Forcing custom order setup */
        .custom-input-functional-wrapper .react-tel-input .flag {
          order: 1 !important; /* Flag stays on the left */
          transform: scale(1.1);
        }

        /* Displaying active dialing country code value inline nicely inside the block */
        .custom-input-functional-wrapper
          .react-tel-input
          .selected-flag
          .dial-code {
          order: 2 !important; /* Code right next to flag */
          font-family: inherit !important;
          font-size: 14px !important;
          font-weight: 500 !important;
          color: #111827 !important;
          margin-left: 2px !important;
          display: inline-block !important;
        }

        /* Adjusting small navigation caret arrow indicator dropdown element properties */
        .custom-input-functional-wrapper .react-tel-input .arrow {
          order: 3 !important; /* Caret stays on the right edge */
          position: static !important;
          margin-left: 2px !important;
          border-top-color: #6b7280 !important;
        }

        /* Disabling grey canvas focus background logic */
        .custom-input-functional-wrapper .react-tel-input .selected-flag:hover,
        .custom-input-functional-wrapper .react-tel-input .selected-flag:focus {
          background-color: transparent !important;
        }

        /* Country selection options box listing panel adjustments */
        .custom-input-functional-wrapper .react-tel-input .country-list {
          margin-top: 4px !important;
          left: 0 !important;
        }
      `}</style>
    </div>
  );
}

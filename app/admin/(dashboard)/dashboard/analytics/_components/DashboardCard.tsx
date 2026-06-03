import React, { useEffect, useState } from "react";
interface AnalyticsCard {
  id: number;
  title: string;
  value: string;
  change: string;
  dateRange: string;
}
interface DashboardCardProps {
  timeframe: string;
}
interface DashboardCardData {
  title: string;
  value: string;
  change: string;
  dateRange: string;
  theme: CardTheme;
  chartData: number[];
  activeIndex: number;
}
interface CardTheme {
  barBg: string;
  barHoverBg: string;
  activeBarBg: string;
  badgeBg: string;
  badgeText: string;
}
const dashboardCards: DashboardCardData[] = [
  {
    title: "Total Revenue",
    value: "$ 8,76,540",
    change: "12.3%",
    dateRange: "Dec 01 - Dec 31",
    theme: {
      barBg: "bg-[#EFEDFD]",
      barHoverBg: "hover:bg-[#5B4BE9]",
      activeBarBg: "bg-[#5B4BE9]",
      badgeBg: "bg-[#E8F7F0]",
      badgeText: "text-[#10B981]",
    },
    chartData: [20, 30, 25, 45, 60, 40, 50, 75, 80, 95, 100],
    activeIndex: 10,
  },
  {
    title: "Total Orders",
    value: "1,248",
    change: "+14%",
    dateRange: "Dec 01 - Dec 31",
    theme: {
      barBg: "bg-[#FBEBF6]",
      barHoverBg: "hover:bg-[#D93AA6]",
      activeBarBg: "bg-[#D93AA6]",
      badgeBg: "bg-[#E8F7F0]",
      badgeText: "text-[#10B981]",
    },
    chartData: [30, 45, 20, 60, 35, 90, 40, 30, 50, 25, 70],
    activeIndex: 5,
  },
  {
    title: "Avg. Order Value",
    value: "$ 682",
    change: "9.7%",
    dateRange: "Dec 01 - Dec 31",
    theme: {
      barBg: "bg-[#FDEBEA]",
      barHoverBg: "hover:bg-[#EF3929]",
      activeBarBg: "bg-[#EF3929]",
      badgeBg: "bg-[#E8F7F0]",
      badgeText: "text-[#10B981]",
    },
    chartData: [40, 50, 30, 25, 45, 35, 60, 40, 95, 30, 55],
    activeIndex: 8,
  },
  {
    title: "Total Customers",
    value: "800",
    change: "17.6%",
    dateRange: "Dec 01 - Dec 31",
    theme: {
      barBg: "bg-[#D5EFF9]",
      barHoverBg: "hover:bg-[#2DADE2]",
      activeBarBg: "bg-[#2DADE2]",
      badgeBg: "bg-[#E8F7F0]",
      badgeText: "text-[#10B981]",
    },
    chartData: [25, 40, 90, 30, 65, 50, 45, 60, 35, 80, 40],
    activeIndex: 2,
  },
];

const DashboardCard = ({ timeframe }: DashboardCardProps) => {
  const [cardData, setCardData] = useState<AnalyticsCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const cardAssets: Record<
    string,
    { icon: React.ReactNode; bg: string; badgeBg: string; badgeText: string }
  > = {
    "Total Revenue": {
      bg: "bg-[#5D5FEF]",
      badgeBg: "bg-[#E6F9F2]",
      badgeText: "text-[#00B67A]",
      icon: (
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_1974_4417)">
            <path
              d="M2 7C2 3.68629 4.68629 1 8 1H28C31.3137 1 34 3.68629 34 7V27C34 30.3137 31.3137 33 28 33H8C4.68629 33 2 30.3137 2 27V7Z"
              fill="white"
            />
            <path
              d="M8 1.5H28C31.0376 1.5 33.5 3.96243 33.5 7V27C33.5 30.0376 31.0376 32.5 28 32.5H8C4.96243 32.5 2.5 30.0376 2.5 27V7C2.5 3.96243 4.96243 1.5 8 1.5Z"
              stroke="#E9E9E9"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22.7286 16.6844C22.8075 16.6894 22.8755 16.6275 22.8749 16.5484C22.8708 15.9335 22.8697 15.0822 22.8694 14.6733C22.8694 14.5691 22.7565 14.5077 22.6679 14.5624C22.6219 14.5909 22.5762 14.618 22.5293 14.6428C21.6693 15.1294 20.736 15.3561 19.7826 15.4961C19.3426 15.5694 18.8893 15.6094 18.4426 15.6361C17.5826 15.6961 16.716 15.6694 15.856 15.5694C15.2293 15.5028 14.616 15.3894 14.0093 15.2161C13.5227 15.0828 13.056 14.9094 12.616 14.6561C12.5602 14.6251 12.5059 14.5927 12.4503 14.5588C12.3618 14.5049 12.2493 14.5676 12.2493 14.6713C12.249 15.1513 12.2479 16.2454 12.2427 16.8361C12.2427 17.1294 12.336 17.3561 12.5227 17.5561C12.8027 17.8494 13.1427 18.0361 13.496 18.1894C14.0227 18.4161 14.5627 18.5561 15.116 18.6628C15.656 18.7694 16.196 18.8361 16.7426 18.8628C17.201 18.8882 17.6534 18.8954 18.1112 18.8786C18.1521 18.8772 18.1899 18.8566 18.2142 18.8237C19.1771 17.5201 20.7192 16.6761 22.4626 16.6761C22.5529 16.6761 22.6404 16.6789 22.7286 16.6844Z"
              fill="#0E2038"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.3965 20.0701C16.8165 20.0701 16.2365 20.0367 15.6565 19.9501C15.1698 19.8767 14.6765 19.7834 14.1965 19.6701C13.6298 19.5367 13.0765 19.3367 12.5632 19.0367C12.5251 19.0139 12.4871 18.9901 12.4483 18.9657C12.361 18.9108 12.2502 18.9731 12.2505 19.0762C12.2518 19.5519 12.2535 20.6362 12.2432 21.2167C12.2365 21.5634 12.3698 21.8234 12.6032 22.0367C12.8698 22.2901 13.1832 22.4567 13.5098 22.5967C14.0898 22.8434 14.6965 22.9901 15.3098 23.0967C15.8965 23.1967 16.4832 23.2567 17.0698 23.2701C17.1106 23.2728 17.1503 23.2744 17.1898 23.2753C17.2773 23.2775 17.3411 23.1938 17.3215 23.1085C17.2351 22.7331 17.1898 22.3433 17.1898 21.9434C17.1898 21.3324 17.2927 20.7499 17.4878 20.2013C17.5104 20.1378 17.4639 20.0701 17.3965 20.0701Z"
              fill="#0E2038"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.5893 13.2333C12.8946 13.5253 13.258 13.7066 13.6346 13.858C14.314 14.1306 15.02 14.28 15.736 14.3766C16.34 14.458 16.9473 14.4993 17.4373 14.492C18.58 14.4933 19.5933 14.3966 20.5913 14.1453C21.088 14.02 21.574 13.8566 22.0287 13.5986C22.2787 13.4573 22.512 13.2913 22.6927 13.05C22.9313 12.73 22.9353 12.3573 22.692 12.042C22.6093 11.934 22.5127 11.834 22.4093 11.7493C22.022 11.4326 21.576 11.2486 21.118 11.0966C20.302 10.8266 19.4633 10.6933 18.6153 10.6333C17.458 10.5506 16.3053 10.5926 15.16 10.806C14.538 10.9213 13.928 11.0833 13.3473 11.3573C13.0373 11.5033 12.742 11.6773 12.5046 11.9453C12.3073 12.168 12.1913 12.422 12.2746 12.74C12.3273 12.9426 12.4473 13.098 12.5893 13.2333Z"
              fill="#0E2038"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M23.2571 20.9141H22.3937C22.3201 20.9141 22.2605 20.8544 22.2604 20.7808L22.2598 19.9141C22.2598 19.6381 22.0358 19.4141 21.7598 19.4141C21.4838 19.4141 21.2598 19.6381 21.2598 19.9141L21.2604 20.7807C21.2605 20.8543 21.2007 20.9141 21.1271 20.9141H20.2625C19.9865 20.9141 19.7625 21.1381 19.7625 21.4141C19.7625 21.6901 19.9865 21.9141 20.2625 21.9141H21.1273C21.2009 21.9141 21.2605 21.9737 21.2606 22.0473L21.2611 22.9074C21.2611 23.1834 21.4851 23.4074 21.7611 23.4074C22.0371 23.4074 22.2611 23.1834 22.2611 22.9074L22.2606 22.0475C22.2605 21.9738 22.3202 21.9141 22.3939 21.9141H23.2571C23.5331 21.9141 23.7571 21.6901 23.7571 21.4141C23.7571 21.1381 23.5331 20.9141 23.2571 20.9141Z"
              fill="#0E2038"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_1974_4417"
              x="0"
              y="0"
              width="36"
              height="36"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="1" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.321569 0 0 0 0 0.345098 0 0 0 0 0.4 0 0 0 0.06 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_1974_4417"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_1974_4417"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      ),
    },
    "Total Orders": {
      bg: "bg-[#D346B8]",
      badgeBg: "bg-[#E6F9F2]",
      badgeText: "text-[#00B67A]",
      icon: (
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_1974_4443)">
            <path
              d="M2 7C2 3.68629 4.68629 1 8 1H28C31.3137 1 34 3.68629 34 7V27C34 30.3137 31.3137 33 28 33H8C4.68629 33 2 30.3137 2 27V7Z"
              fill="white"
            />
            <path
              d="M8 1.5H28C31.0376 1.5 33.5 3.96243 33.5 7V27C33.5 30.0376 31.0376 32.5 28 32.5H8C4.96243 32.5 2.5 30.0376 2.5 27V7C2.5 3.96243 4.96243 1.5 8 1.5Z"
              stroke="#E9E9E9"
            />
            <path
              fillRule="evenodd"
              clip-rule="evenodd"
              d="M17.8667 13.8457C17.0782 13.8457 16.4363 14.4908 16.4363 15.2838C16.4363 16.0761 17.0782 16.7212 17.8667 16.7212C18.6558 16.7212 19.2977 16.0761 19.2977 15.2838C19.2977 14.4908 18.6558 13.8457 17.8667 13.8457Z"
              fill="#0E2038"
            />
            <path
              fillRule="evenodd"
              clip-rule="evenodd"
              d="M17.8666 17.6803C16.5482 17.6803 15.4762 16.6044 15.4762 15.2828C15.4762 13.9606 16.5482 12.8848 17.8666 12.8848C19.1857 12.8848 20.2577 13.9606 20.2577 15.2828C20.2577 16.6044 19.1857 17.6803 17.8666 17.6803ZM21.1121 10.998H14.634C13.155 10.998 11.9524 12.2051 11.9524 13.6873V18.1283C11.9524 19.5363 13.0398 20.6819 14.4145 20.7958C14.4126 20.7747 14.403 20.7555 14.4036 20.7331C14.435 19.4319 15.5172 18.1187 17.8666 18.1187C20.2257 18.1187 21.3111 19.4319 21.3418 20.7337C21.3418 20.7555 21.3329 20.7747 21.3303 20.7958C22.705 20.6825 23.7924 19.5363 23.7924 18.1283V13.6873C23.7924 12.2051 22.5898 10.998 21.1121 10.998Z"
              fill="#0E2038"
            />
            <path
              fillRule="evenodd"
              clip-rule="evenodd"
              d="M20.3818 20.7575C20.3639 19.9838 19.6945 19.0801 17.8666 19.0801C16.0484 19.0801 15.3822 19.9844 15.3636 20.7575C15.363 20.7812 15.3527 20.8004 15.3489 20.8228C15.6631 20.8311 15.9575 20.9546 16.1809 21.1786L17.091 22.0913C17.2996 22.3012 17.578 22.4164 17.873 22.4164C18.1681 22.4164 18.4458 22.3012 18.6545 22.0913L19.5646 21.1786C19.7886 20.9553 20.0823 20.8311 20.3966 20.8228C20.3927 20.8004 20.3825 20.7806 20.3818 20.7575Z"
              fill="#0E2038"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_1974_4443"
              x="0"
              y="0"
              width="36"
              height="36"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="1" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.321569 0 0 0 0 0.345098 0 0 0 0 0.4 0 0 0 0.06 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_1974_4443"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_1974_4443"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      ),
    },
    "Avg. Order Value": {
      bg: "bg-[#C4551B]",
      badgeBg: "bg-[#E6F9F2]",
      badgeText: "text-[#00B67A]",
      icon: (
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_1974_4471)">
            <path
              d="M2 7C2 3.68629 4.68629 1 8 1H28C31.3137 1 34 3.68629 34 7V27C34 30.3137 31.3137 33 28 33H8C4.68629 33 2 30.3137 2 27V7Z"
              fill="white"
            />
            <path
              d="M8 1.5H28C31.0376 1.5 33.5 3.96243 33.5 7V27C33.5 30.0376 31.0376 32.5 28 32.5H8C4.96243 32.5 2.5 30.0376 2.5 27V7C2.5 3.96243 4.96243 1.5 8 1.5Z"
              stroke="#E9E9E9"
            />
            <path
              fillRule="evenodd"
              clip-rule="evenodd"
              d="M19.9146 15.1642H15.8295C15.5646 15.1642 15.3495 14.9492 15.3495 14.6842C15.3495 14.4193 15.5646 14.2042 15.8295 14.2042H19.9146C20.1796 14.2042 20.3946 14.4193 20.3946 14.6842C20.3946 14.9492 20.1796 15.1642 19.9146 15.1642ZM18.1738 17.6116H15.8295C15.5646 17.6116 15.3495 17.3965 15.3495 17.1316C15.3495 16.8666 15.5646 16.6516 15.8295 16.6516H18.1738C18.4388 16.6516 18.6538 16.8666 18.6538 17.1316C18.6538 17.3965 18.4388 17.6116 18.1738 17.6116ZM21.1114 11.1367H14.6334C13.155 11.1367 11.9524 12.3431 11.9524 13.826V18.2669C11.9524 19.7505 13.155 20.9569 14.6334 20.9569H15.3175C15.6388 20.9569 15.9537 21.0874 16.1802 21.3153L17.0897 22.2285C17.2996 22.4385 17.5774 22.5537 17.8724 22.5537C18.1674 22.5537 18.4458 22.4385 18.6545 22.2285L19.5646 21.3159C19.7918 21.0874 20.1066 20.9569 20.4279 20.9569H21.1114C22.5892 20.9569 23.7924 19.7505 23.7924 18.2669V13.826C23.7924 12.3431 22.5892 11.1367 21.1114 11.1367Z"
              fill="#0E2038"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_1974_4471"
              x="0"
              y="0"
              width="36"
              height="36"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="1" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.321569 0 0 0 0 0.345098 0 0 0 0 0.4 0 0 0 0.06 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_1974_4471"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_1974_4471"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      ),
    },
    "Total Customers": {
      bg: "bg-[#2F80ED]",
      badgeBg: "bg-[#E6F9F2]",
      badgeText: "text-[#00B67A]",
      icon: (
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_1974_4499)">
            <path
              d="M2 7C2 3.68629 4.68629 1 8 1H28C31.3137 1 34 3.68629 34 7V27C34 30.3137 31.3137 33 28 33H8C4.68629 33 2 30.3137 2 27V7Z"
              fill="white"
            />
            <path
              d="M8 1.5H28C31.0376 1.5 33.5 3.96243 33.5 7V27C33.5 30.0376 31.0376 32.5 28 32.5H8C4.96243 32.5 2.5 30.0376 2.5 27V7C2.5 3.96243 4.96243 1.5 8 1.5Z"
              stroke="#E9E9E9"
            />
            <path
              fillRule="evenodd"
              clip-rule="evenodd"
              d="M21.6872 11.0469H16.676C15.7267 11.0469 14.9203 11.6752 14.6613 12.5379C14.6379 12.6161 14.6988 12.6917 14.7804 12.6917H19.076C20.676 12.6917 21.9816 13.9973 21.9816 15.6037V18.5161C21.9816 18.5937 22.0503 18.6537 22.1263 18.6377C23.0788 18.4375 23.7928 17.5883 23.7928 16.5765V13.1525C23.7928 11.9941 22.8456 11.0469 21.6872 11.0469Z"
              fill="#0E2038"
            />
            <path
              fillRule="evenodd"
              clip-rule="evenodd"
              d="M17.9685 18.0662C17.6037 18.0662 17.3093 17.7718 17.3093 17.407C17.3093 17.0422 17.6037 16.7414 17.9685 16.7414C18.3333 16.7414 18.6341 17.0422 18.6341 17.407C18.6341 17.7718 18.3333 18.0662 17.9685 18.0662ZM14.9733 18.0662C14.6085 18.0662 14.3077 17.7718 14.3077 17.407C14.3077 17.0422 14.6085 16.7414 14.9733 16.7414C15.3381 16.7414 15.6325 17.0422 15.6325 17.407C15.6325 17.7718 15.3381 18.0662 14.9733 18.0662ZM19.0757 13.4902H14.0645C12.8997 13.4902 11.9525 14.4374 11.9525 15.6022V19.0262C11.9525 20.1846 12.8997 21.1318 14.0645 21.1318H14.5893C14.8325 21.1318 15.0629 21.2278 15.2357 21.4006L15.9397 22.1046C16.1061 22.271 16.3301 22.367 16.5669 22.367C16.8037 22.367 17.0277 22.271 17.2005 22.1046L17.9045 21.4006C18.0709 21.2278 18.3013 21.1318 18.5445 21.1318H19.0757C20.2341 21.1318 21.1813 20.1846 21.1813 19.0262V15.6022C21.1813 14.4374 20.2341 13.4902 19.0757 13.4902Z"
              fill="#0E2038"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_1974_4499"
              x="0"
              y="0"
              width="36"
              height="36"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="1" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.321569 0 0 0 0 0.345098 0 0 0 0 0.4 0 0 0 0.06 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_1974_4499"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_1974_4499"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      ),
    },
  };

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        await new Promise((resolve) => setTimeout(resolve, 800));

        const mockApiResponse: AnalyticsCard[] = [
          {
            id: 1,
            title: "Total Revenue",
            value: "$ 9,457",
            change: "12.3%",
            dateRange: "Dec 01 - Dec 31",
          },
          {
            id: 2,
            title: "Total Orders",
            value: "134",
            change: "+14%",
            dateRange: "Dec 01 - Dec 31",
          },
          {
            id: 3,
            title: "Avg. Order Value",
            value: "$ 682",
            change: "9.7%",
            dateRange: "Dec 01 - Dec 31",
          },
          {
            id: 4,
            title: "Total Customers",
            value: "9",
            change: "17.6%",
            dateRange: "Dec 01 - Dec 31",
          },
        ];

        setCardData(mockApiResponse);
      } catch (error) {
        console.error("Error:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [timeframe]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {isError && (
        <div className="text-center py-12 text-red-500 font-medium">
          Failed to load data.
        </div>
      )}
      {isLoading
        ? Array(4)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="w-full h-[156px] bg-white border border-[#E9E9E9] rounded-[12px] animate-pulse p-4 flex flex-col justify-between"
              >
                <div className="flex justify-between">
                  <div className="h-9 w-9 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200 rounded w-24"></div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            ))
        : cardData.map((card) => {
            const styles = cardAssets[
              card.title as keyof typeof cardAssets
            ] || {
              bg: "bg-gray-500",
              badgeBg: "bg-green-50",
              badgeText: "text-green-600",
              icon: null,
            };

            return (
              <div
                key={card.id}
                className="w-full h-[156px] pb-[12px] bg-white border border-[#E9E9E9] rounded-[12px] shadow-[0px_1px_2px_0px_#5258660F] flex flex-col justify-between overflow-hidden"
              >
                {/* হেডার পার্ট: padding: 12px */}
                <div className="w-full h-[56px] p-[12px] border-b border-[#E9E9E9] flex items-center justify-between gap-[10px]">
                  <div className="flex items-center gap-[10px]">
                    <div className="flex-shrink-0">{styles.icon}</div>
                    <span className="body-regular text-[#4C4C4C]">
                      {card.title}
                    </span>
                  </div>
                  <button className="text-[#424242] hover:opacity-80 transition-opacity">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.16667 8.33398C3.2475 8.33398 2.5 9.08148 2.5 10.0007C2.5 10.9198 3.2475 11.6673 4.16667 11.6673C5.08583 11.6673 5.83333 10.9198 5.83333 10.0007C5.83333 9.08148 5.08583 8.33398 4.16667 8.33398Z"
                        fill="#424242"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.99992 8.33398C9.08075 8.33398 8.33325 9.08148 8.33325 10.0007C8.33325 10.9198 9.08075 11.6673 9.99992 11.6673C10.9191 11.6673 11.6666 10.9198 11.6666 10.0007C11.6666 9.08148 10.9191 8.33398 9.99992 8.33398Z"
                        fill="#424242"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.8334 8.33398C14.9142 8.33398 14.1667 9.08148 14.1667 10.0007C14.1667 10.9198 14.9142 11.6673 15.8334 11.6673C16.7526 11.6673 17.5001 10.9198 17.5001 10.0007C17.5001 9.08148 16.7526 8.33398 15.8334 8.33398Z"
                        fill="#424242"
                      />
                    </svg>
                  </button>
                </div>

                {/* বটম পার্ট (ডাটা ও গ্রাফ): mt-auto দিয়ে নিচে পুশ করা হয়েছে */}
                <div className="px-[12px] flex justify-between items-end mt-auto w-full">
                  <div className="flex-shrink-0">
                    <h2 className="text-[24px] font-bold text-[#0E2038] tracking-tight leading-none mb-1.5">
                      {card.value}
                    </h2>
                    <div
                      className={`
    inline-flex items-center justify-center 
    w-[60px] h-[20px] 
    gap-[4px] pt-[2px] pr-[4px] pb-[2px] pl-[4px] 
    rounded-[4px] text-[12px] font-medium leading-none
    ${styles.badgeBg || "bg-[#EBF9F9]"} 
    ${styles.badgeText || "text-[#3BC5BF]"}
  `}
                    >
                      <svg
                        className="w-[12px] h-[12px] flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                      <span className="tracking-[0%] leading-none text-[11px] sm:text-[12px]">
                        {card.change}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#7F8482] mt-1.5">
                      {card.dateRange}
                    </p>
                  </div>

                  {/* মিনি বার চার্ট ইমিটেশন */}

                  <div className="flex items-end gap-[6px] h-12 pr-1 flex-nowrap">
                    {dashboardCards
                      .find((item) => item.title === card.title)
                      ?.chartData.map((height, index) => {
                        const chartInfo = dashboardCards.find(
                          (item) => item.title === card.title,
                        );

                        return (
                          <div
                            key={index}
                            className={`
            w-2 rounded-[2px] transition-all duration-300
            ${
              index === chartInfo?.activeIndex
                ? chartInfo?.theme.activeBarBg
                : chartInfo?.theme.barBg
            }
          `}
                            style={{
                              height: `${height / 2}px`,
                              opacity:
                                index === chartInfo?.activeIndex ? 1 : 0.7,
                            }}
                          />
                        );
                      })}
                  </div>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default DashboardCard;

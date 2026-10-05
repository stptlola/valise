// Dessins des autocollants, issus des prototypes validés (ticket T-020).
// Chaque autocollant reste en SVG dans la page, pour que ses textes utilisent les polices du site.
import type { ReactNode } from "react";

export const stickerIds = [
  "rome",
  "paris",
  "lisbonne",
  "barcelone",
  "londres",
  "amsterdam",
  "berlin",
  "bruxelles",
  "dublin",
  "edimbourg",
  "marrakech",
  "louxor",
  "new-york",
  "montreal",
  "tokyo",
  "lille",
] as const;

export type StickerId = (typeof stickerIds)[number];

type StickerArtwork = { viewBox: string; art: ReactNode };

export const stickerArtwork: Record<StickerId, StickerArtwork> = {
  rome: {
    viewBox: "0 0 300 380",
    art: (
      <>
        <path d="M0 150A150 150 0 0 1 300 150V380H0Z" fill="#FFFFFF" />
        <path d="M12 150A138 138 0 0 1 288 150V368H12Z" fill="#F6C27A" />
        <circle cx="150" cy="128" r="54" fill="#FFF3E2" />
        <text
          x="150"
          y="58"
          textAnchor="middle"
          className="font-display"
          fontWeight="800"
          fontSize="16"
          letterSpacing="3.2"
          fill="#14213D"
        >
          ESCALE
        </text>
        <path d="M12 232Q80 200 150 216T288 208V368H12Z" fill="#E9A55A" />
        <rect x="62" y="172" width="176" height="80" rx="8" fill="#C47A2C" />
        <g fill="#8A4F17">
          <rect x="72" y="182" width="14" height="20" rx="7" />
          <rect x="96" y="182" width="14" height="20" rx="7" />
          <rect x="120" y="182" width="14" height="20" rx="7" />
          <rect x="144" y="182" width="14" height="20" rx="7" />
          <rect x="168" y="182" width="14" height="20" rx="7" />
          <rect x="192" y="182" width="14" height="20" rx="7" />
          <rect x="216" y="182" width="14" height="20" rx="7" />
          <rect x="72" y="210" width="14" height="20" rx="7" />
          <rect x="96" y="210" width="14" height="20" rx="7" />
          <rect x="120" y="210" width="14" height="20" rx="7" />
          <rect x="144" y="210" width="14" height="20" rx="7" />
          <rect x="168" y="210" width="14" height="20" rx="7" />
          <rect x="192" y="210" width="14" height="20" rx="7" />
          <rect x="216" y="210" width="14" height="20" rx="7" />
          <rect x="62" y="238" width="176" height="14" />
        </g>
        <ellipse cx="38" cy="246" rx="12" ry="42" fill="#2F4A2A" />
        <ellipse cx="264" cy="252" rx="11" ry="36" fill="#2F4A2A" />
        <path d="M12 268H288V368H12Z" fill="#5E7A3A" />
        <path d="M140 268L112 368H188L160 268Z" fill="#E9A55A" />
        <path
          d="M30 316L10 331L30 346ZM270 316L290 331L270 346Z"
          fill="#0B1530"
        />
        <rect x="30" y="300" width="240" height="58" rx="6" fill="#14213D" />
        <text
          x="150"
          y="342"
          textAnchor="middle"
          className="font-script"
          fontSize="44"
          fill="#FFF3E2"
        >
          Rome
        </text>
      </>
    ),
  },
  paris: {
    viewBox: "0 0 300 360",
    art: (
      <>
        <rect width="300" height="360" rx="34" fill="#FFFFFF" />
        <rect x="12" y="12" width="276" height="336" rx="24" fill="#F9DCC8" />
        <text
          x="150"
          y="44"
          textAnchor="middle"
          className="font-display"
          fontWeight="800"
          fontSize="15"
          letterSpacing="3"
          fill="#14213D"
        >
          ESCALE
        </text>
        <circle cx="150" cy="128" r="46" fill="#FFF3E2" />
        <rect x="12" y="198" width="78" height="76" fill="#F3E3C3" />
        <path d="M12 198H90L84 182H18Z" fill="#8D99A6" />
        <rect x="210" y="194" width="78" height="80" fill="#F3E3C3" />
        <path d="M210 194H288L282 178H216Z" fill="#8D99A6" />
        <g fill="#C9B79C">
          <rect x="20" y="208" width="10" height="14" />
          <rect x="38" y="208" width="10" height="14" />
          <rect x="56" y="208" width="10" height="14" />
          <rect x="72" y="208" width="10" height="14" />
          <rect x="20" y="232" width="10" height="14" />
          <rect x="38" y="232" width="10" height="14" />
          <rect x="56" y="232" width="10" height="14" />
          <rect x="72" y="232" width="10" height="14" />
          <rect x="218" y="204" width="10" height="14" />
          <rect x="236" y="204" width="10" height="14" />
          <rect x="254" y="204" width="10" height="14" />
          <rect x="270" y="204" width="10" height="14" />
          <rect x="218" y="228" width="10" height="14" />
          <rect x="236" y="228" width="10" height="14" />
          <rect x="254" y="228" width="10" height="14" />
          <rect x="270" y="228" width="10" height="14" />
        </g>
        <g fill="#7A5C45">
          <rect x="147" y="56" width="6" height="18" />
          <path d="M141 74H159L165 138H135Z" />
          <rect x="127" y="138" width="46" height="8" rx="2" />
          <path d="M131 146H169L183 202H117Z" />
          <rect x="105" y="202" width="90" height="10" rx="2" />
          <path d="M100 274L119 212H181L200 274H174Q150 236 126 274Z" />
        </g>
        <path
          d="M137 150L163 196M163 150L137 196M143 80L157 132M157 80L143 132M112 220L136 270M188 220L164 270"
          stroke="#5C4433"
          strokeWidth="2.5"
          fill="none"
        />
        <rect x="12" y="274" width="276" height="22" fill="#5D8FB8" />
        <path
          d="M34 285h26M118 290h34M206 284h30"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          opacity=".7"
        />
        <path
          d="M12 296H288V324A24 24 0 0 1 264 348H36A24 24 0 0 1 12 324Z"
          fill="#D9C7A8"
        />
        <path
          d="M40 300L22 312L40 324ZM260 300L278 312L260 324Z"
          fill="#0B1530"
        />
        <rect x="40" y="288" width="220" height="48" rx="6" fill="#14213D" />
        <text
          x="150"
          y="324"
          textAnchor="middle"
          className="font-script"
          fontSize="40"
          fill="#FFF3E2"
        >
          Paris
        </text>
      </>
    ),
  },
  lisbonne: {
    viewBox: "0 0 300 300",
    art: (
      <>
        <circle cx="150" cy="150" r="150" fill="#FFFFFF" />
        <circle cx="150" cy="150" r="138" fill="#BFE0F5" />
        <text
          x="150"
          y="60"
          textAnchor="middle"
          className="font-display"
          fontWeight="800"
          fontSize="15"
          letterSpacing="3"
          fill="#14213D"
        >
          ESCALE
        </text>
        <path
          d="M150 128L138 108L162 96"
          fill="none"
          stroke="#14213D"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="80" y="126" width="140" height="18" rx="6" fill="#FFF3E2" />
        <rect x="70" y="140" width="160" height="72" rx="14" fill="#F2C230" />
        <g fill="#14213D">
          <rect x="84" y="152" width="26" height="26" rx="4" />
          <rect x="118" y="152" width="26" height="26" rx="4" />
          <rect x="152" y="152" width="26" height="26" rx="4" />
          <rect x="186" y="152" width="26" height="26" rx="4" />
          <rect x="40" y="222" width="220" height="5" />
          <circle cx="110" cy="214" r="10" />
          <circle cx="190" cy="214" r="10" />
        </g>
        <rect x="70" y="190" width="160" height="8" fill="#FFF3E2" />
        <rect x="50" y="232" width="200" height="64" rx="12" fill="#FFFFFF" />
        <rect x="60" y="242" width="180" height="46" rx="6" fill="#14213D" />
        <text
          x="150"
          y="276"
          textAnchor="middle"
          className="font-script"
          fontSize="34"
          fill="#FFF3E2"
        >
          Lisbonne
        </text>
      </>
    ),
  },
  barcelone: {
    viewBox: "0 0 300 370",
    art: (
      <>
        <path
          d="M24 0H276Q300 0 300 24V230Q300 300 150 368Q0 300 0 230V24Q0 0 24 0Z"
          fill="#FFFFFF"
        />
        <path
          d="M30 12H270Q288 12 288 30V228Q288 290 150 354Q12 290 12 228V30Q12 12 30 12Z"
          fill="#FDE3C3"
        />
        <text
          x="150"
          y="46"
          textAnchor="middle"
          className="font-display"
          fontWeight="800"
          fontSize="15"
          letterSpacing="3"
          fill="#14213D"
        >
          ESCALE
        </text>
        <circle cx="228" cy="96" r="28" fill="#F2C230" />
        <g fill="#C9A26B">
          <path d="M96 214V86Q105 66 114 86V214Z" />
          <path d="M122 214V74Q131 52 140 74V214Z" />
          <path d="M148 214V74Q157 52 166 74V214Z" />
          <path d="M174 214V86Q183 66 192 86V214Z" />
        </g>
        <circle cx="105" cy="66" r="5" fill="#E2462F" />
        <circle cx="131" cy="52" r="5" fill="#2F7FC1" />
        <circle cx="157" cy="52" r="5" fill="#F2C230" />
        <circle cx="183" cy="66" r="5" fill="#3F7D4E" />
        <g fill="#8C6A3A">
          <ellipse cx="105" cy="110" rx="3" ry="8" />
          <ellipse cx="105" cy="140" rx="3" ry="8" />
          <ellipse cx="131" cy="100" rx="3" ry="8" />
          <ellipse cx="131" cy="132" rx="3" ry="8" />
          <ellipse cx="157" cy="100" rx="3" ry="8" />
          <ellipse cx="157" cy="132" rx="3" ry="8" />
          <ellipse cx="183" cy="110" rx="3" ry="8" />
          <ellipse cx="183" cy="140" rx="3" ry="8" />
        </g>
        <rect x="84" y="170" width="120" height="44" fill="#B38A55" />
        <path d="M132 214V194Q144 180 156 194V214Z" fill="#8C6A3A" />
        <path
          d="M12 214H288V228Q288 252 260 270H40Q12 252 12 228Z"
          fill="#2F7FC1"
        />
        <path
          d="M34 232q10-7 20 0t20 0 20 0M196 242q10-7 20 0t20 0"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          opacity=".8"
        />
        <path d="M226 228h30l-5 8h-20Z" fill="#14213D" />
        <path d="M240 226V206L254 226Z" fill="#FFF3E2" />
        <rect x="34" y="262" width="232" height="58" rx="12" fill="#FFFFFF" />
        <rect x="44" y="270" width="212" height="42" rx="6" fill="#14213D" />
        <text
          x="150"
          y="301"
          textAnchor="middle"
          className="font-script"
          fontSize="32"
          fill="#FFF3E2"
        >
          Barcelone
        </text>
      </>
    ),
  },
  londres: {
    viewBox: "0 0 300 330",
    art: (
      <>
        <rect width="300" height="330" rx="30" fill="#FFFFFF" />
        <rect x="12" y="12" width="276" height="306" rx="22" fill="#D5E1E8" />
        <text
          x="150"
          y="46"
          textAnchor="middle"
          className="font-display"
          fontWeight="800"
          fontSize="15"
          letterSpacing="3"
          fill="#14213D"
        >
          ESCALE
        </text>
        <rect x="214" y="80" width="40" height="168" fill="#C9A86A" />
        <path d="M210 80L234 34L258 80Z" fill="#14213D" />
        <circle cx="234" cy="106" r="12" fill="#FFF3E2" />
        <path
          d="M234 106V98M234 106H240"
          stroke="#14213D"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <g fill="#A68A52">
          <rect x="224" y="132" width="5" height="22" />
          <rect x="239" y="132" width="5" height="22" />
          <rect x="224" y="168" width="5" height="22" />
          <rect x="239" y="168" width="5" height="22" />
          <rect x="224" y="204" width="5" height="22" />
          <rect x="239" y="204" width="5" height="22" />
        </g>
        <rect x="34" y="138" width="176" height="96" rx="14" fill="#D9312B" />
        <rect x="34" y="180" width="176" height="6" fill="#B8251F" />
        <g fill="#FFF3E2">
          <rect x="46" y="150" width="26" height="22" rx="3" />
          <rect x="78" y="150" width="26" height="22" rx="3" />
          <rect x="110" y="150" width="26" height="22" rx="3" />
          <rect x="142" y="150" width="26" height="22" rx="3" />
          <rect x="174" y="150" width="26" height="22" rx="3" />
          <rect x="64" y="194" width="26" height="24" rx="3" />
          <rect x="96" y="194" width="26" height="24" rx="3" />
          <rect x="128" y="194" width="26" height="24" rx="3" />
          <rect x="160" y="194" width="26" height="24" rx="3" />
        </g>
        <rect x="40" y="194" width="16" height="40" rx="2" fill="#14213D" />
        <rect x="12" y="246" width="276" height="12" fill="#8C9AA3" />
        <circle cx="78" cy="236" r="13" fill="#14213D" />
        <circle cx="170" cy="236" r="13" fill="#14213D" />
        <circle cx="78" cy="236" r="4" fill="#FFF3E2" />
        <circle cx="170" cy="236" r="4" fill="#FFF3E2" />
        <path
          d="M40 274L24 286L40 298ZM260 274L276 286L260 298Z"
          fill="#0B1530"
        />
        <rect x="40" y="262" width="220" height="48" rx="6" fill="#14213D" />
        <text
          x="150"
          y="298"
          textAnchor="middle"
          className="font-script"
          fontSize="38"
          fill="#FFF3E2"
        >
          Londres
        </text>
      </>
    ),
  },
  amsterdam: {
    viewBox: "0 0 300 340",
    art: (
      <>
        <rect width="300" height="340" rx="34" fill="#FFFFFF" />
        <rect x="12" y="12" width="276" height="316" rx="24" fill="#CDE6F0" />
        <text
          x="150"
          y="46"
          textAnchor="middle"
          className="font-display"
          fontWeight="800"
          fontSize="15"
          letterSpacing="3"
          fill="#14213D"
        >
          ESCALE
        </text>
        <rect x="26" y="130" width="54" height="116" fill="#6B3F2A" />
        <path d="M26 130V118H38V100Q53 86 68 100V118H80V130Z" fill="#6B3F2A" />
        <rect x="84" y="112" width="48" height="134" fill="#2F3B33" />
        <path d="M84 112V100H96V84Q108 72 120 84V100H132V112Z" fill="#2F3B33" />
        <rect x="136" y="122" width="50" height="124" fill="#F07A1A" />
        <path
          d="M136 122Q136 102 150 98Q161 78 172 98Q186 102 186 122Z"
          fill="#F07A1A"
        />
        <rect x="190" y="120" width="46" height="126" fill="#F3E3C3" />
        <path
          d="M190 120V110H198V100H206V90H220V100H228V110H236V120Z"
          fill="#F3E3C3"
        />
        <rect x="240" y="138" width="34" height="108" fill="#6B3F2A" />
        <path
          d="M240 138V126H248V116Q257 106 266 116V126H274V138Z"
          fill="#6B3F2A"
        />
        <g fill="#FFF3E2">
          <rect x="34" y="140" width="12" height="16" />
          <rect x="60" y="140" width="12" height="16" />
          <rect x="34" y="168" width="12" height="16" />
          <rect x="60" y="168" width="12" height="16" />
          <rect x="34" y="196" width="12" height="16" />
          <rect x="60" y="196" width="12" height="16" />
          <rect x="92" y="122" width="12" height="16" />
          <rect x="114" y="122" width="12" height="16" />
          <rect x="92" y="150" width="12" height="16" />
          <rect x="114" y="150" width="12" height="16" />
          <rect x="92" y="178" width="12" height="16" />
          <rect x="114" y="178" width="12" height="16" />
          <rect x="92" y="206" width="12" height="16" />
          <rect x="114" y="206" width="12" height="16" />
          <rect x="144" y="134" width="12" height="16" />
          <rect x="168" y="134" width="12" height="16" />
          <rect x="144" y="162" width="12" height="16" />
          <rect x="168" y="162" width="12" height="16" />
          <rect x="144" y="190" width="12" height="16" />
          <rect x="168" y="190" width="12" height="16" />
          <rect x="248" y="150" width="12" height="16" />
          <rect x="248" y="178" width="12" height="16" />
          <rect x="248" y="206" width="12" height="16" />
        </g>
        <g fill="#14213D">
          <rect x="198" y="132" width="12" height="16" />
          <rect x="218" y="132" width="12" height="16" />
          <rect x="198" y="160" width="12" height="16" />
          <rect x="218" y="160" width="12" height="16" />
          <rect x="198" y="188" width="12" height="16" />
          <rect x="218" y="188" width="12" height="16" />
          <rect x="47" y="222" width="12" height="24" />
          <rect x="155" y="222" width="12" height="24" />
        </g>
        <rect x="12" y="246" width="276" height="44" fill="#3E7F9C" />
        <path
          d="M40 262h30M120 270h40M210 262h36"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          opacity=".7"
        />
        <path
          d="M12 290H288V304A24 24 0 0 1 264 328H36A24 24 0 0 1 12 304Z"
          fill="#8A6A4F"
        />
        <path
          d="M40 288L22 300L40 312ZM260 288L278 300L260 312Z"
          fill="#0B1530"
        />
        <rect x="40" y="276" width="220" height="46" rx="6" fill="#14213D" />
        <text
          x="150"
          y="310"
          textAnchor="middle"
          className="font-script"
          fontSize="34"
          fill="#FFF3E2"
        >
          Amsterdam
        </text>
      </>
    ),
  },
  berlin: {
    viewBox: "0 0 300 340",
    art: (
      <>
        <path
          d="M24 0H276A24 24 0 0 1 300 24V150A20 20 0 0 0 300 190V316A24 24 0 0 1 276 340H24A24 24 0 0 1 0 316V190A20 20 0 0 0 0 150V24A24 24 0 0 1 24 0Z"
          fill="#FFFFFF"
        />
        <path
          d="M32 12H268A20 20 0 0 1 288 32V140.3A32 32 0 0 0 288 199.7V308A20 20 0 0 1 268 328H32A20 20 0 0 1 12 308V199.7A32 32 0 0 0 12 140.3V32A20 20 0 0 1 32 12Z"
          fill="#DCEFD3"
        />
        <text
          x="150"
          y="46"
          textAnchor="middle"
          className="font-display"
          fontWeight="800"
          fontSize="15"
          letterSpacing="3"
          fill="#14213D"
        >
          ESCALE
        </text>
        <rect x="216" y="80" width="8" height="160" fill="#6B7383" />
        <path d="M220 82V52" stroke="#6B7383" strokeWidth="4" />
        <path d="M220 52V64" stroke="#E2462F" strokeWidth="4" />
        <circle cx="220" cy="112" r="17" fill="#A9B3C1" />
        <rect x="203" y="109" width="34" height="5" fill="#8D99A6" />
        <g fill="#D8C08F">
          <rect x="40" y="164" width="140" height="16" />
          <rect x="84" y="148" width="52" height="16" />
          <rect x="46" y="180" width="10" height="62" />
          <rect x="66" y="180" width="10" height="62" />
          <rect x="86" y="180" width="10" height="62" />
          <rect x="104" y="180" width="12" height="62" />
          <rect x="124" y="180" width="10" height="62" />
          <rect x="144" y="180" width="10" height="62" />
          <rect x="164" y="180" width="10" height="62" />
        </g>
        <path d="M96 148l8-16 8 7 6-12 6 12 8-7 6 16Z" fill="#3F7D4E" />
        <rect x="40" y="242" width="140" height="8" fill="#C2A774" />
        <path
          d="M12 250H288V308A20 20 0 0 1 268 328H32A20 20 0 0 1 12 308Z"
          fill="#5BAF3F"
        />
        <path
          d="M40 276L24 288L40 300ZM260 276L276 288L260 300Z"
          fill="#0B1530"
        />
        <rect x="40" y="264" width="220" height="48" rx="6" fill="#14213D" />
        <text
          x="150"
          y="300"
          textAnchor="middle"
          className="font-script"
          fontSize="38"
          fill="#FFF3E2"
        >
          Berlin
        </text>
      </>
    ),
  },
  bruxelles: {
    viewBox: "0 0 300 300",
    art: (
      <>
        <ellipse cx="150" cy="140" rx="150" ry="130" fill="#FFFFFF" />
        <ellipse cx="150" cy="140" rx="138" ry="118" fill="#DCE6F2" />
        <text
          x="150"
          y="42"
          textAnchor="middle"
          className="font-display"
          fontWeight="800"
          fontSize="14"
          letterSpacing="2.8"
          fill="#14213D"
        >
          ESCALE
        </text>
        <g stroke="#8D99A6" strokeWidth="6" strokeLinecap="round">
          <path
            d="M150 66L114 98L114 162L150 194L186 162L186 98Z"
            fill="none"
          />
          <path d="M150 130L150 66M150 130L114 98M150 130L186 98M150 130L114 162M150 130L186 162M150 130L150 194" />
          <path d="M150 194L126 218M150 194L174 218" strokeWidth="5" />
        </g>
        <g fill="#C8D0D9">
          <circle cx="150" cy="66" r="15" />
          <circle cx="114" cy="98" r="15" />
          <circle cx="186" cy="98" r="15" />
          <circle cx="150" cy="130" r="16" />
          <circle cx="114" cy="162" r="15" />
          <circle cx="186" cy="162" r="15" />
          <circle cx="150" cy="194" r="15" />
        </g>
        <g fill="#FFFFFF" opacity=".85">
          <circle cx="145" cy="61" r="4" />
          <circle cx="109" cy="93" r="4" />
          <circle cx="181" cy="93" r="4" />
          <circle cx="145" cy="125" r="4" />
          <circle cx="109" cy="157" r="4" />
          <circle cx="181" cy="157" r="4" />
          <circle cx="145" cy="189" r="4" />
        </g>
        <rect x="50" y="226" width="200" height="64" rx="12" fill="#FFFFFF" />
        <rect x="60" y="236" width="180" height="44" rx="6" fill="#14213D" />
        <text
          x="150"
          y="268"
          textAnchor="middle"
          className="font-script"
          fontSize="32"
          fill="#FFF3E2"
        >
          Bruxelles
        </text>
      </>
    ),
  },
  dublin: {
    viewBox: "0 0 300 340",
    art: (
      <>
        <rect width="300" height="340" rx="34" fill="#FFFFFF" />
        <rect x="12" y="12" width="276" height="316" rx="24" fill="#B5543C" />
        <path
          d="M12 60H288M12 108H288M12 156H288M12 204H288M12 252H288"
          stroke="#9E4632"
          strokeWidth="3"
        />
        <text
          x="150"
          y="44"
          textAnchor="middle"
          className="font-display"
          fontWeight="800"
          fontSize="15"
          letterSpacing="3"
          fill="#FFF3E2"
        >
          ESCALE
        </text>
        <rect x="84" y="78" width="132" height="174" rx="4" fill="#F3E3C3" />
        <path d="M96 128A54 54 0 0 1 204 128Z" fill="#FFF3E2" />
        <path
          d="M96 128A54 54 0 0 1 204 128M150 128V76M150 128L114 92M150 128L186 92M150 128L100 112M150 128L200 112"
          fill="none"
          stroke="#14213D"
          strokeWidth="3"
        />
        <rect x="104" y="128" width="92" height="124" fill="#1E7B45" />
        <g fill="#17633A">
          <rect x="114" y="140" width="30" height="44" />
          <rect x="156" y="140" width="30" height="44" />
          <rect x="114" y="194" width="30" height="48" />
          <rect x="156" y="194" width="30" height="48" />
        </g>
        <circle cx="150" cy="164" r="7" fill="#F2C230" />
        <circle cx="186" cy="196" r="4" fill="#F2C230" />
        <rect x="92" y="252" width="116" height="9" fill="#D9D2C3" />
        <rect x="80" y="261" width="140" height="9" fill="#C9C1B1" />
        <path
          d="M40 286L24 298L40 310ZM260 286L276 298L260 310Z"
          fill="#0B1530"
        />
        <rect x="40" y="274" width="220" height="46" rx="6" fill="#14213D" />
        <text
          x="150"
          y="309"
          textAnchor="middle"
          className="font-script"
          fontSize="38"
          fill="#FFF3E2"
        >
          Dublin
        </text>
      </>
    ),
  },
  edimbourg: {
    viewBox: "0 0 340 210",
    art: (
      <>
        <path
          d="M0 14Q0 2 12 4L328 96Q340 105 328 114L12 206Q0 208 0 196Z"
          fill="#FFFFFF"
        />
        <path
          d="M12 22Q12 14 20 16L308 100Q316 105 308 110L20 194Q12 196 12 188Z"
          fill="#7B4F9E"
        />
        <path
          d="M14 194V156Q34 138 56 142Q78 132 96 148L112 168Z"
          fill="#3B2A52"
        />
        <g fill="#2A1E3A">
          <rect x="34" y="118" width="54" height="26" />
          <rect x="30" y="104" width="14" height="40" />
          <rect x="78" y="100" width="14" height="44" />
          <rect x="52" y="96" width="18" height="24" />
          <rect x="30" y="98" width="4" height="6" />
          <rect x="35" y="98" width="4" height="6" />
          <rect x="40" y="98" width="4" height="6" />
          <rect x="78" y="94" width="4" height="6" />
          <rect x="83" y="94" width="4" height="6" />
          <rect x="88" y="94" width="4" height="6" />
        </g>
        <path d="M61 96V78" stroke="#2A1E3A" strokeWidth="2" />
        <rect x="61" y="78" width="15" height="10" fill="#2F6DB5" />
        <path d="M61 78L76 88M76 78L61 88" stroke="#FFFFFF" strokeWidth="2" />
        <g fill="#F2C230">
          <rect x="40" y="126" width="4" height="6" />
          <rect x="58" y="126" width="4" height="6" />
          <rect x="74" y="126" width="4" height="6" />
          <rect x="59" y="104" width="4" height="6" />
        </g>
        <text
          x="182"
          y="92"
          textAnchor="middle"
          className="font-display"
          fontWeight="800"
          fontSize="12"
          letterSpacing="2.4"
          fill="#FFF3E2"
        >
          ESCALE
        </text>
        <text
          x="180"
          y="124"
          textAnchor="middle"
          className="font-script"
          fontSize="34"
          fill="#FFF3E2"
        >
          Édimbourg
        </text>
      </>
    ),
  },
  marrakech: {
    viewBox: "0 0 300 380",
    art: (
      <>
        <path
          d="M150 0C240 0 300 70 300 150C300 210 268 248 240 262V380H60V262C32 248 0 210 0 150C0 70 60 0 150 0Z"
          fill="#FFFFFF"
        />
        <path
          d="M150 12C232 12 288 76 288 150C288 204 258 238 232 252V368H68V252C42 238 12 204 12 150C12 76 68 12 150 12Z"
          fill="#F6C9A6"
        />
        <text
          x="150"
          y="58"
          textAnchor="middle"
          className="font-display"
          fontWeight="800"
          fontSize="15"
          letterSpacing="3"
          fill="#14213D"
        >
          ESCALE
        </text>
        <circle cx="106" cy="112" r="30" fill="#FFF3E2" />
        <g fill="#B5603A">
          <rect x="176" y="86" width="46" height="170" />
          <rect x="176" y="78" width="8" height="10" />
          <rect x="188" y="78" width="8" height="10" />
          <rect x="200" y="78" width="8" height="10" />
          <rect x="212" y="78" width="8" height="10" />
          <rect x="190" y="58" width="18" height="30" />
        </g>
        <circle cx="199" cy="54" r="6" fill="#F2C230" />
        <g fill="#8E4528">
          <rect x="190" y="110" width="18" height="26" rx="9" />
          <rect x="190" y="160" width="18" height="26" rx="9" />
          <rect x="190" y="210" width="18" height="26" rx="9" />
        </g>
        <path
          d="M98 252Q104 200 110 160"
          fill="none"
          stroke="#7A5230"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <g fill="#3F7D4E">
          <path d="M110 160Q80 140 58 152Q84 150 110 166Z" />
          <path d="M110 160Q140 136 164 146Q138 148 110 166Z" />
          <path d="M110 160Q96 128 76 118Q98 132 108 164Z" />
          <path d="M110 160Q130 124 152 116Q128 134 112 164Z" />
        </g>
        <rect x="68" y="246" width="164" height="8" fill="#2E3BA6" />
        <rect x="68" y="252" width="164" height="116" fill="#3D4FD1" />
        <rect x="94" y="262" width="12" height="30" rx="6" fill="#3F7D4E" />
        <rect x="88" y="288" width="24" height="26" rx="4" fill="#F2C230" />
        <ellipse cx="197" cy="286" rx="14" ry="10" fill="#3F7D4E" />
        <rect x="186" y="292" width="22" height="22" rx="4" fill="#F2C230" />
        <rect x="26" y="316" width="248" height="60" rx="12" fill="#FFFFFF" />
        <rect x="36" y="326" width="228" height="42" rx="6" fill="#14213D" />
        <text
          x="150"
          y="357"
          textAnchor="middle"
          className="font-script"
          fontSize="32"
          fill="#FFF3E2"
        >
          Marrakech
        </text>
      </>
    ),
  },
  louxor: {
    viewBox: "0 0 320 320",
    art: (
      <>
        <circle cx="160" cy="160" r="160" fill="#FFFFFF" />
        <circle cx="160" cy="160" r="148" fill="#2A9D8F" />
        <text
          x="160"
          y="64"
          textAnchor="middle"
          className="font-display"
          fontWeight="800"
          fontSize="13"
          letterSpacing="2.1"
          fill="#14213D"
        >
          VALLÉE DES ROIS
        </text>
        <circle cx="160" cy="116" r="38" fill="#F2C230" />
        <path
          d="M28 212L70 178L110 190L150 160L196 184L240 170L292 212Z"
          fill="#D9A066"
        />
        <path d="M150 160L196 184L172 212L122 212Z" fill="#B97A3F" />
        <path d="M92 212L96 150L100 140L104 150L108 212Z" fill="#C99A52" />
        <path d="M20.7 210A148 148 0 0 0 299.3 210Z" fill="#F2D3A0" />
        <path
          d="M40 244Q100 234 160 244T280 244"
          fill="none"
          stroke="#1F6F86"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path d="M144 236V204L164 236Z" fill="#FFF3E2" />
        <path d="M128 238H160L154 246H134Z" fill="#14213D" />
        <rect x="56" y="250" width="208" height="68" rx="12" fill="#FFFFFF" />
        <rect x="66" y="260" width="188" height="48" rx="6" fill="#14213D" />
        <text
          x="160"
          y="297"
          textAnchor="middle"
          className="font-script"
          fontSize="38"
          fill="#FFF3E2"
        >
          Louxor
        </text>
      </>
    ),
  },
  "new-york": {
    viewBox: "0 0 300 330",
    art: (
      <>
        <rect width="300" height="330" rx="30" fill="#FFFFFF" />
        <rect x="12" y="12" width="276" height="306" rx="22" fill="#23325C" />
        <g fill="#FFF3E2">
          <circle cx="40" cy="40" r="2" />
          <circle cx="82" cy="72" r="1.5" />
          <circle cx="190" cy="42" r="1.5" />
          <circle cx="262" cy="104" r="1.5" />
          <circle cx="58" cy="112" r="1.5" />
        </g>
        <circle cx="238" cy="70" r="18" fill="#FFF3E2" />
        <circle cx="246" cy="64" r="16" fill="#23325C" />
        <text
          x="150"
          y="46"
          textAnchor="middle"
          className="font-display"
          fontWeight="800"
          fontSize="15"
          letterSpacing="3"
          fill="#FFF3E2"
        >
          ESCALE
        </text>
        <g fill="#14213D">
          <rect x="40" y="160" width="36" height="92" />
          <rect x="78" y="140" width="34" height="112" />
          <rect x="118" y="120" width="44" height="132" />
          <rect x="126" y="96" width="28" height="24" />
          <rect x="132" y="80" width="16" height="16" />
          <path d="M136 80L140 44L144 80Z" />
          <rect x="184" y="136" width="34" height="116" />
          <path d="M184 136Q201 96 218 136Z" />
          <path d="M199 104L201 72L203 104Z" />
          <rect x="224" y="170" width="30" height="82" />
          <rect x="256" y="150" width="24" height="102" />
        </g>
        <path
          d="M190 128Q201 106 212 128M194 120Q201 108 208 120"
          fill="none"
          stroke="#C9D2E0"
          strokeWidth="2"
        />
        <g fill="#F6B10A">
          <rect x="48" y="172" width="5" height="7" />
          <rect x="62" y="172" width="5" height="7" />
          <rect x="48" y="190" width="5" height="7" />
          <rect x="62" y="206" width="5" height="7" />
          <rect x="86" y="152" width="5" height="7" />
          <rect x="100" y="152" width="5" height="7" />
          <rect x="86" y="182" width="5" height="7" />
          <rect x="100" y="198" width="5" height="7" />
          <rect x="128" y="132" width="5" height="7" />
          <rect x="146" y="132" width="5" height="7" />
          <rect x="128" y="160" width="5" height="7" />
          <rect x="146" y="176" width="5" height="7" />
          <rect x="137" y="196" width="5" height="7" />
          <rect x="192" y="150" width="5" height="7" />
          <rect x="206" y="150" width="5" height="7" />
          <rect x="192" y="178" width="5" height="7" />
          <rect x="206" y="196" width="5" height="7" />
          <rect x="232" y="182" width="5" height="7" />
          <rect x="244" y="200" width="5" height="7" />
          <rect x="262" y="164" width="5" height="7" />
          <rect x="262" y="186" width="5" height="7" />
        </g>
        <rect x="12" y="250" width="276" height="20" fill="#0F1830" />
        <path d="M62 238L72 224H110L120 238Z" fill="#F6B10A" />
        <rect x="44" y="236" width="96" height="26" rx="8" fill="#F6B10A" />
        <path
          d="M72 236L78 227H90V236ZM94 236V227H107L113 236Z"
          fill="#23325C"
        />
        <path
          d="M44 248.5H140"
          stroke="#14213D"
          strokeWidth="5"
          strokeDasharray="5 5"
        />
        <rect x="84" y="218" width="16" height="6" rx="2" fill="#FFF3E2" />
        <circle cx="66" cy="262" r="7" fill="#0B1226" />
        <circle cx="118" cy="262" r="7" fill="#0B1226" />
        <rect x="36" y="266" width="228" height="52" rx="10" fill="#FFFFFF" />
        <rect x="44" y="272" width="212" height="40" rx="6" fill="#14213D" />
        <text
          x="150"
          y="302"
          textAnchor="middle"
          className="font-script"
          fontSize="34"
          fill="#FFF3E2"
        >
          New York
        </text>
      </>
    ),
  },
  montreal: {
    viewBox: "0 0 320 320",
    art: (
      <>
        <circle cx="160" cy="160" r="160" fill="#FFFFFF" />
        <circle cx="160" cy="160" r="148" fill="#D7E9F7" />
        <text
          x="160"
          y="58"
          textAnchor="middle"
          className="font-display"
          fontWeight="800"
          fontSize="15"
          letterSpacing="3"
          fill="#14213D"
        >
          ESCALE
        </text>
        <g fill="none" stroke="#5B6374" strokeWidth="2">
          <circle cx="200" cy="132" r="46" strokeWidth="3" />
          <ellipse cx="200" cy="132" rx="24" ry="46" />
          <path d="M160.8 108H239.2M154 132H246M160.8 156H239.2M200 86V178" />
        </g>
        <rect x="174" y="176" width="52" height="6" fill="#5B6374" />
        <path d="M24 216Q70 160 134 208V216Z" fill="#3F7D4E" />
        <path
          d="M78 178V148M70 156H86"
          stroke="#FFF3E2"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <g fill="#14213D">
          <rect x="122" y="190" width="12" height="26" />
          <rect x="136" y="180" width="12" height="36" />
          <rect x="150" y="196" width="10" height="20" />
        </g>
        <path d="M22.2 214A148 148 0 0 0 297.8 214Z" fill="#5D8FB8" />
        <g fill="#C62F2F">
          <path
            transform="translate(62 96)"
            d="M0 -8L2 -3L7 -4L4 0L8 3L2 2L0 8L-2 2L-8 3L-4 0L-7 -4L-2 -3Z"
          />
          <path
            transform="translate(114 80) rotate(20)"
            d="M0 -8L2 -3L7 -4L4 0L8 3L2 2L0 8L-2 2L-8 3L-4 0L-7 -4L-2 -3Z"
          />
          <path
            transform="translate(268 182) rotate(-15)"
            d="M0 -8L2 -3L7 -4L4 0L8 3L2 2L0 8L-2 2L-8 3L-4 0L-7 -4L-2 -3Z"
          />
        </g>
        <rect x="56" y="250" width="208" height="68" rx="12" fill="#FFFFFF" />
        <rect x="66" y="260" width="188" height="48" rx="6" fill="#14213D" />
        <text
          x="160"
          y="297"
          textAnchor="middle"
          className="font-script"
          fontSize="36"
          fill="#FFF3E2"
        >
          Montréal
        </text>
      </>
    ),
  },
  tokyo: {
    viewBox: "0 0 320 320",
    art: (
      <>
        <circle cx="160" cy="160" r="160" fill="#FFFFFF" />
        <circle cx="160" cy="160" r="148" fill="#FFE3EC" />
        <text
          x="160"
          y="58"
          textAnchor="middle"
          className="font-display"
          fontWeight="800"
          fontSize="15"
          letterSpacing="3"
          fill="#14213D"
        >
          ESCALE
        </text>
        <circle cx="160" cy="132" r="58" fill="#F5A9C6" />
        <path
          d="M30 120Q62 100 96 86"
          fill="none"
          stroke="#6B3F2A"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M290 112Q262 98 232 90"
          fill="none"
          stroke="#6B3F2A"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <g fill="#F48FB1">
          <circle cx="70" cy="98" r="13" />
          <circle cx="92" cy="84" r="10" />
          <circle cx="54" cy="112" r="9" />
          <circle cx="250" cy="94" r="12" />
          <circle cx="234" cy="82" r="9" />
        </g>
        <g fill="#FFFFFF" opacity=".85">
          <circle cx="76" cy="92" r="4" />
          <circle cx="246" cy="90" r="4" />
        </g>
        <path d="M160 72L180 232H140Z" fill="#E2462F" />
        <path
          d="M150 150H170L171 160H149ZM146 194H174L176 204H144Z"
          fill="#FFFFFF"
        />
        <rect x="146" y="128" width="28" height="12" rx="3" fill="#FFFFFF" />
        <path
          d="M142 230L130 248M178 230L190 248"
          stroke="#E2462F"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path d="M38.1 244A148 148 0 0 0 281.9 244Z" fill="#14213D" />
        <g fill="#14213D">
          <rect x="46" y="206" width="24" height="40" />
          <rect x="74" y="192" width="22" height="54" />
          <rect x="100" y="210" width="28" height="36" />
          <rect x="196" y="198" width="24" height="48" />
          <rect x="224" y="208" width="26" height="38" />
          <rect x="254" y="216" width="22" height="30" />
        </g>
        <rect x="56" y="250" width="208" height="68" rx="12" fill="#FFFFFF" />
        <rect x="66" y="260" width="188" height="48" rx="6" fill="#14213D" />
        <text
          x="160"
          y="297"
          textAnchor="middle"
          className="font-script"
          fontSize="38"
          fill="#FFF3E2"
        >
          Tokyo
        </text>
      </>
    ),
  },
  lille: {
    viewBox: "0 0 300 340",
    art: (
      <>
        <rect width="300" height="340" rx="34" fill="#FFFFFF" />
        <rect x="12" y="12" width="276" height="316" rx="24" fill="#CFE3F2" />
        <ellipse cx="70" cy="74" rx="34" ry="14" fill="#FFFFFF" />
        <ellipse cx="228" cy="64" rx="28" ry="12" fill="#FFFFFF" />
        <text
          x="150"
          y="46"
          textAnchor="middle"
          className="font-display"
          fontWeight="800"
          fontSize="15"
          letterSpacing="3"
          fill="#14213D"
        >
          ESCALE
        </text>
        <rect x="24" y="150" width="62" height="104" fill="#A33A2C" />
        <path
          d="M24 150V140H32V130H40V120H70V130H78V140H86V150Z"
          fill="#A33A2C"
        />
        <rect x="90" y="140" width="56" height="114" fill="#C4583F" />
        <path
          d="M90 140V128H98V116H106V104H130V116H138V128H146V140Z"
          fill="#C4583F"
        />
        <rect x="150" y="96" width="44" height="158" fill="#7E2A20" />
        <path d="M146 96L172 46L198 96Z" fill="#14213D" />
        <rect x="198" y="148" width="78" height="106" fill="#A33A2C" />
        <path
          d="M198 148V138H208V128H218V118H256V128H266V138H276V148Z"
          fill="#A33A2C"
        />
        <g fill="#FFF3E2">
          <rect x="49" y="128" width="12" height="14" />
          <rect x="34" y="168" width="12" height="18" />
          <rect x="64" y="168" width="12" height="18" />
          <rect x="34" y="200" width="12" height="18" />
          <rect x="64" y="200" width="12" height="18" />
          <rect x="112" y="112" width="12" height="16" />
          <rect x="100" y="156" width="12" height="18" />
          <rect x="124" y="156" width="12" height="18" />
          <rect x="100" y="190" width="12" height="18" />
          <rect x="124" y="190" width="12" height="18" />
          <circle cx="172" cy="122" r="9" />
          <rect x="164" y="146" width="16" height="26" rx="8" />
          <rect x="210" y="164" width="12" height="18" />
          <rect x="232" y="164" width="12" height="18" />
          <rect x="254" y="164" width="12" height="18" />
          <rect x="210" y="196" width="12" height="18" />
          <rect x="232" y="196" width="12" height="18" />
          <rect x="254" y="196" width="12" height="18" />
        </g>
        <path
          d="M12 254H288V304A24 24 0 0 1 264 328H36A24 24 0 0 1 12 304Z"
          fill="#E6D5BF"
        />
        <path
          d="M40 278L22 291L40 304ZM260 278L278 291L260 304Z"
          fill="#0B1530"
        />
        <rect x="40" y="264" width="220" height="54" rx="6" fill="#14213D" />
        <text
          x="150"
          y="304"
          textAnchor="middle"
          className="font-script"
          fontSize="42"
          fill="#FFF3E2"
        >
          Lille
        </text>
      </>
    ),
  },
};

// Seluruh konten undangan. Ganti nilai di sini — komponen tidak perlu disentuh.

export const meta = {
  title: "Apri & Dian Wedding Invitation",
  description:
    "Undangan pernikahan adat Batak Toba. Marsipature hutana be — mari rayakan bersama kami.",
  hashtag: "#SadaRohaSalelengNiNgolu",
};

export const couple = {
  groom: {
    fullName: "Aprilanio Pardamean Siahaan",
    nickName: "Apri",
    marga: "Siahaan",
    order: "Putra ketiga dari",
    father: "Bapak F.L. Siahaan",
    mother: "Ibu D. Simanjuntak",
    photo: "/images/groom.svg",
    instagram: "-",
  },
  bride: {
    fullName: "Dian Lestari Sianipar",
    nickName: "Dian",
    marga: "Sianipar",
    order: "Putri pertama",
    father: "Bapak Drs. T.D. Sianipar",
    mother: "Ibu E. Silalahi, Am.Keb",
    photo: "/images/bride.svg",
    instagram: "@diiaann91",
  },
};

// Acara utama dipakai countdown & save-the-date
export const mainEventDate = "2026-10-24T08:30:00+07:00";

export const events = [
  {
    id: "martumpol",
    name: "Martumpol",
    subtitle: "Pemberkatan janji di hadapan jemaat",
    date: "2026-10-24T08:30:00+07:00",
    venue: "HKBP Ressort Taman Wisma Asri",
    address: "Komp. Ruko Taman Wisma Asri, Blok. T 7-10, Bekasi Utara",
    mapUrl: "https://maps.app.goo.gl/FPyXM8tybBtbEUFP8",
  },
  {
    id: "adat",
    name: "Ulaon Unjuk",
    subtitle: "Pesta adat Batak Toba Sumatra Utara",
    date: "2026-10-24T12:00:00+07:00",
    venue: "Gedung Grahara Delima I",
    address: "Jl. Wijaya I Inspeksi Kalimalang RT 006/RW 015, Jakasampurna, Kec. Bekasi Barat",
    mapUrl: "https://maps.app.goo.gl/E96pKKsweWDi9xy59",
  },
];

export const location = {
  venue: "Gedung Grahara Delima I",
  address: "Jl. Wijaya I Inspeksi Kalimalang RT 006/RW 015, Jakasampurna, Kec. Bekasi Barat",
  mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3589.1121941689976!2d106.95519967453151!3d-6.250805961202137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698cff0a4d4ee1%3A0xf490718ddea2e4fc!2sGraha%20Delima!5e1!3m2!1sid!2sid!4v1789974228868!5m2!1sid!2sid",
  mapUrl: "https://maps.app.goo.gl/E96pKKsweWDi9xy59",
  notes: [
    "Parkir tersedia di halaman belakang gedung.",
    "Mohon hadir 30 menit sebelum acara dimulai.",
  ],
};

export const story = [
  {
    year: "2019",
    title: "Pertama Bertemu",
    body: "Bertemu di perayaan Natal bona pasogit, diperkenalkan oleh tulang dari kedua belah pihak.",
  },
  {
    year: "2022",
    title: "Marhusip",
    body: "Pembicaraan awal kedua keluarga secara tertutup, menyatukan niat dan doa.",
  },
  {
    year: "2025",
    title: "Marhata Sinamot",
    body: "Kedua keluarga bermusyawarah, menyepakati hari baik dalam kehangatan kekeluargaan.",
  },
  {
    year: "2026",
    title: "Hari Bahagia",
    body: "Diberkati sebagai satu keluarga, disaksikan dongan tubu, hula-hula, dan boru.",
  },
];

export const dalihanNaTolu = [
  {
    id: "hula-hula",
    title: "Somba Marhula-hula",
    meaning: "Hormat kepada keluarga pihak istri sebagai sumber berkat.",
  },
  {
    id: "dongan-tubu",
    title: "Manat Mardongan Tubu",
    meaning: "Berhati-hati dan menjaga kerukunan dengan saudara semarga.",
  },
  {
    id: "boru",
    title: "Elek Marboru",
    meaning: "Membujuk dan mengasihi pihak perempuan dengan lemah lembut.",
  },
];

export const gallery = [
  { id: 1, src: "/images/gallery-1.svg", alt: "Prewedding di tepi Danau Toba", span: "tall" },
  { id: 2, src: "/images/gallery-2.svg", alt: "Mempelai mengenakan ulos", span: "wide" },
  { id: 3, src: "/images/gallery-3.svg", alt: "Potret berdua di rumah bolon", span: "normal" },
  { id: 4, src: "/images/gallery-4.svg", alt: "Momen tertawa bersama keluarga", span: "normal" },
  { id: 5, src: "/images/gallery-5.svg", alt: "Berjalan di bukit Holbung", span: "wide" },
  { id: 6, src: "/images/gallery-6.svg", alt: "Detail sortali dan ulos", span: "tall" },
];

export const gifts = [
  {
    id: "bank-1",
    type: "bank",
    label: "Bank Mandiri",
    account: "1234567890",
    holder: "Aprilanio Pardamean Siahaan",
  },
  {
    id: "bank-2",
    type: "bank",
    label: "Bank BCA",
    account: "0987654321",
    holder: "Dian Lestari Sianipar",
  },
  {
    id: "gift",
    type: "address",
    label: "Kirim Hadiah",
    account: "Jl. Danau Toba No. 45, Balige, Toba, Sumut 22312",
    holder: "Penerima: Dian Lestari Sianipar",
  },
];

export const closing = {
  verse:
    "“Demikianlah mereka bukan lagi dua, melainkan satu. Karena itu, apa yang telah dipersatukan Allah, tidak boleh diceraikan manusia.”",
  verseRef: "Matius 19:6",
  note:
    "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.",
  signature: "Kami yang berbahagia,",
  families: "Keluarga Sihombing & Keluarga Panjaitan",
};

export const music = {
  src: "/audio/thanks-for-loving-me.mp3",
  title: "Jon Bon Jovi - Thanks for Loving Me",
};

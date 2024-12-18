interface CharacteristicStep {
  title: string;
  description: string;
  options: CharacteristicOption[];
}

export interface CharacteristicOption {
  label: string;
  value: string;
  type: string;
  description?: string;
}

// Comprehensive characteristic selection steps
const CHARACTERISTIC_STEPS: CharacteristicStep[] = [
  {
    title: "Struktur Daun",
    description: "Identifikasi struktur dan bentuk daun tanaman",
    options: [
      {
        label: "Daun Tunggal",
        value: "Tunggal",
        type: "leafType",
        description: "Daun dengan helai tunggal tidak terbagi",
      },
      {
        label: "Daun Majemuk",
        value: "Majemuk",
        type: "leafType",
        description: "Daun terdiri dari beberapa helai pada satu tangkai",
      },
      {
        label: "Daun Menjari",
        value: "Menjari",
        type: "leafType",
        description: "Daun dengan struktur menyerupai jari",
      },
      {
        label: "Daun Menyirip",
        value: "Menyirip",
        type: "leafType",
        description: "Daun dengan struktur menyirip seperti daun pakis",
      },
      // {
      //   label: "Lainnya",
      //   value: "Tipe Lain",
      //   type: "leafType",
      //   description: "Struktur daun dengan karakteristik khusus",
      // },
    ],
  },
  {
    title: "Habitat Utama",
    description: "Tentukan zona ekologi utama tempat tanaman biasa hidup",
    options: [
      {
        label: "Kawasan Tropis",
        value: "Tropis",
        type: "habitat",
        description: "Habitat dengan curah hujan tinggi dan suhu konstan",
      },
      {
        label: "Kawasan Subtropis",
        value: "Subtropis",
        type: "habitat",
        description: "Wilayah transisi antara tropis dan iklim sedang",
      },
      {
        label: "Iklim Sedang",
        value: "Iklim Sedang",
        type: "habitat",
        description: "Kawasan dengan empat musim yang jelas",
      },
      {
        label: "Zona Gunung",
        value: "Gunung",
        type: "habitat",
        description: "Habitat di ketinggian dengan kondisi khusus",
      },
      {
        label: "Kawasan Pantai",
        value: "Pantai",
        type: "habitat",
        description: "Lingkungan dekat dengan garis pantai",
      },
      // {
      //   label: "Habitat Lain",
      //   value: "Lainnya",
      //   type: "habitat",
      //   description: "Zona ekologi dengan karakteristik unik",
      // },
    ],
  },
];

export const EXPANDED_CHARACTERISTIC_STEPS: CharacteristicStep[] = [
  ...CHARACTERISTIC_STEPS,
  {
    title: "Nilai Ekonomi",
    description: "Pilih kategori nilai ekonomi tanaman",
    options: [
      {
        label: "Pangan",
        value: "Pangan",
        type: "economicValue",
        description: "Tanaman yang dapat dikonsumsi atau digunakan sebagai bahan pangan"
      },
      {
        label: "Industri",
        value: "Industri",
        type: "economicValue",
        description: "Tanaman dengan nilai industri tinggi"
      },
      {
        label: "Obat-obatan",
        value: "Obat",
        type: "economicValue",
        description: "Tanaman dengan manfaat medis atau farmasi"
      }
    ]
  },
  {
    title: "Status Konservasi",
    description: "Pilih status konservasi tanaman",
    options: [
      {
        label: "Tidak Terancam",
        value: "Tidak Terancam",
        type: "conservationStatus",
        description: "Populasi tanaman stabil"
      },
      {
        label: "Terancam",
        value: "Terancam",
        type: "conservationStatus",
        description: "Populasi tanaman berisiko"
      },
      {
        label: "Dilindungi",
        value: "Dilindungi",
        type: "conservationStatus",
        description: "Tanaman dalam program perlindungan"
      }
    ]
  }
];
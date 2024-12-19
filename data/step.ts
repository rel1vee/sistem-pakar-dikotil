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
    ],
  },
];

export const EXPANDED_CHARACTERISTIC_STEPS: CharacteristicStep[] = [
  ...CHARACTERISTIC_STEPS,
  {
    title: "Warna Bunga",
    description: "Identifikasi warna bunga tanaman",
    options: [
      {
        label: "Putih",
        value: "Putih",
        type: "bloomColor",
        description: "Bunga berwarna putih",
      },
      {
        label: "Kuning",
        value: "Kuning",
        type: "bloomColor",
        description: "Bunga berwarna kuning",
      },
      {
        label: "Pink",
        value: "Pink",
        type: "bloomColor",
        description: "Bunga berwarna merah muda",
      },
      {
        label: "Merah",
        value: "Merah",
        type: "bloomColor",
        description: "Bunga berwarna merah",
      },
      {
        label: "Ungu",
        value: "Ungu",
        type: "bloomColor",
        description: "Bunga berwarna ungu",
      },
      {
        label: "Krem",
        value: "Krem",
        type: "bloomColor",
        description: "Bunga berwarna krem",
      },
      {
        label: "Hijau",
        value: "Hijau",
        type: "bloomColor",
        description: "Bunga berwarna hijau",
      },
      // {
      //   label: "Tidak Ada Bunga",
      //   value: "",
      //   type: "bloomColor",
      //   description: "Tanaman tidak memiliki bunga"
      // }
    ],
  },
  {
    title: "Warna Buah",
    description: "Identifikasi warna buah tanaman",
    options: [
      {
        label: "Hijau",
        value: "Hijau",
        type: "fruitColor",
        description: "Buah berwarna hijau",
      },
      {
        label: "Kuning",
        value: "Kuning",
        type: "fruitColor",
        description: "Buah berwarna kuning",
      },
      {
        label: "Merah",
        value: "Merah",
        type: "fruitColor",
        description: "Buah berwarna merah",
      },
      {
        label: "Oranye",
        value: "Oranye",
        type: "fruitColor",
        description: "Buah berwarna oranye",
      },
      {
        label: "Cokelat",
        value: "Cokelat",
        type: "fruitColor",
        description: "Buah berwarna cokelat",
      },
      {
        label: "Ungu",
        value: "Ungu",
        type: "fruitColor",
        description: "Buah berwarna ungu",
      },
      {
        label: "Putih",
        value: "Putih",
        type: "fruitColor",
        description: "Buah berwarna putih",
      },
      // {
      //   label: "Tidak Ada Buah",
      //   value: "",
      //   type: "fruitColor",
      //   description: "Tanaman tidak memiliki buah"
      // }
    ],
  },
];

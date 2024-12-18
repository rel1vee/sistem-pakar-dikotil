"use client";

import React, { useState } from "react";
import { Info, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PlantCharacteristic = string;

interface Plant {
  name: string;
  scientificName: string;
  characteristics: PlantCharacteristic[];
  habitat: string;
  uniqueFeatures: string[];
}

interface CharacteristicOption {
  label: string;
  value: string;
}

interface CharacteristicStep {
  title: string;
  options: CharacteristicOption[];
}


const DICOTYL_PLANTS: Plant[] = [
  {
    name: "Mangga",
    scientificName: "Mangifera indica",
    characteristics: [
      "Dua keping biji terpisah saat berkecambah",
      "Daun tunggal oval, runcing, hijau tua",
      "Batang keras, tinggi 10-40 meter",
      "Akar tunggang kuat",
      "Bunga berkelompok putih atau kuning",
      "Tumbuh di daerah tropis dan subtropis",
    ],
    habitat: "Tropis dan subtropis",
    uniqueFeatures: ["Buah manis", "Aroma khas"],
  },
  {
    name: "Karet",
    scientificName: "Hevea brasiliensis",
    characteristics: [
      "Dua keping biji terpecah saat berkecambah",
      "Batang tegak hingga 30 meter",
      "Mengeluarkan getah putih",
      "Daun majemuk 3-5 anak daun oval",
      "Akar tunggang dalam dan bercabang",
      "Bunga kecil putih kehijauan",
    ],
    habitat: "Tropis dengan curah hujan tinggi",
    uniqueFeatures: ["Produksi karet alami", "Getah putih"],
  },
  // Add other plants from the document
  {
    name: "Tomat",
    scientificName: "Solanum lycopersicum",
    characteristics: [
      "Dua keping biji terpisah saat berkecambah",
      "Daun menyirip hijau tua, bergerigi",
      "Batang lunak bercabang, tinggi 2 meter",
      "Buah bulat/lonjong, warna merah/kuning/hijau",
      "Bunga kecil kuning berkelompok",
    ],
    habitat: "Iklim sedang hingga tropis",
    uniqueFeatures: ["Mengandung likopen", "Kaya vitamin C"],
  },
  {
    name: "Cabai",
    scientificName: "Capsicum annuum",
    characteristics: [
      "Dua keping biji terpecah saat berkecambah",
      "Batang tegak 50-100 cm",
      "Daun oval bergerigi hijau cerah",
      "Akar tunggang kuat",
      "Bunga kecil putih/kuning",
      "Buah hijau saat muda, merah saat matang",
    ],
    habitat: "Tropis dan subtropis",
    uniqueFeatures: ["Rasa pedas", "Kaya vitamin C"],
  },
  // More plants can be added
];

// Rule-based reasoning system
const RuleBasedExpertSystem: React.FC = () => {
  const [selectedCharacteristics, setSelectedCharacteristics] = useState<
    string[]
  >([]);
  const [matchedPlants, setMatchedPlants] = useState<Plant[]>([]);
  const [step, setStep] = useState<number>(0);

  // Characteristic selection steps
  const CHARACTERISTIC_STEPS: CharacteristicStep[] = [
    {
      title: "Tipe Biji Saat Berkecambah",
      options: [
        { label: "Dua keping terpisah", value: "dua keping biji terpisah" },
        { label: "Lainnya", value: "other" },
      ],
    },
    {
      title: "Struktur Daun",
      options: [
        { label: "Daun Tunggal", value: "daun tunggal" },
        { label: "Daun Majemuk", value: "daun majemuk" },
        { label: "Lainnya", value: "other" },
      ],
    },
    {
      title: "Habitat Utama",
      options: [
        { label: "Tropis", value: "tropis" },
        { label: "Subtropis", value: "subtropis" },
        { label: "Iklim Sedang", value: "iklim sedang" },
      ],
    },
  ];

  const resetSystem = (): void => {
    setSelectedCharacteristics([]);
    setMatchedPlants([]);
    setStep(0);
  };

  const handleCharacteristicSelection = (characteristic: string): void => {
    const updatedCharacteristics = [...selectedCharacteristics, characteristic];
    setSelectedCharacteristics(updatedCharacteristics);

    // Move to next step or find matches
    if (step < CHARACTERISTIC_STEPS.length - 1) {
      setStep((prevStep) => prevStep + 1);
    } else {
      // Rule-based matching
      const matches = DICOTYL_PLANTS.filter((plant) =>
        updatedCharacteristics.some((char) =>
          plant.characteristics.some((pc) =>
            pc.toLowerCase().includes(char.toLowerCase())
          )
        )
      );
      setMatchedPlants(matches);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TreePine className="mr-2" /> Sistem Pakar Tanaman Dikotil
          </CardTitle>
        </CardHeader>
        <CardContent>
          {matchedPlants.length > 0 ? (
            <div>
              <h2 className="text-xl font-bold mb-4">Hasil Identifikasi:</h2>
              {matchedPlants.map((plant, index) => (
                <Card key={index} className="mb-4">
                  <CardHeader>
                    <CardTitle>
                      {plant.name} ({plant.scientificName})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold">Karakteristik:</h3>
                    <ul className="list-disc pl-5">
                      {plant.characteristics.map((char, charIndex) => (
                        <li key={charIndex}>{char}</li>
                      ))}
                    </ul>
                    <div className="mt-2">
                      <strong>Habitat:</strong> {plant.habitat}
                    </div>
                    <div className="mt-2">
                      <strong>Keunikan:</strong>{" "}
                      {plant.uniqueFeatures.join(", ")}
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button onClick={resetSystem} className="mt-4">
                Mulai Ulang Identifikasi
              </Button>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold mb-4">
                {CHARACTERISTIC_STEPS[step].title}
              </h2>
              <div className="space-y-2">
                {CHARACTERISTIC_STEPS[step].options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full"
                    onClick={() => handleCharacteristicSelection(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
              {step > 0 && (
                <Button
                  variant="ghost"
                  className="mt-4"
                  onClick={() => setStep(step - 1)}
                >
                  Kembali
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      <Alert className="mt-4">
        <Info className="h-4 w-4" />
        <AlertTitle>Sistem Pakar Tanaman Dikotil</AlertTitle>
        <AlertDescription>
          Sistem ini menggunakan penalaran berbasis aturan untuk
          mengidentifikasi tanaman dikotil berdasarkan karakteristik yang Anda
          pilih.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default RuleBasedExpertSystem;

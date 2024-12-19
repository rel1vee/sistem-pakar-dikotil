"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import React, { useMemo, useState } from "react";
import { Plant, DICOTYL_PLANTS } from "@/data/dicotil";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  TreePine,
  Search,
  HelpCircle,
  RefreshCcw,
  AlertTriangle,
  Filter,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  CharacteristicOption,
  EXPANDED_CHARACTERISTIC_STEPS,
} from "@/data/step";

type AdvancedFilters = {
  economicValue?: string[];
  conservationStatus?: string[];
};

const RuleBasedExpertSystemPage = () => {
  const [step, setStep] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [matchedPlants, setMatchedPlants] = useState<Plant[]>([]);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isAdvancedMode, setIsAdvancedMode] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>({});

  const [selectedCharacteristics, setSelectedCharacteristics] = useState<{
    [key: string]: string;
  }>({});

  // Reset System State
  const resetSystem = () => {
    setStep(0);
    setSearchTerm("");
    setMatchedPlants([]);
    setSelectedCharacteristics({});
    setAdvancedFilters({});
    setErrorMessage(null);
  };

  // Characteristic Selection Handler
  const handleCharacteristicSelection = (option: CharacteristicOption) => {
    if (!option || !option.type) {
      setErrorMessage("Pilihan tidak valid.");
      return;
    }

    try {
      setSelectedCharacteristics((prev) => ({
        ...prev,
        [option.type]: option.value,
      }));

      const nextStep = step + 1;
      if (nextStep < EXPANDED_CHARACTERISTIC_STEPS.length) {
        setStep(nextStep);
      } else {
        findMatches();
      }
    } catch {
      setErrorMessage("Kesalahan dalam memilih karakteristik.");
      resetSystem();
    }
  };

  // Improved Match Finding Logic
  const findMatches = useMemo(() => {
    return () => {
      try {
        const matches = DICOTYL_PLANTS.filter((plant) => {
          // Basic Characteristic Matching
          const basicMatches = Object.entries(selectedCharacteristics).every(
            ([key, value]) => {
              switch (key) {
                case "leafType":
                  return plant.leafType === value;
                case "habitat":
                  return plant.habitat.includes(value);
                case "bloomColor":
                  return plant.bloomColor.includes(value);
                case "fruitColor":
                  return plant.fruitColor.includes(value);
                default:
                  return true;
              }
            }
          );

          // Advanced Filtering
          const advancedMatches =
            (!advancedFilters.economicValue ||
              (plant.economicValue &&
                advancedFilters.economicValue.some((val) =>
                  plant.economicValue?.includes(val)
                ))) &&
            (!advancedFilters.conservationStatus ||
              plant.conservationStatus ===
                advancedFilters.conservationStatus[0]);

          // Flexible Search Matching
          const searchMatch =
            !searchTerm ||
            plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            plant.scientificName
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            plant.characteristics.some((char) =>
              char.toLowerCase().includes(searchTerm.toLowerCase())
            ) ||
            plant.uniqueFeatures.some((unique) =>
              unique.toLowerCase().includes(searchTerm.toLowerCase())
            );

          return basicMatches && advancedMatches && searchMatch;
        });

        setMatchedPlants(matches);
        setErrorMessage(
          matches.length === 0 ? "Tidak ada tanaman ditemukan." : null
        );
        return matches;
      } catch {
        setErrorMessage("Terjadi kesalahan dalam pencarian.");
        return [];
      }
    };
  }, [selectedCharacteristics, advancedFilters, searchTerm]);

  // Render langkah karakteristik
  const renderCharacteristicStep = () => {
    const currentStep = EXPANDED_CHARACTERISTIC_STEPS[step];
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{currentStep.title}</CardTitle>
          <CardDescription>{currentStep.description}.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {currentStep.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-between"
              onClick={() => handleCharacteristicSelection(option)}
            >
              {option.label}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="ml-2 h-4 w-4 text-gray-500" />
                  </TooltipTrigger>
                  <TooltipContent>{option.description}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Button>
          ))}
        </CardContent>
      </Card>
    );
  };

  // Render Search Results
  const renderSearchResults = () => {
    return (
      <div>
        {errorMessage && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base lg:text-xl font-bold">
            {matchedPlants.length} Tanaman Ditemukan.
          </h2>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setIsFilterDrawerOpen(true)}
              variant="outline"
            >
              <Filter className="h-4 w-4" /> Filter
            </Button>
            <Button onClick={resetSystem} variant="outline">
              <RefreshCcw className="h-4 w-4" /> Ulangi
            </Button>
          </div>
        </div>

        <Accordion type="single" collapsible>
          {matchedPlants.map((plant, index) => (
            <AccordionItem value={`plant-${index}`} key={index}>
              <AccordionTrigger>
                <div className="items-center space-x-2">
                  {plant.name} <em>({plant.scientificName})</em>
                  {plant.conservationStatus && (
                    <Badge variant="outline">{plant.conservationStatus}</Badge>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 flex justify-center">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="max-w-full md:w-2/3 lg:w-1/2 h-auto rounded-lg shadow-md md:my-4"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Karakteristik</h3>
                    <ul className="list-disc pl-5">
                      {plant.characteristics.map((char, i) => (
                        <li key={i}>{char}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p>
                      <strong>Habitat:</strong> {plant.habitat.join(", ")}
                    </p>
                    <p>
                      <strong>Tinggi:</strong> {plant.height.min}-
                      {plant.height.max} {plant.height.unit}
                    </p>
                    <p>
                      <strong>Warna Bunga:</strong>{" "}
                      {plant.bloomColor.join(", ")}
                    </p>
                    <p>
                      <strong>Warna Buah:</strong> {plant.fruitColor.join(", ")}
                    </p>
                    <p>
                      <strong>Khasiat:</strong>{" "}
                      {plant.medicinialProperties?.join(", ")}
                    </p>
                    <p>
                      <strong>Peran Ekologis:</strong>{" "}
                      {plant.ecologicalRole?.join(", ")}
                    </p>

                    <p>
                      <strong>Nilai Ekonomi:</strong>{" "}
                      {plant.economicValue?.join(", ")}
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  };

  // Advanced Filter Drawer
  const renderAdvancedFilters = () => {
    return (
      <Drawer open={isFilterDrawerOpen} onOpenChange={setIsFilterDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Filter Tambahan</DrawerTitle>
            <DrawerDescription>
              Sesuaikan pencarian tanaman Anda.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            {/* Tambahkan filter lanjutan di sini */}
            <div className="flex items-center justify-between">
              <label>Mode Pencarian Tambahan</label>
              <Switch
                checked={isAdvancedMode}
                onCheckedChange={setIsAdvancedMode}
              />
            </div>
            {isAdvancedMode && (
              <div className="space-y-2">
                {/* Contoh filter ekonomi */}
                <div>
                  <h4 className="mb-2 font-semibold">Nilai Ekonomi</h4>
                  {[
                    "Tanaman Hias",
                    "Industri Minuman",
                    "Industri Pangan",
                    "Industri Kayu",
                    "Konstruksi",
                    "Kosmetik",
                    "Ekspor",
                    "Furniture",
                  ].map((value) => (
                    <Button
                      key={value}
                      variant={
                        advancedFilters.economicValue?.includes(value)
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      className="mr-2 mb-2"
                      onClick={() => {
                        setAdvancedFilters((prev) => ({
                          ...prev,
                          economicValue: prev.economicValue?.includes(value)
                            ? prev.economicValue.filter((v) => v !== value)
                            : [...(prev.economicValue || []), value],
                        }));
                      }}
                    >
                      {value}
                    </Button>
                  ))}
                </div>
                {/* Contoh status konversasi */}
                <div>
                  <h4 className="mb-2 font-semibold">Status Konversasi</h4>
                  {[
                    "Budidaya Intensif",
                    "Beberapa Spesies Terancam",
                    "Budidaya Berkelanjutan",
                    "Tidak Terancam",
                  ].map((value) => (
                    <Button
                      key={value}
                      variant={
                        advancedFilters.conservationStatus?.includes(value)
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      className="mr-2 mb-2"
                      onClick={() => {
                        setAdvancedFilters((prev) => ({
                          ...prev,
                          conservationStatus: prev.conservationStatus?.includes(
                            value
                          )
                            ? prev.conservationStatus.filter((v) => v !== value)
                            : [...(prev.conservationStatus || []), value],
                        }));
                      }}
                    >
                      {value}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <DrawerFooter>
            <Button
              onClick={() => {
                findMatches();
                setIsFilterDrawerOpen(false);
              }}
            >
              Terapkan Filter
            </Button>
            <DrawerClose>
              <Button className="w-full" variant="outline">
                Batal
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <Card>
        <CardHeader className="flex flex-row items-center">
          <TreePine className="mr-3" />
          <div>
            <CardTitle>Sistem Pakar Tanaman Dikotil</CardTitle>
            <CardDescription>
              Temukan dan identifikasi tanaman dikotil dengan mudah.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative flex-grow">
              <Search
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <Input
                placeholder="Masukkan ciri-ciri tanaman..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  findMatches();
                }}
                className="pl-10"
              />
            </div>
          </div>

          {matchedPlants.length > 0
            ? renderSearchResults()
            : renderCharacteristicStep()}

          {renderAdvancedFilters()}
        </CardContent>
      </Card>
    </div>
  );
};

export default RuleBasedExpertSystemPage;

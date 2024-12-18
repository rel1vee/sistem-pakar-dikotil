"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plant, DICOTYL_PLANTS } from "@/data/dicotil";
import { TreePine, Search, HelpCircle, RefreshCcw } from "lucide-react";
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
  CharacteristicOption,
  EXPANDED_CHARACTERISTIC_STEPS,
} from "@/data/step";

const RuleBasedExpertSystemPage = () => {
  const [step, setStep] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [matchedPlants, setMatchedPlants] = useState<Plant[]>([]);

  const [advancedFilters, setAdvancedFilters] = useState<{
    economicValue?: string[];
    conservationStatus?: string[];
    habitats?: string[];
  }>({});

  const [selectedCharacteristics, setSelectedCharacteristics] = useState<{
    [key: string]: string;
  }>({});

  const resetSystem = (): void => {
    setStep(0);
    setSearchTerm("");
    setMatchedPlants([]);
    setSelectedCharacteristics({});
    setAdvancedFilters({});
  };

  // Handle characteristic selection
  const handleCharacteristicSelection = (option: CharacteristicOption) => {
    setSelectedCharacteristics((prev) => ({
      ...prev,
      [option.type]: option.value,
    }));

    if (step < EXPANDED_CHARACTERISTIC_STEPS.length - 1) {
      setStep((prevStep) => prevStep + 1);
    } else {
      findMatches();
    }
  };

  // Match plants based on selected characteristics
  const findMatches = () => {
    const matches = DICOTYL_PLANTS.filter((plant) => {
      // Filter berdasarkan karakteristik dasar
      const basicMatch = Object.entries(selectedCharacteristics).every(
        ([key, value]) => {
          switch (key) {
            case "leafType":
              return plant.leafType === value;
            case "habitat":
              return plant.habitat.includes(value);
            default:
              return true;
          }
        }
      );

      // Filter lanjutan
      const advancedMatch =
        (!advancedFilters.economicValue ||
          advancedFilters.economicValue.some((val) =>
            plant.economicValue?.includes(val)
          )) &&
        (!advancedFilters.conservationStatus ||
          advancedFilters.conservationStatus.includes(
            plant.conservationStatus || ""
          )) &&
        (!advancedFilters.habitats ||
          advancedFilters.habitats.some((habitat) =>
            plant.habitat.includes(habitat)
          ));

      // Filter pencarian teks
      const searchMatch = searchTerm
        ? plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      return basicMatch && advancedMatch && searchMatch;
    });

    setMatchedPlants(matches);
  };

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

  // Render hasil pencarian
  const renderSearchResults = () => {
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {matchedPlants.length} Tanaman Ditemukan.
          </h2>
          <Button onClick={resetSystem} variant="outline">
            <RefreshCcw className="mr" /> Ulangi
          </Button>
        </div>

        {/* Accordion untuk detail tanaman */}
        <Accordion type="single" collapsible>
          {matchedPlants.map((plant, index) => (
            <AccordionItem value={`plant-${index}`} key={index}>
              <AccordionTrigger>
                <div>
                  {plant.name} <em>({plant.scientificName})</em>
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
                    <h3 className="font-semibold">Karakteristik</h3>
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
                    {plant.economicValue && (
                      <p>
                        <strong>Nilai Ekonomi:</strong>{" "}
                        {plant.economicValue.join(", ")}
                      </p>
                    )}
                    {plant.conservationStatus && (
                      <p>
                        <strong>Status Konservasi:</strong>{" "}
                        {plant.conservationStatus}
                      </p>
                    )}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
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
          {matchedPlants.length > 0 ? (
            <>
              <div className="mb-4">
                <div className="relative flex-grow">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <Input
                    placeholder="Cari tanaman..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      findMatches();
                    }}
                    className="pl-10"
                  />
                </div>
              </div>
              {renderSearchResults()}
            </>
          ) : (
            renderCharacteristicStep()
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RuleBasedExpertSystemPage;

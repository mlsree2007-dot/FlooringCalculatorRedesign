import { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Calculator, Save, Download, Plus, Lightbulb } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import type { TileCalculation, CalculationResult, Project } from '../lib/types';
import { storage } from '../lib/storage';
import { generatePDF } from '../lib/pdf';
import { toast } from 'sonner';
import { MaterialSuggestions } from './MaterialSuggestions';

export default function TileCalculator() {
  const navigate = useNavigate();
  const [showResults, setShowResults] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [calculation, setCalculation] = useState<TileCalculation>({
    type: 'tile',
    tileWidth: 12,
    tileLength: 12,
    roomWidth: 10,
    roomLength: 12,
    pricePerUnit: 2.5,
    wastePercentage: 10,
  });
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateResults = () => {
    const roomArea = calculation.roomWidth * calculation.roomLength;
    const tileArea = (calculation.tileWidth * calculation.tileLength) / 144; // Convert to sq ft
    const tilesRequired = Math.ceil(roomArea / tileArea);
    const wasteAmount = Math.ceil(tilesRequired * (calculation.wastePercentage / 100));
    const totalTiles = tilesRequired + wasteAmount;
    const materialCost = tilesRequired * calculation.pricePerUnit;
    const wasteCost = wasteAmount * calculation.pricePerUnit;
    const totalCost = materialCost + wasteCost;

    const calcResult: CalculationResult = {
      area: roomArea,
      quantity: tilesRequired,
      wasteAmount,
      totalQuantity: totalTiles,
      totalCost,
      costBreakdown: {
        materialCost,
        wasteCost,
      },
    };

    setResult(calcResult);
    setShowResults(true);

    // Add to history
    const project: Project = {
      id: Date.now().toString(),
      name: `Tile Project ${new Date().toLocaleDateString()}`,
      calculation,
      result: calcResult,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    storage.addToHistory(project);
  };

  const handleSaveProject = () => {
    if (!result) return;

    const project: Project = {
      id: Date.now().toString(),
      name: `Tile Project ${new Date().toLocaleDateString()}`,
      calculation,
      result,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    storage.saveProject(project);
    toast.success('Project saved successfully!');
  };

  const handleDownloadPDF = () => {
    if (!result) return;

    const project: Project = {
      id: Date.now().toString(),
      name: `Tile Project ${new Date().toLocaleDateString()}`,
      calculation,
      result,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    generatePDF(project);
    toast.success('PDF downloaded successfully!');
  };

  const updateField = (field: keyof TileCalculation, value: number) => {
    setCalculation((prev) => ({ ...prev, [field]: value }));
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="rounded-xl"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-semibold text-foreground">Tile Calculator</h1>
              <p className="text-xs text-muted-foreground">Wood & Laminate</p>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D6A67A] to-[#8B7355] flex items-center justify-center">
            <Calculator className="w-5 h-5 text-white" />
          </div>
        </div>
      </motion.div>

      <div className="px-4 pt-6 space-y-6">
        {/* Tile Dimensions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 border-0 shadow-md">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#D6A67A]" />
              Tile Dimensions
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="tileWidth" className="text-sm text-muted-foreground mb-2 block">
                  Tile Width (inches)
                </Label>
                <Input
                  id="tileWidth"
                  type="number"
                  value={calculation.tileWidth}
                  onChange={(e) => updateField('tileWidth', parseFloat(e.target.value) || 0)}
                  className="h-12 rounded-xl bg-input-background border-0"
                />
              </div>
              <div>
                <Label htmlFor="tileLength" className="text-sm text-muted-foreground mb-2 block">
                  Tile Length (inches)
                </Label>
                <Input
                  id="tileLength"
                  type="number"
                  value={calculation.tileLength}
                  onChange={(e) => updateField('tileLength', parseFloat(e.target.value) || 0)}
                  className="h-12 rounded-xl bg-input-background border-0"
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Room Dimensions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 border-0 shadow-md">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#D6A67A]" />
              Room Dimensions
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="roomWidth" className="text-sm text-muted-foreground mb-2 block">
                  Room Width (feet)
                </Label>
                <Input
                  id="roomWidth"
                  type="number"
                  value={calculation.roomWidth}
                  onChange={(e) => updateField('roomWidth', parseFloat(e.target.value) || 0)}
                  className="h-12 rounded-xl bg-input-background border-0"
                />
              </div>
              <div>
                <Label htmlFor="roomLength" className="text-sm text-muted-foreground mb-2 block">
                  Room Length (feet)
                </Label>
                <Input
                  id="roomLength"
                  type="number"
                  value={calculation.roomLength}
                  onChange={(e) => updateField('roomLength', parseFloat(e.target.value) || 0)}
                  className="h-12 rounded-xl bg-input-background border-0"
                />
              </div>
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm text-muted-foreground">Installation Area</Label>
                  <span className="text-lg font-semibold text-foreground">
                    {(calculation.roomWidth * calculation.roomLength).toFixed(2)} sq ft
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Pricing & Waste */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 border-0 shadow-md">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#D6A67A]" />
              Pricing & Waste
            </h3>
            <div className="space-y-6">
              <div>
                <Label htmlFor="pricePerUnit" className="text-sm text-muted-foreground mb-2 block">
                  Price Per Tile ($)
                </Label>
                <Input
                  id="pricePerUnit"
                  type="number"
                  step="0.01"
                  value={calculation.pricePerUnit}
                  onChange={(e) => updateField('pricePerUnit', parseFloat(e.target.value) || 0)}
                  className="h-12 rounded-xl bg-input-background border-0"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-sm text-muted-foreground">Waste Percentage</Label>
                  <span className="text-sm font-semibold text-[#D6A67A]">
                    {calculation.wastePercentage}%
                  </span>
                </div>
                <Slider
                  value={[calculation.wastePercentage]}
                  onValueChange={(values) => updateField('wastePercentage', values[0])}
                  min={0}
                  max={30}
                  step={1}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>0%</span>
                  <span>30%</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Calculate Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={calculateResults}
            className="w-full h-14 rounded-xl bg-gradient-to-r from-[#D6A67A] to-[#8B7355] hover:opacity-90 transition-opacity"
            size="lg"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Calculate Results
          </Button>
        </motion.div>

        {/* Material Suggestions Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <Button
            onClick={() => setShowSuggestions(!showSuggestions)}
            variant="outline"
            className="w-full h-12 rounded-xl border-2"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            {showSuggestions ? 'Hide' : 'Show'} Material Suggestions
          </Button>
        </motion.div>

        {/* Material Suggestions */}
        {showSuggestions && <MaterialSuggestions flooringType="tile" />}

        {/* Results */}
        {showResults && result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-[#D6A67A]/10 to-[#8B7355]/10">
              <h3 className="font-semibold text-foreground mb-4">Calculation Results</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Tiles Required</span>
                  <span className="font-semibold text-foreground">{result.quantity} tiles</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Waste Amount</span>
                  <span className="font-semibold text-foreground">{result.wasteAmount} tiles</span>
                </div>
                <div className="h-px bg-border my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Tiles Needed</span>
                  <span className="font-semibold text-[#D6A67A]">{result.totalQuantity} tiles</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-0 shadow-lg">
              <h3 className="font-semibold text-foreground mb-4">Cost Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Material Cost</span>
                  <span className="font-semibold text-foreground">
                    ${result.costBreakdown.materialCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Waste Cost</span>
                  <span className="font-semibold text-foreground">
                    ${result.costBreakdown.wasteCost.toFixed(2)}
                  </span>
                </div>
                <div className="h-px bg-border my-2" />
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">Grand Total</span>
                  <span className="text-2xl font-bold text-[#D6A67A]">
                    ${result.totalCost.toFixed(2)}
                  </span>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleSaveProject}
                variant="outline"
                className="h-12 rounded-xl border-2"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button
                onClick={handleDownloadPDF}
                variant="outline"
                className="h-12 rounded-xl border-2"
              >
                <Download className="w-4 h-4 mr-2" />
                PDF
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
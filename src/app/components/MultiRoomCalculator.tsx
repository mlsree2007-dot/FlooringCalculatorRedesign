import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Plus, Trash2, Download, Save, Home } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Slider } from './ui/slider';
import type { Room, MultiRoomProject, TileCalculation, CarpetCalculation, CalculationResult } from '../lib/types';
import { storage } from '../lib/storage';
import { generateMultiRoomPDF } from '../lib/pdf';
import { toast } from 'sonner';

type RoomFormData = {
  name: string;
  type: 'tile' | 'carpet';
  roomWidth: number;
  roomLength: number;
  tileWidth?: number;
  tileLength?: number;
  pricePerUnit?: number;
  carpetRollWidth?: number;
  carpetCostPerSqFt?: number;
  wastePercentage: number;
};

export default function MultiRoomCalculator() {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRoom, setCurrentRoom] = useState<RoomFormData>({
    name: '',
    type: 'tile',
    roomWidth: 10,
    roomLength: 12,
    tileWidth: 12,
    tileLength: 12,
    pricePerUnit: 2.5,
    wastePercentage: 10,
  });

  const calculateRoomResult = (roomData: RoomFormData): CalculationResult => {
    const roomArea = roomData.roomWidth * roomData.roomLength;

    if (roomData.type === 'tile') {
      const tileArea = ((roomData.tileWidth || 12) * (roomData.tileLength || 12)) / 144;
      const tilesRequired = Math.ceil(roomArea / tileArea);
      const wasteAmount = Math.ceil(tilesRequired * (roomData.wastePercentage / 100));
      const totalTiles = tilesRequired + wasteAmount;
      const materialCost = tilesRequired * (roomData.pricePerUnit || 0);
      const wasteCost = wasteAmount * (roomData.pricePerUnit || 0);

      return {
        area: roomArea,
        quantity: tilesRequired,
        wasteAmount,
        totalQuantity: totalTiles,
        totalCost: materialCost + wasteCost,
        costBreakdown: { materialCost, wasteCost },
      };
    } else {
      const carpetRequired = roomArea;
      const wasteAmount = carpetRequired * (roomData.wastePercentage / 100);
      const totalCarpet = carpetRequired + wasteAmount;
      const materialCost = carpetRequired * (roomData.carpetCostPerSqFt || 0);
      const wasteCost = wasteAmount * (roomData.carpetCostPerSqFt || 0);

      return {
        area: roomArea,
        quantity: carpetRequired,
        wasteAmount,
        totalQuantity: totalCarpet,
        totalCost: materialCost + wasteCost,
        costBreakdown: { materialCost, wasteCost },
      };
    }
  };

  const addRoom = () => {
    if (!currentRoom.name) {
      toast.error('Please enter a room name');
      return;
    }

    const result = calculateRoomResult(currentRoom);
    
    let calculation: TileCalculation | CarpetCalculation;
    if (currentRoom.type === 'tile') {
      calculation = {
        type: 'tile',
        tileWidth: currentRoom.tileWidth || 12,
        tileLength: currentRoom.tileLength || 12,
        roomWidth: currentRoom.roomWidth,
        roomLength: currentRoom.roomLength,
        pricePerUnit: currentRoom.pricePerUnit || 0,
        wastePercentage: currentRoom.wastePercentage,
      };
    } else {
      calculation = {
        type: 'carpet',
        roomWidth: currentRoom.roomWidth,
        roomLength: currentRoom.roomLength,
        carpetRollWidth: currentRoom.carpetRollWidth || 12,
        carpetCostPerSqFt: currentRoom.carpetCostPerSqFt || 0,
        wastePercentage: currentRoom.wastePercentage,
      };
    }

    const newRoom: Room = {
      id: Date.now().toString(),
      name: currentRoom.name,
      calculation,
      result,
    };

    setRooms([...rooms, newRoom]);
    setCurrentRoom({
      name: '',
      type: 'tile',
      roomWidth: 10,
      roomLength: 12,
      tileWidth: 12,
      tileLength: 12,
      pricePerUnit: 2.5,
      wastePercentage: 10,
    });
    toast.success(`${currentRoom.name} added successfully!`);
  };

  const removeRoom = (id: string) => {
    setRooms(rooms.filter((r) => r.id !== id));
    toast.success('Room removed');
  };

  const handleSaveProject = () => {
    if (rooms.length === 0) {
      toast.error('Please add at least one room');
      return;
    }

    const project: MultiRoomProject = {
      id: Date.now().toString(),
      name: projectName || `Multi-Room Project ${new Date().toLocaleDateString()}`,
      customerName,
      rooms,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    storage.saveMultiRoomProject(project);
    toast.success('Multi-room project saved!');
  };

  const handleDownloadPDF = () => {
    if (rooms.length === 0) {
      toast.error('Please add at least one room');
      return;
    }

    const project: MultiRoomProject = {
      id: Date.now().toString(),
      name: projectName || `Multi-Room Project ${new Date().toLocaleDateString()}`,
      customerName,
      rooms,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    generateMultiRoomPDF(project);
    toast.success('PDF downloaded successfully!');
  };

  const grandTotal = rooms.reduce((sum, room) => sum + room.result.totalCost, 0);
  const totalArea = rooms.reduce((sum, room) => sum + room.result.area, 0);

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
              <h1 className="font-semibold text-foreground">Multi-Room</h1>
              <p className="text-xs text-muted-foreground">{rooms.length} rooms</p>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D6A67A] to-[#8B7355] flex items-center justify-center">
            <Home className="w-5 h-5 text-white" />
          </div>
        </div>
      </motion.div>

      <div className="px-4 pt-6 space-y-6">
        {/* Project Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 border-0 shadow-md">
            <h3 className="font-semibold text-foreground mb-4">Project Information</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="projectName" className="text-sm text-muted-foreground mb-2 block">
                  Project Name
                </Label>
                <Input
                  id="projectName"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g., Kitchen Renovation"
                  className="h-12 rounded-xl bg-input-background border-0"
                />
              </div>
              <div>
                <Label htmlFor="customerName" className="text-sm text-muted-foreground mb-2 block">
                  Customer Name (Optional)
                </Label>
                <Input
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g., John Smith"
                  className="h-12 rounded-xl bg-input-background border-0"
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Add Room Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 border-0 shadow-md">
            <h3 className="font-semibold text-foreground mb-4">Add Room</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="roomName" className="text-sm text-muted-foreground mb-2 block">
                  Room Name
                </Label>
                <Input
                  id="roomName"
                  value={currentRoom.name}
                  onChange={(e) => setCurrentRoom({ ...currentRoom, name: e.target.value })}
                  placeholder="e.g., Living Room"
                  className="h-12 rounded-xl bg-input-background border-0"
                />
              </div>

              <Tabs value={currentRoom.type} onValueChange={(v) => setCurrentRoom({ ...currentRoom, type: v as 'tile' | 'carpet' })}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="tile">Tile/Wood</TabsTrigger>
                  <TabsTrigger value="carpet">Carpet</TabsTrigger>
                </TabsList>

                <TabsContent value="tile" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-sm text-muted-foreground mb-2 block">Room Width (ft)</Label>
                      <Input
                        type="number"
                        value={currentRoom.roomWidth}
                        onChange={(e) => setCurrentRoom({ ...currentRoom, roomWidth: parseFloat(e.target.value) || 0 })}
                        className="h-12 rounded-xl bg-input-background border-0"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground mb-2 block">Room Length (ft)</Label>
                      <Input
                        type="number"
                        value={currentRoom.roomLength}
                        onChange={(e) => setCurrentRoom({ ...currentRoom, roomLength: parseFloat(e.target.value) || 0 })}
                        className="h-12 rounded-xl bg-input-background border-0"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-sm text-muted-foreground mb-2 block">Tile Width (in)</Label>
                      <Input
                        type="number"
                        value={currentRoom.tileWidth}
                        onChange={(e) => setCurrentRoom({ ...currentRoom, tileWidth: parseFloat(e.target.value) || 0 })}
                        className="h-12 rounded-xl bg-input-background border-0"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground mb-2 block">Tile Length (in)</Label>
                      <Input
                        type="number"
                        value={currentRoom.tileLength}
                        onChange={(e) => setCurrentRoom({ ...currentRoom, tileLength: parseFloat(e.target.value) || 0 })}
                        className="h-12 rounded-xl bg-input-background border-0"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground mb-2 block">Price Per Tile ($)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={currentRoom.pricePerUnit}
                      onChange={(e) => setCurrentRoom({ ...currentRoom, pricePerUnit: parseFloat(e.target.value) || 0 })}
                      className="h-12 rounded-xl bg-input-background border-0"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="carpet" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-sm text-muted-foreground mb-2 block">Room Width (ft)</Label>
                      <Input
                        type="number"
                        value={currentRoom.roomWidth}
                        onChange={(e) => setCurrentRoom({ ...currentRoom, roomWidth: parseFloat(e.target.value) || 0 })}
                        className="h-12 rounded-xl bg-input-background border-0"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground mb-2 block">Room Length (ft)</Label>
                      <Input
                        type="number"
                        value={currentRoom.roomLength}
                        onChange={(e) => setCurrentRoom({ ...currentRoom, roomLength: parseFloat(e.target.value) || 0 })}
                        className="h-12 rounded-xl bg-input-background border-0"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground mb-2 block">Carpet Roll Width (ft)</Label>
                    <Input
                      type="number"
                      value={currentRoom.carpetRollWidth}
                      onChange={(e) => setCurrentRoom({ ...currentRoom, carpetRollWidth: parseFloat(e.target.value) || 0 })}
                      className="h-12 rounded-xl bg-input-background border-0"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground mb-2 block">Cost Per Sq Ft ($)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={currentRoom.carpetCostPerSqFt}
                      onChange={(e) => setCurrentRoom({ ...currentRoom, carpetCostPerSqFt: parseFloat(e.target.value) || 0 })}
                      className="h-12 rounded-xl bg-input-background border-0"
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-sm text-muted-foreground">Waste %</Label>
                  <span className="text-sm font-semibold text-[#D6A67A]">
                    {currentRoom.wastePercentage}%
                  </span>
                </div>
                <Slider
                  value={[currentRoom.wastePercentage]}
                  onValueChange={(values) => setCurrentRoom({ ...currentRoom, wastePercentage: values[0] })}
                  min={0}
                  max={30}
                  step={1}
                />
              </div>

              <Button onClick={addRoom} className="w-full h-12 rounded-xl" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Room
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Rooms List */}
        {rooms.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <h3 className="font-semibold text-foreground">Rooms ({rooms.length})</h3>
            <AnimatePresence>
              {rooms.map((room) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Card className="p-4 border-0 shadow-md">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">{room.name}</h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          {room.calculation.type === 'tile' ? 'Tile/Wood' : 'Carpet'}
                        </p>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground">Area</p>
                            <p className="text-sm font-semibold">{room.result.area.toFixed(2)} sq ft</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Cost</p>
                            <p className="text-sm font-semibold text-[#D6A67A]">
                              ${room.result.totalCost.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => removeRoom(room.id)}
                        size="icon"
                        variant="ghost"
                        className="ml-2 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Summary */}
            <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-[#D6A67A]/10 to-[#8B7355]/10">
              <h3 className="font-semibold text-foreground mb-4">Project Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Area</span>
                  <span className="font-semibold text-foreground">{totalArea.toFixed(2)} sq ft</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Rooms</span>
                  <span className="font-semibold text-foreground">{rooms.length}</span>
                </div>
                <div className="h-px bg-border my-2" />
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">Grand Total</span>
                  <span className="text-2xl font-bold text-[#D6A67A]">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={handleSaveProject} variant="outline" className="h-12 rounded-xl border-2">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button onClick={handleDownloadPDF} variant="outline" className="h-12 rounded-xl border-2">
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

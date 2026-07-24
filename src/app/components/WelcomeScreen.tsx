import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Grid3x3, Layers, History, Moon, Sun, Home as HomeIcon, LayoutGrid, Info, Lightbulb } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { QuickTipsDialog } from './QuickTipsDialog';

export default function WelcomeScreen() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [showTips, setShowTips] = useState(false);

  const flooringTypes = [
    {
      id: 'tile',
      title: 'Tile / Wood / Laminate',
      description: 'Calculate materials for tile, wood, or laminate flooring',
      icon: Grid3x3,
      gradient: 'from-[#D6A67A] to-[#8B7355]',
      bgColor: 'bg-[#D6A67A]/10',
    },
    {
      id: 'carpet',
      title: 'Carpet',
      description: 'Calculate carpet requirements and costs',
      icon: Layers,
      gradient: 'from-[#4A5568] to-[#2D3748]',
      bgColor: 'bg-[#4A5568]/10',
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 pb-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D6A67A] to-[#8B7355] flex items-center justify-center shadow-lg">
              <HomeIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Flooring Pro</h1>
              <p className="text-xs text-muted-foreground">Professional Calculator</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-xl"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
        </div>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="px-6 py-8"
      >
        <h2 className="text-3xl font-semibold text-foreground mb-2">
          Calculate with <br />
          <span className="text-[#D6A67A]">Precision</span>
        </h2>
        <p className="text-muted-foreground text-sm">
          Professional flooring estimation for homeowners, contractors, and designers
        </p>
      </motion.div>

      {/* Flooring Type Cards */}
      <div className="px-6 space-y-4 flex-1">
        {flooringTypes.map((type, index) => {
          const Icon = type.icon;
          return (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card
                className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                onClick={() => navigate(`/calculator/${type.id}`)}
              >
                <div className="relative p-6">
                  <div className={`absolute top-0 right-0 w-32 h-32 ${type.bgColor} rounded-bl-full opacity-50`} />
                  <div className="relative flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${type.gradient} flex items-center justify-center shadow-md flex-shrink-0`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="font-semibold text-foreground mb-1">{type.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {type.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="p-6 pt-8"
      >
        <div className="grid grid-cols-3 gap-3">
          <Button
            variant="outline"
            className="h-14 rounded-xl border-2 flex flex-col gap-1"
            onClick={() => navigate('/multi-room')}
          >
            <LayoutGrid className="w-5 h-5" />
            <span className="text-xs">Multi-Room</span>
          </Button>
          <Button
            variant="outline"
            className="h-14 rounded-xl border-2 flex flex-col gap-1"
            onClick={() => navigate('/history')}
          >
            <History className="w-5 h-5" />
            <span className="text-xs">History</span>
          </Button>
          <Button
            variant="outline"
            className="h-14 rounded-xl border-2 flex flex-col gap-1"
            onClick={() => navigate('/projects')}
          >
            <Layers className="w-5 h-5" />
            <span className="text-xs">Projects</span>
          </Button>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="p-6 pt-0 space-y-2"
      >
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={() => setShowTips(true)}
            variant="ghost"
            className="text-muted-foreground hover:text-[#D6A67A] text-sm h-10"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Quick Tips
          </Button>
          <Button
            onClick={() => navigate('/features')}
            variant="ghost"
            className="text-muted-foreground hover:text-[#D6A67A] text-sm h-10"
          >
            <Info className="w-4 h-4 mr-2" />
            Features
          </Button>
        </div>
        <div className="text-center text-xs text-muted-foreground">
          <p>Professional-grade flooring calculator</p>
          <p className="mt-1">Version 1.0.0</p>
        </div>
      </motion.div>

      <QuickTipsDialog open={showTips} onOpenChange={setShowTips} />
    </div>
  );
}
import { Link } from 'react-router';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Ruler, Grid3x3, Armchair, History, LayoutGrid, Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';

export function Home() {
  const { theme, setTheme } = useTheme();

  const flooringTypes = [
    {
      type: 'Tile / Wood / Laminate',
      icon: Grid3x3,
      description: 'Calculate tiles, wood planks, or laminate',
      gradient: 'from-[#D4A574] to-[#8B7355]',
      path: '/tile-calculator',
    },
    {
      type: 'Carpet',
      icon: Armchair,
      description: 'Calculate carpet requirements',
      gradient: 'from-[#2C3E50] to-[#5A6A7A]',
      path: '/carpet-calculator',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col p-6 pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D4A574] to-[#8B7355] flex items-center justify-center">
              <Ruler className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Flooring Pro</h1>
              <p className="text-sm text-muted-foreground">Premium Calculator</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="rounded-full"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </motion.div>

      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="text-xl mb-2">Welcome Back 👋</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Choose your flooring type to get started with accurate calculations and professional estimates.
        </p>
      </motion.div>

      {/* Flooring Type Selection */}
      <div className="space-y-4 mb-8">
        <h3 className="text-sm uppercase tracking-wider text-muted-foreground font-medium">
          Select Flooring Type
        </h3>
        {flooringTypes.map((item, index) => (
          <motion.div
            key={item.type}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <Link to={item.path}>
              <Card className="p-6 hover:shadow-xl transition-all duration-300 border-border/50 bg-card cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-[#D4A574] transition-colors">
                      {item.type}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <h3 className="text-sm uppercase tracking-wider text-muted-foreground font-medium">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <Link to="/history">
            <Card className="p-4 hover:shadow-lg transition-all duration-300 border-border/50 bg-card cursor-pointer group">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center group-hover:bg-[#D4A574]/20 transition-colors">
                  <History className="w-6 h-6 text-foreground" />
                </div>
                <span className="text-sm font-medium">History</span>
              </div>
            </Card>
          </Link>
          <Link to="/multi-room">
            <Card className="p-4 hover:shadow-lg transition-all duration-300 border-border/50 bg-card cursor-pointer group">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center group-hover:bg-[#D4A574]/20 transition-colors">
                  <LayoutGrid className="w-6 h-6 text-foreground" />
                </div>
                <span className="text-sm font-medium">Multi-Room</span>
              </div>
            </Card>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

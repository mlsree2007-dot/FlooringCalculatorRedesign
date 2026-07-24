import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { 
  Calculator, 
  Save, 
  Download, 
  History, 
  LayoutGrid, 
  Moon, 
  Sparkles,
  TrendingUp,
  FileText,
  Palette,
  ArrowLeft
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

const features = [
  {
    icon: Calculator,
    title: 'Precise Calculations',
    description: 'Professional-grade algorithms for accurate material and cost estimation',
    color: 'from-[#D6A67A] to-[#8B7355]',
  },
  {
    icon: LayoutGrid,
    title: 'Multi-Room Support',
    description: 'Calculate multiple rooms in one project with comprehensive summaries',
    color: 'from-[#4A5568] to-[#2D3748]',
  },
  {
    icon: Download,
    title: 'PDF Export',
    description: 'Generate professional quotations with detailed breakdowns',
    color: 'from-[#D6A67A] to-[#8B7355]',
  },
  {
    icon: Save,
    title: 'Save Projects',
    description: 'Store and retrieve your calculations for future reference',
    color: 'from-[#4A5568] to-[#2D3748]',
  },
  {
    icon: History,
    title: 'Calculation History',
    description: 'Access your past calculations and track your projects',
    color: 'from-[#D6A67A] to-[#8B7355]',
  },
  {
    icon: Sparkles,
    title: 'Material Suggestions',
    description: 'Smart recommendations for flooring materials and pricing',
    color: 'from-[#4A5568] to-[#2D3748]',
  },
  {
    icon: Moon,
    title: 'Dark Mode',
    description: 'Beautiful light and dark themes for comfortable viewing',
    color: 'from-[#D6A67A] to-[#8B7355]',
  },
  {
    icon: Palette,
    title: 'Premium Design',
    description: 'Elegant, award-winning interface designed for professionals',
    color: 'from-[#4A5568] to-[#2D3748]',
  },
];

export function FeaturesShowcase() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background py-6 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/')}
          className="rounded-xl"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-12"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D6A67A] to-[#8B7355] flex items-center justify-center mx-auto mb-4 shadow-lg">
          <TrendingUp className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Professional Features
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Everything you need for accurate flooring estimation and project management
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-5 border-0 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-center"
      >
        <Card className="p-8 border-0 shadow-xl bg-gradient-to-br from-[#D6A67A]/10 to-[#8B7355]/10 max-w-md mx-auto">
          <FileText className="w-12 h-12 text-[#D6A67A] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">
            Award-Winning Design
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Built with modern design principles, featuring elegant aesthetics, 
            smooth animations, and intuitive user experience worthy of design competitions.
          </p>
          <Button
            onClick={() => navigate('/about')}
            variant="outline"
            className="rounded-xl"
          >
            Learn More About Design
          </Button>
        </Card>
      </motion.div>
    </div>
  );
}
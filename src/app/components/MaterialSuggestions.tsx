import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Sparkles } from 'lucide-react';

interface MaterialSuggestion {
  name: string;
  type: string;
  priceRange: string;
  durability: 'High' | 'Medium' | 'Low';
  maintenance: 'Low' | 'Medium' | 'High';
  recommended: boolean;
}

const tileSuggestions: MaterialSuggestion[] = [
  {
    name: 'Porcelain Tile',
    type: 'tile',
    priceRange: '$3-8/sq ft',
    durability: 'High',
    maintenance: 'Low',
    recommended: true,
  },
  {
    name: 'Luxury Vinyl Plank',
    type: 'wood',
    priceRange: '$2-6/sq ft',
    durability: 'High',
    maintenance: 'Low',
    recommended: true,
  },
  {
    name: 'Ceramic Tile',
    type: 'tile',
    priceRange: '$1-4/sq ft',
    durability: 'Medium',
    maintenance: 'Low',
    recommended: false,
  },
  {
    name: 'Hardwood Flooring',
    type: 'wood',
    priceRange: '$8-15/sq ft',
    durability: 'High',
    maintenance: 'High',
    recommended: false,
  },
];

const carpetSuggestions: MaterialSuggestion[] = [
  {
    name: 'Nylon Carpet',
    type: 'carpet',
    priceRange: '$3-8/sq ft',
    durability: 'High',
    maintenance: 'Medium',
    recommended: true,
  },
  {
    name: 'Polyester Carpet',
    type: 'carpet',
    priceRange: '$2-5/sq ft',
    durability: 'Medium',
    maintenance: 'Low',
    recommended: true,
  },
  {
    name: 'Wool Carpet',
    type: 'carpet',
    priceRange: '$6-12/sq ft',
    durability: 'High',
    maintenance: 'High',
    recommended: false,
  },
];

export function MaterialSuggestions({ flooringType }: { flooringType: 'tile' | 'carpet' }) {
  const suggestions = flooringType === 'tile' ? tileSuggestions : carpetSuggestions;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-[#D6A67A]" />
        <h3 className="font-semibold text-foreground">Material Suggestions</h3>
      </div>
      
      {suggestions.map((suggestion, index) => (
        <motion.div
          key={suggestion.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="p-4 border-0 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-semibold text-foreground">{suggestion.name}</h4>
                <p className="text-sm text-muted-foreground">{suggestion.priceRange}</p>
              </div>
              {suggestion.recommended && (
                <Badge className="bg-[#D6A67A] text-white">Recommended</Badge>
              )}
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-xs">
                Durability: {suggestion.durability}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Maintenance: {suggestion.maintenance}
              </Badge>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

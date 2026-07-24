import { motion } from 'motion/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Lightbulb, Calculator, Save, Download, LayoutGrid } from 'lucide-react';
import { Badge } from './ui/badge';

interface QuickTipsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickTipsDialog({ open, onOpenChange }: QuickTipsDialogProps) {
  const tips = [
    {
      icon: Calculator,
      title: 'Accurate Calculations',
      description: 'Enter room dimensions in feet and tile dimensions in inches for precise results.',
      badge: 'Tip',
    },
    {
      icon: Lightbulb,
      title: 'Waste Percentage',
      description: 'Industry standard is 10%. Add more for complex patterns or irregular rooms.',
      badge: 'Pro Tip',
    },
    {
      icon: LayoutGrid,
      title: 'Multi-Room Projects',
      description: 'Calculate entire homes or buildings by adding multiple rooms to one project.',
      badge: 'Feature',
    },
    {
      icon: Save,
      title: 'Save Your Work',
      description: 'Projects are saved locally on your device for future reference.',
      badge: 'Tip',
    },
    {
      icon: Download,
      title: 'Professional PDFs',
      description: 'Export detailed quotations to share with clients or for your records.',
      badge: 'Feature',
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[350px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-[#D6A67A]" />
            Quick Tips
          </DialogTitle>
          <DialogDescription>
            Get the most out of Flooring Pro
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          {tips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-[#D6A67A]/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#D6A67A]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-sm text-foreground">{tip.title}</h4>
                    <Badge variant="outline" className="text-xs h-5">
                      {tip.badge}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

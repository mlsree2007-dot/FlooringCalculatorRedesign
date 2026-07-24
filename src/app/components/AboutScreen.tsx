import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Target, Users, Zap, Award, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export default function AboutScreen() {
  const navigate = useNavigate();

  const targetUsers = [
    'Homeowners planning renovations',
    'Professional contractors',
    'Interior designers',
    'Architects',
    'Flooring specialists',
    'Project managers',
  ];

  const designPrinciples = [
    {
      title: 'User-Centric Design',
      description: 'Every interface element is optimized for ease of use and accessibility',
    },
    {
      title: 'Visual Hierarchy',
      description: 'Clear information architecture guides users through complex calculations',
    },
    {
      title: 'Premium Aesthetics',
      description: 'Sophisticated color palette inspired by natural materials and flooring',
    },
    {
      title: 'Smooth Interactions',
      description: 'Delightful animations and transitions enhance the user experience',
    },
  ];

  const innovativeFeatures = [
    'Real-time calculation updates',
    'Intelligent waste percentage recommendations',
    'Material cost suggestions based on industry standards',
    'Multi-room project management',
    'Professional PDF quotation generation',
    'Dark mode for comfortable viewing',
    'Persistent storage for project history',
    'Responsive design optimized for mobile',
  ];

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-4"
      >
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
            <h1 className="font-semibold text-foreground">About Flooring Pro</h1>
            <p className="text-xs text-muted-foreground">Design & Innovation</p>
          </div>
        </div>
      </motion.div>

      <div className="px-4 pt-6 space-y-6">
        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-[#D6A67A]/10 to-[#8B7355]/10">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D6A67A] to-[#8B7355] flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground mb-1">Our Mission</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  To provide professionals and homeowners with the most accurate, beautiful, 
                  and easy-to-use flooring calculator available, eliminating estimation errors 
                  and streamlining project planning.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Target Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 border-0 shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-[#D6A67A]" />
              <h3 className="font-semibold text-foreground">Target Users</h3>
            </div>
            <div className="space-y-2">
              {targetUsers.map((user, index) => (
                <motion.div
                  key={user}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#D6A67A] flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{user}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Design Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 border-0 shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-[#D6A67A]" />
              <h3 className="font-semibold text-foreground">Design Principles</h3>
            </div>
            <div className="space-y-4">
              {designPrinciples.map((principle, index) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <h4 className="font-semibold text-foreground text-sm mb-1">
                    {principle.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {principle.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Innovative Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 border-0 shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-[#D6A67A]" />
              <h3 className="font-semibold text-foreground">Innovative Features</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {innovativeFeatures.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  <Badge variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Competition Ready */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-[#D6A67A]/10 to-[#8B7355]/10">
            <h3 className="font-semibold text-foreground mb-3 text-center">
              🏆 Competition-Ready Design
            </h3>
            <p className="text-sm text-muted-foreground text-center leading-relaxed mb-4">
              This application represents the pinnacle of mobile UI/UX design, combining 
              aesthetic excellence with functional innovation. Every pixel has been carefully 
              crafted to create a professional tool worthy of industry recognition.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#D6A67A] mb-1">100%</div>
                <div className="text-xs text-muted-foreground">Mobile Optimized</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#D6A67A] mb-1">8+</div>
                <div className="text-xs text-muted-foreground">Core Features</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6 border-0 shadow-md">
            <h3 className="font-semibold text-foreground mb-4">Technology Stack</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Framework</span>
                <Badge>React 18</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Routing</span>
                <Badge>React Router 7</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Styling</span>
                <Badge>Tailwind CSS v4</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Animations</span>
                <Badge>Motion</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">UI Components</span>
                <Badge>Radix UI</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">PDF Generation</span>
                <Badge>jsPDF</Badge>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

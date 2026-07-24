import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { ArrowLeft, History, Download, Trash2, Grid3x3, Layers } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import type { Project } from '../lib/types';
import { storage } from '../lib/storage';
import { generatePDF } from '../lib/pdf';
import { toast } from 'sonner';

export default function HistoryScreen() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<Project[]>([]);

  useEffect(() => {
    setHistory(storage.getHistory());
  }, []);

  const handleDownloadPDF = (project: Project) => {
    generatePDF(project);
    toast.success('PDF downloaded successfully!');
  };

  const handleClearHistory = () => {
    storage.clearHistory();
    setHistory([]);
    toast.success('History cleared successfully!');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
              <h1 className="font-semibold text-foreground">Calculation History</h1>
              <p className="text-xs text-muted-foreground">{history.length} calculations</p>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D6A67A] to-[#8B7355] flex items-center justify-center">
            <History className="w-5 h-5 text-white" />
          </div>
        </div>
      </motion.div>

      <div className="px-4 pt-6">
        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <Button
              onClick={handleClearHistory}
              variant="outline"
              className="w-full h-12 rounded-xl border-2"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All History
            </Button>
          </motion.div>
        )}

        {history.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 px-6"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <History className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No History Yet</h3>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Your calculation history will appear here
            </p>
            <Button onClick={() => navigate('/')} className="rounded-xl">
              Start Calculating
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {history.map((project, index) => {
              const Icon = project.calculation.type === 'tile' ? Grid3x3 : Layers;
              const gradient =
                project.calculation.type === 'tile'
                  ? 'from-[#D6A67A] to-[#8B7355]'
                  : 'from-[#4A5568] to-[#2D3748]';

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="p-4 border-0 shadow-md">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground mb-1 truncate">
                          {project.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          {formatDate(project.createdAt)}
                        </p>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground">Total Cost</p>
                            <p className="font-semibold text-foreground">
                              ${project.result.totalCost.toFixed(2)}
                            </p>
                          </div>
                          <Button
                            onClick={() => handleDownloadPDF(project)}
                            size="sm"
                            variant="outline"
                            className="rounded-lg"
                          >
                            <Download className="w-3.5 h-3.5 mr-1" />
                            PDF
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

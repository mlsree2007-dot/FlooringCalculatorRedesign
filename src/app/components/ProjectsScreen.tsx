import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Folder, Download, Trash2, Grid3x3, Layers, Edit } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import type { Project } from '../lib/types';
import { storage } from '../lib/storage';
import { generatePDF } from '../lib/pdf';
import { toast } from 'sonner';

export default function ProjectsScreen() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    setProjects(storage.getProjects());
  }, []);

  const handleDownloadPDF = (project: Project) => {
    generatePDF(project);
    toast.success('PDF downloaded successfully!');
  };

  const handleDeleteProject = (id: string) => {
    storage.deleteProject(id);
    setProjects(storage.getProjects());
    setDeleteId(null);
    toast.success('Project deleted successfully!');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
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
              <h1 className="font-semibold text-foreground">Saved Projects</h1>
              <p className="text-xs text-muted-foreground">{projects.length} projects</p>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D6A67A] to-[#8B7355] flex items-center justify-center">
            <Folder className="w-5 h-5 text-white" />
          </div>
        </div>
      </motion.div>

      <div className="px-4 pt-6">
        {projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 px-6"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <Folder className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No Saved Projects</h3>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Save your calculations to access them later
            </p>
            <Button onClick={() => navigate('/')} className="rounded-xl">
              Start Calculating
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {projects.map((project, index) => {
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
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-muted-foreground">Area</p>
                              <p className="text-sm font-semibold text-foreground">
                                {project.result.area.toFixed(2)} sq ft
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-muted-foreground">Total Cost</p>
                              <p className="text-sm font-semibold text-foreground">
                                ${project.result.totalCost.toFixed(2)}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleDownloadPDF(project)}
                              size="sm"
                              variant="outline"
                              className="rounded-lg flex-1"
                            >
                              <Download className="w-3.5 h-3.5 mr-1" />
                              PDF
                            </Button>
                            <Button
                              onClick={() => setDeleteId(project.id)}
                              size="sm"
                              variant="outline"
                              className="rounded-lg text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this project? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDeleteProject(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

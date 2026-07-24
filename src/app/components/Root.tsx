import { Outlet, useLocation } from 'react-router';
import { motion } from 'motion/react';

export function Root() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen w-full bg-background">
      <div className="mx-auto max-w-md min-h-screen relative">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
}

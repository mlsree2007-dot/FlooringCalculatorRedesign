import { createBrowserRouter } from 'react-router';
import WelcomeScreen from './components/WelcomeScreen';
import TileCalculator from './components/TileCalculator';
import CarpetCalculator from './components/CarpetCalculator';
import HistoryScreen from './components/HistoryScreen';
import ProjectsScreen from './components/ProjectsScreen';
import MultiRoomCalculator from './components/MultiRoomCalculator';
import { FeaturesShowcase } from './components/FeaturesShowcase';
import AboutScreen from './components/AboutScreen';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <WelcomeScreen />,
  },
  {
    path: '/calculator/tile',
    element: <TileCalculator />,
  },
  {
    path: '/calculator/carpet',
    element: <CarpetCalculator />,
  },
  {
    path: '/multi-room',
    element: <MultiRoomCalculator />,
  },
  {
    path: '/history',
    element: <HistoryScreen />,
  },
  {
    path: '/projects',
    element: <ProjectsScreen />,
  },
  {
    path: '/features',
    element: <FeaturesShowcase />,
  },
  {
    path: '/about',
    element: <AboutScreen />,
  },
]);
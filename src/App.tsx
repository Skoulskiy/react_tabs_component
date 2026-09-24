import './App.scss'
import { HashRouter as Router, useNavigate, useLocation } from 'react-router-dom'; // використав тут HashRouter для роботи з gh-pages
import type { TabInterface } from './components/types/tab';
import { TabBar } from './components/TabBar';
import { useTabs } from './components/hooks/useTabs';

const getIcon = (label: string) => `/icons/${label.toLowerCase().replace(/\s+/g, '-')}.svg`;

const initialTabs: TabInterface[] = [
  { id: 1, label: 'Lagerverwaltung', url: '/', icon: getIcon('Main'), isPinned: false },
  { id: 2, label: 'Dashboard', url: '/dashboard', icon: getIcon('Dashboard'), isPinned: false },
  { id: 3, label: 'Banking', url: '/banking', icon: getIcon('Banking'), isPinned: false },
  { id: 4, label: 'Telefonie', url: '/telefonie', icon: getIcon('Telefonie'), isPinned: false },
  { id: 5, label: 'Accounting', url: '/accounting', icon: getIcon('Accounting'), isPinned: false },
  { id: 6, label: 'Verkauf', url: '/verkauf', icon: getIcon('Verkauf'), isPinned: false },
  { id: 7, label: 'Statistik', url: '/statistik', icon: getIcon('Statistik'), isPinned: false },
  { id: 8, label: 'Post Office', url: '/post', icon: getIcon('Post'), isPinned: false },
  { id: 9, label: 'Administration', url: '/administration', icon: getIcon('Administration'), isPinned: false },
  { id: 10, label: 'Help', url: '/help', icon: getIcon('Help'), isPinned: false },
  { id: 11, label: 'Warenbestand', url: '/warenbestand', icon: getIcon('Warenbestand'), isPinned: false },
  { id: 12, label: 'Auswahllisten', url: '/auswahllisten', icon: getIcon('Auswahllisten'), isPinned: false },
  { id: 13, label: 'Einkauf', url: '/einkauf', icon: getIcon('Einkauf'), isPinned: false },
  { id: 14, label: 'Rechn', url: '/rechn', icon: getIcon('Rechn'), isPinned: false },
];

function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const { tabs, onRemove, handleDragEnd, onTogglePin } = useTabs(
    initialTabs, 
    navigate, 
    location.pathname
  );

  return (
    <TabBar 
      tabs={tabs}
      currentPath={location.pathname}
      onSelect={(url) => navigate(url)} 
      handleDragEnd={handleDragEnd}
      onRemove={onRemove}
      onTogglePin={onTogglePin}
    />
  );
}

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;
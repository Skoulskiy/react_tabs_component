import type { Tab } from "../types/tab"

interface TabBarComponent {
  tabs: Tab[],
  setTabs: () => void;
}

export const TabBar : React.FC<TabBarComponent> = ({tabs, setTabs}) => {
  return (<div>
    
  </div>)
}
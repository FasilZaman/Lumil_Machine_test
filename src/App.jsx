import { TableProvider } from './context/TableContext';
import HierarchicalTable from './components/HierarchicalTable';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <TableProvider>
        <HierarchicalTable />
      </TableProvider>
    </div>
  );
}

export default App;

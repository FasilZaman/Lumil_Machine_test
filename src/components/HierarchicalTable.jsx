import { useTable } from '../context/TableContext';
import TableRow from './TableRow';

const HierarchicalTable = () => {
  const { rows, grandTotal, calculateVariance } = useTable();

  return (
    <div className="w-full min-h-screen bg-gray-100 py-8">
      {/* Heading outside table */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Hierarchical Sales Table</h2>
        <p className="text-gray-600 text-lg">Manage and update sales data with hierarchical structure</p>
      </div>
      
      {/* Table container with 90% width */}
      <div className="w-[90%] mx-auto">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200">
                    Label
                  </th>
                  <th className="px-8 py-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200">
                    Value
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200">
                    Input
                  </th>
                  <th className="px-8 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200">
                    Allocation %
                  </th>
                  <th className="px-8 py-4 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider border-r border-gray-200">
                    Allocation Val
                  </th>
                  <th className="px-8 py-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Variance %
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rows.map(row => (
                  <TableRow key={row.id} row={row} />
                ))}
                
                {/* Grand Total Row */}
                <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 border-t-4 border-blue-300">
                  <td className="px-8 py-6 border-r border-gray-200">
                    <span className="font-bold text-blue-900 text-lg">Grand Total</span>
                  </td>
                  <td className="px-8 py-6 text-right border-r border-gray-200">
                    <span className="font-bold text-blue-900 text-2xl">
                      {grandTotal.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-8 py-6 border-r border-gray-200"></td>
                  <td className="px-8 py-6 border-r border-gray-200"></td>
                  <td className="px-8 py-6 border-r border-gray-200"></td>
                  <td className="px-8 py-6 text-right">
                    <span className="font-bold text-blue-700 text-lg">
                      {calculateVariance(grandTotal, 2500)}%
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HierarchicalTable; 
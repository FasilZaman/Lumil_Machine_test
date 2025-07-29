import { useState } from 'react';
import { useTable } from '../context/TableContext';

const TableRow = ({ row, level = 0, isChild = false }) => {
  const { calculateVariance, updateRowValue, updateSubtotal, distributeToChildren, findParentRow } = useTable();
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const validateInput = (value) => {
    if (value === '') return '';
    const num = parseFloat(value);
    if (isNaN(num)) return 'Please enter a valid number';
    if (num < 0) return 'Please enter a positive number';
    return '';
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setError(validateInput(value));
  };

  const handleAllocationPercent = () => {
    const percentage = parseFloat(inputValue);
    if (isNaN(percentage)) {
      setError('Please enter a valid percentage');
      return;
    }

    const newValue = row.value + (row.value * percentage / 100);
    updateRowValue(row.id, newValue);
    
    // If this is a child row, update parent subtotal
    if (isChild) {
      const parentRow = findParentRow(row.id);
      if (parentRow) {
        updateSubtotal(parentRow.id);
      }
    }
    
    setInputValue('');
    setError('');
  };

  const handleAllocationValue = () => {
    const newValue = parseFloat(inputValue);
    if (isNaN(newValue)) {
      setError('Please enter a valid number');
      return;
    }

    if (row.children) {
      // If it's a parent row, distribute to children
      distributeToChildren(row.id, newValue);
    } else {
      // If it's a child row, update directly
      updateRowValue(row.id, newValue);
      
      // Update parent subtotal
      const parentRow = findParentRow(row.id);
      if (parentRow) {
        updateSubtotal(parentRow.id);
      }
    }
    
    setInputValue('');
    setError('');
  };

  const variance = calculateVariance(row.value, row.originalValue);
  const indentClass = level > 0 ? `pl-${level * 8}` : '';
  const rowBgClass = level === 0 ? 'bg-gray-50' : 'bg-white';
  const borderClass = level === 0 ? 'border-b-2 border-gray-300' : 'border-b border-gray-200';

  return (
    <>
      <tr className={`${rowBgClass} ${borderClass} hover:bg-gray-100 transition-colors duration-200`}>
        <td className={`px-8 py-5 border-r border-gray-200 ${indentClass}`}>
          <div className="flex items-center">
            {level > 0 && <span className="text-gray-400 mr-3 text-lg">└─</span>}
            <span className={`font-medium text-gray-900 ${level === 0 ? 'text-lg' : 'text-base'}`}>
              {row.label}
            </span>
          </div>
        </td>
        <td className="px-8 py-5 text-right border-r border-gray-200">
          <span className={`font-semibold text-gray-900 ${level === 0 ? 'text-lg' : 'text-base'}`}>
            {row.value.toLocaleString()}
          </span>
        </td>
        <td className="px-8 py-5 border-r border-gray-200">
          <div>
            <input
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter value"
              className={`w-28 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                error ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
            />
            {error && (
              <div className="text-red-500 text-xs mt-1 font-medium">{error}</div>
            )}
          </div>
        </td>
        <td className="px-8 py-5 border-r border-gray-200">
          <button
            onClick={handleAllocationPercent}
            disabled={!!error || inputValue === ''}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md disabled:shadow-none"
          >
            Allocation %
          </button>
        </td>
        <td className="px-8 py-5 border-r border-gray-200">
          <button
            onClick={handleAllocationValue}
            disabled={!!error || inputValue === ''}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md disabled:shadow-none"
          >
            Allocation Val
          </button>
        </td>
        <td className="px-8 py-5 text-right">
          <span className={`font-medium px-3 py-1 rounded-full text-sm ${
            variance > 0 
              ? 'text-green-700 bg-green-100' 
              : variance < 0 
                ? 'text-red-700 bg-red-100' 
                : 'text-gray-500 bg-gray-100'
          }`}>
            {variance}%
          </span>
        </td>
      </tr>
      
      {/* Render children */}
      {row.children && row.children.map(child => (
        <TableRow
          key={child.id}
          row={child}
          level={level + 1}
          isChild={true}
        />
      ))}
    </>
  );
};

export default TableRow; 
import { createContext, useContext, useReducer, useEffect } from 'react';

const TableContext = createContext();

const initialState = {
  rows: [
    {
      id: "electronics",
      label: "Electronics",
      value: 1500,
      originalValue: 1500,
      children: [
        {
          id: "phones",
          label: "Phones",
          value: 800,
          originalValue: 800
        },
        {
          id: "laptops",
          label: "Laptops",
          value: 700,
          originalValue: 700
        }
      ]
    },
    {
      id: "furniture",
      label: "Furniture",
      value: 1000,
      originalValue: 1000,
      children: [
        {
          id: "tables",
          label: "Tables",
          value: 300,
          originalValue: 300
        },
        {
          id: "chairs",
          label: "Chairs",
          value: 700,
          originalValue: 700
        }
      ]
    }
  ]
};

const tableReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_ROW_VALUE':
      return {
        ...state,
        rows: state.rows.map(row => {
          if (row.id === action.payload.rowId) {
            return {
              ...row,
              value: action.payload.newValue
            };
          }
          if (row.children) {
            return {
              ...row,
              children: row.children.map(child => {
                if (child.id === action.payload.rowId) {
                  return {
                    ...child,
                    value: action.payload.newValue
                  };
                }
                return child;
              })
            };
          }
          return row;
        })
      };
    
    case 'UPDATE_SUBTOTAL':
      return {
        ...state,
        rows: state.rows.map(row => {
          if (row.id === action.payload.rowId) {
            const newValue = row.children.reduce((sum, child) => sum + child.value, 0);
            return {
              ...row,
              value: newValue
            };
          }
          return row;
        })
      };
    
    case 'DISTRIBUTE_TO_CHILDREN':
      return {
        ...state,
        rows: state.rows.map(row => {
          if (row.id === action.payload.rowId) {
            const totalChildrenValue = row.children.reduce((sum, child) => sum + child.value, 0);
            const newTotalValue = action.payload.newValue;
            
            const childrenWithContributions = row.children.map(child => {
              const contributionPercentage = totalChildrenValue > 0 ? (child.value / totalChildrenValue) * 100 : 0;
              const newValue = Math.round((newTotalValue * contributionPercentage / 100) * 100) / 100;
              
              return {
                ...child,
                value: newValue
              };
            });
            
            return {
              ...row,
              value: newTotalValue,
              children: childrenWithContributions
            };
          }
          return row;
        })
      };
    
    default:
      return state;
  }
};

export const TableProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tableReducer, initialState);

  const grandTotal = state.rows.reduce((sum, row) => sum + row.value, 0);

  const calculateVariance = (currentValue, originalValue) => {
    if (originalValue === 0) return 0;
    return Math.round(((currentValue - originalValue) / originalValue) * 100 * 100) / 100;
  };

  const updateRowValue = (rowId, newValue) => {
    dispatch({ type: 'UPDATE_ROW_VALUE', payload: { rowId, newValue } });
  };

  const updateSubtotal = (rowId) => {
    dispatch({ type: 'UPDATE_SUBTOTAL', payload: { rowId } });
  };

  const distributeToChildren = (rowId, newValue) => {
    dispatch({ type: 'DISTRIBUTE_TO_CHILDREN', payload: { rowId, newValue } });
  };

  const findParentRow = (childId) => {
    for (const row of state.rows) {
      if (row.children) {
        const child = row.children.find(c => c.id === childId);
        if (child) {
          return row;
        }
      }
    }
    return null;
  };

  const value = {
    ...state,
    grandTotal,
    calculateVariance,
    updateRowValue,
    updateSubtotal,
    distributeToChildren,
    findParentRow
  };

  return (
    <TableContext.Provider value={value}>
      {children}
    </TableContext.Provider>
  );
};

export const useTable = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error('useTable must be used within a TableProvider');
  }
  return context;
}; 
# Hierarchical Sales Table

A ReactJS application built with Vite and Tailwind CSS that displays a hierarchical table with sales data. The application allows users to update values using percentage allocations or direct value assignments, with automatic calculation of subtotals and variance percentages.

## Features

- **Hierarchical Table Structure**: Displays parent-child relationships with proper indentation
- **Dynamic Value Updates**: Update values using percentage or direct value allocation
- **Automatic Subtotals**: Parent rows automatically calculate totals from their children
- **Variance Tracking**: Shows percentage variance from original values
- **Responsive Design**: Clean, modern UI that works on all screen sizes
- **Real-time Updates**: All changes are reflected immediately across the table

## Functionality

### Allocation % Button
- Enter a percentage value (e.g., 10 for 10%)
- Click "Allocation %" to increase the current row's value by that percentage
- Updates are propagated to parent subtotals

### Allocation Val Button
- Enter a direct numeric value
- Click "Allocation Val" to set the row's value directly
- For parent rows, the value is distributed proportionally to children
- For child rows, the value is set directly and parent subtotals are updated

### Variance Display
- Shows the percentage change from the original value
- Green for positive variance, red for negative variance
- Calculated as: ((current - original) / original) × 100

## Technology Stack

- **React 18**: Modern React with hooks and context
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Context API**: State management for the hierarchical data

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hierarchical-table
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── HierarchicalTable.jsx    # Main table component
│   └── TableRow.jsx            # Individual row component
├── context/
│   └── TableContext.jsx        # State management context
├── App.jsx                     # Main application component
├── main.jsx                    # Application entry point
└── index.css                   # Global styles (Tailwind)
```

## Usage Examples

### Example 1: Percentage Allocation
1. Enter "10" in the input field next to "Phones"
2. Click "Allocation %"
3. Result: Phones value increases from 800 to 880 (10% increase)
4. Electronics subtotal updates to 1580
5. Variance shows 10% for Phones, 5.33% for Electronics

### Example 2: Direct Value Assignment
1. Enter "400" in the input field next to "Tables"
2. Click "Allocation Val"
3. Result: Tables value changes from 300 to 400
4. Furniture subtotal updates to 1100
5. Variance shows 33.33% for Tables, 10% for Furniture

### Example 3: Parent Row Distribution
1. Enter "2000" in the input field next to "Furniture"
2. Click "Allocation Val"
3. Result: Furniture value changes to 2000
4. Children (Tables and Chairs) are proportionally distributed
5. Tables becomes 727.27, Chairs becomes 1272.73

## Data Structure

The application uses a hierarchical data structure:

```javascript
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
    // ... more children
  ]
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

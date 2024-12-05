import React from 'react';

interface TableProps {
  children: React.ReactNode;
}

export function Table({ children }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">{children}</table>
    </div>
  );
}

Table.Header = function TableHeader({ children }: TableProps) {
  return <thead className="bg-gray-50">{children}</thead>;
};

Table.Body = function TableBody({ children }: TableProps) {
  return <tbody className="divide-y divide-gray-200">{children}</tbody>;
};

Table.Row = function TableRow({
  children,
  className,
  ...props
}: TableProps & React.HTMLProps<HTMLTableRowElement>) {
  return (
    <tr className={`${className || ''}`} {...props}>
      {children}
    </tr>
  );
};

Table.HeaderCell = function TableHeaderCell({
  children,
  className,
}: TableProps & { className?: string }) {
  return (
    <th
      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
        className || ''
      }`}
    >
      {children}
    </th>
  );
};

Table.Cell = function TableCell({
  children,
  className,
}: TableProps & { className?: string }) {
  return (
    <td className={`px-6 py-4 whitespace-nowrap ${className || ''}`}>
      {children}
    </td>
  );
};
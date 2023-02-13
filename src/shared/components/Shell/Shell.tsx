import React from 'react'

interface IShellProps {
	children: React.ReactNode;
}
export const Shell: React.FC<IShellProps> = ({children}) => {
  return (
      <main>
          {children}
      </main>
  );
}

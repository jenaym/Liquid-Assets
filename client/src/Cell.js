import * as React from 'react';

export default function Cell({
  height,
  content,
  header,
  fixed
}) {

  const fixedClass = fixed ? ' Cell-fixed' : '';
  const headerClass = header ? ' Cell-header' : '';
  // Add an inline style to adjust the height
  const style = height ? {height: `${height}px`} : undefined;
  
  const className = (
    `Cell${fixedClass}${headerClass}`
  );  

  const cellMarkup = header ? (
    <th className={className} style={style}>
      {content}
    </th>
  ) : (
    <td className={className} style={style}>
      {content}
    </td>
  );

  return (cellMarkup);
}
import { ICellEditorParams, ICellRendererParams } from "ag-grid-community";
import TextInput from "components/forms/inputs/textInput";
import { forwardRef, useImperativeHandle, useState } from "react";

export const jsonCellRenderer = ({value}: ICellRendererParams) => {
  if (!value) return "";
  let result = "";
  Object.entries(value).forEach(([key, value]) => {
    result += `${key}: ${value}\n`;
  });
  return result;
};

export const jsonCellEditor = forwardRef(( {value}: ICellEditorParams, ref ) => {
  if (!value || typeof value !== "object") return null;
  const [data, setData] = useState(value as Record<string, string>);
  const fields = Object.entries(value).map(([key, value]) => <TextInput defaultValue={value as string} onChange={(e) => setData((prev) => {
   prev[key] = e.target.value;
   return prev;
  })}>{key}</TextInput>)
  useImperativeHandle(ref, () => ({
    getValue: () => data,
  }));
  return <div className="bg-grey-background p-2">{fields}</div>;
});

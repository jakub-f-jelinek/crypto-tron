import React from "react";
import ItemDetail from "./ItemDetail";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);

  return <ItemDetail id={id} />;
}

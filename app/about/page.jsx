// app/about/page.jsx
export const revalidate = 0;
export const dynamic = "force-dynamic";

import ClientAbout from "./ClientAbout";

export default function Page() {
  return <ClientAbout />;
}

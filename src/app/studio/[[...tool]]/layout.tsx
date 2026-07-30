export const metadata = {
  title: 'Sanity Studio',
  description: 'Manage content for theBOAT',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div style={{ minHeight: '100vh', margin: 0, padding: 0 }}>{children}</div>
}

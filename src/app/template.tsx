/** Re-mounts on every route change: a soft opacity fade (see .page-fade). */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-fade">{children}</div>;
}

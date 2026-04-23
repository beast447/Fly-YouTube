export default function ScrollArea({ children, style }) {
  return (
    <div
      style={{
        overflowY: 'auto',
        flex: 1,
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

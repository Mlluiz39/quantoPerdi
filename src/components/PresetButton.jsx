export default function PresetButton({ 
  id, 
  isActive, 
  onClick, 
  children,
  className = ''
}) {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`min-h-[48px] px-5 py-3 rounded-xl text-base md:text-sm font-semibold md:font-medium cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 ${
        isActive 
          ? 'shadow-[0_0_15px_rgba(239,68,68,0.2)]'
          : 'hover:bg-white/10 active:scale-95'
      } ${className}`}
      style={{
        background: isActive ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.05)',
        color: isActive ? '#ef4444' : '#d1d5db',
        border: isActive ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid transparent',
      }}
    >
      {children}
    </button>
  );
}

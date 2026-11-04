// MODUL: keyboard support for clickable non-button elements (rows, list items).
// Returns props that make the element focusable and activatable with Enter / Space.
export function pressable(onClick, role = 'button') {
  if (!onClick) return {};
  return {
    role,
    tabIndex: 0,
    onKeyDown: e => {
      if (e.target !== e.currentTarget) return; // keys inside nested controls stay theirs
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(e); }
    },
  };
}

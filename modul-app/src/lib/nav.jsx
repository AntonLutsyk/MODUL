// Navigation helpers for components: router-backed links plus a page toast.
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Toast } from '../ds';
import { hrefFor, navigate } from './router.js';

export { MODULE_FILES, hrefFor, navigate } from './router.js';

const NavCtx = createContext({ go: navigate, notify: () => {} });

export function NavProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timer = useRef();
  const notify = useCallback(title => {
    setToast(title);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 3200);
  }, []);
  useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <NavCtx.Provider value={{ go: navigate, notify }}>
      {children}
      {toast ? (
        <div style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 90 }}>
          <Toast title={toast} icon="info" onClose={() => setToast(null)} />
        </div>
      ) : null}
    </NavCtx.Provider>
  );
}

export const useNav = () => useContext(NavCtx);

/** A link to a module; clicks are handled by the router (no full page load). */
export const Link = React.forwardRef(function Link({ to, ...rest }, ref) {
  return <a ref={ref} href={hrefFor(to)} {...rest} />;
});

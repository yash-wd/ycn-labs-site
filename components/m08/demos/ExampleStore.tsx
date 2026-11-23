'use client';

import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import styles from './ExampleDemos.module.css';

export interface Product {
  id: string;
  name: string;
  category: 'Plumbing' | 'Electrical' | 'Tools and paint';
  price: number;
}

export const STORE_PRODUCTS: Product[] = [
  { id: 'tap', name: 'Basin tap', category: 'Plumbing', price: 450 },
  { id: 'tape', name: 'Pipe tape pack', category: 'Plumbing', price: 60 },
  { id: 'bulb', name: 'LED bulb pack', category: 'Electrical', price: 240 },
  { id: 'extension', name: 'Extension board', category: 'Electrical', price: 390 },
  { id: 'kit', name: 'Tool kit', category: 'Tools and paint', price: 950 },
  { id: 'brush', name: 'Paint brush set', category: 'Tools and paint', price: 210 },
];

export const STORE_CATEGORIES = ['All', 'Plumbing', 'Electrical', 'Tools and paint'] as const;

export function formatINR(n: number): string {
  return '₹' + Number(n).toLocaleString('en-IN');
}

export function ProductArt({ id }: { id: string }) {
  return (
    <svg
      viewBox="0 0 180 130"
      role="img"
      aria-label={`Illustration of ${id}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.storeProductSvg}
    >
      <rect width="180" height="130" rx="17" fill="#EDF5FA" />
      {id === 'tap' && (
        <>
          <ellipse cx="91" cy="110" rx="69" ry="12" fill="#C1D8E9" />
          <path
            d="M58 103V59c0-17 13-30 31-30h29c16 0 23 10 23 23v15"
            stroke="#476B85"
            strokeWidth="18"
            strokeLinecap="round"
          />
          <path
            d="M58 103V59c0-17 13-30 31-30h29c16 0 23 10 23 23v15"
            stroke="#B7CFDF"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <rect x="123" y="65" width="35" height="13" rx="6" fill="#62859E" />
          <rect x="43" y="102" width="39" height="14" rx="5" fill="#5F86A0" />
        </>
      )}
      {id === 'tape' && (
        <>
          <ellipse cx="90" cy="97" rx="58" ry="13" fill="#D0E1EE" />
          <circle cx="89" cy="68" r="48" fill="#D6BFA0" />
          <circle cx="89" cy="68" r="30" fill="#ffffff" stroke="#DFD4C4" strokeWidth="4" />
          <circle cx="89" cy="68" r="23" fill="#C6DCEB" />
          <path d="M45 59a47 47 0 0 1 88-11" stroke="#A58C6C" strokeWidth="7" strokeLinecap="round" />
        </>
      )}
      {id === 'bulb' && (
        <>
          <ellipse cx="91" cy="114" rx="44" ry="9" fill="#C9E1EF" />
          <path
            d="M89 16c-27 0-43 19-43 43 0 19 11 26 23 37h42c12-11 23-18 23-37 0-24-16-43-45-43Z"
            fill="#FFF6D5"
            stroke="#6A9AB7"
            strokeWidth="6"
          />
          <path d="M70 97h42v11H70z" fill="#8BAABF" />
          <path d="M78 110h27v9H78z" fill="#5B7A91" />
          <path d="M63 56h54" stroke="#E4BA4F" strokeWidth="5" />
          <path d="M76 47v23m26-23v23" stroke="#D4A437" strokeWidth="3" />
        </>
      )}
      {id === 'extension' && (
        <>
          <ellipse cx="89" cy="108" rx="66" ry="11" fill="#C9DFEF" />
          <rect x="28" y="34" width="124" height="64" rx="16" fill="#F7FAFD" stroke="#7F9AB0" strokeWidth="5" />
          <circle cx="59" cy="67" r="14" fill="#DCE8EF" />
          <circle cx="90" cy="67" r="14" fill="#DCE8EF" />
          <circle cx="121" cy="67" r="14" fill="#DCE8EF" />
          <path
            d="M59 60v14m-7-7h14m24-7v14m-7-7h14m24-7v14m-7-7h14"
            stroke="#617B91"
            strokeWidth="3"
          />
        </>
      )}
      {id === 'kit' && (
        <>
          <ellipse cx="88" cy="111" rx="69" ry="11" fill="#CDE0ED" />
          <rect x="34" y="47" width="112" height="58" rx="11" fill="#2B6D95" />
          <rect x="41" y="55" width="98" height="43" rx="6" fill="#3E8EB5" />
          <path d="M64 49V34h47v15" stroke="#1A496F" strokeWidth="8" />
          <path d="M34 77h112" stroke="#153D60" strokeWidth="5" />
          <rect x="82" y="70" width="16" height="17" rx="4" fill="#E8B34B" />
        </>
      )}
      {id === 'brush' && (
        <>
          <ellipse cx="93" cy="113" rx="59" ry="10" fill="#D2E1EB" />
          <path d="M58 101 91 37M83 103 117 31M109 107 144 48" stroke="#B18C64" strokeWidth="12" strokeLinecap="round" />
          <path d="m83 46 14-22 12 6-8 26Zm29-9 13-22 14 7-8 26Zm29 16 12-20 13 7-9 21Z" fill="#4D8DAF" />
          <path d="M82 42 95 48m17-16 13 7m19 13 13 7" stroke="#C6DCEB" strokeWidth="4" />
        </>
      )}
    </svg>
  );
}

interface ExampleStoreProps {
  isActive?: boolean;
}

export function ExampleStore({ isActive = true }: ExampleStoreProps = {}) {
  const [filter, setFilter] = useState<string>('All');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const cartTriggerRef = useRef<HTMLButtonElement | null>(null);
  const drawerCloseRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLElement | null>(null);

  const totalCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const cartItems = STORE_PRODUCTS.filter((p) => (cart[p.id] || 0) > 0).map((p) => ({
    ...p,
    qty: cart[p.id],
    lineTotal: p.price * cart[p.id],
  }));

  const totalAmount = cartItems.reduce((sum, item) => sum + item.lineTotal, 0);

  const filteredProducts = STORE_PRODUCTS.filter(
    (p) => filter === 'All' || p.category === filter
  );

  const selectedProduct = STORE_PRODUCTS.find((p) => p.id === selectedId) || null;

  const openCart = () => {
    setDrawerOpen(true);
  };

  const closeCart = () => {
    setDrawerOpen(false);
    if (isActive) {
      cartTriggerRef.current?.focus();
    }
  };

  const handleAddToCart = (id: string) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
    const product = STORE_PRODUCTS.find((p) => p.id === id);
    setStatusMessage(`Added ${product?.name || 'item'} to cart.`);
    setDrawerOpen(true);
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCart((prev) => {
      const nextQty = (prev[id] || 0) + delta;
      if (nextQty <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: nextQty };
    });
  };

  const handleRemove = (id: string) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
    const product = STORE_PRODUCTS.find((p) => p.id === id);
    setStatusMessage(`Removed ${product?.name || 'item'} from cart.`);
    drawerCloseRef.current?.focus();
  };

  const handleCheckout = () => {
    if (totalCount > 0) {
      setCompleted(true);
      setStatusMessage('Order confirmed. Example order number EXAMPLE-ORDER-001.');
    }
  };

  const handleFinish = () => {
    setCart({});
    setCompleted(false);
    setDrawerOpen(false);
    if (isActive) {
      cartTriggerRef.current?.focus();
    }
  };

  // When leaving Store (mode becomes inactive), close the temporary cart dialog
  // while strictly preserving the cart products and quantities.
  useEffect(() => {
    if (!isActive && drawerOpen) {
      setDrawerOpen(false);
    }
  }, [isActive, drawerOpen]);

  // Focus management & Trap when drawer opens
  useEffect(() => {
    if (!drawerOpen || !isActive) return;
    drawerCloseRef.current?.focus();

    const handleGlobalKeyDown = (e: globalThis.KeyboardEvent) => {
      // Inactive mode or hidden dialog must never intercept Escape or steal focus
      if (!isActive) return;
      if (
        dialogRef.current &&
        (dialogRef.current.closest('[hidden]') || dialogRef.current.offsetParent === null)
      ) {
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        closeCart();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [drawerOpen, completed, isActive]);

  const handleDialogKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (!isActive) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      closeCart();
      return;
    }
    if (e.key === 'Tab' && dialogRef.current) {
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), a:not([disabled])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  return (
    <div className={`${styles.device} ${styles.laptopDevice} ${styles.storeDevice}`}>
      <div className={styles.hardware}>
        <div className={styles.productScreen}>
          <div className={styles.storeUi}>
            <div className={styles.storeContent}>
              {/* Store Header Bar */}
              <header className={styles.storeHeader}>
                <div className={styles.storeBrand}>
                  <span className={styles.storeMark} aria-hidden="true">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m3 11 9-8 9 8M5 10v11h14V10M9 21v-8h6v8" />
                    </svg>
                  </span>
                  <span className={styles.storeBrandName}>Example Home Supplies</span>
                </div>
                <div className={styles.storeNav}>
                  <button
                    type="button"
                    data-action="store-filter"
                    data-filter="All"
                    className={styles.storeLink}
                    onClick={() => {
                      setFilter('All');
                      setStatusMessage('Showing all categories.');
                    }}
                  >
                    Shop
                  </button>
                  <button
                    ref={cartTriggerRef}
                    type="button"
                    data-action="store-cart"
                    className={styles.cartTrigger}
                    onClick={openCart}
                    aria-label={`Cart, ${totalCount} items`}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M3 4h2l2 13h12l2-10H6M9 22h.01M18 22h.01" />
                    </svg>
                    <span>Cart ({totalCount})</span>
                  </button>
                </div>
              </header>

              {/* Hero Banner */}
              <section className={styles.storeHero}>
                <div>
                  <span className={styles.storeKicker}>HOME ESSENTIALS · EXAMPLE STORE</span>
                  <h2>Small things. Better home.</h2>
                  <p>Browse useful supplies and tools. All items and prices are fictional.</p>
                </div>
                <div className={styles.storeHeroArt} aria-hidden="true">
                  <ProductArt id="kit" />
                </div>
              </section>

              {/* Category Filter */}
              <nav className={styles.storeFilter} role="group" aria-label="Shop category">
                {STORE_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    data-action="store-filter"
                    data-filter={cat}
                    aria-pressed={filter === cat}
                    className={filter === cat ? styles.filterActive : styles.filterInactive}
                    onClick={() => {
                      setFilter(cat);
                      setStatusMessage(`Filtered category: ${cat}.`);
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </nav>

              {/* Inline Product Detail (if selected) */}
              {selectedProduct && (
                <div className={styles.storeDetail}>
                  <div>
                    <strong>{selectedProduct.name}</strong>
                    <p className={styles.detailMuted}>
                      {selectedProduct.category} · Sample {formatINR(selectedProduct.price)}
                    </p>
                  </div>
                  <button
                    type="button"
                    className={styles.secondaryBtn}
                    data-action="store-close-detail"
                    onClick={() => setSelectedId(null)}
                  >
                    Close details
                  </button>
                </div>
              )}

              {/* Product Grid */}
              <div className={styles.storeGrid}>
                {filteredProducts.map((p) => (
                  <article key={p.id} className={styles.storeCard}>
                    <div className={styles.storeCardArt}>
                      <ProductArt id={p.id} />
                    </div>
                    <div className={styles.storeCardBody}>
                      <strong>{p.name}</strong>
                      <p className={styles.price}>{formatINR(p.price)}</p>
                      <div className={styles.storeCardActions}>
                        <button
                          type="button"
                          className={styles.secondaryBtn}
                          data-action="store-view"
                          data-id={p.id}
                          onClick={() => setSelectedId(p.id)}
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className={styles.primaryBtn}
                          data-action="store-add"
                          data-id={p.id}
                          onClick={() => handleAddToCart(p.id)}
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Footnote disclosure */}
              <p className={styles.storeFootnote}>
                Sample products and prices. This is a fictional online store.
              </p>

              {/* Polite status live region */}
              <p className={styles.srOnly} id="store-status" role="status" aria-live="polite">
                {statusMessage}
              </p>
            </div>

            {/* Cart Slide-out Drawer */}
            {drawerOpen && (
              <>
                <div
                  className={styles.storeDrawerBackdrop}
                  data-action="store-cart-close"
                  onClick={closeCart}
                  aria-hidden="true"
                />
                <aside
                  ref={dialogRef}
                  className={styles.storeDrawer}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="cart-title"
                  onKeyDown={handleDialogKeyDown}
                >
                  <header className={styles.drawerHeader}>
                    <h3 id="cart-title">{completed ? 'Demo order' : 'Your cart'}</h3>
                    <button
                      ref={drawerCloseRef}
                      type="button"
                      aria-label="Close cart"
                      data-action="store-cart-close"
                      id="cart-close"
                      onClick={closeCart}
                      className={styles.drawerCloseBtn}
                    >
                      ✕
                    </button>
                  </header>

                  <main className={styles.drawerMain}>
                    {completed ? (
                      <div className={styles.cartResult}>
                        <strong>Demo order</strong>
                        <p>
                          Nothing was bought and no payment was taken.
                          <br />
                          Example order number: <b>EXAMPLE-ORDER-001</b>.
                        </p>
                        <div style={{ marginTop: '15px' }}>
                          <button
                            type="button"
                            className={styles.primaryBtn}
                            data-action="store-finish"
                            onClick={handleFinish}
                          >
                            Keep browsing
                          </button>
                        </div>
                      </div>
                    ) : cartItems.length > 0 ? (
                      <div className={styles.cartLines}>
                        {cartItems.map((item) => (
                          <div key={item.id} className={styles.cartLine}>
                            <div>
                              <strong>{item.name}</strong>
                              <div className={styles.mutedText}>{formatINR(item.price)} sample</div>
                              <button
                                type="button"
                                className={styles.linkBtn}
                                data-action="store-remove"
                                data-id={item.id}
                                onClick={() => handleRemove(item.id)}
                              >
                                Remove
                              </button>
                            </div>
                            <div className={styles.cartQty}>
                              <button
                                type="button"
                                data-action="store-decrease"
                                data-id={item.id}
                                aria-label={`Decrease quantity of ${item.name}`}
                                onClick={() => handleUpdateQty(item.id, -1)}
                              >
                                −
                              </button>
                              <b>{item.qty}</b>
                              <button
                                type="button"
                                data-action="store-increase"
                                data-id={item.id}
                                aria-label={`Increase quantity of ${item.name}`}
                                onClick={() => handleUpdateQty(item.id, 1)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className={styles.mutedText}>Your cart is empty.</p>
                    )}
                  </main>

                  {!completed && (
                    <footer className={styles.drawerFooter}>
                      <div className={styles.cartTotal}>
                        <span>Items total (sample)</span>
                        <span>{formatINR(totalAmount)}</span>
                      </div>
                      <button
                        type="button"
                        className={styles.primaryBtn}
                        data-action="store-checkout"
                        disabled={totalCount === 0}
                        style={{ width: '100%' }}
                        onClick={handleCheckout}
                      >
                        Place order (demo)
                      </button>
                    </footer>
                  )}
                </aside>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

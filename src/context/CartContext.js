import React, { createContext, useContext, useReducer, useEffect } from "react";

// Cart Context
const CartContext = createContext();

// Action types
const CART_ACTIONS = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  CLEAR_CART: "CLEAR_CART",
  LOAD_CART: "LOAD_CART",
};

// Helper: compute minimum quantity based on product category
const getMinQtyFromCategory = (category) => {
  // All products have minimum quantity of 1
  return 1;
};

// Helper: normalize size for comparison (handles both string and object formats)
const getSizeKey = (size) => {
  if (!size) return "";
  // For string sizes (non-rugs)
  if (typeof size === "string") return size;
  // For object sizes (rugs)
  if (typeof size === "object" && size.width != null && size.height != null) {
    return `${size.width}x${size.height}`;
  }
  return JSON.stringify(size);
};

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const min = getMinQtyFromCategory(action.payload.category);
      const addQty = Math.max(1, action.payload.quantity || 1);
      const requestedQty = Math.max(min, addQty);

      // differentiate items by product id + selected size (if present)
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          getSizeKey(item.size) === getSizeKey(action.payload.size),
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id &&
            getSizeKey(item.size) === getSizeKey(action.payload.size)
              ? {
                  ...item,
                  quantity: item.quantity + requestedQty,
                }
              : item,
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: requestedQty }],
      };
    }

    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    case CART_ACTIONS.UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items
          .map((item) => {
            if (item.id !== action.payload.id) return item;
            const min = getMinQtyFromCategory(item.category);
            return {
              ...item,
              quantity: Math.max(min, action.payload.quantity),
            };
          })
          .filter((item) => item.quantity > 0),
      };

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: [],
      };

    case CART_ACTIONS.LOAD_CART:
      return {
        ...state,
        items: action.payload.items || [],
      };

    default:
      return state;
  }
};

// Initial state
const initialState = {
  items: [],
  isOpen: false,
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("indikaara-cart");
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: cartData });
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "indikaara-cart",
      JSON.stringify({ items: state.items }),
    );
    try {
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (e) {
      // no-op in non-browser environments
    }
  }, [state.items]);

  // Listen for a global event when a user logs in so we can clear cart
  useEffect(() => {
    const handleUserLoggedIn = () => {
      dispatch({ type: CART_ACTIONS.CLEAR_CART });
    };

    try {
      window.addEventListener("userLoggedIn", handleUserLoggedIn);
    } catch (e) {
      return () => {};
    }

    return () => {
      try {
        window.removeEventListener("userLoggedIn", handleUserLoggedIn);
      } catch (e) {
        // no-op
      }
    };
  }, []);

  // Calculate totals
  const subtotal = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  // Shipping and tax are not applied; order total equals items subtotal
  const shipping = 0;
  const tax = 0;
  const total = subtotal;

  const itemCount = state.items.reduce(
    (count, item) => count + item.quantity,
    0,
  );

  // Cart actions
  const addToCart = (product, quantity = 1) => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { ...product, quantity },
    });
  };

  const removeFromCart = (productId) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { id: productId },
    });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id: productId, quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const value = {
    items: state.items,
    itemCount,
    subtotal,
    shipping,
    tax,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartContext;

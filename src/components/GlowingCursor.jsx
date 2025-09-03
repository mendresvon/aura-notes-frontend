import React, { useState, useEffect } from "react";

const GlowingCursor = ({ isModalOpen }) => {
  // 1. Accept `isModalOpen` as a prop
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <div
      // 2. We use `transition-opacity` to smoothly fade the effect
      className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px at ${position.x}px ${position.y}px, rgba(167, 139, 250, 0.15), transparent 80%)`,
        // 3. Set opacity to 0 when the modal is open, and 1 otherwise
        opacity: isModalOpen ? 0 : 1,
      }}
    />
  );
};

export default GlowingCursor;

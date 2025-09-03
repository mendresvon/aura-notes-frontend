import React, { useState, useEffect } from "react";

const GlowingCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // This function updates the state with the mouse's coordinates
    const updateMousePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Add an event listener to the window for mouse movement
    window.addEventListener("mousemove", updateMousePosition);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []); // The empty dependency array ensures this effect runs only once

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 transition duration-300"
      style={{
        background: `radial-gradient(600px at ${position.x}px ${position.y}px, rgba(167, 139, 250, 0.15), transparent 80%)`,
      }}
    />
  );
};

export default GlowingCursor;

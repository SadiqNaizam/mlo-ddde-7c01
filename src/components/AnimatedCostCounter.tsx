import React, { useEffect, useRef } from 'react';
import { animate } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCostCounterProps {
  /** The numerical value to display and animate to. */
  value: number;
  /** Optional additional class names for styling the container. */
  className?: string;
}

const AnimatedCostCounter: React.FC<AnimatedCostCounterProps> = ({ value, className }) => {
  console.log('AnimatedCostCounter loaded');
  const nodeRef = useRef<HTMLParagraphElement>(null);
  const prevValueRef = useRef(value);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const fromValue = prevValueRef.current;
    
    // Animate from the previous value to the new value
    const controls = animate(fromValue, value, {
      duration: 0.8,
      ease: "easeOut",
      onUpdate(latest) {
        // Format the number with Indian Rupee formatting (commas)
        node.textContent = `₹${Math.round(latest).toLocaleString('en-IN')}`;
      },
      onComplete() {
        // Update the ref to the new value for the next animation
        prevValueRef.current = value;
      }
    });

    // Return a cleanup function to stop the animation if the component unmounts
    return () => controls.stop();
  }, [value]);

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <p
        ref={nodeRef}
        className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900 dark:text-gray-100"
      >
        {/* Initial value is set here and updated by the animation effect */}
        ₹{value.toLocaleString('en-IN')}
      </p>
    </div>
  );
};

export default AnimatedCostCounter;
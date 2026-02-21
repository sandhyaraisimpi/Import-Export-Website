import React, { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

const useCounter = (end, isVisible, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const increment = end / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [end, duration, isVisible]);

  return count;
};

const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const transactions = useCounter(67, isInView);
  const satisfaction = useCounter(66, isInView);
  const properties = useCounter(336, isInView);

  return (
    <div ref={ref} className="space-y-10">

      <div className="flex items-center gap-6">
        <h2 className="text-5xl font-bold text-neutral-900">
          {transactions}+
        </h2>
        <p className="text-neutral-600">
          Successful Transactions Monthly
        </p>
      </div>

      <div className="flex items-center gap-6">
        <h2 className="text-5xl font-bold text-neutral-900">
          {satisfaction}%
        </h2>
        <p className="text-neutral-600">
          Customer Satisfaction Rate
        </p>
      </div>

      <div className="flex items-center gap-6">
        <h2 className="text-5xl font-bold text-neutral-900">
          {properties}
        </h2>
        <p className="text-neutral-600">
          Exquisite Properties Ready For Selection
        </p>
      </div>

    </div>
  );
};

export default Stats;
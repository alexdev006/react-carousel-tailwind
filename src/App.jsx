import './App.css';
import { useState } from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { AnimatePresence, motion } from 'framer-motion';
import useMeasure from 'react-use-measure';

function App() {
  const [ref, { width }] = useMeasure();
  const [count, setCount] = useState(1);
  const prev = usePrevious(count);
  const direction = count > prev ? 1 : -1;

  return (
    <div className="text-white">
      <div className="mt-8 flex justify-center">
        <button onClick={() => setCount((count) => count - 1)}>
          <ChevronLeftIcon className="h-5 w-5 back" />
        </button>
        <div
          ref={ref}
          className="relative h-24 w-40 bg-gray-700 flex justify-center items-center overflow-hidden"
        >
          <AnimatePresence custom={{ direction, width }}>
            <motion.div
              variants={variants}
              custom={{ direction, width }}
              initial="enter"
              animate="center"
              exit="exit"
              key={count}
              className={`absolute w-20 h-20 flex justify-center items-center ${
                colors[Math.abs(count) % 4]
              }`}
            >
              {count}
            </motion.div>
          </AnimatePresence>
        </div>
        <button onClick={() => setCount((count) => count + 1)}>
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

const variants = {
  enter: ({ direction, width }) => ({ x: direction * width }),
  center: { x: 0 },
  exit: ({ direction, width }) => ({ x: direction * -width }),
};

const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'];

function usePrevious(state) {
  const [tuple, setTuple] = useState([null, state]);

  if (tuple[1] !== state) {
    setTuple([tuple[1], state]);
  }

  return tuple[0];
}

export default App;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Confetti from "react-confetti";

export default function Complete({heading,content}) {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
      navigate("/dashboard"); // redirect after 5 seconds
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-50 font-inter relative overflow-hidden">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center bg-white p-8 rounded-2xl"
      >
        <CheckCircle className="text-green-500 w-20 h-20 mb-4 animate-bounce" />
        <h1 className="text-4xl font-semibold mb-2">{heading}</h1>
        <p className="text-gray-500 mb-6 text-center text-sm md:text-lg">
          {content}
        </p>

        <motion.div
          className="h-1 w-64 bg-white rounded-full overflow-hidden"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 10, ease: "linear" }}
        >
          <motion.div className="h-1 bg-green-500" style={{ scaleX: 1 }} />
        </motion.div>
      </motion.div>
    </div>
  );
}
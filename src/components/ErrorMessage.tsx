import React from "react";
import { Card, CardBody, Button } from "@heroui/react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`glass-card border-0 overflow-hidden ${className}`}>
        <CardBody className="p-8">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center shadow-lg">
                <AlertCircle className="text-red-500" size={32} />
              </div>
            </div>
            <div>Oops! Something went wrong</div>

            <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
              {message}
            </p>

            {onRetry && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  color="primary"
                  variant="flat"
                  size="lg"
                  startContent={
                    <motion.div
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <RefreshCw size={16} />
                    </motion.div>
                  }
                  onPress={onRetry}
                  className="button-modern bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-lg"
                >
                  Try Again
                </Button>
              </motion.div>
            )}
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

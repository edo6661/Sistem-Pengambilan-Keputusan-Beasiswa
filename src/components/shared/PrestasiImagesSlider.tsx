import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Modal from "./Modal";

interface PrestasiImagesSliderProps {
  images: string[];
  isOpen: boolean;
  onChangeIsOpen: (isOpen: boolean) => void;
}

const PrestasiImagesSlider = ({ images, isOpen, onChangeIsOpen }: PrestasiImagesSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <Modal
      isOpen={isOpen}
      onChangeIsOpen={onChangeIsOpen}
      trigger={
        <Image
          src={images[0]}
          width={100}
          height={100}
          alt="Thumbnail"
          className="rounded-md cursor-pointer hover:opacity-80 transition-opacity aspect-video object-cover"
        />
      }
      title="Prestasi Images"
      description="Prestasi Images description"
    >
      <div className="w-full max-w-full md:max-w-xl lg:max-w-2xl mx-auto px-4">
        <div className="relative aspect-square overflow-hidden rounded-md">
          <AnimatePresence>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ duration: 0.5 }}
              className="absolute w-full h-full flex justify-center items-center"
            >
              <Image
                src={images[currentIndex]}
                fill
                alt={`Prestasi ${currentIndex + 1}`}
                className="object-contain rounded-md"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          </AnimatePresence>
          <button
            onClick={prevImage}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-background bg-opacity-50 rounded-full p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-background bg-opacity-50 rounded-full p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>


      </div>
    </Modal>
  );
};

export default PrestasiImagesSlider;
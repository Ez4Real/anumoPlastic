import { useCallback, useEffect, useState } from "react";
import { HStack, Box, Image, IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

interface ImagesContainerProps {
  images: Array<{ id: string; file: File; url: string }>;
  onRemove: (id: string) => void;
  scrollbarColor: string;
  isOpen: boolean;
}

const ImagesOrderingContainer = ({
    images,
    onRemove,
    scrollbarColor,
    isOpen
}: ImagesContainerProps) => {
  const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(null);

  const imagesScrollContainerRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      setScrollContainer(node);
    }
  }, []);

  useEffect(() => {
    const handleWheel = (evt: WheelEvent) => {
      if (scrollContainer) {
        evt.preventDefault();
        scrollContainer.scrollLeft += evt.deltaY / 3;
      }
    };

    if (isOpen && scrollContainer) {
      scrollContainer.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("wheel", handleWheel);
      }
    };
  }, [isOpen, scrollContainer, images.length]);

  return (
    <HStack
      ref={imagesScrollContainerRef}
      spacing={2}
      mt={4}
      pb=".5rem"
      overflowX="auto"
      sx={{
        "::-webkit-scrollbar-thumb": {
          background: scrollbarColor,
        },
      }}
    >
      {images.map((img, index) => (
        <Box position="relative" key={index}>
          <Image
            src={img.url}
            alt={`Uploaded image ${index + 1}`}
            boxSize="100px"
            minW="100px"
            objectFit="cover"
            borderRadius="md"
          />
          <IconButton
            aria-label="Remove image"
            icon={<DeleteIcon color="red.500" />}
            size="xs"
            onClick={() => onRemove(img.id)}
            position="absolute"
            top="2px"
            right="2px"
            bg="transparent"
            _hover={{ bg: "whiteAlpha.500" }}
          />
        </Box>
      ))}
    </HStack>
  );
};

export default ImagesOrderingContainer;
import { useEffect, useRef } from "react";
import { HStack, Box, Image, IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { type ImageItem } from "../../client"
import { DragDropContext,
         Droppable,
         Draggable,
         DroppableProvided,
         DraggableProvided
       } from "react-beautiful-dnd";

interface ImagesContainerProps {
  images: Array<ImageItem>;
  setImages: React.Dispatch<React.SetStateAction<Array<ImageItem>>>;
  onRemove: (id: string) => void;
  scrollbarColor: string;
  isOpen: boolean;
}

const ImagesOrderingContainer = ({
    images,
    setImages,
    onRemove,
    scrollbarColor
}: ImagesContainerProps) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
 
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (evt: WheelEvent) => {
      evt.preventDefault();
      container.scrollLeft += evt.deltaY / 3;
    };

    container.addEventListener("wheel", handleWheel);
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reordered = Array.from(images);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setImages(reordered);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided: DroppableProvided) => (
          <HStack
            ref={(node) => {
              scrollContainerRef.current = node;
              provided.innerRef(node);
            }}
            mt={4}
            pb=".5rem"
            overflowX="auto"
            spacing={0}
            sx={{
              "::-webkit-scrollbar-thumb": {
                background: scrollbarColor,
              },
            }}
            {...provided.droppableProps}
          >
            {images.map((img, index) => (
              <Draggable
                key={img.id}
                draggableId={img.id}
                index={index}
              >
                {(draggableProvided: DraggableProvided) => (
                  <Box
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                    position="relative"
                    mr={2}
                  >
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
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </HStack>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ImagesOrderingContainer;